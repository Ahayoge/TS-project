import { FC } from "react";
import s from "../css/userselect.module.css";

import { IOption, searchingFilter, sorting } from "../Types/IFilter";

type FilterSelectProps = {
  options: IOption[];
  updateSorting: (value: string) => void;
  activeSorting: sorting | searchingFilter;
  filterType: "filter" | "searching";
};

const UsersSelect: FC<FilterSelectProps> = (props: any) => {

  const { options, updateSorting, activeSorting, filterType } = props;
  return (
    <select
      className={s.input}
      value={activeSorting}
      onChange={e => {
        updateSorting(e.target.value);
      }}
      id="">
      {filterType == "filter" && <option disabled value="">Выберите фильтр...</option>}
      {options.map((option: any) => (
        <option key={option.value}>{option.name}</option>
      ))}
    </select>
  );
};

export default UsersSelect;
