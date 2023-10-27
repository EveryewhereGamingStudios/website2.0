import { useBlog } from "../Context/BlogProvider";
import { CardBlog } from "../Components/CardBlog";

function Blog() {
  const { articles, loading, error } = useBlog();

  return (
    <div className="flex flex-wrap justify-center">
      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}
      {articles?.map((article) => article && CardBlog(article))}
    </div>
  );
}

export default Blog;
