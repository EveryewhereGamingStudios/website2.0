import { useContext, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import { BlogContext } from "../Context/BlogProvider";
// import sanitizeHtml from "sanitize-html";
import { CardBlog } from "../Components/CardBlog";
import { Footer } from "../Components/Footer";

const BlogArticle = () => {
  const { id } = useParams<{ id: string }>();
  const { article, articles, loading, error, getArticleById, getArticles } =
    useContext(BlogContext);

  useEffect(() => {
    if (!id) return;
    getArticles();
    getArticleById(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const seconds = article?.date.seconds || 0;
  const date = new Date(seconds * 1000).toDateString();

  console.log(articles, "<<<<<");

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
      <div className="md:p-12 p-4 bg-opacity-10 rounded-lg items-start justify-start w-full self-center flex">
        {loading && <p className="text-center loading">Loading...</p>}
        {error && <p className="text-center error">{error}</p>}
        {article && (
          <div className="w-full self-center flex flex-col">
            <h1 className="text-3xl font-semibold text-center">
              {article.title}
            </h1>
            <span className="text-gray-500 text-center">3 minute read</span>
            <span className="text-gray-500 mb-12 text-center">{date}</span>
            <img
              src={article.image || "/assets/images/spaceportal.png"}
              alt={article.title}
              className="border-[#30D1FF] border rounded-xl max-h-[300px] self-center"
            />

            <div className="prose max-w-none self-center w-full text-center mt-12">
              {article.content}
            </div>
          </div>
        )}
      </div>
      <div className="mb-20">
        <h1 className="text-3xl font-semibold text-center">
          It can be interesting too...
        </h1>
        <div className="mt-4 flex flex-wrap justify-around">
          {articles?.map((article, index) => {
            if (index > 2) return null;
            if (article) return CardBlog(article);
          })}
        </div>
      </div>
      {Footer()}
    </>
  );
};

export default BlogArticle;
