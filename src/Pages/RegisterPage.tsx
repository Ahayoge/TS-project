import { addToStorage } from "../Utils/localstorage";
import { FC, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { checkIfAlreadyRegistered } from "../Utils/checkiflogged";
import { EmailSelect } from "../Components/EmailSelect";
import axios from "axios";
import Button from "../Components/Buttons";
import s from "../css/registerpage.module.css";
axios.defaults.baseURL = "https://reqres.in/api";
import { IUser } from "../Types/IUser";

interface NewUser extends IUser {
  password: string;
  token: string;
}

const RegisterPage: FC = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState<string>("Леонардо");
  const [lastName, setLastName] = useState<string>("Ди Каприо");
  const [email, setEmail] = useState<string>("george.bluth@reqres.in");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>();
  const [avatar, setAvatar] = useState<string>(
    "https://sun3-22.userapi.com/impf/DW4IDqvukChyc-WPXmzIot46En40R00idiUAXw/l5w5aIHioYc.jpg?quality=96&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360&sign=10ad7d7953daabb7b0e707fdfb7ebefd&u=I6EtahnrCRLlyd0MhT2raQt6ydhuyxX4s72EHGuUSoM&cs=200x200"
  );
  const currentDate = new Date();

  const registerUser = () => {
    let userData: NewUser = {
      id: currentDate.getTime(),
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: password,
      avatar: avatar,
      token: "",
    };

    if (password == passwordConfirm) {
      axios
        .post("/register", {
          email: email,
          password: password,
        })
        .then(response => {
          if (checkIfAlreadyRegistered(email)) {
            alert("Пользователь с таким Email уже зарегистрирован!");
            return;
          }
          userData.token = response.data.token;
          addToStorage("userdata", JSON.stringify(userData));
          navigate("/users");
        });
    } else alert("Пароли не совпадают");
  };

  return (
    <div className="container flex">
      <div className={`${s.register__window} flex`}>
        <h2 className={s.title}>Регистрация</h2>
        <div className={`${s.register__form} flex`}>
          <input
            className={s.input}
            type="text"
            name="firstName"
            id=""
            placeholder="Имя"
            onChange={e => setFirstName(e.target.value)}
          />
          <input
            className={s.input}
            type="text"
            name="lastName"
            id=""
            placeholder="Фамилия"
            onChange={e => setLastName(e.target.value)}
          />
          <input
            className={s.input}
            type="text"
            name="text"
            id=""
            placeholder="Ссылка на фото профиля"
            onChange={e => setAvatar(e.target.value)}
          />
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

          <input
            className={s.input}
            type="password"
            name="passwordConfirm"
            id=""
            placeholder="Подтверждение пароля"
            onChange={e => setPasswordConfirm(e.target.value)}
          />

          <Button buttonText="Регистрация" onClick={registerUser}></Button>
          <Link to={"/login"}>Уже зарегистрированы? Войти</Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
