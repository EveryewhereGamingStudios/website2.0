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

        <div className="w-[170px] items-center justify-center flex">
          <ConnectWallet theme="dark" />
        </div>

        <div className="nav-discord desktop-only items-center w-[170px] flex justify-end">
          <a href={links.discord} className="flex">
            Join us on Discord
            <img
              src="/assets/images/discord.png"
              alt="Discord Channel icon"
              className="ml-2 h-5 w-5"
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
