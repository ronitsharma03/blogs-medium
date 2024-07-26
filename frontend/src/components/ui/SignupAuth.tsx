import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Spinner } from "./Spinner";

export const SignupAuth = () => {
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [loading, setloading] = useState<boolean | null>(null);
  const [password, setPassword] = useState<string>("");
  const [confirm, setConfirm] = useState<string>("");
  const [matchError, setMatchError] = useState<boolean | null>(false);

  const navigate = useNavigate();

  const confirmPassword = () => {
    if (password === "" || confirm === "") {
      setMatchError(null);
      return;
    }
    if (password === confirm) {
      setMatchError(true);
    } else {
      setMatchError(false);
    }
  };

  useEffect(() => {
    confirmPassword();
  }, [password, confirm]);

  const SignupReq = async () => {
    try {
      if (
        email === "" ||
        username === "" ||
        name === "" ||
        password === "" ||
        confirm === ""
      ) {
        toast("Fields can't be empty!", {
          icon: "💡",
          duration: 4000,
          id: "empty",
        });
        return;
      }
      setloading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/signup`,
        {
          email,
          username,
          password,
          name,
        }
      );

      console.log(response.data);
      localStorage.setItem("token", response.data.token);
      setloading(false);
      toast.success(response.data.message, {
        duration: 2000,
        id: "empty",
      });
      console.log("Signup successful");
      await new Promise(r => setTimeout(r, 1000));
      navigate("/home");
    } catch (error) {
      console.log(`Error Signing up ${error}`);

      toast.error("Error signing up", {
        duration: 2000,
        id: "empty",
      });

      setloading(false);
      navigate("/signup");
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 max-lg:w-full">
      <div>
        <Toaster position="bottom-left" />
      </div>

      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create an account
            </h1>
            <div>
              <label
                htmlFor="username"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Username
              </label>
              <input
                type="text"
                name="username"
                id="username"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter your username"
                required
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Full Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Your fullname"
                required
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@company.com"
                required
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <div>
              <label
                htmlFor="confirm-password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Confirm password
              </label>
              <input
                type="password"
                name="confirm-password"
                id="confirm-password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
                onChange={(e) => {
                  setConfirm(e.target.value);
                }}
              />
            </div>
            <div
              className={`text-[14px] ${
                matchError ? "text-green-500" : "text-red-500"
              }`}
            >
              {matchError === null
                ? " "
                : matchError
                ? "Password matches"
                : "Password is not matching"}
            </div>
            <button
              type="submit"
              className="w-full text-white bg-black hover:bg-slate-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-black dark:hover:bg-slate-700 dark:focus:ring-slate-800 flex justify-center items-center"
              onClick={SignupReq}
            >
              {loading ? (
                <div>
                  <Spinner />
                </div>
              ) : (
                "Create an account"
              )}
            </button>
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              Already have an account?{" "}
              <Link
                to="/signin"
                className="font-medium text-gray-600 hover:underline dark:text-gray-200"
              >
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
