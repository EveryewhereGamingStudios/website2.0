import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import links from "../data/links.json";

const Home = () => {
  const address = useAddress();
  return (
    <div className="flex flex-col items-center justify-between min-h-[85vh]">
      {/* <div className="video">
        <iframe
          id="ytplayer"
          width="720"
          height="405"
          src="https://www.youtube.com/embed/nMJ-gF2uW4E/?&autoplay=1&t=2"
          title="ytplayer"
        />
      </div> */}
      <div />

      <div>
        <h1>
          An immersive strategy <span className="highlight">gamefi</span>{" "}
          experience
        </h1>

        <div className="cta">
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
              }}
              className="btn btn-primary mx-[4px]"
            />
          ) : (
            <a href="/signup" className="btn btn-primary mx-[4px]">
              My profile
            </a>
          )}

          {address && (
            <a href="/waitlist" className="btn btn-secondary mx-[4px]">
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
