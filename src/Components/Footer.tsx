import { SocialNetworks } from "./SocialNetworks";

export function Footer() {
  return (
    <>
      {SocialNetworks()}
      <div className="flex w-[94%] bottom-0 absolute flex-row justify-between border-t border-white pt-4 pb-8">
        <div>
          <span className="text-xs">
            © 2023. Cosmic Exodus, All rights reserved.{" "}
          </span>
        </div>
        <div>
          <img src="logos/logo.png" alt="Logo Cosmic Exodus" />
        </div>
      </div>{" "}
    </>
  );
}
