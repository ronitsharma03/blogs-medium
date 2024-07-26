import axios from "axios";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import ReactQuill from "react-quill";
import { useNavigate } from "react-router-dom";

export const Create = () => {
  const [clicked, setClicked] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [imageLink, setImagelink] = useState<string>("");

  const handleFocus = () => {
    setClicked(true);
  };
  const handleUnFocus = () => {
    setClicked(false);
  };
  const clearText = () => {
    setContent("");
  };

  const handleContentChange = (value: string) => {
    setContent(value);
  };

  const navigate = useNavigate();

  const publishBlog = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/blog/create`,
        {
          title: title,
          content: content,
          imageUrl: imageLink,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      toast.success(response.data.message, {
        id: "publish",
        duration: 1200,
      });
      navigate("/home");
    } catch (e) {
      toast.error("Error publishing blog", {
        id: "publish",
        duration: 1200,
      });
      return;
    }
  };
  return (
    <section className="w-full min-h-screen flex justify-center px-4 py-6">
      <div>
        <Toaster position="bottom-left" />
      </div>
      <div className="w-full max-w-4xl flex flex-col gap-6">
        <div className="relative flex flex-row items-center">
          {clicked ? (
            <div className="absolute top-50 left-[-35px] text-xl flex flex-row items-center font-extralight font-sans">
              Title
            </div>
          ) : null}
          <input
            className={`ml-2 font-primaryRegular w-full rounded-lg py-4 px-2 text-2xl sm:text-3xl lg:text-5xl outline-none ${
              clicked ? "border-l" : "border-none"
            }`}
            type="text"
            placeholder="Title"
            onClick={handleFocus}
            onBlur={handleUnFocus}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </div>
        <div>
          *
          <input
            onChange={(e) => {
              setImagelink(e.target.value);
            }}
            spellCheck={false}
            placeholder="Add a image link for thumbnail"
            type="text"
            className="ml-2 font-primaryRegular w-full px-2 text-lg sm:text-md lg:text-xl outline-none "
          />
        </div>
        <div>
          <ReactQuill
            className="ml-2 font-primaryRegular w-full border-none outline-none py-4 px-2 text-xl sm:text-lg lg:text-2xl"
            value={content}
            theme="snow"
            onChange={handleContentChange}
          />
        </div>
        <div>
          <div className="flex flex-row gap-5 items-center justify-end py-4">
            <button
              onClick={clearText}
              className="px-10 py-2 bg-red-500 rounded-xl text-white"
            >
              Clear
            </button>
            <button
              onClick={publishBlog}
              className="px-10 py-2 bg-green-500 rounded-xl text-white"
            >
              Publish
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
