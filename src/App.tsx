import APIProvider from "./Context/APIProvider";
import BlogProvider from "./Context/BlogProvider";
import FirebaseProvider from "./Context/FirebaseProvider";
import Routes from "./Router";
import { ThirdwebProvider, localWallet, metamaskWallet } from "@thirdweb-dev/react";
import "./Styles/styles.scss";

const App = () => {
    return <>
    
    <ThirdwebProvider 
        supportedWallets={[ localWallet(), metamaskWallet() ]}
        activeChain="goerli">
        <APIProvider>
            <FirebaseProvider>
                <BlogProvider>
                    <Routes />
                </BlogProvider>   
            </FirebaseProvider> 
        </APIProvider>
    </ThirdwebProvider>

    </>
};

export default App;