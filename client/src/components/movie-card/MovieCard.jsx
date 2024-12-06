import { Link, NavLink } from "react-router-dom";
import { Rating } from "react-simple-star-rating"; // Import Rating component

const MovieCard = ({ movie, children }) => {
  return (
    <div className="max-w-md rounded-lg overflow-hidden shadow-lg bg-white">
      <img
        src={movie.poster}
        alt={`${movie.title} Poster`}
        className="w-full h-[40vh] lg:h-[45vh] object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800 truncate">
          {movie.title}
        </h3>
        <p className="text-sm text-gray-600 mt-2">
          <strong>Genre:</strong> {movie.genre.join(", ")}
        </p>
        <p className="text-sm text-gray-600">
          <strong>Duration:</strong> {movie.duration} minutes
        </p>
        <p className="text-sm text-gray-600">
          <strong>Release Year:</strong> {movie.releaseYear}
        </p>

        {/* Rating Section */}
        <div className="flex items-center mt-2">
          <Rating
            readonly
            ratingValue={movie.rating}
            initialValue={movie.rating}
            size={20}
            fillColor="#FFD700"
            emptyColor="#E0E0E0"
            className="inline-block"
          />
          <span className="text-gray-700 font-semibold ml-2 mt-1.5">
            {movie.rating}
          </span>
        </div>

        <div className="text-right mt-4">
          {children ? (
            children
          ) : (
            <Link
              to={`/movie/${movie._id}`}
              className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
            >
              See Details
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
