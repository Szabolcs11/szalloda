import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { Controller, useForm } from "react-hook-form";
import { ENDPOINTS } from "../../constans";
import { showToast } from "../../toast";
import { NewGuestFormData } from "../../types";
import { newGuestRoomSchema } from "./schemas";

function NewGuest() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<NewGuestFormData>({
    resolver: yupResolver(newGuestRoomSchema),
  });

  const handleAddGuest = ({ Name, Date, Email, Phone }: NewGuestFormData) => {
    axios
      .post(ENDPOINTS.ADD_GUEST, {
        FullName: Name,
        Email: Email,
        Phone: Phone,
        BirthDate: Date,
      })
      .then((res) => {
        if (res.data.success) {
          showToast("Success", res.data.message);
        } else {
          showToast("Error", res.data.message);
        }
      });
  };
  return (
    <div>
      <h1 className="title">New Room</h1>
      <div className="new-room-container">
        <form style={{ width: "80%" }} onSubmit={handleSubmit(handleAddGuest)}>
          <div className="input-container">
            <Controller
              name="Name"
              control={control}
              defaultValue=""
              render={({ field }) => <input {...field} placeholder="Name" />}
            />
            <div className="loginerrmsg">{errors.Name?.message}</div>
          </div>
          <div className="input-container">
            <Controller
              name="Date"
              control={control}
              defaultValue=""
              render={({ field }) => <input {...field} type="date" placeholder="Date" />}
            />
            <div className="loginerrmsg">{errors.Date?.message}</div>
          </div>
          <div className="input-container">
            <Controller
              name="Email"
              control={control}
              defaultValue=""
              render={({ field }) => <input {...field} placeholder="Email" />}
            />
            <div className="loginerrmsg">{errors.Email?.message}</div>
          </div>
          <div className="input-container">
            <Controller
              name="Phone"
              control={control}
              defaultValue=""
              render={({ field }) => <input {...field} placeholder="Phone" />}
            />
            <div className="loginerrmsg">{errors.Phone?.message}</div>
          </div>
          <div className="input-container actionBtn">
            <input className="input-form-btn" type="submit" value="Hozááadás" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewGuest;
