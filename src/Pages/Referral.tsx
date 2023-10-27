import { useAddress } from "@thirdweb-dev/react";
import { useFirebase } from "../Context/FirebaseProvider";
import { useCallback } from "react";

const Referral = () => {
  const address = useAddress();
  const { referrals } = useFirebase();

  const openWallet = useCallback((address: string | undefined) => {
    if (!address) {
      return alert("No wallet");
    }
    try {
      const link = `https://mumbai.polygonscan.com/address/${address}`;
      window.open(link, "_blank");
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <dl className="transition-all ease-in-out -my-3 divide-y divide-sky-900 text-sm w-full justify-center flex flex-col max-w-5xl self-center">
      <div className="flex flex-col items-center justify-between min-h-[80vh]">
        <div className="p-4 w-full flex md:flex-row flex-col items-center justify-between my-12 md:my-40">
          <div className="max-w-[450px] w-full text-start h-[250px] flex flex-col mb-32 md:mb-0">
            <p>Cosmic tiers: </p> <br />
            <img src="/assets/images/404.png" alt="404" />
            <div className="items-center flex">
              <p>Coming soon!</p>
            </div>
          </div>

          <div className="max-w-[450px] text-start h-[250px] flex flex-col">
            <p>Make cosmic friendships. </p>
            <p>Earn special assets for your collection! </p> <br />
            <p>
              If you invite your friends to join our Alpha playtest, you can
              unlock unique avatars, skins, SFX, and much more!{" "}
            </p>
            <p>
              The further your mentee is able to achieve, the bigger the
              rewards.
            </p>
            <br />
            <p>Click to copy and activate your link:</p>
            <a
              href="/#/LOYALTY%20PROGRAM"
              onClick={async () => {
                await navigator.clipboard.writeText(
                  `https://app.cosmicexodus.xyz/${address}`
                );
                alert("Link Copied!");
              }}
              className="text-sky-500 animate-pulse hover:animate-none"
            >
              https://app.cosmicexodus.xyz/{address?.slice(0, 8)}...
            </a>
            <img
              src="/assets/images/good-job.png"
              className="h-[134px] w-[134px] self-center mt-8"
              alt="Good job"
            />
          </div>
        </div>

        <div className="p-2 w-full flex flex-col items-center justify-between mt-4 h-32">
          {/* <p>Cosmic friends</p>
          <p>Collection: 5 </p>
          <p>Cosmic mentee’s 3</p> */}

          <p className="w-full mb-4">Cosmic friends: </p>

          {referrals ? (
            referrals?.refs.map((item, index) => {
              if (!item) return null;
              const date = new Date(item?.time);
              return (
                <div
                  className="flex justify-between items-center p-2 border-b border-sky-500 w-full"
                  key={index}
                >
                  <div className="items-center flex flex-row w-full">
                    <img
                      src={`https://api.dicebear.com/6.x/bottts/png?seed=${item?.address}`}
                      alt=""
                      className="w-8 h-8 mr-2 rounded-full aspect-square"
                    />
                    <div
                      className="font-medium text-gray-300 truncate hover:text-sky-500"
                      onClick={() => openWallet(item?.address)}
                    >
                      {item?.address}
                    </div>
                  </div>
                  <div className="font-medium truncate text-sky-500 text-end md:flex hidden">
                    {date.toLocaleString() || ""}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="w-full items-center justify-center flex">
              <p>No refs</p>
            </div>
          )}
        </div>
      </div>
    </dl>
  );
};

export default Referral;
