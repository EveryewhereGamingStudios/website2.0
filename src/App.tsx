import BlogProvider from "./Context/BlogProvider";
import FirebaseProvider from "./Context/FirebaseProvider";
import Routes from "./Router";
import {
  ThirdwebProvider,
  localWallet,
  metamaskWallet,
} from "@thirdweb-dev/react";
import "./Styles/styles.scss";

const App = () => {
  return (
    <>
      <ThirdwebProvider
        supportedWallets={[localWallet(), metamaskWallet()]}
        activeChain="goerli"
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
