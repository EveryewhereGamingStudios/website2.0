import { Outlet } from "react-router-dom";
import AdminSidebar from "../Components/Admin/AdminSidebar";
import AdminAuth from "../Components/Admin/AdminAuth";
import { useFirebase } from "../Context/FirebaseProvider";

const AdminLayout = () => {
  const { auth } = useFirebase();

  return (
    <>
      {!auth.currentUser ? (
        <AdminAuth />
      ) : (
        <>
          <div className="sidebar">
            <AdminSidebar />
          </div>
          <div className="main">
            <h1>Admin</h1>
            <div className="container">
              <Outlet />

              <pre>&gt;&gt; {auth.currentUser + ""} &lt;&lt;</pre>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default AdminLayout;
