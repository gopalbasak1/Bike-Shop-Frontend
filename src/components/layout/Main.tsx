import { Outlet } from "react-router-dom";
import Navbar from "../Shared/Navbar/Navbar";

const Main = () => {
  return (
    <div className="container mx-auto">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Main;
