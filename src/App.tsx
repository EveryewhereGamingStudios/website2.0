import BlogProvider from "./Context/BlogProvider";
import FirebaseProvider from "./Context/FirebaseProvider";
import Routes from "./Router";
import {
  ThirdwebProvider,
  // bloctoWallet,
  coinbaseWallet,
  localWallet,
  // frameWallet,
  // localWallet,
  magicLink,
  metamaskWallet,
  smartWallet,
  // rainbowWallet,
  // safeWallet,
  // trustWallet,
  // walletConnect,
  // zerionWallet,
} from "@thirdweb-dev/react";
import "./Styles/styles.scss";

const App = () => {
  return (
    <>
      <ThirdwebProvider
        supportedWallets={[
          metamaskWallet(),
          coinbaseWallet(),
          // walletConnect(),
          // safeWallet({
          //   personalWallets: [
          //     metamaskWallet(),
          //     coinbaseWallet(),
          //     walletConnect(),
          //   ],
          // }),
          // localWallet(),
          // trustWallet(),
          // zerionWallet(),
          // bloctoWallet(),
          // frameWallet(),
          // rainbowWallet(),
          magicLink({
            apiKey: "pk_live_056D523F9E58FD92",
            oauthOptions: {
              providers: [
                "google",
                // "facebook",
                // "twitter",
                // "apple",
                // "discord",
                // "github",
                // "twitch",
              ],
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
