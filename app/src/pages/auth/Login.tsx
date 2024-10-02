import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { Controller, useForm } from "react-hook-form";
import { ENDPOINTS } from "../../constans";
import { showToast } from "../../toast";
import { loginSchema } from "./schemas";
import { LoginFormData } from "../../types";
import { loginUser } from "../../navigator";

function Login() {
  document.title = "Bejelentkezés | Szálloda";
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
  });

  const handleLogin = async ({ username, password }: LoginFormData) => {
    const res = await axios
      .post(
        ENDPOINTS.LOGIN,
        {
          username: username,
          password: password,
        },
        {
          withCredentials: true,
        }
      )
      .catch((err) => {
        console.log("err", err);
      });
    if (res?.data.success) {
      showToast("Success", res.data.message);
      loginUser(res.data.user);
    } else {
      showToast("Error", res?.data.message);
    }
  };

  return (
    <div className="sing_in_content_container">
      <div className="sing_in_container">
        <div className="logo">
          <p className="x">QWE</p>
          <p>Hotel</p>
        </div>
        <form onSubmit={handleSubmit(handleLogin)}>
          <h1>Bejelentkezés</h1>
          <div className="input-container">
            <Controller
              name="username"
              control={control}
              defaultValue=""
              render={({ field }) => <input {...field} placeholder="Felhasználónév" />}
            />
            <div className="loginerrmsg">{errors.username?.message}</div>
          </div>
          <div className="input-container">
            <Controller
              name="password"
              control={control}
              defaultValue=""
              render={({ field }) => <input {...field} placeholder="Jelszó" type="password" />}
            />
            <div className="loginerrmsg">{errors.password?.message}</div>
          </div>
          <div className="input-container">
            <input className="input-form-btn" type="submit" value="Bejelentkezés" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
