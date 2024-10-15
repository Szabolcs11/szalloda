import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { ENDPOINTS } from "../constans";
import { Paths } from "./routes";
import Login from "../pages/auth/Login";
import Home from "../pages/home/Home";
import Loader from "../components/Loader";
import Rooms from "../pages/rooms/Rooms";
import NewRoom from "../pages/newroom/NewRoom";
import SiteLayout from "../components/SiteLayout";
import NewGuest from "../pages/newguest/NewGuest";
import NewReservation from "../pages/newreservation/NewReservation";
import Room from "../pages/room/RoomPage";
import Guests from "../pages/guests/Guests";
import Guest from "../pages/guest/Guest";

export let navigator: any;
export let loginUser: (user: any) => void;

function Index() {
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(true);
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
        setIsLoading(false);
      });
    };
    fetchUser();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

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
          <Route element={<SiteLayout />}>
            <Route path={Paths.Home} element={<Home />} />
            <Route path={Paths.Rooms} element={<Rooms />} />
            <Route path={Paths.Room} element={<Room />} />
            <Route path={Paths.NewRoom} element={<NewRoom />} />
            <Route path={Paths.NewGuest} element={<NewGuest />} />
            <Route path={Paths.NewReservation} element={<NewReservation />} />
            <Route path={Paths.Guests} element={<Guests />} />
            <Route path={Paths.Guest} element={<Guest />} />
          </Route>
        </>
      )}
      <Route path="*" element={<Navigate to={Paths.Login} />} />
    </Routes>
  );
}

export default Index;
