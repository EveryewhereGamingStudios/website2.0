import { useMemo, useState } from "react";
import { Footer } from "../Components/Footer";

const Deck = () => {
  const [email, setEmail] = useState("");
  const [signedUp, setSignedUp] = useState(false);
  const [error, setError] = useState("");
  const ref = useMemo(() => {
    return "https://drive.google.com/file/d/1h1HENakcd5-ViSZnVAwpZs_FU3ncyCHQ/view";
  }, []);

  const submitForm = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (email) {
      // open deck
    } else {
      // add class to gdpr label .error
    }
  };

  const form = (
    <>
      <p>
        Insert your E-mail.
        <br />
        For open our Cosmic Deck!
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
          Open deck
        </button>
      </form>
    </>
  );

  const success = (
    <div className="success">
      <h2>Thank you for open Cosmic deck!</h2>
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
        <h1>Cosmic Deck</h1>
        {signedUp ? success : error ? failure : form}
      </div>
    </>
  );
};

export default Deck;
