import BlogProvider from "./Context/BlogProvider";
import FirebaseProvider from "./Context/FirebaseProvider";
import Routes from "./Router";
import {
  ThirdwebProvider,
  coinbaseWallet,
  embeddedWallet,
  localWallet,
  magicLink,
  metamaskWallet,
  phantomWallet,
  rainbowWallet,
  safeWallet,
  smartWallet,
  trustWallet,
  walletConnect,
  zerionWallet,
} from "@thirdweb-dev/react";
import "./Styles/styles.scss";

const smartWalletOptions = {
  factoryAddress: "0x13430b46a04861523c961D0031B58789EA3BA1d7",
  gasless: true,
};

const App = () => {
  return (
    <>
      <ThirdwebProvider
        clientId="24d5562caeba0e6e3dad08b83bd4b3e3"
        supportedWallets={[
          smartWallet(
            metamaskWallet({ recommended: true }),
            smartWalletOptions
          ),
          smartWallet(coinbaseWallet(), smartWalletOptions),
          smartWallet(walletConnect(), smartWalletOptions),
          smartWallet(
            safeWallet({
              personalWallets: [
                metamaskWallet(),
                coinbaseWallet(),
                walletConnect(),
              ],
            }),
            smartWalletOptions
          ),
          smartWallet(localWallet(), smartWalletOptions),
          smartWallet(embeddedWallet(), smartWalletOptions),
          smartWallet(trustWallet(), smartWalletOptions),
          smartWallet(zerionWallet(), smartWalletOptions),
          smartWallet(rainbowWallet(), smartWalletOptions),
          smartWallet(phantomWallet(), smartWalletOptions),
          magicLink({
            apiKey: "pk_live_056D523F9E58FD92",
            oauthOptions: {
              providers: ["google"],
            },
          }),
        ]}
        autoConnect
        activeChain="mumbai"
      >
        <FirebaseProvider>
          <BlogProvider>
            <Routes />
          </BlogProvider>
        </FirebaseProvider>
      </ThirdwebProvider>
    </>
  );
};

export default App;
