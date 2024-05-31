import { FC, useMemo } from "react";
import PaginatorButton from "./PaginatorButton";
import s from "../css/paginator.module.css";

const Paginator: FC<{
  activePage: number;
  updatePage: Function;
  pagesCount: number;
}> = props => {
  const { activePage, updatePage, pagesCount } = props;
  const pagesArray = useMemo(
    () => Array.from({ length: pagesCount }, (_, i) => i + 1),
    [pagesCount]
  );
  return (
    <div className={`${s.paginator} flex`}>
      {pagesArray.map(button => (
        <PaginatorButton
          key={button}
          active={activePage === button}
          updatePage={() => {
            updatePage(button);
          }}>
          {button}
        </PaginatorButton>
      ))}
    </div>
  );
};

export default Paginator;
