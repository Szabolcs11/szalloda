import { navigator } from "../navigator";
import { Paths } from "../navigator/routes";

function Navbar() {
  return (
    <div>
      <div className="navbarroutes">
        <div onClick={() => navigator(Paths.Home)}>Home</div>
        <div onClick={() => navigator(Paths.Rooms)}>Rooms</div>
        <div onClick={() => navigator(Paths.NewRoom)}>New Room</div>
        <div onClick={() => navigator(Paths.Guests)}>Guests</div>
        <div onClick={() => navigator(Paths.NewGuest)}>New Guest</div>
        <div onClick={() => navigator(Paths.NewReservation)}>New Reservation</div>
      </div>
    </div>
  );
}

export default Navbar;
