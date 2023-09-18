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

  function isValidEmail(email: string) {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    return emailRegex.test(email);
  }

  const submitForm = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!isValidEmail(email)) {
      return alert(`${email} is not a valid email address.`);
    }

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
        <div className="flex flex-col items-center justify-center mt-4">
          <input
            type="text"
            placeholder="Email Address"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
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
          <button type="submit" onClick={submitForm} className="mt-6">
            Subscribe
          </button>
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
