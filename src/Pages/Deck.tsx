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
          } else {
            setError("Error, try again!");
          }
        })
        .catch((err) => {
          setError(err.message);
        });
    }
  };

  const form = (
    <div className="w-full items-center flex flex-col">
      <img
        src={"/assets/images/iWantYou.png"}
        alt="iWantYou"
        style={{ height: "270px" }}
        className="mb-8"
      />
      <p className="mb-8 max-w-[88%] self-center">
        Enter your email address to Unlock access to our Cosmic Deck!
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
    </div>
  );

  const pdfUrl =
    "https://drive.google.com/file/d/1NzF0_LuN1saz_iPcmbwdlu3VusOqe39J/preview";

  const success = (
    <div className="flex flex-col items-center justify-center w-full">
      <iframe
        title="PDF Viewer"
        src={pdfUrl}
        width="100%"
        height="100%"
        className="min-h-[89vh]"
      ></iframe>
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
