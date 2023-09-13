import React, { useState, useRef, useCallback } from "react";
import { IUser, useFirebase } from "../Context/FirebaseProvider";
import links from "../data/links.json";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import moment from "moment";
import { useAddress } from "@thirdweb-dev/react";

const UserProfile = () => {
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
  const [file, setFile] = useState<File | null>(null);
  const gdprRef = useRef<HTMLInputElement | null>(null);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
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
  };

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

  const handleSaveEdit = async () => {
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
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedUser({ ...editedUser, [name]: value });
  };

  if (!address) {
    return (
      <div className="waitlist">
        <h1>Connect your wallet to access your profile!</h1>
      </div>
    );
  }

  return (
    <div className="waitlist">
      <div className="flex flex-col justify-center p-6 shadow-md rounded-xl sm:px-12 dark:text-gray-100">
        <div className="space-y-4 divide-y divide-gray-700 text-center ">
          <div className="my-2 space-y-1">
            {isEditing ? (
              <form className="flex flex-col">
                <div>
                  <img
                    src={
                      editedUser.photo ||
                      user?.photo ||
                      `https://api.dicebear.com/6.x/bottts/png?seed=${user?.publicAddress}`
                    }
                    alt=""
                    className="w-32 h-32 mx-auto rounded-full aspect-square"
                  />
                  <input
                    id="fileInput"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="self-center mt-2 max-w-[100px]"
                  />
                </div>

                <InputField
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={editedUser.name || user?.name}
                  onChange={handleInputChange}
                />
                <InputField
                  type="email"
                  name="email"
                  placeholder="E-mail"
                  value={editedUser.email || user?.email}
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

                <div className="items-center flex mb-4" ref={gdprRef}>
                  <input
                    type="checkbox"
                    id="gdpr"
                    onChange={(e) => {
                      setEditedUser({ ...editedUser, gdpr: e.target.checked });
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
                <h2 className="text-xl font-semibold sm:text-2xl">
                  {user?.name || "User"}
                </h2>

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
            {isEditing ? (
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
            ) : (
              <button
                onClick={handleEditClick}
                className="p-2 rounded-md dark:text-gray-100 hover:dark:text-violet-400"
              >
                Edit
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

const InputField = ({ type, name, placeholder, value, onChange }: any) => {
  return (
    <form>
      <input
        type="text"
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="px-2 font-semibold bg-transparent border-2 border-sky-500 rounded-lg"
      />
    </form>
  );
};
