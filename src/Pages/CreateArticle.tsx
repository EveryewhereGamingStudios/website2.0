import React, { useState } from "react";

export default function CreateArticle() {
  const [articleData, setArticleData] = useState({
    mainTitle: "",
    bannerImage: "",
    link: "",
    content: [
      {
        title: "",
        description: "",
      },
    ],
  });

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setArticleData({ ...articleData, [name]: value });
  };

  const handleContentChange = (
    index: number,
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const updatedContent = [...articleData.content];
    updatedContent[index] = { ...updatedContent[index], [name]: value };
    setArticleData({ ...articleData, content: updatedContent });
  };

  const addContentItem = () => {
    setArticleData({
      ...articleData,
      content: [...articleData.content, { title: "", description: "" }],
    });
  };

  const removeContentItem = (index: number) => {
    const updatedContent = [...articleData.content];
    updatedContent.splice(index, 1);
    setArticleData({ ...articleData, content: updatedContent });
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    // Call the function to save the new article with articleData
    // For example: addArticle(articleData);
    try {
      setArticleData({
        mainTitle: "",
        bannerImage: "",
        link: "",
        content: [
          {
            title: "",
            description: "",
          },
        ],
      });
    } catch {}
  };

  return (
    <div className="w-screen h-full min-h-screen mx-auto px-32 pt-8 p-4 bg-sky-950">
      <h1 className="text-2xl font-bold mb-4">Create a New Article</h1>
      <form onSubmit={handleSubmit}>
        {/* Main Title */}
        <div className="mb-4">
          <label className="block text-sm font-semibold">Main Title:</label>
          <input
            type="text"
            name="mainTitle"
            value={articleData.mainTitle}
            onChange={handleInputChange}
            className="border border-gray-300 p-2 w-full rounded"
          />
        </div>

        {/* Banner Image */}
        <div className="mb-4">
          <label className="block text-sm font-semibold">
            Banner Image URL:
          </label>
          <input
            type="text"
            name="bannerImage"
            value={articleData.bannerImage}
            onChange={handleInputChange}
            className="border border-gray-300 p-2 w-full rounded"
          />
        </div>

        {/* Link */}
        <div className="mb-4">
          <label className="block text-sm font-semibold">Link:</label>
          <input
            type="text"
            name="link"
            value={articleData.link}
            onChange={handleInputChange}
            className="border border-gray-300 p-2 w-full rounded"
          />
        </div>

        {/* Content */}
        {articleData.content.map((contentItem, index) => (
          <div key={index} className="mb-4">
            <label className="block text-sm font-semibold">Title:</label>
            <input
              type="text"
              name="title"
              value={contentItem.title}
              onChange={(e) => handleContentChange(index, e)}
              className="border border-gray-300 p-2 w-full rounded"
            />
            <label className="block text-sm font-semibold mt-2">
              Description:
            </label>
            <textarea
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
