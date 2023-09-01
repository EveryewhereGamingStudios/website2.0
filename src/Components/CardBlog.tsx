import { IBlogPost } from "../Context/BlogProvider";

export function CardBlog(article: IBlogPost) {
  return (
    <div className="flex flex-col m-4 bg-opacity-10 rounded-lg w-[300px] border border-[#30D1FF]">
      <img
        src={article.coverImage || "/assets/images/space.png"}
        alt={article.title}
        style={{ height: "170px" }}
        className="rounded-t-lg"
      />
      <div className="p-4 border-t border-[#30D1FF] justify-between h-[170px] flex flex-col">
        <a href={`/blog/${article.uuid}`}>
          <h2 className="title text-xl text-[#30D1FF] mb-2 truncate">
            {article.title}
          </h2>
        </a>
        <p className="text-sm mb-2">
          {article.content[0].desctiption.slice(0, 105)} ...
        </p>
        <div className="flex justify-between">
          <p className="text-xs text-[#30D1FF]">{article?.timeToRead}</p>
          <p className="text-xs text-[#30D1FF]">{article.createdAt}</p>
        </div>
      </div>
    </div>
  );
}
