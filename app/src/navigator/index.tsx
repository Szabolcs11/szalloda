import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { ENDPOINTS } from "../constans";
import { Paths } from "./routes";
import Login from "../pages/auth/Login";
import Home from "../pages/home/Home";

export let navigator: any;
export let loginUser: (user: any) => void;

function Index() {
  const [user, setUser] = useState(true);
  navigator = useNavigate();

  loginUser = (user) => {
    setUser(user);
  };

  useEffect(() => {
    const fetchUser = () => {
      axios.post(ENDPOINTS.AUTHENTICATE, {}, { withCredentials: true }).then((res) => {
        if (res.data.success) {
          setUser(res.data.user);
        }
      });
    };
    fetchUser();
  }, []);

  return (
    <Routes>
      {!user ? (
        <>
          <Route path="/auth/" element={<Navigate to={Paths.Login} />} />
          <Route path="auth/login" element={<Login />} />
        </>
      ) : (
        <>
          <Route path="/auth/*" element={<Navigate to={Paths.Home} />} />
          <Route path={Paths.Home} element={<Home />} />
          {/* <Route element={<HomeLayout />}> */}
          {/* <Route path={Paths.Rooms} element={<Rooms />} /> */}
          {/* </Route> */}
        </>
      )}
      <Route path="*" element={<Navigate to={Paths.Login} />} />
    </Routes>
  );
}

export default Index;
