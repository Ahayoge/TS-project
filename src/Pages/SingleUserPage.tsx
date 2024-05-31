import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios, { AxiosResponse } from "axios";
import { User } from "../Components/UserList";
import { getFromStorage } from "../Utils/localstorage";
axios.defaults.baseURL = "https://reqres.in/api";

const UserPage = () => {
  const { id } = useParams();

  const [user, setUser] = useState<User>();
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
  if (!user) return <h3>Загрузка...</h3>;
  return (
    <div className="container">
      <h1>{user.first_name}</h1>
      <img src={user.avatar} alt="" />
    </div>
  );
};

export default UserPage;
