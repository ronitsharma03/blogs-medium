import axios from "axios";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Spinner } from "../components/ui/Spinner";
import { Blog, BlogManagement } from "../components/ui/BlogManagement";
import { Link } from "react-router-dom";

export const Profile = () => {
  const [username, setUsername] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [profile, setProfile] = useState<string | null>(null);
  const [bio, setBio] = useState<string>("Tell people about yourself");
  const [loading, setLoading] = useState<boolean>(true);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isedit, setEdit] = useState<boolean>(false);

  const handleUnpublish = async (id: string) => {
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/blog/toggle/${id}`,
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      if (response.data) {
        setBlogs((prevBlogs) =>
          prevBlogs.map((blog) =>
            blog.id === id ? { ...blog, published: !blog.published } : blog
          )
        );
        toast.success(`Blog ${response.data.state.toLowerCase()} successfully!`);
      } else {
        toast.error("Failed to update blog status.");
      }
    } catch (error) {
      toast.error("Error toggling blog status.");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      toast.loading("Deleting blog...", {
        id: "delete",
      });

      const response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/blog/delete/${id}`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      if (response.data) {
        setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== id));
        toast.success(response.data.message, {
          id: "delete",
        });
      }
    } catch (e) {
      toast.error("Error deleting the blog!", {
        id: "delete",
      });
    }
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

      if (response.status === 200) {
        setUsername(response.data.username);
        setBio(response.data.bio);
        setProfile(response.data.profile);
        setName(response.data.name);
        setBlogs(response.data.blogs);
        setLoading(false);
        toast.success("Profile fetched successfully!", {
          id: "profile",
        });
      } else {
        toast.error(response.data.message, {
          id: "profile",
        });
      }
    } catch (error) {
      toast.error("Failed to fetch profile", {
        id: "profile",
      });
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const submitBio = async () => {
    if (bio.length < 30) {
      toast.error("Add more ", {
        id: "bio",
      });
    } else {
      try {
        const response = await axios.put(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/update`,
          {
            bio: bio,
          },
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        if (!response) {
          toast.error("Error updating bio", {
            id: "bio",
          });
        } else {
          toast.success(response.data.message, {
            id: "bio",
          });
        }
      } catch (e) {
        toast.error("Error updating bio", {
          id: "bio",
        });
      }
    }
  };

  return (
    <section className="min-h-screen w-full font-primaryRegular flex justify-center">
      {loading ? (
        <Spinner />
      ) : (
        <div className="w-3/4 max-lg:w-full h-full flex flex-col items-center mt-20 max-md:mt-0 px-4 mb-10">
          <Toaster position="bottom-left" />
          <div className="flex flex-col md:flex-row w-full gap-8 p-4 bg-white shadow-lg rounded-lg animate-fadeIn">
            {/* Profile Section */}
            <div className="flex flex-col items-center gap-4 animate-slideIn">
              <div className="w-28 h-28 lg:w-32 lg:h-32 rounded-full flex items-center justify-center bg-green-500 overflow-hidden">
                {profile ? (
                  <img
                    src={profile}
                    alt="Profile"
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <div className="text-5xl text-white">
                    {name.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              <div className="flex flex-col items-center gap-2 mt-4 max-md:mt-0 p-2 w-full">
                <div className="text-2xl font-medium text-center">{name}</div>
                <div className="text-lg text-gray-600">@{username}</div>
              </div>
            </div>
            {/* Bio Section */}
            <div className="flex flex-col ml-20 max-md:ml-0 items-start mt-4 w-full">
              <div className="text-4xl font-medium mb-2 flex flex-col items-start px-4">
                <span className="mb-2">About</span>{" "}
                <button
                  className={`text-sm font-sans text-slate-600 ${
                    !isedit ? "visible" : "hidden"
                  }`}
                  onClick={() => setEdit(true)}
                >
                  Edit
                </button>
              </div>
              {isedit ? (
                <div>
                  <textarea
                    rows={5}
                    cols={150}
                    className="text-justify w-full h-full resize-none border font-sans p-2"
                    onChange={(e) => setBio(e.target.value)}
                    value={bio}
                  ></textarea>
                  <button
                    className="bg-blue-500 text-white w-20 h-8 rounded-md"
                    onClick={async () => {
                      setEdit(false);
                      await submitBio();
                    }}
                  >
                    Save
                  </button>
                </div>
              ) : (
                <div
                  className="text-justify text-xl font-sans text-gray-600 px-4"
                  dangerouslySetInnerHTML={{
                    __html: bio,
                  }}
                />
              )}
            </div>
          </div>
          {/* Blogs Section */}
          <div className="flex flex-col mt-16 w-full p-6 bg-white shadow-lg rounded-lg animate-fadeIn">
            <div className="flex  items-center justify-between mb-4w-full">
              <div className="text-4xl font-medium max-md:mb-10">Blogs</div>
            </div>
            {blogs.length === 0 ? (
              <div className="flex flex-col items-center justify-center gap-10">
                <div className="text-xl text-gray-600 text-center">
                  Create your first blog
                </div>
                <div className="">
                  <Link
                    to="/write"
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                  >
                    Create New Blog
                  </Link>
                </div>
              </div>
            ) : (
              <div className="animate-slideUp">
                <div className="flex flex-row flex-wrap gap-5 w-full justify-around">
                  {blogs.map((blog) => (
                    <BlogManagement
                      key={blog.id}
                      blog={blog}
                      onUnpublish={handleUnpublish}
                      onDelete={handleDelete}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
