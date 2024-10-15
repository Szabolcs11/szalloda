import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import Select, { SingleValue } from "react-select";
import Loader from "../../components/Loader";
import { ENDPOINTS, formatDataForDatePicker, formatDateString } from "../../constans";
import { navigator } from "../../navigator";
import { Paths } from "../../navigator/routes";
import { showToast } from "../../toast";
import { Guest, ReservationFormData, Reservation as ReservationType, Room } from "../../types";
import { NewReservationSchema } from "../newreservation/schemas";

function Reservation() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [currentReservation, setCurrentReservation] = useState<ReservationType>();
  const [isEditing, setIsEditing] = useState(false);

  const [rooms, setRooms] = useState<Room[]>([]);
  const [guests, setGuests] = useState<Guest[]>([]);

  const handleDeleteReservation = () => {
    axios.post(ENDPOINTS.DELETE_RESERVATION, { reservationId: currentReservation?.ReservationId }).then((res) => {
      if (res.data.success) {
        navigator(Paths.Reservations);
        showToast("Success", res.data.message);
      } else {
        showToast("Error", res.data.message);
      }
    });
  };

  const fetchCurrentReservation = async () => {
    setIsLoading(true);
    axios.get(ENDPOINTS.RESERVATION + id).then((res) => {
      if (res.data.success) {
        setCurrentReservation(res.data.reservation);
        setIsLoading(false);
      } else {
        console.log(res.data);
      }
    });
  };

  useEffect(() => {
    fetchCurrentReservation();
  }, []);

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
      setRooms(res.data.rooms);
    }
  };

  const fetchGuests = async () => {
    const res = await axios.get(ENDPOINTS.GUESTS, {
      withCredentials: true,
    });
    if (res.data.success) {
      setGuests(res.data.guests);
    }
  };

  const handleEditReservation = (data: ReservationFormData) => {
    const days = Math.floor(
      (new Date(data.EndDate).getTime() - new Date(data.StartDate).getTime()) / (1000 * 60 * 60 * 24)
    );
    const selectedRoom = rooms.find((e) => e.RoomId === data.RoomId);
    axios
      .post(ENDPOINTS.EDIT_RESERVATION, {
        reservationId: currentReservation!.ReservationId,
        guestId: data.GuestId,
        roomId: data.RoomId,
        startDate: data.StartDate,
        endDate: data.EndDate,
        price: days * selectedRoom!.DailyPrice,
      })
      .then((res) => {
        if (res.data.success) {
          showToast("Success", res.data.message);
          setIsEditing(false);
          fetchCurrentReservation();
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

  if (isLoading) {
    return <Loader />;
  }
  return (
    <div style={{ padding: "12px" }}>
      {isEditing ? (
        <div className="new-room-container">
          <form className="new-room-form" onSubmit={handleSubmit(handleEditReservation)}>
            <div className="input-container">
              <Controller
                name="GuestId"
                control={control}
                defaultValue={currentReservation!.GuestId}
                render={({ field: { onChange, value } }) => (
                  <Select
                    styles={customStyles}
                    value={selectguests.find((c) => c.value == value || c.value == currentReservation!.GuestId)}
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
              <Controller
                name="RoomId"
                control={control}
                defaultValue={currentReservation!.RoomId}
                render={({ field: { onChange, value } }) => (
                  <Select
                    styles={customStyles}
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
                defaultValue={formatDataForDatePicker(currentReservation!.StartDate)}
                render={({ field }) => <input {...field} type="date" placeholder="Start Date" />}
              />
              <div className="loginerrmsg">{errors.StartDate?.message}</div>
            </div>
            <div className="input-container">
              <Controller
                name="EndDate"
                control={control}
                defaultValue={formatDataForDatePicker(currentReservation!.EndDate)}
                render={({ field }) => <input {...field} type="date" placeholder="End Date" />}
              />
            </div>
            <div>{/* <h3>Ár: {errors.EndDate?.message}</h3> */}</div>
            <div className="input-container actionBtn">
              <input className="input-form-btn" type="submit" value="Módosítás" />
            </div>
          </form>
        </div>
      ) : (
        <>
          <div>
            <p>Szoba száma: {currentReservation?.RoomNumber}</p>
            <p>Szoba típusa: {currentReservation?.RoomTypeName}</p>
            <p>Szoba Leírás: {currentReservation?.Description}</p>
            <p>Szoba Ágyak száma: {currentReservation?.NumberOfBeds}</p>
            <p>Szoba ár / éjszaka: {currentReservation?.DailyPrice}</p>
            <p>Vendég neve: {currentReservation?.GuestName + " (" + currentReservation?.GuestId + ")"}</p>
            <p>
              Foglalás időtartama:{" "}
              {formatDateString(currentReservation!.StartDate) + " - " + formatDateString(currentReservation!.EndDate)}
            </p>
          </div>
          <div className="roomoperations">
            <p>Műveletek</p>
            <div className="roomoperations-container">
              <button
                onClick={() => {
                  handleDeleteReservation();
                }}
                className="operation-btn deleteBtn"
              >
                Törlés
              </button>
              <button
                onClick={() => {
                  setIsEditing((prev) => !prev);
                }}
                className="operation-btn modifyBtn"
              >
                Módosítás
              </button>
            </div>
          </div>
        </>
      )}
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

export default Reservation;
