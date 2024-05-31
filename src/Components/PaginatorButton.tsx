import s from "../css/paginatorbutton.module.css";
import classNames from "classnames";

type Props = {
  active: any;
  updatePage: () => void;
  children: number;
};

const PaginatorButton = (props: Props) => {
  const { active, updatePage, children } = props;
  return (
    <button className={classNames(s.button, { [s.active]: active })} onClick={updatePage}>
      {children}
    </button>
  );
};

export default PaginatorButton;
