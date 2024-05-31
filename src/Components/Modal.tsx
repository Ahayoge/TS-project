import { FC, useState } from "react";
import s from "../css/modal.module.css";
import Button from "./Buttons";
import axios from "axios";
import classNames from "classnames";
import { IUser } from "../Types/IUser";
import { addToStorage, getFromStorage } from "../Utils/localstorage";

axios.defaults.baseURL = "https://reqres.in/api";
const Modal: FC<{
  isOpen: boolean;
  userId: string;
  setUser: any;
  close: Function;
}> = props => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [avatar, setAvatar] = useState<string>("");
  let { isOpen, userId, setUser, close } = props;
  const newUser: IUser = {
    id: Number(userId),
    first_name: firstName,
    last_name: lastName,
    email: email,
    avatar: avatar,
  };
  const handleDataChange = () => {
    setUser(newUser);
    const userData = getFromStorage("userdata");
    if (userId == userData.id) {
      const newUserData = {
        ...newUser,
        password: userData.password,
        token: userData.token,
      };
      addToStorage("userdata", JSON.stringify(newUserData));
    }
  };

  const EditUserData = () => {
    axios
      .patch(`/users/${userId}`, {
        firstName: firstName,
        lastName: lastName,
        email: email,
        avatar: avatar,
      })
      .then(response => {
        console.log(response);
        if ((response.status = 200)) {
          handleDataChange();
        }
      });
  };

  return (
    <div className={classNames(s.modal__background, { [s.open]: isOpen })} onClick={() => close()} >
      <div className={`${s.modal__window} flex`} onClick={(e) => e.stopPropagation()}>
        <h2 className={s.title}>Изменить данные</h2>
        <input
          type="text"
          className={s.input}
          placeholder="Введите новое имя"
          onChange={e => setFirstName(e.target.value)}
        />
        <input
          type="text"
          className={s.input}
          placeholder="Введите новую фамилию"
          onChange={e => setLastName(e.target.value)}
        />
        <input
          type="text"
          className={s.input}
          placeholder="Введите новый Email"
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="text"
          className={s.input}
          placeholder="Укажите ссылку на новый аватар"
          onChange={e => setAvatar(e.target.value)}
        />
        <Button
          onClick={() => {
            EditUserData();
            close();
          }}
          buttonText="Изменить данные"></Button>
      </div>
    </div>
  );
};

export default Modal;
