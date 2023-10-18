import { useCallback, useState } from "react";

const Download = () => {
  const [checked, setChecked] = useState(false);

  const handleLinkHover = useCallback(() => {
    if (!checked) {
      alert("Please check the checkbox to download.");
    }
  }, [checked]);

  const handleChange = useCallback(() => {
    setChecked(!checked);
  }, [checked]);

  return (
    <dl className="transition-all ease-in-out -my-3 divide-y divide-sky-900 text-sm">
      <div className="flex flex-col items-center justify-between min-h-[80vh]">
        <div />

        <div className="items-center justify-center flex flex-col">
          <p className="text-start p-4">
            <p className="text-lg">Warning: </p>
            As of today we do not have Microsoft Credentials. This will make our
            launcher flag Windows Defender.
            <br />
            We understand this causes trust issues and people are afraid of
            installing it, due to virus/malware concerns.
            <br />
            There is not much we can do about it right now, so please understand
            and have some patience with us.
          </p>

          <div className="flex items-center w-full mb-4 px-4">
            <input
              id="default-checkbox"
              type="checkbox"
              checked={checked}
              onChange={handleChange}
            />
            <label
              htmlFor="default-checkbox"
              className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              I understand, download anyway.
            </label>
          </div>

          <img
            src="/assets/images/download-avatar.png"
            alt="Saga logo"
            className="md:h-[300px] h-[200px] my-8"
          />

          <a
            href={
              checked
                ? "https://drive.google.com/u/0/uc?id=1B0H6hBiBeeKRA269HqPWY0CWLiWy4Zpd&export=download&confirm=t&uuid=70d8a9b9-674d-4b37-a4cc-f517da755a40&at=AB6BwCBOf9zqcSn7ej484ddPIEK5:1697663643491"
                : "#/Download%20launcher"
            }
            target="_blank"
            rel="noreferrer"
            onMouseOver={handleLinkHover}
            className={` ${
              checked ? "animate-pulse" : ""
            }  mx-4 border-2 border-[#2ed2ff] text-[#2ed2ff] p-[5.5px] px-[20px] rounded-[10px]`}
          >
            Download
          </a>
        </div>

        <div />
      </div>
    </dl>
  );
};

export default Download;
