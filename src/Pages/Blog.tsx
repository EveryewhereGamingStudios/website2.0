import { useContext, useEffect } from "react";
import { BlogContext } from "../Context/BlogProvider";

const Blog = () => {
  const { articles, loading, error, getArticles } = useContext(BlogContext);

  useEffect(() => {
    getArticles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-wrap justify-around">
      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}
      {articles?.map((article) => {
        const date = article.date
          ? new Date(article.date.seconds * 1000)
          : new Date();
        return (
          <div className="m-4 bg-opacity-10 rounded-lg w-[300px] border border-[#30D1FF]">
            <img
              src={article.image || "/assets/images/space.png"}
              alt={article.title}
            />
            <div className="p-4 border-t border-[#30D1FF]">
              <a href={`/blog/${article.id}`}>
                <h2 className="title text-xl text-[#30D1FF] mb-2">
                  {article.title}
                </h2>
              </a>
              <p className="text-sm mb-2">
                {article.summary.slice(0, 120)} ...
              </p>
              <div className="flex justify-between">
                <p className="text-xs text-[#30D1FF]">3 min</p>
                <p className="text-xs text-[#30D1FF]">{date.toDateString()}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Blog;
