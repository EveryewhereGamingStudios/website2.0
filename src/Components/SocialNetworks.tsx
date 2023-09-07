export function SocialNetworks() {
  const socialNetworks = [
    {
      title: "X",
      img: "/logos/mdi_x.png",
      action: "https://x.com/Cosmic_Exodus",
    },
    {
      title: "LinkdIn",
      img: "/logos/ri_linkedin-fill.png",
      action: "https://www.linkedin.com/company/cosmic-exodus/",
    },
    {
      title: "Youtube",
      img: "/logos/mdi_youtube.png",
      action: "https://www.youtube.com/@cosmicexodus",
    },
    {
      title: "Discord",
      img: "/logos/ic_baseline-discord.png",
      action: "https://discord.com/invite/36AdSFvSX5",
    },
  ];

  return (
    <div className="h-[200px] flex w-full justify-center items-center flex-col py-12 mt-18">
      <h1 className="mb-16 text-3xl font-semibold text-center">
        Support us in social media
      </h1>
      <div className="flex items-center justify-around">
        {socialNetworks?.map((social, index) => {
          return (
            <a
              href={social?.action}
              target="_blank"
              rel="noreferrer"
              key={index}
              className="mx-4"
            >
              <img src={social?.img} alt={social?.title} />
            </a>
          );
        })}
      </div>
    </div>
  );
}
