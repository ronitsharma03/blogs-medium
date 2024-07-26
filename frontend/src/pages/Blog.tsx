import { useGetBlog } from "../hooks";
import { Avatar } from "../components/ui/BlogCard";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import { SingleBlogSkeleton } from "../components/ui/SingleBlogSkeleton";
import { useState, useEffect } from "react";

// Define the type for a Blog
interface Blog {
  id: string;
  title: string;
  content: string;
  author: {
    name: string;
  };
  imageUrl?: string;
  createdAt: string;
}

export const Blog = () => {
  const { id } = useParams<{ id: string }>(); // Specify that id is a string
  const blogId = id as string;
  const { blogs, loading } = useGetBlog(blogId);
  const [loader, setLoader] = useState<boolean>(true);

  // Use useEffect to set loader to false when blogs data is available
  useEffect(() => {
    if (!loading && blogs) {
      setLoader(false);
    }
  }, [loading, blogs]);

  // Handle the case when blogs are undefined after loading
  useEffect(() => {
    if (!blogs && !loading) {
      toast.error("Something went wrong, Try again", {
        id: "wrong",
        duration: 1000,
      });
    }
  }, [blogs, loading]);

  return (
    <section className="min-h-screen w-full">
      {loader ? (
        <div className="min-h-screen">
          <SingleBlogSkeleton />
        </div>
      ) : (
        blogs && (
          <div className="w-full min-h-screen flex justify-center mt-10">
            <div className="max-w-4xl p-5 h-full">
              <div
                className="text-4xl font-extrabold mb-6 max-sm:text-3xl border-b pb-2 break-words"
                dangerouslySetInnerHTML={{ __html: blogs.title }}
              />
              <img
                src={
                  blogs.imageUrl ||
                  "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                }
                alt="Thumbnail"
                className="w-full h-auto rounded-md mb-4"
              />
              <div className="flex items-center gap-3 mb-4 border-t border-b py-3 mt-4">
                <div>
                  <Avatar name={String(blogs.author.name)} />
                </div>
                <div>
                  {blogs.author.name} |{" "}
                  {String(blogs.createdAt)
                    .split("T")[0]
                    .split("-")
                    .reverse()
                    .join("-")}
                </div>
              </div>
              <div
                className="text-xl max-sm:text-lg font-normal text-slate-700 mb-10 font-serif tracking-wide max-w-5xl text-justify"
                dangerouslySetInnerHTML={{ __html: blogs.content }}
              />
            </div>
          </div>
        )
      )}
    </section>
  );
};
