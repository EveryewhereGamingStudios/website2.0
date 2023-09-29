import { useCallback } from "react";
import { useFirebase } from "../Context/FirebaseProvider";

export function Resources() {
  const { users } = useFirebase();

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
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8 p-4">
      <div className="rounded-lg  p-4">
        <dl className="-my-3 divide-y divide-sky-900 text-sm">
          <div className="flex w-full items-center p-2 justify-center">
            <span className="text-xl text-sky-500">
              Accounts created ({users.length})
            </span>
          </div>
          {users?.map((item, index) => {
            return (
              <div className="flex justify-start items-center p-2" key={index}>
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

      <div className="rounded-lg p-4">
        <dl className="-my-3 divide-y divide-sky-900 text-sm">
          <div className="flex w-full items-center p-2 justify-center">
            <span className="text-xl text-sky-500">NFTs minted</span>
          </div>
          {users?.map((item, index) => {
            return (
              <div className="flex justify-start items-center p-2" key={index}>
                <img
                  src={
                    item?.photo ||
                    `https://api.dicebear.com/6.x/bottts/png?seed=${item?.publicAddress}`
                  }
                  alt=""
                  className="w-8 h-8 mr-2 rounded-full aspect-square"
                />
                <dt className="font-medium text-gray-300 truncate"></dt>
              </div>
            );
          })}
        </dl>
      </div>
    </div>
  );
}

export default Resources;
