
import { BlogCard } from "../components/ui/BlogCard";
import { BlogSkeleton } from "../components/ui/BlogSkeleton";
import { useBlogs } from "../hooks";


export const Home = () => {
  const { loading, blogs } = useBlogs();

  return (
    <section>
      
      {loading ? (
        <div className="min-h-screen flex flex-col items-center">
          <BlogSkeleton />
          <BlogSkeleton />
          <BlogSkeleton />
          <BlogSkeleton />
          
        </div>
      ) : (
        <div className="flex justify-center">
          <div className="flex justify-center flex-col max-w-6xl">
            {blogs.map((blog, index) => {
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
                  imageUrl={blog.imageUrl || "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
                />
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
};
