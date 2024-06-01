import { Link, useNavigate } from "react-router-dom";
import { removeFromStorage } from "../Utils/localstorage";
import Button from "./Buttons";
import s from "../css/header.module.css";
import { getFromStorage } from "../Utils/localstorage";
import { FC } from "react";

const Header: FC = () => {
  const navigate = useNavigate();
  const logout = () => {
    removeFromStorage("isLogged");
    navigate("/login");
  };

  return (
    <header className={s.header}>
      <div className={`${s.container} flex`}>
        <ul className={`${s.navbar} flex`}>
          <li className={`${s.nav__item} flex`}>
            <Link to={"/users"} className={s.nav__link}>
              Пользователи
            </Link>
          </li>
          <li className={`${s.nav__item} flex`}>
            {getFromStorage("userdata") && (
              <Link to={`/user/${getFromStorage("userdata").id}`} className={s.nav__link}>
                Мой профиль
              </Link>
            )}
          </li>
        </ul>
        <Button buttonText="Выйти" onClick={logout}></Button>
      </div>
    </header>
  );
};

export default Header;
