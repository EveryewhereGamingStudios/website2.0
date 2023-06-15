import { useContext } from "react";
import { FirebaseContext } from "../../Context/FirebaseProvider";

const AdminProfile = () => {
    const { auth } = useContext(FirebaseContext);

    console.log(auth);
    return <>
    </>
};

export default AdminProfile;