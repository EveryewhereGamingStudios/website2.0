import { useFirebase } from "../../Context/FirebaseProvider";

const AdminProfile = () => {
  const { auth } = useFirebase();

  console.log(auth);
  return <></>;
};

export default AdminProfile;
