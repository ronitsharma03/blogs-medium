import axios from "axios";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Spinner } from "../components/ui/Spinner";

export const Profile = () => {
  const [username, setusername] = useState("");
  const [email, setEmail] = useState("");
  const [name, setname] = useState("");
  const [profile, setProfile] = useState<string | null>("");
  const [bio, setBio] = useState<string | null>("");
  const [loading, setloading] = useState<boolean>(true);

  const fetchProfile = async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/me`,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );

    if (response.status != 200) {
      toast.error(response.data.message, {
        id: "profile",
        duration: 2000,
      });
    } else {
      setusername(response.data.username);
      setEmail(response.data.email);
      setBio(response.data.bio);
      setProfile(response.data.profile);
      setname(response.data.name);
      setloading(false);
      await new Promise((r) => setTimeout(r, 1000));
      toast.success("Profile fetched successfully!", {
        id: "profile",
        duration: 2000,
      });
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <section className="h-screen w-full font-serif">
      {loading ? (
        <Spinner />
      ) : (
        <div className="w-full h-full flex justify-center mt-20">
          <div>
            <Toaster position="bottom-left" />
          </div>
          <div className="flex flex-col max-w-5xl max-md:items-center">
            <div className="flex flex-row gap-16 max-md:flex-col max-md:items-center">
              <div className="flex flex-col items-center justify-center max-md:flex-row max-md:items-center max-md:justify-center gap-4">
                <div className="w-28 h-28 rounded-full flex items-center justify-center">
                  {profile == null ? (
                    <div
                      className={`relative h-full w-full overflow-hidden bg-green-500 rounded-full flex items-center justify-center text-5xl text-white`}
                    >
                      {name.charAt(0).toUpperCase()}
                      <div className="absolute left-0 top-0 h-full w-full rounded-full overflow-hidden bg-transparent z-10"></div>
                    </div>
                  ) : (
                    <img src={profile} />
                  )}
                </div>
                <div className="flex flex-col items-center justify-center">
                  <div className="text-3xl mt-2 font-medium">{name}</div>
                  <div className="text-lg mt-2">@ {username}</div>
                </div>
              </div>
              <div className="flex flex-col items-left justify-center gap-3 max-md:max-w-lg">
                <span className="text-4xl font-medium">About</span>
                <div className="text-xl text-slate-500">{bio}</div>
              </div>
            </div>

            <div className="flex flex-col mt-16 justify-center">
              <div className="text-4xl font-medium mb-10">Blogs</div>
              <div className="flex flex-col w-full md:flex-row gap-7 max-md:grid max-md:grid-cols-1">
                {["blog1", "blog2", "blog3", "blog4"].map((item, index) => (
                  <div
                    className="max-md:w-full w-36 h-40 border border-black rounded-xl"
                    key={index}
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
