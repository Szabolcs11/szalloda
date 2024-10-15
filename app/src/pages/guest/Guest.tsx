import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ENDPOINTS } from "../../constans";
import Loader from "../../components/Loader";
import { Guest as GuestType } from "../../types";
import { showToast } from "../../toast";
import { navigator } from "../../navigator";
import { Paths } from "../../navigator/routes";

function Guest() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [guest, setGuest] = useState<GuestType>();

  const handleDeleteGuest = () => {
    axios.post(ENDPOINTS.DELETE_GUEST, { guestId: guest?.id }).then((res) => {
      if (res.data.success) {
        navigator(Paths.Guests);
        showToast("Success", res.data.message);
      } else {
        showToast("Error", res.data.message);
      }
    });
  };

  useEffect(() => {
    axios.get(ENDPOINTS.GUEST + id).then((res) => {
      if (res.data.success) {
        setGuest(res.data.guest);
        setIsLoading(false);
      } else {
        console.log(res.data);
      }
    });
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div style={{ padding: "12px" }}>
      <div>
        <p>Azonosító: {guest?.id}</p>
        <p>Teljes név: {guest?.FullName}</p>
        <p>Email cím: {guest?.Email}</p>
        <p>Telefonszám: {guest?.Phone}</p>
        <p>Születet: {guest?.BirthDate}</p>
      </div>
      <div className="roomoperations">
        <p>Műveletek</p>
        <div className="roomoperations-container">
          <button
            onClick={() => {
              handleDeleteGuest();
            }}
            className="operation-btn deleteBtn"
          >
            Törlés
          </button>
        </div>
      </div>
    </div>
  );
}

export default Guest;
