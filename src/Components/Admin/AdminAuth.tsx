import { useFirebase } from "../../Context/FirebaseProvider";

const GoogleLoginButton = () => {
  const { authenticate } = useFirebase();

  return (
    <>
      <div className="google-btn" onClick={authenticate}>
        <div className="google-icon-wrapper">
          <img
            className="google-icon"
            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
            alt="Google Login"
          />
        </div>
        <p className="btn-text">
          <b>Sign in with google</b>
        </p>
      </div>
    </>
  );
};

const AdminAuth = () => {
  const { auth } = useFirebase();

  return (
    <>
      <div className="main fullview">
        <div className="container">
          <div className="auth">
            <h1>Admin Auth</h1>
            <GoogleLoginButton />
          </div>
          <div className="login"></div>
          <pre>
            &gt;&gt; {auth.currentUser ? auth.currentUser.toJSON() + "" : ""}{" "}
            &lt;&lt;
          </pre>
        </div>
      </div>
    </>
  );
};

export default AdminAuth;
