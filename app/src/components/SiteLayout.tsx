import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

function SiteLayout() {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
}

export default SiteLayout;
