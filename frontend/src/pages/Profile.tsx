import { Blog, BlogManagementProps } from "../components/ui/BlogManagement";
import axios from "axios";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Spinner } from "../components/ui/Spinner";
import { BlogManagement } from "../components/ui/BlogManagement";
import { Link } from "react-router-dom"; // Import Link for navigation

export const Profile = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [profile, setProfile] = useState<string | null>(null);
  const [bio, setBio] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [blogs, setBlogs] = useState<Blog[]>([]);

  const handleUnpublish = (id: string) => {
    // Implement unpublish logic here
  };

  const handleDelete = (id: string) => {
    // Implement delete logic here
  };

  const fetchProfile = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/me`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      if (response.status !== 200) {
        toast.error(response.data.message, {
          id: "profile",
          duration: 2000,
        });
      } else {
        setUsername(response.data.username);
        setEmail(response.data.email);
        setBio(response.data.bio);
        setProfile(response.data.profile);
        setName(response.data.name);
        setBlogs(response.data.blogs);
        setLoading(false);
        toast.success("Profile fetched successfully!", {
          id: "profile",
          duration: 2000,
        });
      }
    } catch (error) {
      toast.error("Failed to fetch profile", {
        id: "profile",
        duration: 2000,
      });
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <section className="min-h-screen w-full font-serif">
      {loading ? (
        <Spinner />
      ) : (
        <div className="w-full h-full flex flex-col items-center mt-20 px-4 mb-10">
          <Toaster position="bottom-left" />
          <div className="flex flex-col max-w-5xl w-full md:flex-row gap-8 p-4 bg-white shadow-lg rounded-lg">
            <div className="flex flex-col items-center justify-center md:flex-row md:items-center md:justify-start gap-4">
              <div className="w-28 h-28 md:w-40 md:h-40 rounded-full flex items-center justify-center bg-green-500">
                {profile ? (
                  <img src={profile} alt="Profile" className="w-full h-full object-cover rounded-full" />
                ) : (
                  <span className="text-5xl text-white">{name.charAt(0).toUpperCase()}</span>
                )}
              </div>
              <div className="flex flex-col items-center md:items-start">
                <div className="text-3xl font-medium">{name}</div>
                <div className="text-lg text-gray-600">@ {username}</div>
              </div>
            </div>
            <div className="flex flex-col items-center md:items-start">
              <span className="text-4xl font-medium mb-2">About</span>
              <div className="text-xl text-gray-600">{bio}</div>
            </div>
          </div>

          <div className="flex flex-col mt-16 w-full max-w-5xl p-4 bg-white shadow-lg rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="text-4xl font-medium">Blogs</div>
              {blogs.length === 0 && (
                <Link
                  to="/create-blog" // Adjust the route as necessary
                  className="px-4 py-2 bg-blue-500 text-white rounded-md"
                >
                  Create New Blog
                </Link>
              )}
            </div>
            {blogs.length === 0 ? (
              <div className="text-xl text-gray-600 text-center">
                Create your first blog
              </div>
            ) : (
              <div className="flex flex-col gap-7">
                <BlogManagement blogs={blogs} onUnpublish={handleUnpublish} onDelete={handleDelete} />
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
