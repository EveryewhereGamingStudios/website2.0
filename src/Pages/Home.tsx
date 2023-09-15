import { useAddress } from "@thirdweb-dev/react";
import links from "../data/links.json";

const Home = () => {
  const address = useAddress();
  return (
    <div className="hero items-center justify-center">
      <div className="video">
        <iframe
          id="ytplayer"
          width="720"
          height="405"
          src="https://www.youtube.com/embed/nMJ-gF2uW4E/?&autoplay=1&t=2"
          title="ytplayer"
        />
      </div>

      <h1>
        An immersive strategy <span className="highlight">gamefi</span>{" "}
        experience
      </h1>

      <div className="cta">
        <a href="/signup" className="btn btn-primary">
          {!address ? "Create account" : "My profile"}
        </a>
        {/* <a href="/waitlist" className="btn btn-secondary">
              Subscribe to our waitlist
            </a> */}
      </div>
      <div className="bottom flex justify-between w-full self-center px-4">
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
      </div>
    </div>
  );
};

export default Home;
