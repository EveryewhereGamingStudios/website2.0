import { useContext, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import { BlogContext } from "../Context/BlogProvider";
import sanitizeHtml from "sanitize-html";

const BlogArticle = () => {
  const { id } = useParams<{ id: string }>();
  const { article, loading, error, getArticleById } = useContext(BlogContext);

  useEffect(() => {
    if (!id) return;

    getArticleById(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const seconds = article?.date.seconds || 0;
  const date = new Date(seconds * 1000).toDateString();

  return (
    <>
      <Helmet>
        <title>{article?.title || "Blog"}</title>
        <meta name="description" content={article?.summary || "Blog"} />
        <meta name="keywords" content={article?.tags.join(", ") || "Blog"} />
        <meta name="author" content={"Tom Couceiro"} />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />

        <meta property="og:title" content={article?.title || "Blog"} />
        <meta property="og:description" content={article?.summary || "Blog"} />
        <meta property="og:image" content={article?.image || "Blog"} />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Blog" />
      </Helmet>
      <div className="blog-article">
        {loading && <p className="loading">Loading...</p>}
        {error && <p className="error">{error}</p>}
        {article && (
          <>
            <img
              src={article.image || "/assets/images/spaceportal.png"}
              alt={article.title}
              className="image"
            />

            <h2 className="title">{article.title}</h2>
            <div
              className="content"
              dangerouslySetInnerHTML={{
                __html: sanitizeHtml(article.content),
              }}
            />
            <p className="date">{date}</p>
          </>
        )}
      </div>
    </>
  );
};

export default BlogArticle;
