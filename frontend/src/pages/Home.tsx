
import { BlogCard } from "../components/ui/BlogCard";
import { Spinner } from "../components/ui/Spinner";
import { useBlogs } from "../hooks";


export const Home = () => {
  const { loading, blogs } = useBlogs();

  return (
    <section>
      
      {loading ? (
        <div className="h-screen">
          <Spinner />
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
                  imageLink={blog.imageLink}
                />
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
};
