import axios from "axios";
import { atomFamily, selector, selectorFamily } from "recoil";

export const blogSelectorFamily = selectorFamily({
  key: "blogSelectorFamily",
  get: (blogId: string) => async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/blog/${String(blogId)}`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      return response.data.Blogs;
    } catch {
      return {
        message: "Error getting blog!",
      };
    }
  },
});

export const BlogAtom = atomFamily({
  key: "BlogAtom",
  default: blogSelectorFamily,
});

export const nameSelector = selector({
  key: "nameSelector",
  get: async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/me`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      return {
        username: response.data.username,
        fullname: response.data.name,
        email: response.data.email,
        id: response.data.id
      };
    } catch (e) {
      console.log(`Error fetching userdetails ${e}`);
      return null;
    }
  },
});

export const AuthSelector = selector({
  key: "AuthSelector",
  get: async () => {
    try {
      await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/me`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      return true;
    } catch (e) {
      console.log(`${e} Error Authenticating`);
      return false;
    }
  }
});

// export const BlogSelector = selectorFamily({
//     key: "BlogSelector",
//     get: (id) => async ({get}) => {
//         const blogs = get(BlogAtomFamily(id));
//         if(blogs){
//             return blogs;
//         }
//         try{
//             const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/blog/${id}`, {
//                 headers: {
//                     Authorization: "Bearer " + localStorage.getItem("token")
//                 }
//             });

//             return {
//                 blogs: response.data.Blogs
//             }
//         }
//         catch(e){
//             console.log(`Error fetching blogs in Selector: ${e}`);
//             return null;
//         }

//     }
// });
