import { useState } from "react";
import axios from "axios";
import s from "../css/registerpage.module.css";
import Button from "../Components/Buttons";
import { useNavigate, Link } from "react-router-dom";
import { addToStorage, getFromStorage } from "../Utils/localstorage";
import { checkIfRegistered } from "../Utils/checkiflogged";
import { EmailSelect } from "../Components/EmailSelect";

axios.defaults.baseURL = "https://reqres.in/api";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("george.bluth@reqres.in");
  const [password, setPassword] = useState<string>();

  const loginUser = () => {
    axios
      .post("/login", {
        email: email,
        password: password,
      })
      .then(response => {
        const userData = getFromStorage("userdata");
        if (checkIfRegistered(email)) {
          alert("Пользователь с таким Email не зарегистрирован");
          return;
        }
        if (response.data.token == userData.token && password == userData.password) {
          navigate("/users");
          addToStorage("isLogged", JSON.stringify(true));
        }
      });
  };

  return (
    <div className="container flex">
      <div className={`${s.register__window} flex`}>
        <h2 className={s.title}>Войти в профиль</h2>
        <div className={`${s.register__form} flex`}>
          <select
            className={s.input}
            name="email"
            id=""
            onChange={e => setEmail(e.target.value)}>
            <EmailSelect />
          </select>
          <input
            className={s.input}
            type="password"
            name="password"
            id=""
            placeholder="Пароль"
            onChange={e => setPassword(e.target.value)}
          />

          <Button buttonText="Войти" onClick={loginUser}></Button>
          <Link to={"/register"}>Регистрация</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
