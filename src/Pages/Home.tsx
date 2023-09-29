import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import links from "../data/links.json";
import { useCallback, useRef, useState } from "react";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import moment from "moment";
import { IUser, useFirebase } from "../Context/FirebaseProvider";

const Home = () => {
  const { user, app, updateUser } = useFirebase();
  const address = useAddress();
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState<IUser>({
    name: user?.name || "",
    uid: user?.uid || "",
    email: user?.email || "",
    photo: user?.photo || "",
    socialNetworks: [
      {
        title: "E-mail",
        link: user?.email || "",
      },
    ],
    gdpr: user?.gdpr || false,
  });
  const [file] = useState<File | null>(null);
  const gdprRef = useRef<HTMLInputElement | null>(null);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = useCallback(() => {
    setIsEditing(false);
    setEditedUser({
      name: user?.name || "",
      uid: user?.uid || "",
      email: user?.email || "",
      photo: user?.photo || "",
      socialNetworks: [
        {
          title: "E-mail",
          link: user?.email || "",
        },
      ],
      gdpr: user?.gdpr || false,
    });
  }, [user?.email, user?.gdpr, user?.name, user?.photo, user?.uid]);

  const uploadImageAndGetURL = useCallback(
    async (file: File): Promise<string | null> => {
      const storage = getStorage(app);
      const storageRef = ref(
        storage,
        "usersImages/" + `${file.name}-${moment().format("LLL")}`
      );

      try {
        await uploadBytes(storageRef, file);
        const url = await getDownloadURL(storageRef);
        return url;
      } catch (error) {
        console.error("Error uploading image:", error);
        return null;
      }
    },
    [app]
  );

  const handleImageUpload = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFile = e.target.files?.[0];
      if (selectedFile) {
        const imageUrl = await uploadImageAndGetURL(selectedFile);
        if (imageUrl) {
          setEditedUser({ ...editedUser, photo: imageUrl });
          // Clear the file input
          // document.getElementById("fileInput")!.value = "";
        }
      }
    },
    [uploadImageAndGetURL, editedUser]
  );

  const handleSaveEdit = useCallback(async () => {
    if (!gdprRef.current) {
      alert("Please agree to the Privacy Policy.");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(editedUser.email)) {
      alert("Invalid email format.");
      return;
    }

    if (file) {
      const imageUrl = await uploadImageAndGetURL(file);
      if (!imageUrl) {
        alert("Image upload failed. Please try again.");
        return;
      }
      setEditedUser({ ...editedUser, photo: imageUrl });
    }

    try {
      updateUser(editedUser);
    } catch (error) {
      return;
    }

    setIsEditing(false);
  }, [editedUser, file, updateUser, uploadImageAndGetURL]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setEditedUser({ ...editedUser, [name]: value });
    },
    [editedUser]
  );

  const profile = useCallback(() => {
    return (
      <div className="items-center justify-center flex">
        <div className="flex flex-col justify-center p-6 shadow-md rounded-xl sm:px-12 dark:text-gray-100">
          <div className="space-y-4 divide-y divide-gray-700 text-center ">
            <div className="my-2 space-y-1">
              {isEditing ? (
                <form className="flex flex-col">
                  <div className="flex">
                    <img
                      src={
                        editedUser.photo ||
                        user?.photo ||
                        `https://api.dicebear.com/6.x/bottts/png?seed=${user?.publicAddress}`
                      }
                      alt=""
                      className="w-32 h-32 mx-auto rounded-full aspect-square"
                    />
                    <div className="absolute h-10 w-10 items-center ml-44 flex justify-center">
                      <input
                        id="fileInput"
                        type="file"
                        accept="image/*"
                        placeholder="Choose file"
                        onChange={handleImageUpload}
                        className="self-center max-w-[100px] sr-only"
                      />
                      <label htmlFor="fileInput" className="cursor-pointer">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="40"
                          height="40"
                          fill="#2ed2ff"
                          className="bi bi-camera-fill"
                          viewBox="0 0 16 16"
                        >
                          <path d="M10.5 8.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                          <path d="M2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2zm.5 2a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zm9 2.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0z" />
                        </svg>
                      </label>
                    </div>
                  </div>

                  <InputField
                    type="text"
                    name="name"
                    placeholder="Name"
                    onChange={handleInputChange}
                  />
                  <InputField
                    type="email"
                    name="email"
                    placeholder="E-mail"
                    onChange={handleInputChange}
                  />

                  {/* {editedUser.socialNetworks.map(({ link, title }, index) => (
                    <InputField
                      key={index}
                      type="text"
                      name={`socialNetworks[${index}]`}
                      placeholder={`Link of ${title}`}
                      value={link}
                      onChange={handleInputChange}
                    />
                  ))} */}

                  <div
                    className="items-center flex justify-center"
                    ref={gdprRef}
                  >
                    <input
                      type="checkbox"
                      id="gdpr"
                      onChange={(e) => {
                        setEditedUser({
                          ...editedUser,
                          gdpr: e.target.checked,
                        });
                        if (gdprRef.current) {
                          gdprRef.current.classList.remove("error");
                        }
                      }}
                    />
                    <label htmlFor="gdpr">
                      I agree to the{" "}
                      <a href={links.privacy_policy}>Privacy Policy</a>
                    </label>
                  </div>
                </form>
              ) : (
                <>
                  <img
                    src={
                      user?.photo ||
                      `https://api.dicebear.com/6.x/bottts/png?seed=${user?.publicAddress}`
                    }
                    alt=""
                    className="w-32 h-32 mx-auto rounded-full aspect-square"
                  />
                  <div className="flex items-center justify-center">
                    <h2 className="text-xl font-semibold sm:text-2xl">
                      {user?.name || "User"}{" "}
                    </h2>
                    {!isEditing && (
                      <button
                        onClick={handleEditClick}
                        className="p-2 rounded-md dark:text-gray-100 hover:dark:text-violet-400"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-sliders"
                          viewBox="0 0 16 16"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M11.5 2a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM9.05 3a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0V3h9.05zM4.5 7a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM2.05 8a2.5 2.5 0 0 1 4.9 0H16v1H6.95a2.5 2.5 0 0 1-4.9 0H0V8h2.05zm9.45 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm-2.45 1a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0v-1h9.05z"
                          />
                        </svg>
                      </button>
                    )}
                  </div>

                  <div className="flex justify-center pt-2 space-x-4 align-center">
                    {user?.socialNetworks &&
                      user.socialNetworks.map(({ title, link }, index) => (
                        <a
                          key={index}
                          rel="noopener noreferrer"
                          href={link}
                          target="_blank"
                          aria-label={`Social Network ${index + 1}`}
                          className="p-2 rounded-md dark:text-gray-100 hover:dark:text-violet-400"
                        >
                          {title === "E-mail" && (
                            <div className="flex items-center">
                              <svg
                                viewBox="0 0 512 512"
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-4 h-4 fill-current"
                              >
                                <path d="M464 64H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V112c0-26.51-21.49-48-48-48zm0 48v40.805c-22.422 18.259-58.168 46.651-134.587 106.49-16.841 13.247-50.201 45.072-73.413 44.701-23.208.375-56.579-31.459-73.413-44.701C106.18 199.465 70.425 171.067 48 152.805V112h416zM48 400V214.398c22.914 18.251 55.409 43.862 104.938 82.646 21.857 17.205 60.134 55.186 103.062 54.955 42.717.231 80.509-37.199 103.053-54.947 49.528-38.783 82.032-64.401 104.947-82.653V400H48z"></path>
                              </svg>
                              <p className="px-2 text-xs sm:text-base dark:text-gray-400">
                                {link}
                              </p>
                            </div>
                          )}

                          {title === "X" && (
                            <svg
                              viewBox="0 0 512 512"
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-4 h-4 fill-current"
                            >
                              <path d="M464 64H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V112c0-26.51-21.49-48-48-48zm0 48v40.805c-22.422 18.259-58.168 46.651-134.587 106.49-16.841 13.247-50.201 45.072-73.413 44.701-23.208.375-56.579-31.459-73.413-44.701C106.18 199.465 70.425 171.067 48 152.805V112h416zM48 400V214.398c22.914 18.251 55.409 43.862 104.938 82.646 21.857 17.205 60.134 55.186 103.062 54.955 42.717.231 80.509-37.199 103.053-54.947 49.528-38.783 82.032-64.401 104.947-82.653V400H48z"></path>
                            </svg>
                          )}
                        </a>
                      ))}
                  </div>

                  <p className="px-5 text-xs sm:text-base dark:text-gray-400">
                    {user?.publicAddress || ""}
                  </p>
                </>
              )}
            </div>
            <div className="flex justify-center pt-2 space-x-4 align-center">
              {isEditing && (
                <>
                  <button
                    onClick={handleSaveEdit}
                    className="p-2 rounded-md dark:text-gray-100 hover:dark:text-violet-400"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="p-2 rounded-md dark:text-gray-100 hover:dark:text-violet-400"
                  >
                    Cancel
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }, [
    editedUser,
    handleCancelEdit,
    handleImageUpload,
    handleInputChange,
    handleSaveEdit,
    isEditing,
    user?.name,
    user?.photo,
    user?.publicAddress,
    user?.socialNetworks,
  ]);

  return (
    <div className="flex flex-col items-center justify-between min-h-[85vh]">
      <div />

      <div>
        {address ? (
          profile()
        ) : (
          <h1 className="font-saira font-semibold text-2xl md:text-4xl xl:text-6xl leading-[1.349] text-center uppercase self-center w-[300px] md:w-[427px] lg:w-[427px] xl:w-[727px]">
            Enter the metaverse of web3{" "}
            <span className="text-[#2ed2ff]">gaming</span>
          </h1>
        )}

        <div className="mt-4 items-center justify-center flex">
          {!address && (
            <ConnectWallet
              style={{
                background: "transparent",
                color: "#cd94ff",
                borderRadius: 10,
                padding: 10,
                paddingRight: 30,
                paddingLeft: 30,
                border: "2px solid #cd94ff",
              }}
              theme={"dark"}
              btnTitle={"Connect"}
              switchToActiveChain={true}
              modalSize={"wide"}
              welcomeScreen={{
                title: "Enter the metaverse of web3 gaming!",
                subtitle: "Choose an option to get started.",
                img: {
                  src: "/assets/images/logo.png",
                  width: 100,
                  height: 50,
                },
              }}
              modalTitleIconUrl={""}
              className="mx-4"
            />
          )}

          {address && (
            <a
              href="/waitlist"
              className="mx-4 border-2 border-[#2ed2ff] text-[#2ed2ff] p-[5.5px] px-[20px] rounded-[10px]"
            >
              Download
            </a>
          )}
        </div>
      </div>
      <footer className="bottom-0 flex justify-between w-full self-center px-4">
        <a href={links.saga}>
          <img
            src="/assets/images/saga.png"
            alt="Saga logo"
            className="md:h-[30px] h-[20px]"
          />
        </a>
        <a href={links.youtube}>
          <img
            src="/assets/images/yaygames.png"
            alt="YAY Games logo"
            className="md:h-[30px] h-[20px]"
          />
        </a>
      </footer>
    </div>
  );
};

export default Home;

const InputField = ({ name, placeholder, onChange }: any) => {
  return (
    <form>
      <input
        type="text"
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        className="my-2 px-4 w-[270px] focus:outline-none py-[5px] font-semibold bg-transparent border-2 border-sky-500 rounded-xl"
      />
    </form>
  );
};
