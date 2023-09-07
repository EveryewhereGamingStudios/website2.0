import React, { useState } from "react";
// import { useBlog } from "../Context/BlogProvider";

export default function CreateArticle() {
  // const { addArticle } = useBlog();
  const [articleData, setArticleData] = useState({
    title: "",
    content: "",
    bannerImage: "",
    link: "",
  });

  const handleInputChange = (e: {
    target: { name: string; value: string };
  }) => {
    const { name, value } = e.target;
    setArticleData({ ...articleData, [name]: value });
  };

  const handleSubmit = () => {
    // Call the addArticle function from your context to save the new article
    // addArticle(articleData);
    // Optionally, you can redirect the user to the article detail page or another page
    // after successfully creating the article.
  };

  return (
    <div className="w-screen h-screen mx-auto px-32 pt-8 p-4 bg-sky-950">
      <h1 className="text-2xl font-bold mb-4">Create a New Article</h1>
      <form>
        <div className="mb-4">
          <label className="block text-sm font-semibold">Title:</label>
          <input
            type="text"
            name="title"
            value={articleData.title}
            onChange={handleInputChange}
            className="border border-gray-300 p-2 w-full rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold">Content:</label>
          <textarea
            name="content"
            value={articleData.content}
            onChange={handleInputChange}
            className="border border-gray-300 p-2 w-full rounded bg-sky-950"
          />
        </div>
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
        <button
          type="button"
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Create Article
        </button>
      </form>
    </div>
  );
}
