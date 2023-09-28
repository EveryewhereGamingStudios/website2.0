import { useState } from "react";
import { useFirebase } from "../Context/FirebaseProvider";

const Deck = () => {
  const { signToOpenDeck } = useFirebase();
  const [email, setEmail] = useState("");
  const [registered, setRegistered] = useState(false);
  const [error, setError] = useState("");

  function isValidEmail(email: string) {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    return emailRegex.test(email);
  }

  const submitForm = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!isValidEmail(email)) {
      return alert(`${email} is not a valid email address.`);
    }

    if (email) {
      signToOpenDeck(email)
        .then((res) => {
          if (res === true) {
            setRegistered(true);
            // window.open(
            //   "https://drive.google.com/file/d/1h1HENakcd5-ViSZnVAwpZs_FU3ncyCHQ/view"
            // );
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
        Enter your email address to
        <br />
        Unlock access to our Cosmic Deck!
      </p>

      <form className="flex flex-col items-center">
        <input
          type="text"
          placeholder="Email Address"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          className="my-4 px-4 py-[5px] w-[270px] focus:outline-none font-semibold bg-transparent border-2 border-sky-500 rounded-xl"
        />

        <button type="submit" onClick={submitForm}>
          Open deck
        </button>
      </form>
    </>
  );

  const success = (
    <div className="flex flex-col items-center justify-center w-full">
      <object
        data="/Cosmic_Deck.pdf"
        type="application/pdf"
        width="100%"
        height="100%"
        className="min-h-[89vh]"
      >
        {""}
      </object>
    </div>
  );

  const failure = (
    <div className="flex flex-col items-center justify-center">
      <h2>Something went wrong!</h2>
      <p>{error}</p>
    </div>
  );

  return (
    <div className="flex flex-col items-center justify-center">
      {registered ? success : error ? failure : form}
    </div>
  );
};

export default Deck;
