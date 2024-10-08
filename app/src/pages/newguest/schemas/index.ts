import * as yup from "yup";

export const newGuestRoomSchema = yup.object().shape({
  Name: yup.string().required("Name is required!"),
  Date: yup.string().required("Date is required!"),
  Email: yup.string().required("Email is required!"),
  Phone: yup.string().required("Phone is required!"),
});
