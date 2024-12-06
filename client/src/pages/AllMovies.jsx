import { useLoaderData } from "react-router-dom";
import MovieCard from "../components/movie-card/MovieCard";
import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { useMovieContext } from "../context/Context";
import AOS from "aos";
import "aos/dist/aos.css";

const AllMovies = () => {
  const loaderData = useLoaderData();
  const [movies, setMovies] = useState(loaderData);
  const [searchTerm, setSearchTerm] = useState("");
  const { loading, setLoading, favorites } = useMovieContext();

  // Initialize AOS animations
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const handleSearch = () => {
    if (searchTerm.trim() === "") {
      setMovies(loaderData);
      return;
    }

    try {
      fetch(`http://localhost:3000/search-movies/${searchTerm}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.length > 0) {
            setMovies(data);
            setLoading(false);
          } else {
            setMovies(loaderData);
          }
        });
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="loading loading-bars loading-lg"></span>
      </div>
    );
  }

  console.log("ALL", favorites.length);

  return (
    <div className="py-10">
      {/* Header Section */}
      <div className="bg-gray-900 text-white py-12" data-aos="fade-down">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold">All Movies</h1>
          <p className="text-lg mt-2">
            Explore all the movies added by our users
          </p>

          {/* Search Input with Icon and Button */}
          <div
            className="mt-8 flex justify-center items-center"
            data-aos="fade-up"
          >
            <div className="w-1/2 md:w-3/4 flex items-center justify-center">
              {/* Search Input */}
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search movies..."
                className="bg-gray-800 text-white py-3 px-4 rounded-l-full pl-10 w-96 outline-none"
              />
              {/* Search Button */}
              <button
                onClick={handleSearch}
                className="bg-blue-600 text-white py-3 px-6 rounded-r-full hover:bg-blue-700 transition-colors relative"
              >
                <Search
                  size={20}
                  className="absolute left-1 top-2 text-gray-200 mt-1.5"
                />
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Movies Grid Section */}
      <div
        className="flex items-center justify-center mt-8 px-6 lg:px-20"
        data-aos="fade-up"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
          {movies.map((movie) => (
            <div key={movie._id} data-aos="zoom-in">
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllMovies;
