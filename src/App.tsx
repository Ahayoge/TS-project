import { Routes, Route, Navigate } from "react-router-dom";
import UsersPage from "./Pages/UsersPage";
import RegisterPage from "./Pages/RegisterPage";
import LoginPage from "./Pages/LoginPage";
import UserPage from "./Pages/SingleUserPage";
import NotFoundPage from "./Pages/NotFoundPage";
import "./css/reset.css";
import "./css/basic.css";

const App = () => {
  
  return (
    <>
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/" element={<Navigate to="/users" replace />} />
        <Route path="/user/:id" element={<UserPage></UserPage>} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};

export default App;
