export function Footer() {
  const footerInfo = [
    {
      id: 0,
      title: "About Us",
      action: "#/privacy-policy",
    },
    {
      id: 1,
      title: "FAQs",
      action: "#/privacy-policy",
    },
    {
      id: 2,
      title: "Contact Us",
      action: "#/privacy-policy",
    },
  ];

  return (
    <div className="flex w-full bottom-0 absolute pb-4 flex-col">
      <div className="flex justify-between items-center">
        <img src="logos/logo.png" alt="Logo Cosmic Exodus" />
        <div className="flex w-full justify-evenly items-center">
          {footerInfo?.map((item, index) => (
            <a
              href={item.action}
              className="text-[#A3A9F6] text-sm hover:text-[#30D1FF] font-bold"
              key={index}
            >
              {item.title}
            </a>
          ))}
        </div>
      </div>
      <div className="w-full flex justify-center items-center mt-8">
        <span className="text-xs">
          © 2023. Cosmic Exodus, All rights reserved.{" "}
        </span>
      </div>
    </div>
  );
}
