import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import links from "../data/links.json";
import { useState } from "react";
import { Profile } from "./Profile";
import Referral from "./Referral";
import Download from "./Download";

const Home = () => {
  const address = useAddress();
  const [selectedTab, setSelectedTab] = useState("accounts");

  return (
    <>
      {!address ? (
        <div className="flex flex-col items-center justify-between min-h-[84vh]">
          <div />

          <div>
            <h1 className="font-saira font-semibold text-2xl md:text-4xl xl:text-6xl leading-[1.349] text-center uppercase self-center w-[300px] md:w-[427px] lg:w-[427px] xl:w-[727px]">
              Enter the metaverse of web3{" "}
              <span className="text-[#2ed2ff]">gaming</span>
            </h1>

            <div className="mt-4 items-center justify-center flex">
              <ConnectWallet
                style={connectWalletStyles}
                theme={"dark"}
                btnTitle={"Login"}
                switchToActiveChain={true}
                modalSize={"wide"}
                welcomeScreen={connectWalletScreen}
                modalTitleIconUrl={""}
                className="mx-4"
              />
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
      ) : (
        <>
          <ul className="mb-4 flex list-none flex-row flex-wrap border-b-0 pl-0 lg:-mt-28">
            {tabs?.map((item, i) => {
              return (
                <li role="presentation" key={i} className="ml-2">
                  <a
                    href={`#/${item.label}`}
                    onClick={() => setSelectedTab(item.value)}
                    className={`flex items-center text-xs text-gray-500 px-2 pb-2 md:text-md font-bold  ${
                      item.value === selectedTab
                        ? "border-b border-sky-500 text-sky-500"
                        : null
                    }`}
                  >
                    {item.icon} {item.label}
                  </a>
                </li>
              );
            })}
          </ul>

          {selectedTab === "accounts" ? (
            <div className="rounded-lg">
              <dl className="-my-3 divide-y divide-sky-900 text-sm">
                <div className="flex flex-col items-center justify-between min-h-[80vh]">
                  <div />

                  <div>
                    <Profile />
                  </div>

                  <div />
                </div>
              </dl>
            </div>
          ) : selectedTab === "download" ? (
            <Download />
          ) : selectedTab === "referral" ? (
            <Referral />
          ) : null}
        </>
      )}
    </>
  );
};

export default Home;

//
// Utils
//

const connectWalletStyles = {
  background: "transparent",
  color: "#cd94ff",
  borderRadius: 10,
  padding: 10,
  paddingRight: 30,
  paddingLeft: 30,
  border: "2px solid #cd94ff",
};

const connectWalletScreen = {
  title: "Enter the metaverse of web3 gaming!",
  subtitle: "Choose an option to get started.",
  img: {
    src: "/assets/images/logo.png",
    width: 100,
    height: 50,
  },
};

const tabs = [
  {
    label: `USER PROFILE`,
    value: "accounts",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        className="bi bi-person-fill mr-2"
        viewBox="0 0 16 16"
      >
        <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
      </svg>
    ),
  },
  {
    label: "DOWNLOAD LAUNCHER",
    value: "download",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        className="bi bi-cloud-arrow-down-fill mr-2"
        viewBox="0 0 16 16"
      >
        <path d="M8 2a5.53 5.53 0 0 0-3.594 1.342c-.766.66-1.321 1.52-1.464 2.383C1.266 6.095 0 7.555 0 9.318 0 11.366 1.708 13 3.781 13h8.906C14.502 13 16 11.57 16 9.773c0-1.636-1.242-2.969-2.834-3.194C12.923 3.999 10.69 2 8 2zm2.354 6.854-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 1 1 .708-.708L7.5 9.293V5.5a.5.5 0 0 1 1 0v3.793l1.146-1.147a.5.5 0 0 1 .708.708z" />
      </svg>
    ),
  },
  // {
  //   label: "LOYALTY PROGRAM",
  //   value: "referral",
  //   icon: (
  //     <svg
  //       xmlns="http://www.w3.org/2000/svg"
  //       width="16"
  //       height="16"
  //       fill="currentColor"
  //       className="bi bi-people-fill mr-2"
  //       viewBox="0 0 16 16"
  //     >
  //       <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7Zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-5.784 6A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216ZM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
  //     </svg>
  //   ),
  // },
];
