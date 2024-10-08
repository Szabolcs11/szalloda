import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Select, { SingleValue } from "react-select";
import { ENDPOINTS } from "../../constans";
import { showToast } from "../../toast";
import { NewRoomFormData } from "../../types";
import { newRoomSchema } from "./schemas";

function NewRoom() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<NewRoomFormData>({
    resolver: yupResolver(newRoomSchema),
  });

  const [roomTypes, setRoomTypes] = useState([]);

  const fetchRoomTypes = async () => {
    const res = await axios.get(ENDPOINTS.ROOM_TYPES, {
      withCredentials: true,
    });
    if (res.data.success) {
      console.log(res.data);
      setRoomTypes(res.data.roomtypes);
    }
  };

  const handleAddRoom = ({ roomNumber, roomType }: NewRoomFormData) => {
    axios
      .post(ENDPOINTS.ADD_ROOM, {
        roomNumber: roomNumber,
        roomType: roomType,
      })
      .then((res) => {
        if (res.data.success) {
          showToast("Success", res.data.message);
        } else {
          showToast("Error", res.data.message);
        }
      });
  };

  useEffect(() => {
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

  return (
    <div>
      <h1 className="title">New Room</h1>
      <div className="new-room-container">
        <form className="new-room-form" onSubmit={handleSubmit(handleAddRoom)}>
          <div className="input-container">
            <Controller
              name="roomNumber"
              control={control}
              defaultValue=""
              render={({ field }) => <input {...field} placeholder="Szobaszám" />}
            />
            <div className="loginerrmsg">{errors.roomNumber?.message}</div>
          </div>
          <div className="input-container">
            {/* <RoomTypesSelect /> */}
            <Controller
              name="roomType"
              control={control}
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

export default NewRoom;
