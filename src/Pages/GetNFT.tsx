import { Web3Button, useActiveClaimConditionForWallet, useAddress, useContract, useContractMetadata } from "@thirdweb-dev/react";

import { BigNumber, ethers } from "ethers";
import { useMemo, useState } from "react";

const CONTRACT_ADDRESS = "0x0F1c3C016Ae98D7d46254943CBa44463f6198cAd";
const NETWORK = "goerli";

const GetNFT = () => {
    const contractQuery = useContract(CONTRACT_ADDRESS, "nft-drop");
    const address = useAddress();
    const [quantity, setQuantity] = useState(1);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const activeClaimCondition = useActiveClaimConditionForWallet(
        contractQuery.contract,
        address,
    );


    const handleClaimNFT = async () => { };

    const priceToMint = useMemo(() => {
        const bnPrice = BigNumber.from(
            activeClaimCondition.data?.currencyMetadata.value || 0,
        );
        return `${ethers.utils.formatUnits(
            bnPrice.mul(quantity).toString(),
            activeClaimCondition.data?.currencyMetadata.decimals || 18,
        )} ${activeClaimCondition.data?.currencyMetadata.symbol}`;
    }, [
        activeClaimCondition.data?.currencyMetadata.decimals,
        activeClaimCondition.data?.currencyMetadata.symbol,
        activeClaimCondition.data?.currencyMetadata.value,
        quantity,
    ]);


    if (contractQuery.isLoading) return <div>Loading...</div>;
    // if (!contractQuery.contract) return <div>Contract not found</div>;

    return <>
        <div className="get-nft">
            {errorMessage && <p className="error">{errorMessage}</p>}
            {successMessage && <p className="success">{successMessage}</p>}
            { address 
            ?   <>
                <p>Click to claim your NFT</p>
                <Web3Button
                    contractAddress={contractQuery.contract?.getAddress() || ""}
                    action={(cntr) => cntr.erc721.claim(quantity)}
                    onError={(err) => setErrorMessage("Transaction Failed")}
                    onSuccess={(tx:any) => {
                        setSuccessMessage(`Transaction sent: ${tx.hash}`);
                        setErrorMessage("");
                    }}
                    theme="dark"
                >Clain NFT
                </Web3Button>
                </>
            :
                <span>No wallet connected</span>
            }
        </div>
    </>;
};

export default GetNFT;