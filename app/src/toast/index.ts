import { toast } from "react-toastify";

const toastTypes = {
  Success: toast.success,
  Error: toast.error,
  Warning: toast.warning,
  Info: toast.info,
};

type ToastType = "Success" | "Error" | "Warning" | "Info";

export const showToast = (type: ToastType, message: string) => {
  const toaster = toastTypes[type];
  toaster(message);
};
