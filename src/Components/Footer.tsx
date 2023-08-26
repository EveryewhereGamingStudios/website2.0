export function Footer() {
  return (
    <div className="flex w-full bottom-0 justify-between items-center absolute pb-4">
      <img src="logos/logo.png" alt="Logo Cosmic Exodus" />
      <div className="flex w-full justify-evenly items-center">
        <a
          href="#/privacy-policy"
          className="text-[#A3A9F6] text-xs hover:text-[#30D1FF]"
        >
          About Us
        </a>
        <a
          href="#/privacy-policy"
          className="text-[#A3A9F6] text-xs hover:text-[#30D1FF]"
        >
          FAQs
        </a>
        <a
          href="#/privacy-policy"
          className="text-[#A3A9F6] text-xs hover:text-[#30D1FF]"
        >
          Contact Us
        </a>
      </div>
    </div>
  );
}
