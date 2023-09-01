import { useMemo, useState } from "react";
import { Footer } from "../Components/Footer";

const Deck = () => {
  const [email, setEmail] = useState<string>();
  const ref = useMemo(() => {
    return "https://drive.google.com/file/d/1h1HENakcd5-ViSZnVAwpZs_FU3ncyCHQ/view";
  }, []);

  return (
    <div className="min-h-full justify-center items-center flex flex-col ">
      <div className="flex justify-center items-center">
        <form>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Insert your E-mail
          </label>
          <div className="flex">
            <input
              type="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              className="focus:outline-0 border border-[#2ed2ff] bg-transparent text-gray-200 text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5 "
              placeholder="joao@email.com"
              required
            />
            <a
              target="_blank"
              rel="noreferrer"
              href={ref}
              type="submit"
              className="text-white ml-4 border-[#2ed2ff] border hover:bg-sky-900 focus:ring-4 focus:outline-none focus:ring-sky-600 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
            >
              Open
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Deck;
