import { Link } from "react-router-dom";

export interface BlogCardProps {
  id: string;
  authorname: string;
  title: string;
  content: string;
  publishedDate: string;
}

export const BlogCard = ({
  id,
  authorname,
  title,
  content,
  publishedDate,
}: BlogCardProps) => {
  return (
    <div className="px-10 py-8 border-b">
      <div className="flex items-center gap-2">
        <div>
          <Avatar name={authorname} />
        </div>
        <div className="text-md text-slate-900 font-normal">{authorname}</div>
        <div className="text-slate-500 font-light text-xs">&#9679;</div>
        <div className="text-sm text-slate-600 font-light">{publishedDate}</div>
      </div>
      <div className="mt-8">
        <div className="font-bold text-4xl mb-2">
          {title.length > 100 ? title.slice(0, 100) + "..." : title}
        </div>
        <div className="text-slate-800 text-lg flex items-start mt-1">
          {content.length > 200 ? (
            <div className="flex flex-col">
              <div>{content.slice(0, 340) + "..."}</div>
              <div>
                <Link to={`/blog/${id}`}>
                  <button className="font-light text-base p-1 text-white bg-black w-32 rounded-sm mt-4">
                    Read More
                  </button>
                </Link>
              </div>
            </div>
          ) : (
            content
          )}
        </div>
      </div>
      <div className="mt-8 flex flex-row items-center justify-between">
        <div>{`${Math.ceil(content.length / 1000)}+ min read`}</div>
        <div>
          <button className="text-slate-500">•••</button>
        </div>
      </div>
    </div>
  );
};

export const Avatar = ({ name }: { name: string }) => {
  return (
    <div className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center">
      <span className="font-medium text-black">
        {name.charAt(0).toUpperCase() || "" +
          name.split(" ")[1].charAt(0).toUpperCase() || ""}
      </span>
    </div>
  );
};
