import { useState, useEffect, useMemo, FC } from "react";
import CardSkeleton from "./CardSkeleton";
import UserCard from "./UserCard";
import Paginator from "./Paginator";
import axios, { AxiosResponse } from "axios";
import { getFromStorage } from "../Utils/localstorage";
import { IFilter, sortingOptions, searchingOptions } from "../Types/IFilter";
import s from "../css/userlist.module.css";
import UsersSelect from "./UsersSelect";
import { IUser } from "../Types/IUser";
import { checkIfLogged } from "../Utils/checkiflogged";

const PAGE_SIZE = 6;
axios.defaults.baseURL = "https://reqres.in/api";

const UserList: FC<{ onAmountChange: Function }> = ({ onAmountChange }) => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilters] = useState<IFilter>({
    searching: "",
    searchingFilter: "name",
    page: 1,
    sorting: "",
  });

  const filteredSortedUsers = useMemo(() => {
    if (!users.length) return [];

    const searchingRules = {
      name: (user: IUser) => {
        return `${user.first_name} ${user.last_name}`;
      },
      email: (user: IUser) => {
        return user.email;
      },
    };

    const sortingRules = {
      evenID: (user: IUser) => user.id % 2 == 0,
      oddID: (user: IUser) => user.id % 2 != 0,
      letter: (user: IUser) => {
        return (
          searching.toLowerCase() !=
          searchingRules[searchingFilter](user).slice(0, searching.length).toLowerCase()
        );
      },
    };

    const { searching, searchingFilter, sorting } = filter;
    let result = users;
    if (sorting != "letter")
      result = users.filter(user =>
        searchingRules[searchingFilter](user)
          .toLowerCase()
          .includes(searching.toLowerCase())
      );

    if (sorting) {
      result = result.filter(user => sortingRules[sorting](user));
    }
    return result;
  }, [users, filter]);

  const pagesCount = Math.ceil(filteredSortedUsers.length / PAGE_SIZE);
  const pageIndex = PAGE_SIZE * (filter.page - 1);

  const updateFilter = (name: keyof IFilter, value: IFilter[keyof IFilter]) => {
    setFilters({ ...filter, page: 1, [name]: value });
  };

  // Передаём кол-во пользователей родителю UsersPage
  const handleChange = () => {
    onAmountChange(users);
  };

  useEffect(() => {
    axios.get("/users?per_page=12").then((response: AxiosResponse) => {
      let userData = getFromStorage("userdata");
      setUsers([...response.data.data, userData]);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    checkIfLogged;
    handleChange();
  }, [users]);

  return (
    <>
      <div className={`${s.top__section} flex`}>
        <input
          className={s.input}
          value={filter.searching}
          onChange={e =>
            setFilters({
              ...filter,
              searching: e.target.value,
              page: 1,
            })
          }
          type="text"
          placeholder="Введите имя пользователя"
        />
        <UsersSelect
          options={searchingOptions}
          activeSorting={filter.searchingFilter}
          updateSorting={(value: string) => updateFilter("searchingFilter", value)}
          filterType={"searching"}
        />
        <UsersSelect
          options={sortingOptions}
          activeSorting={filter.sorting}
          updateSorting={(value: string) => {
            updateFilter("sorting", value);
          }}
          filterType={"filter"}
        />
      </div>

      <ul className={`${s.user__list} flex`}>
        {isLoading && <CardSkeleton cards={12} />}
        {users.length ? (
          filteredSortedUsers
            .slice(pageIndex, 6 + pageIndex)
            .map((user: IUser) => <UserCard key={user.id} data={user} />)
        ) : (
          <p>Ничего не найдено</p>
        )}
      </ul>

      {pagesCount > 1 && (
        <Paginator
          activePage={filter.page}
          updatePage={(button: number) => {
            updateFilter("page", button);
          }}
          pagesCount={pagesCount}></Paginator>
      )}
    </>
  );
};

export default UserList;
