import { useLocation, useNavigate } from "react-router-dom";
import { IconWrite } from "./Icon";
import { Avatar } from "./BlogCard";
import { useState, useEffect, useRef } from "react";
import { Logout } from "./Logout";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { nameSelector } from "../../store/selector";
import { ProfileAtom } from "../../store/atom";
import { Spinner } from "./Spinner";

export const Appbar = () => {
  const [clicked, setClicked] = useState(false);
  const [loading, setLoading] = useState(true);

  const location = useLocation(); // Get current location
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const fetchUser = useRecoilValue(nameSelector);
  const setUser = useSetRecoilState(ProfileAtom);

  useEffect(() => {
    if (fetchUser) {
      setUser(fetchUser);
    }
    setLoading(false);
  }, [fetchUser, setUser]);

  const loggedUser = useRecoilValue(ProfileAtom);

  const logoutFn = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const profileFn = () => {
    navigate(`/profile/${loggedUser.username}`);
  };

  const handleClick = () => {
    setClicked(!clicked);
  };

  useEffect(() => {
    // Function to check if click is outside the dropdown
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setClicked(false);
      }
    };

    // Add event listener to document
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Define routes where the "Write" button should be hidden
  const hiddenRoutes = ["/write", /^\/profile\/.+/];
  const shouldHideWriteButton = hiddenRoutes.some((route) =>
    typeof route === "string"
      ? location.pathname === route
      : route.test(location.pathname)
  );

  return (
    <header className="px-10 lg:px-16 py-6 flex items-center border-b sticky top-0 left-0 bg-white mb-10 z-10 shadow-md">
      <a
        className="flex items-center justify-center gap-2"
        href="/home"
        rel="ugc"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6"
        >
          <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"></path>
        </svg>
        <span className="text-2xl font-medium font-primaryRegular tracking-wider">
          Medium
        </span>
      </a>
      <nav className="ml-auto flex gap-4 sm:gap-6">
        {!shouldHideWriteButton && (
          <button
            onClick={() => navigate("/write")}
          >
            <div className="flex items-center justify-center gap-1">
              <IconWrite /> Write
            </div>
          </button>
        )}
        {loading ? (
          <Spinner />
        ) : (
          <button onClick={handleClick}>
            <Avatar name={loggedUser.fullname} />
          </button>
        )}
        {clicked && (
          <div className="absolute top-20 right-10" ref={dropdownRef}>
            <Logout handleLogout={logoutFn} handleProfile={profileFn} />
          </div>
        )}
      </nav>
    </header>
  );
};
