import Nav from "../Components/Nav";
import Sidebar from "../Components/Sidebar";
import { Outlet } from "react-router-dom";

const InGameActionsLayout = () => {
  return (
    <>
      <div className="main" style={{ width: "100vw", left: "0px" }}>
        <Nav />
        <div
          className="container"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            alignContent: "center",
          }}
        >
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default InGameActionsLayout;
