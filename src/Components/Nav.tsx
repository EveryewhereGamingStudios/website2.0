import { ConnectWallet } from "@thirdweb-dev/react";
import links from "../data/links.json";

const Nav = () => {
  return (
    <>
      <div className="nav px-4">
        <div className="w-[170px]">
          <a href="/">
            <img src="/assets/images/logo.png" alt="Cosmic Exodus Logo" />
          </a>
        </div>

        <div className="w-[250px] items-center justify-center flex">
          <ConnectWallet
            theme="dark"
            modalTitle="Enter the metaverse of web3 gaming"
          />
        </div>

        <div className="nav-discord desktop-only items-center w-[170px] flex justify-end">
          <a href={links.discord} className="flex items-center">
            Join us on Discord
            <img
              src="/assets/images/discord.png"
              alt="Discord Channel icon"
              className="ml-2 h-4 w-4"
            />
          </a>
        </div>

        <img
          src="/assets/images/hamburger.png"
          alt="menu toggle"
          className="sidebar-toggle mobile-only"
          onClick={() => {
            const sidebar = document.querySelector(".sidebar");
            if (sidebar) {
              sidebar.classList.toggle("sidebar-show");
            }
          }}
        />
      </div>
    </>
  );
};

export default Nav;
