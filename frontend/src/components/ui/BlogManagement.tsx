

export interface BlogManagementProps {
  blogs: Blog[];
  onUnpublish: (id: string) => void;
  onDelete: (id: string) => void;
}
export interface Blog {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  published: boolean;
}

export const BlogManagement = ({ blogs, onUnpublish, onDelete }: BlogManagementProps) => {
  return (
    <div className="max-w-4xl mx-auto py-8">
      {blogs.map((blog) => (
        <div key={blog.id} className="border-b pb-4 mb-4">
          <h2 className="text-2xl font-bold">{blog.title}</h2>
          <p className="text-gray-600 mb-2">
            {blog.content.length > 100 ? blog.content.slice(0, 100) + "..." : blog.content}
          </p>
          <div className="text-sm text-gray-500 mb-2">
            Published on: {new Date(blog.createdAt).toLocaleDateString()} | {Math.ceil(blog.content.length / 200)} min read
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => onUnpublish(blog.id)}
              className={`px-4 py-2 text-white ${blog.published ? "bg-blue-500" : "bg-gray-500"} rounded-md`}
              disabled={!blog.published}
            >
              Unpublish
            </button>
            <button
              onClick={() => onDelete(blog.id)}
              className="px-4 py-2 text-white bg-red-500 rounded-md"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
