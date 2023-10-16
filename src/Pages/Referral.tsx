import { useFirebase } from "../Context/FirebaseProvider";

const Referral = () => {
  const { users } = useFirebase();
  return (
    <dl className="transition-all ease-in-out -my-3 divide-y divide-sky-900 text-sm w-full justify-center flex flex-col max-w-5xl self-center">
      <div className="flex flex-col items-center justify-between min-h-[80vh]">
        <div className="w-full flex md:flex-row flex-col items-center justify-between my-12 md:my-40">
          <div className="w-[275px] text-start h-[250px] flex flex-col">
            <p className="text-3xl">Points</p> <br />
            <p className="max-w-[275px]">
              Your Points will be used in the near future for different utilites
              (E.g.: discounts on subscriptions (if applied), premium features,
              etc.)
            </p>{" "}
            <br /> <br />
            <div className="items-center flex">
              <p>Total of points: </p>
              <span className="text-3xl font-bold text-sky-500 ml-4">5</span>
            </div>
          </div>

          <div className="md:h-[200px] md:w-[0.3px] w-[200px] h-[0.3px] bg-gray-400 mx-20" />

          <div className="w-[275px] text-start h-[250px] flex flex-col">
            <p className="text-3xl">Referral Program</p> <br />
            <p>Refer us to your friends and earn points!</p> <br />
            <p> 5 Points for each new user that Signs Up</p>
            <p> 5 Points for each new user that Lists a Project</p> <br />
            <p> Get your unique Referral Link:</p>
            <p className="text-sky-500"> https://cosmicexodus.xyz/50940214</p>
            <a
              href="https://"
              className={`self-center mt-4 w-[108px] animate-pulse mx-4 border-2 border-[#2ed2ff] text-[#2ed2ff] p-[5.5px] px-[20px] rounded-[10px]`}
            >
              Copy Link
            </a>
          </div>
        </div>

        <div className="self-center w-full flex flex-col h-40">
          <p className="text-3xl px-10 md:px-0">Referrals</p> <br />
          {users?.map((item, index) => {
            return (
              <div
                className="flex justify-between items-center p-2 w-full border-sky-500 border-b-[0.5px]"
                key={index}
              >
                <div className="flex items-center">
                  <img
                    src={
                      item?.photo ||
                      `https://api.dicebear.com/6.x/bottts/png?seed=${item?.publicAddress}`
                    }
                    alt=""
                    className="w-8 h-8 mr-2 rounded-full aspect-square"
                  />
                  <dt
                    className="font-medium text-gray-300 truncate hover:text-sky-500 w-[200px]"
                    // onClick={() => openWallet(item?.publicAddress)}
                  >
                    {item?.publicAddress}
                  </dt>
                </div>
                <span className="ml-2">01/01/2023</span>
              </div>
            );
          })}
        </div>
      </div>
    </dl>
  );
};

export default Referral;
