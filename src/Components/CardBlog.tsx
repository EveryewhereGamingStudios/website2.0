import { ArticleData } from "../Context/types";

export function CardBlog(article: ArticleData) {
  function removeLineBreaks(text: string) {
    const regex = /<br\s*\/?>/g;
    return text.replace(regex, "");
  }

  const formattedId = decodeURIComponent(article.articleTitle).replace(
    / /g,
    "-"
  );

  return (
    <a href={`/article/${formattedId}`}>
      <div className="flex flex-col m-4 bg-opacity-10 rounded-lg w-[300px] border border-[#30D1FF]">
        <img
          src={article.coverImage || "/assets/images/space.png"}
          alt={article.articleTitle}
          style={{ height: "170px" }}
          className="rounded-t-lg"
        />
        <div className="p-4 border-t border-[#30D1FF] justify-between h-[170px] flex flex-col">
          <h2 className="title text-xl text-[#30D1FF] mb-2 truncate font-bold">
            {article.articleTitle}
          </h2>

          <p className="text-sm mb-2">
            {removeLineBreaks(article.content[0].description.slice(0, 115))} ...
          </p>
          <div className="flex justify-between">
            <p className="text-xs text-[#30D1FF]">{article?.timeToRead}</p>
            <p className="text-xs text-[#30D1FF]">{article.date}</p>
          </div>
        </div>
      </div>
    </a>
  );
}
