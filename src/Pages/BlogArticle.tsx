import { useEffect, useMemo } from "react";
// import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import { useBlog } from "../Context/BlogProvider";
// import sanitizeHtml from "sanitize-html";
import { CardBlog } from "../Components/CardBlog";

export default function BlogArticle() {
  const { id } = useParams<{ id: string }>();
  const { articles, loading, error, getArticles } = useBlog();

  useEffect(() => {
    getArticles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const article = useMemo(() => {
    return articles.find((item) => item.uuid === id);
  }, [articles, id]);

  return (
    <div>
      {/* <Helmet>
        <title>{article?.title || "Blog"}</title>
        <meta name="description" content={article?.title || "Blog"} />
        <meta name="keywords" content={article?.title || "Blog"} />
        <meta name="author" content={"Tom Couceiro"} />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />

        <meta property="og:title" content={article?.title || "Blog"} />
        <meta property="og:description" content={article?.title || "Blog"} />
        <meta property="og:image" content={article?.coverImage || "Blog"} />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Blog" />
      </Helmet> */}
      <div className="md:p-12 p-4 bg-opacity-10 rounded-lg items-start justify-start w-full self-center flex">
        {loading && <p className="text-center loading">Loading...</p>}
        {error && <p className="text-center error">{error}</p>}
        {article && (
          <div className="w-full self-center flex flex-col">
            <h1 className="text-3xl font-semibold text-center">
              {article.title}
            </h1>
            <span className="text-gray-500 text-center">
              {article?.timeToRead}
            </span>
            <span className="text-gray-500 mb-12 text-center">
              {article?.createdAt}
            </span>
            <img
              src={article.bannerImage || "/assets/images/spaceportal.png"}
              alt={article.title}
              className="border-[#30D1FF] border rounded-xl max-h-[300px] min-w-full self-center"
            />

            <div className="prose max-w-none self-center w-full text-center mt-12">
              {article &&
                article?.content.map((item, index) => {
                  return (
                    <div key={index} className="flex flex-col text-start">
                      <span className="font-bold text-xl mt-4 mb-2">
                        {item.title}
                      </span>
                      <span className="text-sm">{item.desctiption}</span>
                    </div>
                  );
                })}
            </div>
            <a
              href={article?.link}
              target="_blank"
              className="mt-6 font-bold"
              rel="noreferrer"
            >
              {article?.link}
            </a>
          </div>
        )}
      </div>
      <div className="mb-20">
        <h1 className="text-3xl font-semibold text-center">
          It can be interesting too...
        </h1>
        <div className="mt-4 flex flex-wrap justify-around">
          {articles &&
            articles?.map((article, index) => {
              if (index > 2) return null;
              if (article) return <div key={index}>{CardBlog(article)}</div>;
              return null;
            })}
        </div>
      </div>
    </div>
  );
}
