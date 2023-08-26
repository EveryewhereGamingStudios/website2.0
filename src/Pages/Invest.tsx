import { useMemo, useState } from "react";
import { Footer } from "../Components/Footer";

const Invest = () => {
  const [amount, setAmount] = useState<string>();
  const [email, setEmail] = useState<string>();
  const ref = useMemo(() => {
    return `https://app.kado.money/?onPayCurrency=USD&onPayAmount=${amount}&onRevCurrency=USDC&offPayCurrency=USDC&offRevCurrency=USD&network=OSMOSIS&onToAddress=X&offFromAddress=X&cryptoList=USDC&networkList=OSMOSIS&apiKey=API_KEY&product=BUY`;
  }, [amount]);

  return (
    <div className="min-h-full justify-center items-center flex flex-col ">
      <div className="flex justify-center items-center">
        <form>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Email address
            </label>
            <input
              type="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="john.doe@company.com"
              required
            />
          </div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Insert amount
          </label>
          <div className="flex">
            <input
              type="number"
              id="invest"
              onChange={(e) => setAmount(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="100.000,00"
              required
            />
            <a
              target="_blank"
              rel="noreferrer"
              href={ref}
              type="submit"
              className="text-white ml-4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Invest
            </a>
          </div>
        </form>
      </div>

      {Footer()}
    </div>
  );
};

export default Invest;
