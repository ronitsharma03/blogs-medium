import { Link } from "react-router-dom";

export interface Blog {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  published: boolean;
}

interface BlogManagementProps {
  blog: Blog;
  onUnpublish: (id: string) => void;
  onDelete: (id: string) => void;
}

export const BlogManagement = ({ blog, onUnpublish, onDelete }: BlogManagementProps) => {
  return (
    <div className="w-full max-w-2xl py-4 space-y-8">
      <div
        key={blog.id}
        className="border rounded-lg shadow-md p-4 transition hover:shadow-lg w-full h-full flex flex-col justify-between space-y-4 md:space-y-0 md:h-72"
      >
        <h2 className="text-2xl font-semibold text-gray-800">{blog.title}</h2>
        <div
          className="text-gray-700 overflow-hidden"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            whiteSpace: "pre-wrap",
            wordWrap: "break-word",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
        <div className="text-sm text-gray-500">
          Published on: {new Date(blog.createdAt).toLocaleDateString()} |{" "}
          {Math.ceil(blog.content.length / 1000)} min read
        </div>
        <div className="flex gap-2 flex-wrap">
          <Link
            to={`/blog/${blog.id}`}
            className="px-4 py-2 text-white bg-green-500 hover:bg-green-600 rounded-md transition"
          >
            View
          </Link>
          <button
            onClick={() => onUnpublish(blog.id)}
            className={`px-4 py-2 text-white rounded-md transition ${
              blog.published ? "bg-gray-500 hover:bg-gray-600" : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {blog.published ? "Unpublish" : "Publish"}
          </button>
          <button
            onClick={() => onDelete(blog.id)}
            className="px-4 py-2 text-white bg-red-500 hover:bg-red-600 rounded-md transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
