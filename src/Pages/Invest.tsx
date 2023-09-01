import { useMemo, useState } from "react";
import { useAddress } from "@thirdweb-dev/react";

const Invest = () => {
  const address = useAddress();
  const [amount, setAmount] = useState<string>();
  const ref = useMemo(() => {
    return `https://app.kado.money/?onPayCurrency=USD&onPayAmount=${amount}&onRevCurrency=USDC&offPayCurrency=USDC&offRevCurrency=USD&network=OSMOSIS&onToAddress=X&offFromAddress=X&cryptoList=USDC&networkList=OSMOSIS&apiKey=API_KEY&product=BUY`;
  }, [amount]);

  return (
    <div className="min-h-full justify-center items-center flex flex-col ">
      <div className="flex justify-center items-center">
        {address ? (
          <form>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Insert amount
            </label>
            <div className="flex">
              <input
                type="number"
                id="invest"
                onChange={(e) => setAmount(e.target.value)}
                className="focus:outline-0 border border-[#2ed2ff] bg-transparent text-gray-200 text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5 "
                placeholder="100.000,00"
                required
              />
              <a
                target="_blank"
                rel="noreferrer"
                href={ref}
                type="submit"
                className="text-white ml-4 border-[#2ed2ff] border hover:bg-sky-900 focus:ring-4 focus:outline-none focus:ring-sky-600 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
              >
                Invest
              </a>
            </div>
          </form>
        ) : (
          <span className="block mt-12 text-sm font-medium text-gray-900 dark:text-white">
            Conect your wallet to continue
          </span>
        )}
      </div>
    </div>
  );
};

export default Invest;
