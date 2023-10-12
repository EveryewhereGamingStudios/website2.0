import React, { useState, useCallback } from "react";
import { ref, uploadBytes, getDownloadURL, getStorage } from "firebase/storage";
import { useFirebase } from "../Context/FirebaseProvider";
import { ArticleData, useBlog } from "../Context/BlogProvider";
import moment from "moment";

function generateUUID() {
  var d = new Date().getTime();
  var d2 =
    (typeof performance !== "undefined" &&
      performance.now &&
      performance.now() * 1000) ||
    0;
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = Math.random() * 16;
    if (d > 0) {
      r = (d + r) % 16 | 0;
      d = Math.floor(d / 16);
    } else {
      r = (d2 + r) % 16 | 0;
      d2 = Math.floor(d2 / 16);
    }
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
}

export default function CreateArticle() {
  const validPassword = process.env.REACT_APP_PASSWORD;
  const { app } = useFirebase();
  const { postArticle } = useBlog();
  const [password, setPassword] = useState("");
  const [articleData, setArticleData] = useState<ArticleData>({
    uuid: generateUUID(),
    articleTitle: "",
    bannerImage: "",
    coverImage: "",
    link: "",
    date: moment().format("LL"),
    timeToRead: "",
    content: [
      {
        title: "",
        description: "",
      },
    ],
  });

  const uploadImageAndGetURL = useCallback(
    async (file: File): Promise<string | null> => {
      const storage = getStorage(app);

      const storageRef = ref(
        storage,
        // eslint-disable-next-line no-useless-concat
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
      const file = e.target.files?.[0];
      if (file) {
        const imageUrl = await uploadImageAndGetURL(file);
        if (imageUrl) {
          setArticleData({ ...articleData, bannerImage: imageUrl });
        }
      }
    },
    [articleData, uploadImageAndGetURL]
  );

  const handleCoverImageUpload = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        const imageUrl = await uploadImageAndGetURL(file);
        if (imageUrl) {
          setArticleData({ ...articleData, coverImage: imageUrl });
        }
      }
    },
    [articleData, uploadImageAndGetURL]
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setArticleData({ ...articleData, [name]: value });
    },
    [articleData]
  );

  const handleContentChange = useCallback(
    (
      index: number,
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      const { name, value } = e.target;
      const updatedContent = [...articleData.content];
      updatedContent[index] = { ...updatedContent[index], [name]: value };
      setArticleData({ ...articleData, content: updatedContent });
    },
    [articleData]
  );

  const addContentItem = useCallback(() => {
    setArticleData({
      ...articleData,
      content: [...articleData.content, { title: "", description: "" }],
    });
  }, [articleData]);

  const removeContentItem = useCallback(
    (index: number) => {
      const updatedContent = [...articleData.content];
      updatedContent.splice(index, 1);
      setArticleData({ ...articleData, content: updatedContent });
    },
    [articleData]
  );

  const handleSubmit = useCallback(
    async (e: ArticleData) => {
      if (password !== validPassword) {
        alert("Incorrect password. Access denied.");
        return;
      }

      try {
        await postArticle(e);
        setArticleData({
          uuid: "",
          articleTitle: "",
          bannerImage: "",
          coverImage: "",
          timeToRead: "",
          date: "",
          link: "",
          content: [
            {
              title: "",
              description: "",
            },
          ],
        });
        alert("Article saved with success!");
      } catch (error) {
        console.error("Error saving article:", error);
        alert("Error saving article!");
      }
    },
    [password, postArticle, validPassword]
  );

  if (password !== validPassword) {
    return (
      <div className="flex w-screen h-screen items-center justify-center p-4 bg-[#080b1c] flex-col">
        <label htmlFor="password" className="block text-sm font-semibold">
          Password:
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-gray-300 p-2 rounded bg-transparent w-[200px]"
        />
      </div>
    );
  }

  return (
    <div className="w-screen h-full min-h-screen mx-auto px-32 pt-8 p-4 bg-[#080b1c]">
      <h1 className="text-2xl font-bold mb-4">Create a New Article</h1>
      <form>
        <div className="flex flex-row justify-between w-full flex-wrap ">
          <div className="mb-4">
            <label
              htmlFor="articleTitle"
              className="block text-sm font-semibold"
            >
              Article Title:
            </label>
            <input
              type="text"
              id="articleTitle"
              name="articleTitle"
              value={articleData.articleTitle}
              onChange={handleInputChange}
              className="border border-gray-300 p-2 w-full rounded text-gray-700"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="link" className="block text-sm font-semibold">
              Link:
            </label>
            <input
              type="text"
              id="link"
              name="link"
              value={articleData.link}
              onChange={handleInputChange}
              className="border border-gray-300 p-2 w-full rounded text-gray-700"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="timeToRead" className="block text-sm font-semibold">
              Time to Read Article:
            </label>
            <input
              type="text"
              id="timeToRead"
              name="timeToRead"
              value={articleData.timeToRead}
              onChange={handleInputChange}
              className="border border-gray-300 p-2 w-full rounded text-gray-700"
            />
          </div>
        </div>
        <div className="flex flex-row justify-between w-full flex-wrap">
          <div className="mb-4">
            <label
              htmlFor="bannerImage"
              className="block text-sm font-semibold"
            >
              Banner Image:
            </label>
            <input
              type="file"
              id="bannerImage"
              accept="image/*"
              onChange={handleImageUpload}
              className="border-2 border-[#2ed2ff] p-2 rounded-xl w-[320px] mt-4"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="coverImage" className="block text-sm font-semibold">
              Cover Image:
            </label>
            <input
              type="file"
              id="coverImage"
              accept="image/*"
              onChange={handleCoverImageUpload}
              className="border-2 border-[#2ed2ff] p-2 rounded-xl w-[320px] mt-4"
            />
          </div>
        </div>

        {articleData.content.map((contentItem, index) => (
          <div key={index}>
            <label
              htmlFor={`contentTitle-${index}`}
              className="block text-sm font-semibold"
            >
              Title of paragraph {index + 1}:
            </label>
            <input
              type="text"
              id={`contentTitle-${index}`}
              name="title"
              value={contentItem.title}
              onChange={(e) => handleContentChange(index, e)}
              className="border border-gray-300 p-2 w-full rounded text-gray-700"
            />

            <div className="w-full justify-between flex flex-row">
              <label
                htmlFor={`contentDescription-${index}`}
                className="block text-sm font-semibold mt-2"
              >
                Description:
              </label>
              <button
                type="button"
                className="bg-red-500 text-white px-4 py-2 rounded mt-2"
                onClick={() => removeContentItem(index)}
              >
                Remove Content
              </button>
            </div>
            <textarea
              id={`contentDescription-${index}`}
              name="description"
              value={contentItem.description}
              onChange={(e) => handleContentChange(index, e)}
              className="border-2 border-[#2ed2ff] p-2 w-full h-[200px] bg-[#080b1c] rounded-xl"
            />
          </div>
        ))}

        <button
          type="button"
          className="bg-green-500 text-white px-4 py-2 rounded"
          onClick={addContentItem}
        >
          Add Content
        </button>

        <button
          type="button"
          className="bg-blue-600 text-white px-4 py-2 rounded ml-4"
          onClick={() => handleSubmit(articleData)}
        >
          Create Article
        </button>
      </form>
    </div>
  );
}
