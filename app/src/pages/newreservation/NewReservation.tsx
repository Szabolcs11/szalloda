import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Select, { SingleValue } from "react-select";
import { ENDPOINTS } from "../../constans";
import { showToast } from "../../toast";
import { Guest, ReservationFormData, Room } from "../../types";
import { NewReservationSchema } from "./schemas";

function NewReservation() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [guests, setGuests] = useState<Guest[]>([]);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ReservationFormData>({
    resolver: yupResolver(NewReservationSchema),
  });

  const fetchRoomTypes = async () => {
    const res = await axios.get(ENDPOINTS.ROOMS, {
      withCredentials: true,
    });
    if (res.data.success) {
      console.log(res.data);
      setRooms(res.data.rooms);
    }
  };

  const fetchGuests = async () => {
    const res = await axios.get(ENDPOINTS.GUESTS, {
      withCredentials: true,
    });
    if (res.data.success) {
      console.log(res.data);
      setGuests(res.data.guests);
    }
  };

  const handleAddReservation = (data: ReservationFormData) => {
    const days = Math.floor(
      (new Date(data.EndDate).getTime() - new Date(data.StartDate).getTime()) / (1000 * 60 * 60 * 24)
    );
    const selectedRoom = rooms.find((e) => e.RoomId === data.RoomId);
    axios
      .post(ENDPOINTS.ADD_RESERVATION, {
        guestId: data.GuestId,
        roomId: data.RoomId,
        startDate: data.StartDate,
        endDate: data.EndDate,
        price: days * selectedRoom!.DailyPrice,
      })
      .then((res) => {
        if (res.data.success) {
          console.log(res.data);
          showToast("Success", res.data.message);
        } else {
          showToast("Error", res.data.message);
        }
      });
  };

  useEffect(() => {
    fetchRoomTypes();
    fetchGuests();
  }, []);

  const selectguests = [
    ...(guests.length > 0
      ? guests.map((e: Guest) => ({
          value: e.id,
          label: e.FullName + " (" + e.Email + ")",
        }))
      : []),
  ];

  const selectrooms = [
    ...(rooms.length > 0
      ? rooms.map((e: Room) => ({
          value: e.RoomId,
          label: e.RoomNumber + " " + e.Name + " (" + e.NumberOfBeds + " Ágy)" + " [" + e.DailyPrice + "Ft / éjszaka]",
        }))
      : []),
  ];

  return (
    <div>
      <h1 className="title">New Reservation</h1>
      <div className="new-room-container">
        <form className="new-room-form" onSubmit={handleSubmit(handleAddReservation)}>
          <div className="input-container">
            <Controller
              name="GuestId"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Select
                  styles={customStyles}
                  //@ts-ignore
                  defaultValue={{ label: "Válasz vendéget", value: "0" }}
                  value={selectguests.find((c) => c.value === value)}
                  onChange={(val: SingleValue<{ value: number; label: string }>) => {
                    if (val!.value === 0) {
                      return;
                    }
                    onChange(val!.value);
                  }}
                  id="rommTypeSelect"
                  options={selectguests}
                />
              )}
            />
            <div className="loginerrmsg">{errors.GuestId?.message}</div>
          </div>
          <div className="input-container">
            {/* <RoomTypesSelect /> */}
            <Controller
              name="RoomId"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Select
                  styles={customStyles}
                  //@ts-ignore
                  defaultValue={{ label: "Válasz szoba típust", value: "0" }}
                  value={selectrooms.find((c) => c.value === value)}
                  onChange={(val: SingleValue<{ value: number; label: string }>) => {
                    if (val!.value === 0) {
                      return;
                    }
                    onChange(val!.value);
                  }}
                  id="rommTypeSelect"
                  options={selectrooms}
                />
              )}
            />
            <div className="loginerrmsg">{errors.RoomId?.message}</div>
          </div>
          <div className="input-container">
            <Controller
              name="StartDate"
              control={control}
              render={({ field }) => <input {...field} type="date" placeholder="Start Date" />}
            />
            <div className="loginerrmsg">{errors.StartDate?.message}</div>
          </div>
          <div className="input-container">
            <Controller
              name="EndDate"
              control={control}
              render={({ field }) => <input {...field} type="date" placeholder="End Date" />}
            />
          </div>
          <div>
            <h3>Ár: {errors.EndDate?.message}</h3>
          </div>
          <div className="input-container actionBtn">
            <input className="input-form-btn" type="submit" value="Hozááadás" />
          </div>
        </form>
      </div>
    </div>
  );
}

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

export default NewReservation;
