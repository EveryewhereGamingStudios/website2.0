const Referral = () => {
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
            </p>{" "}
            <br />
            <p>Click to copy and activate your link:</p>
            <a href="https://" className="text-sky-500 animate-pulse">
              {" "}
              https://cosmicexodus.xyz/50940214
            </a>
            <img
              src="/assets/images/good-job.png"
              className="h-[134px] w-[134px] self-center mt-4"
              alt="Good job"
            />
          </div>
        </div>
        <div className="p-4 w-full flex md:flex-row flex-col items-center justify-between mt-4">
          <p>Cosmic friends 0x14EEF608A...</p>
          <p>Collection: 5 </p>
          <p>Cosmic mentee’s 3</p>
        </div>
      </div>
    </dl>
  );
};

export default Referral;
