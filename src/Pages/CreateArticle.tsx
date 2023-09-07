import React, { useState, useCallback } from "react";

export default function CreateArticle() {
  const [articleData, setArticleData] = useState({
    articleTitle: "",
    bannerImage: "",
    link: "",
    date: new Date().getDate(),
    timeToRead: "",
    content: [
      {
        title: "",
        description: "",
      },
    ],
  });

  const handleInputChange = useCallback(
    (e: { target: { name: any; value: any } }) => {
      const { name, value } = e.target;
      setArticleData({ ...articleData, [name]: value });
    },
    [articleData]
  );

  const handleContentChange = useCallback(
    (index: any, e: any) => {
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

  const handleSubmit = useCallback((e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      setArticleData({
        articleTitle: "",
        bannerImage: "",
        timeToRead: "",
        date: new Date().getDate(),
        link: "",
        content: [
          {
            title: "",
            description: "",
          },
        ],
      });
    } catch (error) {
      console.error("Error saving article:", error);
    }
  }, []);

  return (
    <div className="w-screen h-full min-h-screen mx-auto px-32 pt-8 p-4 bg-sky-950">
      <h1 className="text-2xl font-bold mb-4">Create a New Article</h1>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-row justify-between w-full flex-wrap">
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
              className="border border-gray-300 p-2 w-full rounded"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="bannerImage"
              className="block text-sm font-semibold"
            >
              Banner Image URL:
            </label>
            <input
              type="text"
              id="bannerImage"
              name="bannerImage"
              value={articleData.bannerImage}
              onChange={handleInputChange}
              className="border border-gray-300 p-2 w-full rounded"
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
              className="border border-gray-300 p-2 w-full rounded"
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
              className="border border-gray-300 p-2 w-full rounded"
            />
          </div>
        </div>

        {articleData.content.map((contentItem, index) => (
          <div key={index} className="mb-4">
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
              className="border border-gray-300 p-2 w-full rounded"
            />
            <label
              htmlFor={`contentDescription-${index}`}
              className="block text-sm font-semibold mt-2"
            >
              Description:
            </label>
            <textarea
              id={`contentDescription-${index}`}
              name="description"
              value={contentItem.description}
              onChange={(e) => handleContentChange(index, e)}
              className="border border-gray-300 p-2 w-full rounded bg-sky-950"
            />
            <button
              type="button"
              className="bg-red-500 text-white px-4 py-2 rounded mt-2"
              onClick={() => removeContentItem(index)}
            >
              Remove Content
            </button>
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
          type="submit"
          className="bg-sky-950 text-white px-4 py-2 rounded hover:bg-blue-600 mt-4 ml-8"
        >
          Create
        </button>
      </form>
    </div>
  );
}
