import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { useMovieContext } from "../context/Context";

const MovieDetails = () => {
  const navigate = useNavigate();
  const movie = useLoaderData();
  const { user, favorites, setDataLoad, dataLoad } = useMovieContext();
  const { _id, poster, title, genre, duration, releaseYear, rating, summary } =
    movie;

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const handleDelete = () => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this movie!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        fetch(
          `https://server-side-movie-portal.vercel.app/delete-movie/${movie._id}`,
          {
            method: "DELETE",
          }
        )
          .then(() => {
            (res) => res.json();
          })
          .then((data) => {
            swal("Poof! Your movie has been deleted!", {
              icon: "success",
            });
            navigate("/all-movies");
          });
      } else {
        swal("Your movie is safe!");
      }
    });
  };

  const handleAddToFavorites = () => {
    const currentUser = user?.email;

    const newFavorite = {
      movieId: _id,
      poster,
      title,
      genre,
      duration,
      releaseYear,
      rating,
      summary,
      currentUser,
    };

    const isAlreadyInFavorites = favorites.some((fav) => fav.movieId === _id);

    if (isAlreadyInFavorites) {
      return swal({
        title: "Already Added!",
        text: `${title} movie is already in your favorites!`,
        icon: "info",
        button: "OK",
      });
    } else {
      fetch("https://server-side-movie-portal.vercel.app/add-favorite", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newFavorite),
      })
        .then((res) => {
          res.json();
        })
        .then((data) => {
          swal({
            title: "Movie Added!",
            text: `${title} movie has been added to your favorites!`,
            icon: "success",
            button: "OK",
          });
          setDataLoad(!dataLoad);
        });
    }
  };

  console.log(favorites.length);

  return (
    <div className="w-full min-h-screen py-5 relative">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-50"
        style={{ backgroundImage: `url(${poster})` }}
      ></div>
      {/* Banner  */}
      <div className="relative z-10 w-full">
        <div
          className="w-full bg-gradient-to-r from-transparent mid-yellow-800 to-transparent text-white p-10 text-center rounded-lg mb-6"
          data-aos="fade-down"
          data-aos-delay="100"
        >
          <h2 className="text-4xl font-bold mb-2">Welcome to Movie Details</h2>
          <p className="text-lg">
            Discover more about your favorite movies and enjoy the details here!
          </p>
        </div>

        {/* Movie Details Section */}
        <div
          className="flex lg:h-[60vh] flex-col lg:flex-row items-center bg-gray-800 shadow-lg justify-evenly rounded-lg overflow-hidden border border-red-600 container mx-auto"
          data-aos="fade-up"
        >
          {/* Movie Poster */}
          <div
            className="w-full h-full lg:w-1/3"
            data-aos="zoom-in"
            data-aos-delay="200"
          >
            <img
              src={movie.poster}
              alt={movie.title}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Movie Details */}
          <div className="p-6 w-full lg:w-2/3 flex items-center justify-center flex-col">
            <h1
              className="text-2xl md:text-4xl text-gray-300  font-bold mb-4"
              data-aos="fade-right"
              data-aos-delay="300"
            >
              {movie.title}
            </h1>
            <p
              className="text-gray-300 text-lg mb-4"
              data-aos="fade-right"
              data-aos-delay="400"
            >
              <span className="font-bold">Genre:</span> {movie.genre.join(", ")}
            </p>
            <p
              className="text-gray-300 text-lg mb-4"
              data-aos="fade-right"
              data-aos-delay="500"
            >
              <span className="font-bold">Duration:</span> {movie.duration}{" "}
              minutes
            </p>
            <p
              className="text-gray-300 text-lg mb-4"
              data-aos="fade-right"
              data-aos-delay="600"
            >
              <span className="font-bold">Release Year:</span>{" "}
              {movie.releaseYear}
            </p>
            <p
              className="text-gray-300 text-lg mb-4"
              data-aos="fade-right"
              data-aos-delay="700"
            >
              <span className="font-bold">Rating:</span> ⭐ {movie.rating} / 5
            </p>
            <p
              className="text-gray-300 text-lg mb-4"
              data-aos="fade-up"
              data-aos-delay="800"
            >
              <span className="font-bold">Summary:</span> {movie.summary}
            </p>

            {/* Action Buttons */}
            <div className="flex space-x-4 mt-6">
              {/* Delete Movie Button */}
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition-all duration-300"
                data-aos="fade-up"
                data-aos-delay="900"
              >
                Delete Movie
              </button>

              {/* Add to Favorites Button */}
              <button
                onClick={() => handleAddToFavorites(movie._id)}
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-all duration-300"
                data-aos="fade-up"
                data-aos-delay="1000"
              >
                Add to Favorite
              </button>
              <Link
                to={`/update-movie/${movie._id}`}
                className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600 transition-all duration-300"
                data-aos="fade-up"
                data-aos-delay="1000"
              >
                Update Movie
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
