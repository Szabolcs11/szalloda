import { useEffect, useState } from "react";
import Select, { SingleValue } from "react-select";
import { ENDPOINTS } from "../../../constans";
import axios from "axios";

function RoomTypesSelect() {
  const [roomTypes, setRoomTypes] = useState([]);
  const selectValueChange = (value: SingleValue<{ label: string; value: string }>) => {
    console.log(value);
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

  useEffect(() => {
    fetchRoomTypes();
  }, []);

  return (
    <div style={{ width: "100%", marginBottom: 12 }}>
      <Select
        defaultValue={{ label: "Válasz szoba típust", value: "0" }}
        onChange={selectValueChange}
        options={roomTypes.map((e: any) => ({
          value: e.id,
          label: e.Name,
        }))}
        className="mezo"
        id="jatekk"
        placeholder={"Válassz szobatípust"}
        styles={customStyles}
      />
    </div>
  );
}

const customStyles = {
  singleValue: (provided: any) => ({
    ...provided,
    height: "100%",
    color: "#08699B",
    paddingTop: "3px",
    // width: "100%",
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

export default RoomTypesSelect;
