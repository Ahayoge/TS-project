import { FC, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios, { AxiosResponse } from "axios";
import { IUser } from "../Types/IUser";
import { getFromStorage } from "../Utils/localstorage";
import s from "../css/singleuserpage.module.css";
import Button from "../Components/Buttons";
import Modal from "../Components/Modal";
import loader from '../Img/tube-spinner.svg'

axios.defaults.baseURL = "https://reqres.in/api";

const UserPage: FC = () => {
  const { id } = useParams();
  const [isOpen, setOpen] = useState(false);

  const toggleModal = () => {
    setOpen(!isOpen);
  };

  const [user, setUser] = useState<IUser>();
  useEffect(() => {
    let userData = getFromStorage("userdata");
    if (userData.id == id) {
      setUser(userData);
    } else {
      axios.get(`/users/${id}`).then((response: AxiosResponse) => {
        setUser(response.data.data);
      });
    }
  }, [id]);

  if (!user) return <div className={`${s.container} flex`}>
    <img className={s.loader} src={loader} alt="" />
  </div>;
  return (
    <div className={`${s.container} flex`}>
      {id && <Modal isOpen={isOpen} close={toggleModal} userId={id} setUser={setUser} />}

      <div className={s.userinfo}>
        <Link to={"/users"}>← Вернуться назад</Link>
        <div className={`${s.content__wrap} flex`}>
          <img
            className={s.avatar}
            src={user.avatar}
            alt={`${user.first_name} ${user.last_name}'s avatar`}
          />
          <div className={`${s.text__column} flex`}>
            <h2 className={s.title}>Имя: {user.first_name}</h2>
            <h2 className={s.title}>Фамилия: {user.last_name}</h2>
            <h2 className={s.title}>Email: {user.email}</h2>
            <Button onClick={toggleModal} buttonText="Изменить данные"></Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
