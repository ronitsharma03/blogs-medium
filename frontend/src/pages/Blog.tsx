import { useParams } from "react-router-dom";
import { useGetBlog } from "../hooks";
import { Spinner } from "../components/ui/Spinner";
import { Avatar } from "../components/ui/BlogCard";
import toast, { Toaster } from "react-hot-toast";

export const Blog = () => {
  const { id } = useParams();
  const blogId = id as string;
  const { blogs, loading } = useGetBlog(blogId);
  if (!blogs) {
    toast.error("Something went wrong, Try again", {
      id: "wrong",
      duration: 1000,
    });
    return (
      <div>
        <Toaster position="top-center" />
      </div>
    );
  }

  return (
    <section>
      {loading ? (
        <div className="h-screen">
          <Spinner />
        </div>
      ) : (
        <div className="w-full min-h-screen flex justify-center mt-10">
          <div className="max-w-4xl p-5 h-full">
            <div className="text-5xl font-extrabold mb-6 max-sm:text-3xl border-b pb-2">
              {blogs.title}
            </div>
            <img src={blogs.imageUrl || "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} alt="Thumbnail" />
            <div className="flex items-center gap-3 mb-4 border-t border-b py-3 mt-4">
              <div>
                <Avatar name={String(blogs.author.name)} />
              </div>
              <div>
                {blogs.author.name} |{" "}
                {String(blogs?.createdAt)
                  .split("T")[0]
                  .split("-")
                  .reverse()
                  .join("-")}
              </div>
            </div>
            <div className="text-xl max-sm:text-lg font-normal text-slate-700 mb-10 font-serif tracking-wide max-w-5xl text-justify">
              {blogs.content}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
