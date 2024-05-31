import s from "../css/notfoundpage.module.css";
import Button from "../Components/Buttons";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <div className={`${s.container} flex`}>
      <div className={`${s.content} flex`}>
        <h1 className={s.title}>Страница не найдена :(</h1>
        <Button
          buttonText={"Вернуться на главную"}
          onClick={() => {
            navigate("/users");
          }}></Button>
      </div>
    </div>
  );
};

export default NotFoundPage;
