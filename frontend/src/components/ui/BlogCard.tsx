import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";

export interface BlogCardProps {
  id: string;
  authorname: string;
  title: string;
  content: string;
  publishedDate: string;
  imageUrl: string;
}

export const BlogCard = ({
  id,
  authorname,
  title,
  content,
  publishedDate,
  imageUrl,
}: BlogCardProps) => {
  const generateShareLink = () => {
    const location = `${window.location.origin}/blog/${id}`;
    return location;
  };

  const copyToClipboard = () => {
    const link = generateShareLink();
    navigator.clipboard
      .writeText(link)
      .then(() => {
        toast.success("Link copied", {
          id: "copy",
          duration: 1500,
        });
        setClicked(false);
      })
      .catch((err) => {
        toast.error(`Cannot copy link ${err}`, {
          id: "copy",
          duration: 1500,
        });
      });
  };

  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(!clicked);
  };

  const CopyLink = () => {
    return (
      <div className="absolute right-10 bottom-16 px-6 py-2 text-center flex items-center justify-center border rounded-lg p-2 bg-white shadow-md">
        <button className="h-full w-full" onClick={copyToClipboard}>
          Copy
        </button>
      </div>
    );
  };

  return (
    <div className="relative px-10 py-2 border-b max-md:px-4">
      <div className="flex items-center gap-2">
        <div>
          <Avatar name={authorname} />
        </div>
        <div className="text-md text-slate-900 font-normal">{authorname}</div>
        <div className="text-slate-500 font-light text-xs">&#9679;</div>
        <div className="text-sm text-slate-600 font-light">{publishedDate}</div>
      </div>

      <div className="mt-4">
        <div className="flex flex-row-reverse max-md:flex-col items-start justify-start">
          <div>
            <img
              className="rounded-xl md:ml-4 mt-4 mb-8 max-md:max-w-[55%] max-w-[80%]"
              src={imageUrl}
              alt="Thumbnail"
            />
            
          </div>

          <div className="max-w-xl max-md:w-full">
            <div className="font-bold text-4xl mb-2">
              {title.length > 100 ? title.slice(0, 100) + "..." : title}
            </div>
            <div className="text-slate-800 text-lg flex items-start mt-1 text-justify">
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
        </div>
      </div>

      <div className="mt-8 flex flex-row items-center justify-between">
        <div>{`${Math.ceil(content.length / 1000)}+ min read`}</div>
        <div>
          <div>
            <button onClick={handleClick} className="text-slate-500">
              •••
            </button>
          </div>
          {clicked && <CopyLink />}
        </div>
      </div>
      <div>
        <Toaster position="bottom-left" />
      </div>
    </div>
  );
};

export const Avatar = ({ name }: { name: string }) => {
  return (
    <div className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center">
      <span className="font-medium text-black">
        {name.charAt(0).toUpperCase() ||
          "" + name.split(" ")[1].charAt(0).toUpperCase() ||
          ""}
      </span>
    </div>
  );
};
