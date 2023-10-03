import { useMemo, useState } from "react";
import { useAddress } from "@thirdweb-dev/react";

const Invest = () => {
  const address = useAddress();
  const [signedUp, setSignedUp] = useState(false);
  const [error, setError] = useState("");
  const [amount, setAmount] = useState<string>();
  const ref = useMemo(() => {
    return `https://app.kado.money/?onPayCurrency=USD&onPayAmount=${amount}&onRevCurrency=USDC&offPayCurrency=USDC&offRevCurrency=USD&network=OSMOSIS&onToAddress=X&offFromAddress=X&cryptoList=USDC&networkList=OSMOSIS&apiKey=API_KEY&product=BUY`;
  }, [amount]);

  const submitForm = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (amount) {
      // open invest
    } else {
      // add class to gdpr label .error
    }
  };

  const form = (
    <>
      <p>
        Insert amount.
        <br />
        For open investment dashboard!
      </p>

      <form className="flex flex-col items-center justify-center">
        <input
          type="text"
          placeholder="100.000,00"
          value={amount}
          onChange={(e) => {
            setAmount(e.target.value);
          }}
          className="my-4 px-4 py-[5px] w-[270px] focus:outline-none font-semibold bg-transparent border-2 border-sky-500 rounded-xl"
        />

        <button type="submit" onClick={submitForm}>
          Invest
        </button>
      </form>
    </>
  );

  const success = (
    <div className="flex flex-col items-center justify-center">
      <h2>Thank you for open Cosmic deck!</h2>
    </div>
  );

  const failure = (
    <div className="flex flex-col items-center justify-center">
      <h2>Something went wrong!</h2>
      <p>{error}</p>
    </div>
  );

  const conectWallet = (
    <div className="flex flex-col items-center justify-center">
      <h2>Conect your wallet to continue!</h2>
      <p>{error}</p>
    </div>
  );

  return (
    <div className="flex flex-col items-center justify-center">
      {signedUp ? success : error ? failure : !address ? conectWallet : form}
    </div>
  );
};

export default Invest;
