import { useState, useRef, useEffect, useCallback } from "react";
import links from "../data/links.json";
import { useFirebase } from "../Context/FirebaseProvider";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gdpr, setGdpr] = useState(false);
  const { signUpWithEmail, error, signedUp, user } = useFirebase();
  const gdprRef = useRef<HTMLInputElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({
    name: user?.name || "",
    email: user?.email || "",
    photo: user?.photo || "",
    socialNetworks: user?.socialNetworks || [],
    gdpr: false,
  });

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedUser({
      name: user?.name || "",
      email: user?.email || "",
      photo: user?.photo || "",
      socialNetworks: user?.socialNetworks || [],
      gdpr: false,
    });
  };

  const handleSaveEdit = () => {
    // Update the user's profile data in your database or state here
    // You can use Firebase Firestore or another backend service for this

    // After updating, close the edit mode
    setIsEditing(false);
  };

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setEditedUser({ ...editedUser, [name]: value });
  };

  const submitForm = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (gdpr && email) {
      try {
      } catch {}
    } else {
      // add class to gdpr label .error
      if (gdprRef.current) {
        gdprRef.current.classList.add("error");
      }
    }
  };

  const profileForm = (
    <>
      <form className="flex flex-wrap items-center justify-center">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />

        <input
          type="text"
          placeholder="Email Address"
          className="md:mt-0 mt-4"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />

        <button type="submit" onClick={submitForm}>
          Update
        </button>
      </form>
    </>
  );

  return (
    <>
      {user ? (
        <div className="waitlist">
          <div className="flex flex-col justify-center p-6 shadow-md rounded-xl sm:px-12 dark:text-gray-100">
            <div className="space-y-4 text-center divide-y divide-gray-700">
              <div className="my-2 space-y-1">
                {isEditing ? (
                  <form className="flex flex-col">
                    <img
                      src={
                        editedUser.photo ||
                        `https://api.dicebear.com/6.x/bottts/png?seed=${user?.publicAddress}`
                      }
                      alt=""
                      className="w-32 h-32 mx-auto rounded-full aspect-square"
                    />
                    <input
                      type="text"
                      name="name"
                      placeholder="Name"
                      value={editedUser.name}
                      onChange={handleInputChange}
                      className="px-2 font-semibold bg-transparent border-2 border-sky-500 rounded-lg"
                    />

                    <input
                      type="text"
                      name="email"
                      placeholder="E-mail"
                      value={editedUser.email}
                      onChange={handleInputChange}
                      className="px-2 font-semibold bg-transparent border-2 border-sky-500 rounded-lg"
                    />
                    {/* GDPR authorization */}
                    <div className="items-center flex mb-4" ref={gdprRef}>
                      <input
                        type="checkbox"
                        id="gdpr"
                        onChange={(e) => {
                          setGdpr(e.target.checked);
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
                    <p className="px-5 text-xs sm:text-base dark:text-gray-400">
                      {editedUser.email || user.publicAddress}
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
      ) : (
        <div>
          <span>Connect wallet to access your profile!</span>
        </div>
      )}
    </>
  );
};

export default Signup;
