import { useCallback, useMemo, useState } from "react";
import { useFirebase } from "../Context/FirebaseProvider";
import { useContract, useNFTs } from "@thirdweb-dev/react";

export function Resources() {
  const { users } = useFirebase();
  const [selectedTab, setSelectedTab] = useState("accounts");
  const { contract } = useContract(process.env.REACT_APP_NFT_ADDRESS);
  const { data, isLoading } = useNFTs(contract);

  const totalSupply = useMemo(() => {
    if (!data) return 0;
    let count: number = 0;
    data?.map((item) => (count += Number(item.supply)));
    return count;
  }, [data]);

  const tabs = [
    {
      label: `Accounts created (${users.length})`,
      value: "accounts",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-people-fill mr-2"
          viewBox="0 0 16 16"
        >
          <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7Zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-5.784 6A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216ZM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
        </svg>
      ),
    },
    {
      label: `NFTs minted (${totalSupply})`,
      value: "nfts",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-credit-card-2-front-fill mr-2"
          viewBox="0 0 16 16"
        >
          <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2.5 1a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h2a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-2zm0 3a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zm0 2a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1zm3 0a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1zm3 0a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1zm3 0a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1z" />
        </svg>
      ),
    },
  ];

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
    <>
      <ul className="mb-4 flex list-none flex-row flex-wrap border-b-0 pl-0">
        {tabs?.map((item, i) => {
          return (
            <li role="presentation">
              <a
                href={`#/${item.label}`}
                onClick={() => setSelectedTab(item.value)}
                className={`flex items-center text-sm text-gray-500 px-4 pb-2 md:text-lg font-bold ${
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
        <div className="rounded-lg  p-4 pt-6">
          <dl className="-my-3 divide-y divide-sky-900 text-sm">
            {users?.map((item, index) => {
              return (
                <div
                  className="flex justify-start items-center p-2"
                  key={index}
                >
                  <img
                    src={
                      item?.photo ||
                      `https://api.dicebear.com/6.x/bottts/png?seed=${item?.publicAddress}`
                    }
                    alt=""
                    className="w-8 h-8 mr-2 rounded-full aspect-square"
                  />
                  <dt
                    className="font-medium text-gray-300 truncate hover:text-sky-500"
                    onClick={() => openWallet(item?.publicAddress)}
                  >
                    {item?.publicAddress}
                  </dt>
                </div>
              );
            })}
          </dl>
        </div>
      ) : (
        <div className="rounded-lg items-center justify-center flex">
          <div>
            {!isLoading ? (
              <dl className="flex flex-wrap items-center md:justify-between justify-center max-w-[670px] w-full">
                {data?.map((nft, i) => {
                  if (!nft) return null;
                  const img = imgs.find(
                    (img) => nft.metadata.name === img.name
                  )?.url;

                  return (
                    <div
                      key={i}
                      className="border-2 border-sky-500 w-[280px] p-4 m-4 flex items-center justify-between"
                    >
                      <img
                        src={`${img}`}
                        alt={`${nft.metadata.name}`}
                        className="h-24"
                      />

                      <div className="h-24 justify-between flex flex-col items-end">
                        <p className="text-xl font-bold">{nft.metadata.name}</p>
                        <p>{nft.supply}</p>
                      </div>
                    </div>
                  );
                })}
              </dl>
            ) : (
              <p className="loading">Loading...</p>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Resources;

export interface NFT {
  id: number;
  name: string;
  description: string;
  url: string;
  price: number;
  minted?: boolean;
}

const imgs = [
  {
    name: "Damage Tower",
    url: "/nfts/Damage-Tower.png",
  },
  {
    name: "Melee Unit",
    url: "/nfts/Melee-Unit.png",
  },
  {
    name: "Slow Tower",
    url: "/nfts/Slow-Tower.png",
  },
  {
    name: "Range Unit",
    url: "/nfts/Range-Unit.png",
  },
  {
    name: "Stun Tower",
    url: "/nfts/Stun-Tower.png",
  },
  {
    name: "Healer Unit",
    url: "/nfts/Healer-Unit.png",
  },
  {
    name: "Chain Tower",
    url: "/nfts/Chain-Tower.png",
  },
  {
    name: "Mage Unit",
    url: "/nfts/Mage-Unit.png",
  },
  {
    name: "Critical Tower",
    url: "/nfts/Critical-Tower.png",
  },
  {
    name: "Tank Unit",
    url: "/nfts/Tank-Unit.png",
  },
];
