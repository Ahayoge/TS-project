import s from "../css/userspage.module.css";
import UserList from "../Components/UserList";
import { useState } from "react";
import { IUser } from "../Types/IUser";
import Header from "../Components/Header";
import { checkIfLogged } from "../Utils/checkiflogged";

const UsersPage = () => {
  // Проверяем, залогинен ли юзер. Если нет, то возвращаем на страницу логина/регистрации
  checkIfLogged();
  const [users, setUsers] = useState<IUser[]>([]);
  // Получаем массив пользователей из компонента UserList
  const handleAmountChange = (usersList: []) => {
    setUsers(usersList);
  };

  return (
    <>
      <Header />
      <div className={`${s.container} flex`}>
        <h1 className={s.title}>Пользователей на сайте: {users.length}</h1>
        <UserList onAmountChange={handleAmountChange} />
      </div>
    </>
  );
};

export default UsersPage;
