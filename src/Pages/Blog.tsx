import { useEffect } from "react";
import { useBlog } from "../Context/BlogProvider";
import { CardBlog } from "../Components/CardBlog";

const Blog = () => {
  const { articles, loading, error, getArticles } = useBlog();

  useEffect(() => {
    getArticles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-wrap justify-around ">
      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}
      {articles?.map((article) => article && CardBlog(article))}
    </div>
  );
};

export default Blog;
