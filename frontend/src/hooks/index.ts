import axios from "axios";
import { useEffect, useState } from "react";

export interface Blogs {
  id: string;
  title: string;
  content: string;
  author: {
    name: string;
  };
  createdAt: Date;
}

export const useBlogs = () => {
  const [loading, setloading] = useState<boolean>(true);
  const [blogs, setBlogs] = useState<Blogs[]>([]);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/blog/allblogs`
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
