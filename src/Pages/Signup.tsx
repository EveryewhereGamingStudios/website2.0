import { useState, useRef } from "react";
import links from "../data/links.json";
import { useFirebase } from "../Context/FirebaseProvider";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gdpr, setGdpr] = useState(false);

  const { signUpWithEmail, error, signedUp } = useFirebase();

  const gdprRef = useRef<HTMLInputElement>(null);

  const submitForm = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (gdpr && email && password) {
      try {
        await signUpWithEmail(email, password);
      } catch {}
    } else {
      // add class to gdpr label .error
      if (gdprRef.current) {
        gdprRef.current.classList.add("error");
      }
    }
  };

  const form = (
    <>
      <form>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <br />
        <input
          type="text"
          placeholder="Email Address"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <br />

        {/* GDPR authorization */}
        <div className="items-center flex mb-4" ref={gdprRef}>
          <input
            type="checkbox"
            id="gdpr"
            onChange={(e) => {
              setGdpr(e.target.checked);
              if (gdprRef.current) {
                gdprRef.current.classList.remove("error");
              }
            }}
          />
          <label htmlFor="gdpr">
            I agree to the <a href={links.privacy_policy}>Privacy Policy</a>
          </label>
        </div>

        <button type="submit" onClick={submitForm}>
          Signup
        </button>
      </form>
    </>
  );
  const success = (
    <div className="success">
      <h2>Thank you for signing!</h2>
    </div>
  );

  const failure = (
    <div className="failure">
      <h2>Something went wrong!</h2>
      <p>{error}</p>
    </div>
  );

  return (
    <>
      <div className="waitlist">
        <h1>Signup</h1>
        {signedUp ? success : error ? failure : form}
      </div>
    </>
  );
};

export default Signup;
