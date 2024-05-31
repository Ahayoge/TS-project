import { useNavigate } from "react-router-dom";
import "../css/usercard.css";
import Button from "./Buttons";

const UserCard = (props: any) => {
  const navigate = useNavigate();
  return (
    <li className="user__card flex">
      <img className="user__avatar" src={props.data.avatar} alt={props.data.firstName} />
      <div className="user__content-area flex">
        <div className="user__text">
          <h2 className="user__name">
            {props.data.first_name} {props.data.last_name}
          </h2>
          <p className="user__email">{props.data.email}</p>
        </div>
        <Button
          buttonText={"Подробнее"}
          onClick={() => {
            navigate(`/user/${props.data.id}`);
          }}></Button>
      </div>
    </li>
  );
};

export default UserCard;
