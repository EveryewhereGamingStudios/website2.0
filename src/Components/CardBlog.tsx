import { IBlogPost } from "../Context/BlogProvider";

export function CardBlog(article: IBlogPost) {
  return (
    <div className="m-4 bg-opacity-10 rounded-lg w-[300px] border border-[#30D1FF]">
      <img
        src={article.coverImage || "/assets/images/space.png"}
        alt={article.title}
      />
      <div className="p-4 border-t border-[#30D1FF]">
        <a href={`/blog/${article.uuid}`}>
          <h2 className="title text-xl text-[#30D1FF] mb-2">{article.title}</h2>
        </a>
        <p className="text-sm mb-2">
          {article.content[0].desctiption.slice(0, 120)} ...
        </p>
        <div className="flex justify-between">
          <p className="text-xs text-[#30D1FF]">3 min</p>
          <p className="text-xs text-[#30D1FF]">
            {article.createdAt.toString()}
          </p>
        </div>
      </div>
    </div>
  );
}
