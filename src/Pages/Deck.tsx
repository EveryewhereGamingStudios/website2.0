import { useState } from "react";
import { useFirebase } from "../Context/FirebaseProvider";

const Deck = () => {
  const { signToOpenDeck } = useFirebase();
  const [email, setEmail] = useState("");
  const [registered, setRegistered] = useState(false);
  const [error, setError] = useState("");

  const submitForm = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (email) {
      signToOpenDeck(email)
        .then((res) => {
          if (res === true) {
            setRegistered(true);
            window.open(
              "https://drive.google.com/file/d/1h1HENakcd5-ViSZnVAwpZs_FU3ncyCHQ/view"
            );
          } else {
            setError("Error, try again!");
          }
        })
        .catch((err) => {
          setError(err.message);
        });
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
        {registered ? success : error ? failure : form}
      </div>
    </>
  );
};

export default Deck;
