import { useState, useRef } from "react";
import links from "../data/links.json";
import { useFirebase } from "../Context/FirebaseProvider";

const Waitlist = () => {
  const [email, setEmail] = useState("");
  const [gdpr, setGdpr] = useState(false);
  const [registered, setRegistered] = useState(false);
  const [error, setError] = useState("");

  const gdprRef = useRef<HTMLInputElement>(null);

  const { signWaitlist } = useFirebase();

  const submitForm = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (gdpr && email) {
      signWaitlist(email)
        .then((res) => {
          if (res === true) {
            setRegistered(true);
          } else {
            setError("Error, try again!");
          }
        })
        .catch((err) => {
          setError(err.message);
        });
    } else {
      // add class to gdpr label .error
      if (gdprRef.current) {
        gdprRef.current.classList.add("error");
      }
    }
  };

  const form = (
    <>
      <p>
        Enter the metaverse of web3 gaming.
        <br />
        Subscribe to our waitlist and register for the Alpha test run coming
        soon!
      </p>

      <form>
        <input
          type="text"
          placeholder="Email Address"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />

        <button type="submit" onClick={submitForm}>
          Subscribe
        </button>

        {/* GDPR authorization */}
        <div ref={gdprRef}>
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
      </form>
    </>
  );

  const success = (
    <div className="success">
      <h2>Thank you for subscribing!</h2>
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
        <h1>Waitlist</h1>
        {registered ? success : error ? failure : form}
      </div>
    </>
  );
};

export default Waitlist;
