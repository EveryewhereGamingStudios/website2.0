import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import links from "../data/links.json";

const Home = () => {
  const address = useAddress();
  return (
    <div className="flex flex-col items-center justify-between min-h-[85vh]">
      <div />

      <div>
        <h1 className="font-saira font-semibold text-2xl md:text-4xl xl:text-5xl leading-[1.349] text-center uppercase self-center md:w-[827px] lg:w-[600px] xl:w-[627px]">
          An immersive strategy <span className="text-[#2ed2ff]">gamefi</span>{" "}
          experience
        </h1>

        <div className="mt-4 items-center justify-center flex">
          {!address ? (
            <ConnectWallet
              theme="dark"
              modalTitle="Enter the metaverse of web3 gaming"
              style={{
                background: "transparent",
                color: "hsl(272, 100%, 79%)",
                borderRadius: 10,
                padding: 10,
                paddingRight: 30,
                paddingLeft: 30,
                border: "1px solid hsl(272, 100%, 79%)",
              }}
              className="mx-4"
            />
          ) : (
            <a
              href="/signup"
              className="mx-4 border border-[#2ed2ff] text-[#2ed2ff] p-[5.5px] px-[20px] rounded-[10px]"
            >
              My profile
            </a>
          )}

          {address && (
            <a
              href="/waitlist"
              className="mx-4 border border-[#2ed2ff] text-[#2ed2ff] p-[5.5px] px-[20px] rounded-[10px]"
            >
              Download
            </a>
          )}
        </div>
      </div>
      <footer className="bottom-0 flex justify-between w-full self-center px-4">
        <a href={links.saga}>
          <img
            src="/assets/images/saga.png"
            alt="Saga logo"
            className="md:h-[30px] h-[20px]"
          />
        </a>
        <a href={links.youtube}>
          <img
            src="/assets/images/yaygames.png"
            alt="YAY Games logo"
            className="md:h-[30px] h-[20px]"
          />
        </a>
      </footer>
    </div>
  );
};

export default Home;
