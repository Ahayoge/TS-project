import { useEffect } from "react";
import { getFromStorage } from "./localstorage";
import { useNavigate } from "react-router-dom";

const checkIfLogged = () => {
  let isLogged = getFromStorage("isLogged");
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLogged) navigate("/login");
  }, []);
};

const checkIfRegistered = (email: string) => {
  let userData = getFromStorage("userdata");
  if (!userData || userData.email != email) {
    return true;
  }
};

const checkIfAlreadyRegistered = (email: string) => {
  let userData = getFromStorage("userdata");
  if (userData && userData.email == email) {
    return true;
  }
};

export { checkIfLogged, checkIfRegistered, checkIfAlreadyRegistered };
