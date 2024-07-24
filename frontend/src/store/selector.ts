import axios from "axios";
import { atomFamily, selector, selectorFamily } from "recoil";

export const blogSelectorFamily = selectorFamily({
    key: "blogSelectorFamily",
    get: (blogId: string) => async () => {
        try{
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/blog/${String(blogId)}`, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            });
            return response.data.Blogs;
        }catch{
            return {
                message: "Error getting blog!"
            }
        }
    }
});

export const BlogAtom = atomFamily({
    key: "BlogAtom",
    default: blogSelectorFamily
})


export const nameSelector = selector({
    key: "nameSelector",
    get: async () => {
        try{
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/me`, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            });
    
            return {
                username: response.data.username,
                fullname: response.data.name,
                email: response.data.email
            }
        }catch(e){
            console.log(`Error fetching userdetails ${e}`);
            return null;
        }
    }
});
