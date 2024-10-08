import axios from "axios";
import { useEffect, useState } from "react";
import { ENDPOINTS } from "../../constans";
import { Room } from "../../types";
import { navigator } from "../../navigator";

function Rooms() {
  document.title = "Rooms";
  const [rooms, setRooms] = useState<Room[]>([]);
  const fetchRooms = () => {
    axios.get(ENDPOINTS.ROOMS).then((res) => {
      console.log(res.data);
      setRooms(res.data.rooms);
    });
  };
  useEffect(() => {
    fetchRooms();
  }, []);
  return (
    <div>
      <h1 className="title">Rooms</h1>
      <div className="rooms">
        {rooms.map((room) => (
          <div key={room.RoomId} className="room" onClick={() => navigator(`/room/${room.RoomId}`)}>
            <p>{"Szobaszám: " + room.RoomNumber}</p>
            <p>{"Szobatípus: " + room.Name}</p>
            <p>{room.NumberOfBeds + " Ágyas"}</p>
            <p>{room.Description}</p>
            <p>{room.DailyPrice + " € /  Éjszaka"}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Rooms;
