const Download = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <p className="text-center">
          This is an Alpha version of our launcher. Windows will try to warn you
          about the .exe but fear not.
          <br />
          <br />
          Install the launcher to access the game.
        </p>
        <div className="w-full pb-8 text-center border-gray-700 border-b-[0.5px] mt-8">
          <a
            target="_blank"
            rel="noreferrer"
            href="https://firebasestorage.googleapis.com/v0/b/cosmic-exodus.appspot.com/o/launcher%2FCosmic%20Launcher%20Installer.exe?alt=media&token=0737da76-40f8-452e-869c-b4f737be79ed"
            className="mx-4 border-2 border-[#2ed2ff] text-[#2ed2ff] p-[5.5px] px-[20px] rounded-[10px] mt-6"
          >
            Download launcher
          </a>
        </div>
        <a
          href="/"
          className="mx-4 border-2 border-[#2ed2ff] text-[#2ed2ff] p-[5.5px] px-[20px] rounded-[10px] mt-6"
        >
          Profile
        </a>
      </div>
    </div>
  );
};

export default Download;
