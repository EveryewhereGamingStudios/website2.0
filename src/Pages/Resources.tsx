import { useCallback, useState } from "react";
import { useFirebase } from "../Context/FirebaseProvider";
import { CardNft } from "../Components/CardNft";

export function Resources() {
  const { users } = useFirebase();
  const [selectedTab, setSelectedTab] = useState("accounts");

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
      label: "NFTs minted",
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
        <div className="rounded-lg">
          <dl className="flex flex-wrap items-center justify-between">
            {/* {nfts.map((nft, i) => {
              return (
                <CardNft
                  bidPrice={nft.price.toString()}
                  buyoutPrice={nft.price.toString()}
                  image={nft.url}
                  title={nft.name}
                  wallet="0x324234234"
                />
              );
            })} */}
          </dl>
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

const nfts: NFT[] = [
  {
    id: 0,
    name: "NFT 1",
    description: "This is our first amazing NFT",
    url: "https://bafybeihgfxd5f5sqili34vyjyfai6kezlagrya43e6bkgw6hnxucxug5ya.ipfs.nftstorage.link/",
    price: 0.01,
  },
  {
    id: 1,
    name: "NFT 2",
    description: "This is our second amazing NFT",
    url: "https://bafybeida2kkclur4345iihiqb6pepfnwse7ko7pvrft4duxwxxwo2jqqjq.ipfs.nftstorage.link/",
    price: 0.02,
  },
  {
    id: 2,
    name: "NFT 3",
    description: "This is our third amazing NFT",
    url: "https://bafybeidegtxcfpr43d6vbrippnm2csxqst7stxaxl3rp5vd27ss6yd3s5e.ipfs.nftstorage.link/",
    price: 0.03,
  },
  {
    id: 3,
    name: "NFT 4",
    description: "This is our forth amazing NFT",
    url: "https://bafybeieicywyvnaher24isrxoagjxbro6qr6kbzcz2feldbquoqeag7ivm.ipfs.nftstorage.link/",
    price: 0.01,
  },
  {
    id: 4,
    name: "NFT 5",
    description: "This is our fifth amazing NFT",
    url: "https://bafybeieufjiaqny6q6kis2ehv2w6epwqzkeoscfc3ltck67dunrbvseczq.ipfs.nftstorage.link/",
    price: 0.02,
  },
  {
    id: 5,
    name: "NFT 6",
    description: "This is our sixth amazing NFT",
    url: "https://bafybeiftcf7xruf4gmlbme6bos5tznlrvz46xfxdnofp3auibvzbizysoy.ipfs.nftstorage.link/",
    price: 0.03,
  },
];
