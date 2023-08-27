import { useContext, useEffect } from "react";
import { BlogContext } from "../Context/BlogProvider";
import { CardBlog } from "../Components/CardBlog";
import { Footer } from "../Components/Footer";

const Blog = () => {
  const { articles, loading, error, getArticles } = useContext(BlogContext);

  useEffect(() => {
    getArticles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="min-h-[500px] justify-between flex flex-col">
        <div className="flex flex-wrap justify-around ">
          {loading && <p className="loading">Loading...</p>}
          {error && <p className="error">{error}</p>}
          {articles?.map((article) => article && CardBlog(article))}
        </div>
      </div>
      <div className="bottom-0 flex flex-col">{Footer()}</div>
    </>
  );
};

export default Blog;
