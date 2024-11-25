import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../../components/Loader";
import { ENDPOINTS } from "../../constans";
import { Stats, User } from "../../types";

function Home() {
  document.title = "Home";
  const [stats, setStats] = useState<Stats>();
  const [user, setUser] = useState<User>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get(ENDPOINTS.DASHBOARD).then((res) => {
      if (res.data.success) {
        setStats(res.data.stats);
        setUser(res.data.user);
        setIsLoading(false);
      }
    });
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <div>
        <h1>Home</h1>
        <h1>Szia {user?.FullName}</h1>
      </div>
      <div>
        <h2>Statisztika</h2>
        <p>Összes vendég: {stats?.guests}</p>
        <p>Összes szoba: {stats?.rooms}</p>
        <p>Összes foglalás: {stats?.reservations}</p>
      </div>
      <div style={{ marginTop: 24 }}>
        <table>
          <tr>
            <td>Vendég neve</td>
            <td>Foglalásokkor elköltött pénz</td>
          </tr>
          {stats?.guestsSpentMoney.map((user) => (
            <tr key={user.FullName}>
              <td>{user.FullName}</td>
              <td>{user.TotalPaid}</td>
            </tr>
          ))}
        </table>
      </div>
      <div style={{ marginTop: 24 }}>
        <table>
          <tr>
            <td>Vendég neve</td>
            <td>Foglalások száma</td>
          </tr>
          {stats?.guestReservationStats.map((user) => (
            <tr key={user.FullName}>
              <td>{user.FullName}</td>
              <td>{user.ReservationCount}</td>
            </tr>
          ))}
        </table>
      </div>
      <div style={{ marginTop: 24 }}>
        <table>
          <tr>
            <td>Szoba típus</td>
            <td>Foglalások száma</td>
            <td>Átlagár</td>
          </tr>
          {stats?.roomtypeStats.map((roomtype) => (
            <tr key={roomtype.RoomType}>
              <td>{roomtype.RoomType}</td>
              <td>{roomtype.ReservationCount}</td>
              <td>{roomtype.AveragePrice}</td>
            </tr>
          ))}
        </table>
      </div>
      <div style={{ marginTop: 24 }}>
        <h1 style={{ fontWeight: "600", fontSize: 16 }}>
          Vendégek, akik foglaltak egy szobát, melynek napiára drágább mint az átlag
        </h1>
        <table>
          <tr>
            <td>Teljes név</td>
            <td>Email</td>
          </tr>
          {stats?.guestsPayMoreThanAvg.map((guests) => (
            <tr key={guests.FullName}>
              <td>{guests.FullName}</td>
              <td>{guests.Email}</td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
}

export default Home;
