import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import MovieCard from "../components/movie-card/MovieCard";
import { useMovieContext } from "../context/Context";
import { Heart } from "lucide-react";
import swal from "sweetalert";

const Favorites = () => {
  const { favorites, user, deleteFavorite, setFavorites } = useMovieContext();

  const removeFavorite = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to see this movie in your favorites list!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        deleteFavorite(id);
      } else {
        swal("Your movie is safe!");
      }
    });
  };

  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  console.log("FavPgae", favorites.length);

  return (
    <div>
      {/* Header Section */}
      <div
        className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white py-12 px-2 md:px-12 rounded-lg shadow-lg"
        data-aos="fade-down"
      >
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Left Section: Text */}
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
              Your Favorites List
            </h1>
            <p className="text-lg md:text-xl font-light">
              All your favorite items in one place. Organize, view, and manage
              with ease.
            </p>
          </div>

          {/* Right Section: Icon */}
          <div className="mt-6 md:mt-0">
            <Heart
              className="w-16 h-16 md:w-20 md:h-20 text-white opacity-80"
              data-aos="zoom-in"
            />
          </div>
        </div>
      </div>

      {/* Favorites List */}
      {favorites.length > 0 ? (
        <div className="flex items-center justify-center py-8 px-2 lg:px-20">
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full"
            data-aos="fade-up"
          >
            {favorites.map((movie) => (
              <div
                key={movie._id}
                data-aos="zoom-in"
                className="transform transition-transform duration-500 hover:scale-105"
              >
                <MovieCard movie={movie}>
                  <button
                    onClick={() => removeFavorite(movie._id)}
                    className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition"
                  >
                    Delete Favorites
                  </button>
                </MovieCard>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div
          className="flex flex-col items-center justify-center py-8 h-[50vh]"
          data-aos="fade-in"
        >
          <h2 className="text-3xl font-bold text-gray-300">
            No Favorites Found
          </h2>
          <p className="text-gray-200 mt-2 font-semibold">
            You have not added any movies to your favorites list yet.
          </p>
        </div>
      )}
    </div>
  );
};

export default Favorites;
