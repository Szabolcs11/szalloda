import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import Select, { SingleValue } from "react-select";
import { ENDPOINTS } from "../../constans";
import { navigator } from "../../navigator";
import { Paths } from "../../navigator/routes";
import { showToast } from "../../toast";
import { NewRoomFormData, Room } from "../../types";
import { newRoomSchema } from "../newroom/schemas";

function RoomPage() {
  const { id } = useParams();
  const [currentRoom, setCurrentRoom] = useState<Room>();
  const [isEditing, setIsEditing] = useState(false);
  const [roomTypes, setRoomTypes] = useState([]);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<NewRoomFormData>({
    resolver: yupResolver(newRoomSchema),
  });

  const fetchRoom = () => {
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

  const fetchRoomTypes = async () => {
    const res = await axios.get(ENDPOINTS.ROOM_TYPES, {
      withCredentials: true,
    });
    if (res.data.success) {
      console.log(res.data);
      setRoomTypes(res.data.roomtypes);
    }
  };

  const handleEditRoom = ({ roomNumber, roomType }: NewRoomFormData) => {
    axios
      .post(ENDPOINTS.EDIT_ROOM, {
        roomId: currentRoom?.RoomId,
        roomNumber: roomNumber,
        roomType: roomType,
      })
      .then((res) => {
        if (res.data.success) {
          showToast("Success", res.data.message);
          fetchRoom();
          setIsEditing(false);
        } else {
          showToast("Error", res.data.message);
          setIsEditing(false);
        }
      });
  };

  useEffect(() => {
    fetchRoom();
    fetchRoomTypes();
  }, []);

  const options = [
    ...(roomTypes.length > 0
      ? roomTypes.map((e: any) => ({
          value: e.id,
          label: e.Name,
        }))
      : []),
  ];

  if (!id) {
    return <p>Room not found</p>;
  }

  return (
    <div style={{ padding: "12px" }}>
      {isEditing ? (
        <div style={{ width: "100%", display: "flex", alignItems: "center", flexDirection: "column" }}>
          <div style={{ width: "50%", display: "flex", flexDirection: "column" }}>
            <h1 className="title">Edit room</h1>
            <form onSubmit={handleSubmit(handleEditRoom)}>
              <div className="input-container">
                <Controller
                  name="roomNumber"
                  control={control}
                  defaultValue={String(currentRoom!.RoomNumber)}
                  render={({ field }) => <input disabled {...field} placeholder="Szobaszám" />}
                />
                <div className="loginerrmsg">{errors.roomNumber?.message}</div>
              </div>
              <div className="input-container">
                {/* <RoomTypesSelect /> */}
                <Controller
                  name="roomType"
                  control={control}
                  //@ts-ignore
                  defaultValue={currentRoom?.RoomTypeId}
                  render={({ field: { onChange, value } }) => (
                    <Select
                      styles={customStyles}
                      defaultValue={{ label: "Válasz szoba típust", value: "0" }}
                      value={options.find((c) => c.value === value)}
                      onChange={(val: SingleValue<{ value: number; label: string }>) => {
                        if (val!.value === 0) {
                          return;
                        }
                        onChange(val!.value);
                      }}
                      id="rommTypeSelect"
                      options={options}
                    />
                  )}
                />
                <div className="loginerrmsg">{errors.roomType?.message}</div>
              </div>
              <div className="input-container actionBtn">
                <input className="input-form-btn" type="submit" value="Módosítás" />
                <input
                  className="input-form-btn"
                  style={{ textAlign: "center" }}
                  type=""
                  value="Cancel edit room"
                  onClick={() => setIsEditing(false)}
                />
              </div>
            </form>
          </div>
        </div>
      ) : (
        <>
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
              <button className="operation-btn modifyBtn" onClick={() => setIsEditing((prev) => !prev)}>
                Módosítás
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default RoomPage;

const customStyles = {
  singleValue: (provided: any) => ({
    ...provided,
    height: "100%",
    color: "#08699B",
    paddingTop: "3px",
    width: "100%",
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isSelected ? "#302936" : "white",
    "&:hover": {
      backgroundColor: "#302936",
      color: "white",
    },
  }),
};
