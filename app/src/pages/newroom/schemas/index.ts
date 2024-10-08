import * as yup from "yup";

export const newRoomSchema = yup.object().shape({
  roomNumber: yup.string().required("RoomNumber is required!"),
  roomType: yup.number().required("RoomType is required!"),
});
