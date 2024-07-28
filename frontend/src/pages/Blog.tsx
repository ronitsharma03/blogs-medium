import { useGetBlog } from "../hooks";
import { Avatar } from "../components/ui/BlogCard";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import { SingleBlogSkeleton } from "../components/ui/SingleBlogSkeleton";
import { useState, useEffect } from "react";

interface Blog {
  id: string;
  title: string;
  content: string;
  author: {
    name: string;
  };
  imgageUrl: string;
  createdAt: string;
}

export const Blog = () => {
  const { id } = useParams<{ id: string }>();
  const blogId = id as string;
  const { blogs, loading } = useGetBlog(blogId);
  const [loader, setLoader] = useState<boolean>(true);

  useEffect(() => {
    if (!loading && blogs) {
      setLoader(false);
    }
  }, [loading, blogs]);

  useEffect(() => {
    if (!blogs && !loading) {
      toast.error("Something went wrong, Try again", {
        id: "wrong",
        duration: 1000,
      });
    }
  }, [blogs, loading]);

  return (
    <section className="min-h-screen w-full px-4 sm:px-6 lg:px-8">
      {loader ? (
        <div className="min-h-screen flex items-center justify-center">
          <SingleBlogSkeleton />
        </div>
      ) : (
        blogs && (
          <div className="w-full min-h-screen flex justify-center mt-10">
            <div className="max-w-4xl w-full p-5 animate-fadeIn">
              <div
                className="text-2xl sm:text-3xl font-extrabold mb-4 border-b pb-2 break-words animate-slideUp"
                dangerouslySetInnerHTML={{ __html: blogs.title }}
              />
              {blogs.imgageUrl && (
                <img
                  src={blogs.imgageUrl}
                  alt="Thumbnail"
                  className="w-full h-auto rounded-lg mb-4 border object-cover animate-fadeIn"
                />
              )}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-4 border-t border-b py-3 mt-4 animate-slideUp">
                <div>
                  <Avatar name={String(blogs.author.name)} />
                </div>
                <div className="text-sm text-gray-600">
                  {blogs.author.name} |{" "}
                  {new Date(blogs.createdAt).toLocaleDateString()}
                </div>
              </div>
              <div
                className="text-base sm:text-lg font-normal text-slate-700 mb-10 font-serif tracking-wide max-w-full sm:max-w-5xl text-justify animate-fadeIn"
                dangerouslySetInnerHTML={{ __html: blogs.content }}
              />
            </div>
          </div>
        )
      )}
    </section>
  );
};
