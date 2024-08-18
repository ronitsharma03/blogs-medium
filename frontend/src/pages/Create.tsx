import axios from "axios";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import ReactQuill from "react-quill";
import { useNavigate } from "react-router-dom";
import { Spinner } from "../components/ui/Spinner";

export const Create = () => {
  const [clicked, setClicked] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [imageLink, setImagelink] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [isuploaded, setIsuploaded] = useState<boolean>(false);

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

  const uploadImage = async () => {
    if (image === null) {
      toast.error("Image not found", {
        id: "image",
      });
      return;
    }

    setLoading(true);
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", `${import.meta.env.VITE_UPLOAD_PRESET}`);
    data.append("cloud_name", `${import.meta.env.VITE_CLOUD_NAME}`);
    console.log(data);

    try {
      setIsuploaded(false);
      if (image === null) {
        toast.error("Image not found", {
          id: "image",
        });
        return null;
      }

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${
          import.meta.env.VITE_CLOUD_NAME
        }/image/upload`,
        {
          method: "POST",
          body: data,
        }
      );

      const res = await response.json();
      console.log(res);
      setImagelink(res.secure_url);
      setLoading(false);
      setIsuploaded(true);
      toast.success("Image uploaded successfully!", {
        id: "image",
      });
    } catch (error) {
      setLoading(false);
      setIsuploaded(false);
      console.log(error);
      toast.error("Error uploading image!", {
        id: "image",
      });
    }
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const max_size = 1 * 1024 * 1024;
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (file.size > max_size) {
        toast.error("Image must be less than 1 MB", {
          id: "image",
        });
        setImage(null);
        return null;
      } else {
        setImage(e.target.files[0]);
      }
    }
  };

  const navigate = useNavigate();

  const publishBlog = async () => {
    if (title.length < 30 || content.length < 500 || !imageLink) {
      toast.error("Inputs must be long", {
        id: "image",
      });
      return;
    } else {
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
            // onChange={(e) => {
            //   setImagelink(e.target.value);
            // }}
            disabled
            spellCheck={false}
            value={imageLink}
            placeholder="Add a image link for thumbnail"
            type="text"
            className=" hidden ml-2 font-primaryRegular w-full px-2 text-lg sm:text-md lg:text-xl outline-none "
          />
          <div className="overflow-hidden max-w-[300px] max-h-[300px]">
            {image && (
              <img
                src={image ? URL.createObjectURL(image) : ""}
                className="object-cover mt-5"
                alt="Preview"
              />
            )}
          </div>
          <div className="flex flex-row items-center justify-start gap-10 mt-2">
            {loading ? (
              <Spinner />
            ) : (
              <label
                htmlFor="image-file"
                className="px-4 ml-4 py-2 text-white bg-blue-500 w-32 rounded-sm cursor-pointer hover:bg-blue-600 transition-colors"
              >
                Choose File
              </label>
            )}
            <input
              id="image-file"
              type="file"
              className="hidden"
              onChange={handleFileChange}
            />
            <button
              className={`${
                isuploaded ? "cursor-not-allowed" : ""
              } bg-blue-500 px-5 py-2 rounded-sm text-white w-28 h-10 ${loading ? "hidden": "visible"}`}
              disabled={isuploaded}
              type="submit"
              onClick={uploadImage}
            >
              Upload
            </button>
          </div>
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
              className={`px-10 py-2 bg-green-500 rounded-xl text-white ${
                !isuploaded ? "cursor-not-allowed" : ""
              }`}
              disabled={!isuploaded}
            >
              Publish
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
