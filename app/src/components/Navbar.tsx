import { navigator } from "../navigator";
import { Paths } from "../navigator/routes";

function Navbar() {
  return (
    <div>
      <div className="navbarroutes">
        <div onClick={() => navigator(Paths.Home)}>Főoldal</div>
        <div className="dropdown">
          <button className="dropbtn">Szobák</button>
          <div className="dropdown-content">
            <div onClick={() => navigator(Paths.Rooms)}>Szobák</div>
            <div onClick={() => navigator(Paths.NewRoom)}>Új szoba</div>
          </div>
        </div>
        <div className="dropdown">
          <button className="dropbtn">Vendégek</button>
          <div className="dropdown-content">
            <div onClick={() => navigator(Paths.Guests)}>Vendégek</div>
            <div onClick={() => navigator(Paths.NewGuest)}>Új Vendégek</div>
          </div>
        </div>
        <div className="dropdown">
          <button className="dropbtn">Foglalások</button>
          <div className="dropdown-content">
            <div onClick={() => navigator(Paths.Reservations)}>Foglalások</div>
            <div onClick={() => navigator(Paths.NewReservation)}>Új Foglalások</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
