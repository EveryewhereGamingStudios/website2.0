interface INft {
  wallet: string;
  title: string;
  bidPrice: string;
  buyoutPrice: string;
  image: string;
}

export function CardNft(nft: INft) {
  return (
    <a href={`/article/${nft.title}`}>
      <div className="flex flex-col m-4 rounded-md w-[300px] bg-[#0B1234]">
        <img src={nft.image || "/assets/images/nft.png"} alt={nft.title} />
        <div className="px-4 pb-4 justify-between h-[130px] flex flex-col">
          <div>
            <h2 className="title text-md text-sky-500 truncate font-bold">
              {nft.wallet}
            </h2>
            <h2 className="title text-2xl text-[#E0EAF8] truncate font-bold">
              {nft.title}
            </h2>
          </div>

          <div className="flex justify-between">
            <div>
              <p className="text-xs text-[#FEE929] mb-2">Bid Price:</p>
              <p className="text-md text-[#FEE929] font-bold">
                $ {nft?.bidPrice}
              </p>
            </div>
            <div className="text-end">
              <p className="text-xs text-[#FEE929] mb-2">Buyout Price:</p>
              <p className="text-md text-[#FEE929] font-bold">
                $ {nft.buyoutPrice}
              </p>
            </div>
          </div>
        </div>
      </div>
    </a>
  );
}
