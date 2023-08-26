import { Footer } from "../Components/Footer";

const Invest = () => {
  return (
    <div className="min-h-full justify-center items-center flex flex-col bg-red-500">
      <div className="flex justify-center items-center">
        <span>Insert amount</span>
        <input onChange={() => {}} />
        <button>Invest</button>
      </div>
      {Footer()}
    </div>
  );
};

export default Invest;
