import { useEffect, useState } from "react";
import { BlogCard } from "../components/ui/BlogCard";
import { BlogSkeleton } from "../components/ui/BlogSkeleton";
// import { useBlogs } from "../hooks";
import axios from "axios";

interface Vlog{
  title: string;
  content: string;
  createdAt: string;
  author: {
    name: string;
  },
  id: string;
  imageUrl: string;
}
export const Home = () => {
  // const { loading, blogs } = useBlogs();

  const [vlog, setVlogs] = useState<Vlog[]>([]);
  const [loader, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/blog/allblogs`
        );
        console.log("res from hook", response.data.Blogs);
        setVlogs(response.data.Blogs);
      } catch (e) {
        console.log("Error fetching blogs" + e);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <section className="min-h-screen">
      {loader ? (
        <div className="min-h-screen flex flex-col items-center">
          <BlogSkeleton />
          <BlogSkeleton />
          <BlogSkeleton />
          <BlogSkeleton />
        </div>
      ) : (
        <div className="flex justify-center px-4">
          <div className="flex flex-col max-w-6xl w-full space-y-4 md:space-y-6 lg:space-y-8">
            {vlog.map((blog, index) => {
              const date = String(blog.createdAt)
                .split("T")[0]
                .split("-")
                .reverse()
                .join("-");
              return (
                <BlogCard
                  key={index}
                  id={blog.id}
                  authorname={blog.author.name}
                  title={blog.title}
                  content={blog.content}
                  publishedDate={date}
                  imageUrl={
                    blog.imageUrl 
                    // "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  }
                />
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
};
