import { useNavigate } from "react-router-dom";
import s from "../css/usercard.module.css";
import Button from "./Buttons";
import { IUser } from "../Types/IUser";

interface UserCardProps {
  data: IUser;
}

const UserCard = ({data}: UserCardProps) => {
  const navigate = useNavigate();
  return (
    <li className={`${s.user__card} flex`}>
      <img
        className={s.user__avatar}
        src={data.avatar}
        alt={data.first_name}
      />
      <div className={`${s.user__content} flex`}>
        <div className={s.user__text}>
          <h2 className={s.user__name}>
            {data.first_name} {data.last_name}
          </h2>
          <p className={s.user__email}>{data.email}</p>
        </div>
        <Button
          buttonText={"Подробнее"}
          onClick={() => {
            navigate(`/user/${data.id}`);
          }}></Button>
      </div>
    </li>
  );
};

export default UserCard;
