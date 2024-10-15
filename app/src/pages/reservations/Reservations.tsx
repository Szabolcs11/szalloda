import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../../components/Loader";
import { ENDPOINTS, formatDateString } from "../../constans";
import { Reservation as ReservationType } from "../../types";
import { navigator } from "../../navigator";

function Reservations() {
  const [isLoading, setIsLoading] = useState(true);
  const [reservations, setReservations] = useState<ReservationType[]>([]);
  useEffect(() => {
    axios.get(ENDPOINTS.RESERVATIONS).then((res) => {
      if (res.data.success) {
        setReservations(res.data.reservations);
        setIsLoading(false);
      } else {
        console.log(res.data);
      }
    });
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <h1 className="title">Foglalások</h1>
      <div className="rooms">
        {reservations.map((e) => {
          return (
            <div key={e.ReservationId} className="room" onClick={() => navigator(`/reservation/${e.ReservationId}`)}>
              <p style={{ fontSize: 18, fontWeight: "500" }}>{e.RoomNumber}</p>
              <p>{"Szoba típus: " + e.RoomTypeName}</p>
              <p style={{ fontSize: 18, fontWeight: "500" }}>{e.GuestName}</p>
              <p>{formatDateString(e.StartDate) + " - " + formatDateString(e.EndDate)}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Reservations;
