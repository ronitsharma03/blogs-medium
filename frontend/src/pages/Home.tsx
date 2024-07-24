
import { Appbar } from "../components/ui/Appbar";
import { BlogCard } from "../components/ui/BlogCard";
import { Spinner } from "../components/ui/Spinner";
import { useBlogs } from "../hooks";
import { RecoilRoot } from "recoil";

export const Home = () => {
  const { loading, blogs } = useBlogs();

  return (
    <section>
      <RecoilRoot>
        <Appbar />
      </RecoilRoot>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex justify-center">
          <div className="flex justify-center flex-col max-w-4xl">
            {blogs.map((blog, index) => {
              return (
                <BlogCard
                  key={index}
                  id={blog.id}
                  authorname={blog.author.name}
                  title={blog.title}
                  content={blog.content}
                  publishedDate={String(blog.createdAt).split("T")[0]}
                />
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
};
