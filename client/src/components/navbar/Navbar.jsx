import { useState } from "react";
import { NavLink } from "react-router-dom";
import { LogIn, LogOut, Menu, Moon, Sun, X } from "lucide-react";
import { useMovieContext } from "../../context/Context";
import { BiSolidCameraMovie } from "react-icons/bi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOutUser, theme, toggleTheme, loading } = useMovieContext();

  const handleSignout = () => {
    signOutUser();
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  //console.log(user);

  return (
    <nav
      className={` ${
        theme === "dark" ? "bg-slate-800 text-gray-200" : "bg-white "
      } shadow-lg sticky top-0 z-50`}
    >
      <div className=" md:px-8 lg:px-20 flex justify-between items-center py-4 px-4 ">
        {/* Logo */}
        <div className="text-2xl font-semibold text-blue-600 flex items-center">
          <BiSolidCameraMovie />
          <NavLink to="/">CineVerse</NavLink>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-4 lg:space-x-8 items-center ">
          <NavLink
            to="/"
            className={({ isActive }) =>
              ` hover:text-blue-600 transition ${
                isActive ? "font-bold text-yellow-600 underline" : ""
              }`
            }
          >
            Home
          </NavLink>
          {user && (
            <NavLink
              to="all-movies"
              className={({ isActive }) =>
                ` hover:text-blue-600 transition ${
                  isActive ? "font-bold text-yellow-600 underline" : ""
                }`
              }
            >
              All Movies
            </NavLink>
          )}
          <NavLink
            to="/community"
            className={({ isActive }) =>
              ` hover:text-blue-600 transition ${
                isActive ? "font-bold text-yellow-600 underline" : ""
              }`
            }
          >
            Community
          </NavLink>
          {user && (
            <NavLink
              to="/favorites"
              className={({ isActive }) =>
                ` hover:text-blue-600 transition ${
                  isActive ? "font-bold text-yellow-600 underline" : ""
                }`
              }
            >
              My Favorites
            </NavLink>
          )}
          {user && (
            <NavLink
              to="/add-movie"
              className={({ isActive }) =>
                ` hover:text-blue-600 transition ${
                  isActive ? "font-bold text-yellow-600 underline" : ""
                }`
              }
            >
              Add Movie
            </NavLink>
          )}
        </div>

        <div className="hidden md:flex gap-4">
          <div className="relative flex items-center space-x-4">
            {user ? (
              <>
                {/* User Avatar */}
                <div className="relative group">
                  <img
                    src={user?.photoURL || "https://via.placeholder.com/150"}
                    alt="User Profile"
                    className="w-10 h-10 rounded-full border-2 border-blue-400 shadow-md cursor-pointer"
                  />
                  {user?.displayName && (
                    <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 bg-white text-gray-700 text-sm font-medium py-1 px-2 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition z-50">
                      {user?.displayName}
                    </div>
                  )}
                </div>

                {/* Logout Button */}
                <NavLink
                  onClick={handleSignout}
                  className={({ isActive }) =>
                    ` hover:text-blue-600 transition flex items-center gap-1 border border-gray-200 px-2 py-1 ${
                      isActive ? "px-2 py-1 text-blue-600 " : ""
                    }`
                  }
                >
                  <LogOut className="h-5 w-5 mt-0.5" />
                  Logout
                </NavLink>
              </>
            ) : (
              <NavLink
                to="/auth/login"
                className={({ isActive }) =>
                  ` hover:text-blue-600 transition flex items-center gap-1 border border-gray-200 px-2 py-1${
                    isActive
                      ? "font-bold px-2 py-1 text-yellow-600 underline"
                      : ""
                  }`
                }
              >
                <LogIn className="h-5 w-5 mt-0.5" />
                Login
              </NavLink>
            )}
          </div>
          {!user && (
            <NavLink
              to="/auth/register"
              className={({ isActive }) =>
                ` hover:text-blue-600 transition border border-gray-200 px-2 py-1 ${
                  isActive ? " px-2 py-1 text-yellow-600 underline" : ""
                }`
              }
            >
              Register
            </NavLink>
          )}
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="text-gray-500 dark:text-gray-300"
            >
              {theme === "dark" ? (
                <Sun size={24} className="text-yellow-500" />
              ) : (
                <Moon size={24} className="text-gray-400" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex gap-2 md:hidden">
          <div className="relative group ">
            {user && (
              <img
                src={user?.photoURL || "https://via.placeholder.com/150"}
                alt="User Profile"
                className="w-7 h-7 rounded-full border-2 border-blue-400 shadow-md cursor-pointer"
              />
            )}
            {user?.displayName && (
              <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 bg-white text-gray-700 text-sm font-medium py-1 px-2 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition z-50">
                {user?.displayName}
              </div>
            )}
          </div>
          <button
            className="block md:hidden focus:outline-none "
            onClick={toggleMenu}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden dark:bg-gray-800 dark:text-gray-200 shadow-lg">
          <div className="flex items-center flex-col space-y-4 px-6 py-4">
            <NavLink
              to="/"
              className={({ isActive }) =>
                ` hover:text-blue-600 transition ${
                  isActive ? "font-bold text-yellow-600 underline" : ""
                }`
              }
              onClick={() => setIsOpen(false)}
            >
              Home
            </NavLink>
            {user && (
              <NavLink
                to="/all-movies"
                className={({ isActive }) =>
                  ` hover:text-blue-600 transition ${
                    isActive ? "font-bold text-yellow-600 underline" : ""
                  }`
                }
                onClick={() => setIsOpen(false)}
              >
                All Movies
              </NavLink>
            )}
            <NavLink
              to="/community"
              className={({ isActive }) =>
                ` hover:text-blue-600 transition ${
                  isActive ? "font-bold text-yellow-600 underline" : ""
                }`
              }
              onClick={() => setIsOpen(false)}
            >
              Community
            </NavLink>
            {user && (
              <NavLink
                to="/favorites"
                className={({ isActive }) =>
                  ` hover:text-blue-600 transition ${
                    isActive ? "font-bold text-yellow-600 underline" : ""
                  }`
                }
                onClick={() => setIsOpen(false)}
              >
                My Favorites
              </NavLink>
            )}
            {user && (
              <NavLink
                to="/add-movie"
                className={({ isActive }) =>
                  ` hover:text-blue-600 transition ${
                    isActive ? "font-bold text-yellow-600 underline" : ""
                  }`
                }
                onClick={() => setIsOpen(false)}
              >
                Add Movie
              </NavLink>
            )}
            <NavLink
              to="/auth/login"
              onClick={user ? handleSignout : () => setIsOpen(false)}
              className={({ isActive }) =>
                ` hover:text-blue-600 transition ${
                  isActive ? "font-bold text-yellow-600 underline" : ""
                }`
              }
            >
              {user ? "Logout" : "Login"}
            </NavLink>
            {!user && (
              <NavLink
                to="/auth/register"
                className={({ isActive }) =>
                  ` hover:text-blue-600 transition ${
                    isActive ? "font-bold text-yellow-600 underline" : ""
                  }`
                }
                onClick={() => setIsOpen(false)}
              >
                Register
              </NavLink>
            )}

            <div className="flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className="text-gray-500 dark:text-gray-300"
              >
                {theme === "dark" ? (
                  <Sun size={24} className="text-yellow-500" />
                ) : (
                  <Moon size={24} className="text-gray-400" />
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
