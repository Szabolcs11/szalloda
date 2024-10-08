import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ENDPOINTS } from "../../constans";
import { Room } from "../../types";
import { showToast } from "../../toast";
import { navigator } from "../../navigator";
import { Paths } from "../../navigator/routes";

function RoomPage() {
  const { id } = useParams();
  const [currentRoom, setCurrentRoom] = useState<Room>();

  if (!id) {
    return <p>Room not found</p>;
  }

  const fechRoom = () => {
    axios.get(ENDPOINTS.ROOM + id).then((res) => {
      console.log(res.data);
      if (res.data.success) {
        setCurrentRoom(res.data.room);
      } else {
        navigator(Paths.Rooms);
      }
    });
  };

  const handleDeleteRoom = () => {
    axios
      .post(ENDPOINTS.DELETE_ROOM, {
        roomId: currentRoom?.RoomId,
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.success) {
          showToast("Success", "Room deleted successfully");
          navigator(Paths.Rooms);
        } else {
          showToast("Error", res.data.message);
        }
      });
  };

  useEffect(() => {
    fechRoom();
  }, []);

  return (
    <div style={{ padding: "12px" }}>
      <div>
        <p>Szoba azonosító: {currentRoom?.RoomId}</p>
        <p>Szobaszám: {currentRoom?.RoomNumber}</p>
        <p>Típus: {currentRoom?.Name}</p>
        <p>Ágyak száma: {currentRoom?.NumberOfBeds}</p>
        <p>Leírás: {currentRoom?.Description}</p>
        <p>Ár / Éjszaka: {currentRoom?.DailyPrice}</p>
      </div>
      <div className="roomoperations">
        <p>Műveletek</p>
        <div className="roomoperations-container">
          <button
            onClick={() => {
              handleDeleteRoom();
            }}
            className="operation-btn deleteBtn"
          >
            Törlés
          </button>
          <button className="operation-btn modifyBtn">Módosítás</button>
        </div>
      </div>
    </div>
  );
}

export default RoomPage;
