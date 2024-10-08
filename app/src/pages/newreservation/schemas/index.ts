import * as yup from "yup";

export const NewReservationSchema = yup.object().shape({
  GuestId: yup.number().required("GuestId is required!"),
  RoomId: yup.number().required("RoomId is required!"),
  StartDate: yup.string().required("StartDate is required!"),
  EndDate: yup.string().required("EndDate is required!"),
});
