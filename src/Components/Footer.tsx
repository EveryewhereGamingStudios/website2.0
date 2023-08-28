import { SocialNetworks } from "./SocialNetworks";

export function Footer() {
  return (
    <footer className=" solid flex flex-col mt-auto">
      <SocialNetworks />
      <div className="flex w-full self-center flex-row justify-between border-t border-white pt-4 mt-20 pb-8 ">
        <div>
          <span className="text-xs">
            © 2023. Cosmic Exodus, All rights reserved.{" "}
          </span>
        </div>
        <div>
          <img src="logos/logo.png" alt="Logo Cosmic Exodus" />
        </div>
      </div>
    </footer>
  );
}
