const Waitlist = () => {
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

        <a
          target="_blank"
          rel="noreferrer"
          href="https://drive.google.com/file/d/1B0H6hBiBeeKRA269HqPWY0CWLiWy4Zpd/view"
          className="mx-4 border-2 border-[#2ed2ff] text-[#2ed2ff] p-[5.5px] px-[20px] rounded-[10px] mt-6"
        >
          Download launcher
        </a>
      </div>
    </div>
  );
};

export default Waitlist;
