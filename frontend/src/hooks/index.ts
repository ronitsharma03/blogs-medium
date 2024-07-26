import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export interface Blogs {
  id: string;
  title: string;
  content: string;
  author: {
    name: string;
  };
  createdAt: Date;
  imageUrl: string;
}

export const useBlogs = () => {
  const [loading, setloading] = useState<boolean>(true);
  const [blogs, setBlogs] = useState<Blogs[]>([]);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/blog/allblogs`
      );
      console.log("res from hook", response.data.Blogs);
      setBlogs(response.data.Blogs);
    } catch (e) {
      console.log("Error fetching blogs" + e);
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return {
    loading,
    blogs,
  };
};

export const useGetBlog = (blogId: string) => {
  const [loading, setloading] = useState<boolean>(true);
  const [blogs, setBlogs] = useState<Blogs>();

  const fetchBlogs = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/blog/${blogId}`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      
      setBlogs(response.data.Blogs);
    } catch (e) {
      console.log("Error fetching blogs" + e);
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  
  return {
    loading,
    blogs,
  };
};

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/me`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.data) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (e) {
        console.log(`${e} Error Authenticating`);
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  return { isAuthenticated };
};

interface useBlogProps {
  title: string;
  content: string;
  imagelink: string;
}

export const useBlogPublish = ({ title, content, imagelink }: useBlogProps) => {
  const publish = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/blog/create`,
        {
          title: title,
          content: content,
          imageUrl: imagelink,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (!response) {
        return false;
      }
      toast.success("Blog published", {
        id: "publish",
        duration: 1000,
      });
      return true;
    } catch (e) {
      console.log(`Error publishing blog ${e}`);
      toast.error("Something went wrong", {
        id: "publish",
        duration: 1000,
      });
    }
  };
  return publish();
};
