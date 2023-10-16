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
                ? "https://firebasestorage.googleapis.com/v0/b/cosmic-exodus.appspot.com/o/launcher%2FCosmic%20Launcher%20Installer.exe?alt=media&token=0737da76-40f8-452e-869c-b4f737be79ed"
                : "#/Download%20launcher"
            }
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
