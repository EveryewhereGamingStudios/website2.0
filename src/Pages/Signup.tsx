import React, { useState, useRef, useCallback } from "react";
import { IUser, useFirebase } from "../Context/FirebaseProvider";
import links from "../data/links.json";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import moment from "moment";

const UserProfile = () => {
  const { user, app } = useFirebase();
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState<IUser>({
    name: user?.name || "",
    email: user?.email || "",
    photo: user?.photo || "",
    socialNetworks: [],
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
      email: user?.email || "",
      photo: user?.photo || "",
      socialNetworks: [],
      gdpr: user?.gdpr || false,
    });
  };

  const uploadImageAndGetURL = useCallback(
    async (file: File): Promise<string | null> => {
      const storage = getStorage(app);
      const storageRef = ref(
        storage,
        "images/" + `${file.name}-${moment().format("LLL")}`
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
    if (!gdprRef.current?.checked) {
      // Display an error message or take action if GDPR is not checked
      return;
    }

    // Add validation for email and other fields here

    if (file) {
      const imageUrl = await uploadImageAndGetURL(file);
      setEditedUser({ ...editedUser, photo: imageUrl! });
      // Clear the file input
      // document.getElementById("fileInput")!.value = "";
    }

    setIsEditing(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedUser({ ...editedUser, [name]: value });
  };

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
                    className="absolute -mt-8"
                  />
                </div>

                <InputField
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={editedUser.name}
                  onChange={handleInputChange}
                />
                <InputField
                  type="email"
                  name="email"
                  placeholder="E-mail"
                  value={editedUser.email}
                  onChange={handleInputChange}
                />

                {/* Add input fields for social networks */}
                {editedUser.socialNetworks &&
                  editedUser.socialNetworks.map((social, index) => (
                    <InputField
                      key={index}
                      type="text"
                      name={`socialNetworks[${index}]`}
                      placeholder={`Social Network ${index + 1}`}
                      value={social}
                      onChange={handleInputChange}
                    />
                  ))}

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
                    editedUser.photo ||
                    `https://api.dicebear.com/6.x/bottts/png?seed=${user?.publicAddress}`
                  }
                  alt=""
                  className="w-32 h-32 mx-auto rounded-full aspect-square"
                />
                <h2 className="text-xl font-semibold sm:text-2xl">
                  {editedUser.name || "User"}
                </h2>

                <div className="flex justify-center pt-2 space-x-4 align-center">
                  {/* Render social network links */}
                  {editedUser.socialNetworks &&
                    editedUser.socialNetworks.map((social, index) => (
                      <a
                        key={index}
                        rel="noopener noreferrer"
                        href={social}
                        target="_blank"
                        aria-label={`Social Network ${index + 1}`}
                        className="p-2 rounded-md dark:text-gray-100 hover:dark:text-violet-400"
                      >
                        {/* Replace with social network icons */}
                        Social {index + 1}
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
