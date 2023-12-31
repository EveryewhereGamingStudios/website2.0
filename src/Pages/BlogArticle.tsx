import { useMemo, useState } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import { useBlog } from "../Context/BlogProvider";
import { CardBlog } from "../Components/CardBlog";
import { EmojiTextWithLineBreak } from "../utils/blog";

export default function BlogArticle() {
  const { id } = useParams<{ id: string }>();
  const { articles, loading, error } = useBlog();
  const [qtd, setQtd] = useState(3);

  const formattedId = decodeURIComponent(id!).replace(/-/g, " ");

  const article = useMemo(() => {
    return articles.find((item) => item.articleTitle === formattedId);
  }, [articles, formattedId]);

  return (
    <div>
      <Helmet>
        <title>{article?.articleTitle || "Blog"}</title>
        <meta name="description" content={article?.articleTitle || "Blog"} />
        <meta name="keywords" content={article?.articleTitle || "Blog"} />
        <meta name="author" content={"Tom Couceiro"} />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />

        <meta property="og:title" content={article?.articleTitle || "Blog"} />
        <meta
          property="og:description"
          content={article?.articleTitle || "Blog"}
        />
        <meta property="og:image" content={article?.coverImage || "Blog"} />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Blog" />
      </Helmet>
      {loading ||
        (error && (
          <div className="md:p-12 p-4 bg-opacity-10 rounded-lg items-start justify-start w-full self-center flex">
            {loading && <p className="text-center loading">Loading...</p>}
            {error && <p className="text-center error">{error}</p>}
          </div>
        ))}

      <main className="pb-16 lg:pb-24 antialiased">
        <div className="flex justify-between px-4 mx-auto max-w-screen-xl ">
          <article className="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue format-invert">
            <div className="w-full self-center flex flex-col">
              <h1 className="text-3xl font-semibold text-center">
                {article?.articleTitle}
              </h1>
              <h2 className="text-xl text-center text-gray-400">
                {article?.articleDescription}
              </h2>
              <span className="text-gray-500 text-center">
                {article?.timeToRead}
              </span>
              <span className="text-gray-500 mb-12 text-center">
                {article?.date}
              </span>
            </div>

            <figure>
              <img
                src={article?.bannerImage}
                alt={article?.articleTitle}
                className="border-[#30D1FF] border rounded-xl w-full"
              />
            </figure>

            {article &&
              article?.content.map((item, index) => {
                return (
                  <div key={index} className="flex flex-col text-start">
                    <span className="font-bold text-2xl mt-8">
                      {item.title}
                    </span>
                    <span className="text-xl text-gray-400 mb-2">
                      {item?.subTitle}
                    </span>
                    <span className="text-sm leading-6">
                      <EmojiTextWithLineBreak text={item.description} />
                    </span>
                  </div>
                );
              })}

            <a
              href={article?.link}
              target="_blank"
              className="mt-6 font-bold text-[#2ed2ff] flex items-center"
              rel="noreferrer"
            >
              Join Us
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="13"
                height="13"
                viewBox="0 0 24 24"
                className="ml-[4px] mt-[1px]"
              >
                <path
                  fill="#2ed2ff"
                  d="M 5 3 C 3.9069372 3 3 3.9069372 3 5 L 3 19 C 3 20.093063 3.9069372 21 5 21 L 19 21 C 20.093063 21 21 20.093063 21 19 L 21 12 L 19 12 L 19 19 L 5 19 L 5 5 L 12 5 L 12 3 L 5 3 z M 14 3 L 14 5 L 17.585938 5 L 8.2929688 14.292969 L 9.7070312 15.707031 L 19 6.4140625 L 19 10 L 21 10 L 21 3 L 14 3 z"
                ></path>
              </svg>
            </a>
          </article>
        </div>
      </main>

      <div className="mb-20">
        <h1 className="text-3xl font-semibold text-center">
          It can be interesting too...
        </h1>
        <div className="mt-4 flex flex-wrap justify-center">
          {articles &&
            articles?.slice(0, qtd).map((article, index) => {
              if (article) return <div key={index}>{CardBlog(article)}</div>;
              return null;
            })}
        </div>
        {qtd < articles.length && (
          <div className="flex w-full items-center justify-center p-4">
            <button
              onClick={() => setQtd((x) => x + 3)}
              className="text-md font-semibold"
            >
              See more
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
