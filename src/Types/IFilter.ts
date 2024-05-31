export type searchingFilter = "name" | "email";
export type sorting = "evenID" | "oddID" | "letter" | "";

export interface IFilter {
  page: number;
  sorting: sorting;
  searching: string;
  searchingFilter: searchingFilter;
}

export interface IOption {
  name: string;
  value: searchingFilter | sorting;
}

export const searchingOptions: IOption[] = [
  {
    name: "По имени",
    value: "name",
  },
  {
    name: "По почте",
    value: "email",
  },
];

export const sortingOptions: IOption[] = [
  {
    name: "Показывать четные ID",
    value: "evenID",
  },
  {
    name: "Показывать нечетные ID",
    value: "oddID",
  },
  {
    name: "Не начинаются с буквы:",
    value: "letter",
  },
];
