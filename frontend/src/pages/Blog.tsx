import { useParams } from "react-router-dom";
import { useGetBlog } from "../hooks";
import { Spinner } from "../components/ui/Spinner";
import { Avatar } from "../components/ui/BlogCard";

export const Blog = () => {
  const { id } = useParams();
  const blogId = id as string;
  const { blogs, loading } = useGetBlog(blogId);

  return (
    <section>
      {loading ? (
        <div className="h-screen">
          <Spinner />
        </div>
      ) : (
        <div className="w-full h-screen flex justify-center mt-10">
          <div className="max-w-3xl p-5 h-full">
            <div className="text-5xl font-extrabold mb-6">{blogs?.title}</div>
            <div className="flex items-center gap-3 mb-4 border-t border-b py-3">
              <div>
                <Avatar name={String(blogs?.author?.name)} />
              </div>
              <div>
                {blogs?.author?.name} |{" "}
                {String(blogs?.createdAt)
                  .split("T")[0]
                  .split("-")
                  .reverse()
                  .join("-")}
              </div>
            </div>
            <div className="text-xl font-normal text-slate-700 mb-10 font-serif tracking-wide">
              {blogs?.content}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
