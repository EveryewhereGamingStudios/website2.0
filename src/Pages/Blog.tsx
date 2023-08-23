import { useContext, useEffect } from "react";
import { BlogContext } from "../Context/BlogProvider";

const Blog = () => {
  const { articles, loading, error, getArticles } = useContext(BlogContext);

  useEffect(() => {
    getArticles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="blog">
        {loading && <p className="loading">Loading...</p>}
        {error && <p className="error">{error}</p>}
        {articles?.map((article) => {
          const date = article.date
            ? new Date(article.date.seconds * 1000)
            : new Date();
          return (
            <div className="article" key={article.id}>
              <img
                src={article.image || "/assets/images/space.png"}
                alt={article.title}
              />
              <div className="card_article">
                <a href={`/blog/${article.id}`}>
                  <h2 className="title">{article.title} </h2>
                </a>
                <p className="summary">{article.summary.slice(0, 120)} ...</p>
                <div className="card-bottom">
                  <p className="time">3 min</p>
                  <p className="date">{date.toDateString()}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Blog;
