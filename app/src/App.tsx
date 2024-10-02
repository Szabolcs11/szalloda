import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navigator from "./navigator";
import axios from "axios";
import { API_URL } from "./constans";

function App() {
  axios.defaults.baseURL = API_URL;
  axios.defaults.withCredentials = true;
  return (
    <>
      <ToastContainer />
      <Navigator />
    </>
  );
}

export default App;
