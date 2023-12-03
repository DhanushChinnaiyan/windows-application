import "./App.css";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Home from "./Components/Home";
import UserLogin from "./Components/UserEntry/UserLogin";
import UserSignup from "./Components/UserEntry/UserSignup";
import { decodeToken } from "react-jwt";
import { useEffect } from "react";
import AppDetails from "./Components/AppHandling/App_Details";
import AddApp from "./Components/AppHandling/AddApp";
import AllApps from "./Components/AppHandling/All_Apps";

function App() {
  const navigate = useNavigate();
  useEffect(() => {
    const userToken = localStorage.getItem("userToken");

    if (!userToken) {
      navigate("/login", { replace: true });
    } else {
      try {
        const user = decodeToken(userToken);

        if(!user.id){
          localStorage.removeItem("userToken");
          navigate("/login", { replace: true }); 
        }

      } catch (error) {

        console.error("Error decoding token:", error);
        navigate("/login", { replace: true }); 
      }
    }
  }, [])
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/app/:id" element={<AppDetails/>}/>
      <Route exact path="/apps/Details" element={<AllApps/>} />
      <Route exact path="/app/add" element={<AddApp/>} />
      <Route exact path="/signup" element={<UserSignup />} />
      <Route exact path="/login" element={<UserLogin />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
