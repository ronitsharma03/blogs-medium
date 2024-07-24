import { useParams } from "react-router-dom"
import { useGetBlog } from "../hooks";
import { Appbar } from "../components/ui/Appbar";


export const Blog = () => {
    const { id } = useParams();
    const blogId = id as string;
    const {blogs, loading} = useGetBlog(blogId);

    return <section>
        <Appbar />
        <div className="max-w-5xl p-5">
            <div className="text-7xl font-primaryBold">
                {blogs?.title}
            </div>
            <div>
                {blogs?.content}
            </div>
        </div>
    </section>
}