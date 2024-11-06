import { useEffect, useState } from "react";
import Loader from "../../components/Loader";
import axios from "axios";
import { ENDPOINTS } from "../../constans";
import { Guest } from "../../types";
import { navigator } from "../../navigator";

function Guests() {
  const [isLoading, setIsLoading] = useState(true);
  const [guests, setGuests] = useState<Guest[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    axios.get(ENDPOINTS.GUESTS).then((res) => {
      if (res.data.success) {
        setGuests(res.data.guests);
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
    <div>
      <h1 className="title">Vendégek</h1>
      <div className="search-container">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
          placeholder="Keresés"
          className="search-input"
        />
      </div>
      <div className="rooms">
        {guests.map((e) => {
          if (!e.FullName.includes(searchQuery) && !e.Email.includes(searchQuery) && !e.Phone.includes(searchQuery))
            return null;
          return (
            <div key={e.id} className="room" onClick={() => navigator(`/guest/${e.id}`)}>
              <p style={{ fontSize: 18, fontWeight: "500" }}>{e.FullName}</p>
              <p>{"Email cím: " + e.Email}</p>
              <p>{"Telefonszám: " + e.Phone}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Guests;
