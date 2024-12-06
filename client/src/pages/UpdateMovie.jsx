import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Rating } from "react-simple-star-rating";
import { useMovieContext } from "../context/Context";
import swal from "sweetalert";
import { useLoaderData } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

const UpdateMovie = () => {
  const { user } = useMovieContext();
  const loaderData = useLoaderData();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: loaderData,
  });

  const [rating, setRating] = useState(loaderData?.rating || 0);
  const [error, setError] = useState("");
  const [selectedGenres, setSelectedGenres] = useState(loaderData?.genre || []);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const genres = [
    "Comedy",
    "Drama",
    "Action",
    "Thriller",
    "Documentary",
    "Sci-Fi",
    "Animation",
    "Adventure",
    "Biography",
    "History",
    "War",
  ];
  const dropdownRef = useRef(null);

  // Handle Genre Selection
  const handleGenreSelect = (genre) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter((g) => g !== genre));
    } else {
      setSelectedGenres([...selectedGenres, genre]);
    }
  };

  // Sync selectedGenres with form state
  useEffect(() => {
    setValue("genre", selectedGenres);
  }, [selectedGenres, setValue]);

  // Handle form submission
  const onSubmit = (data) => {
    const userMail = user?.email;
    if (rating === 0) {
      setError("Please select a rating.");
      return;
    }
    const movieData = { ...data, rating, userMail, genre: selectedGenres };

    // Send movieData to the server
    fetch(`http://localhost:3000/update-movie/${loaderData?._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(movieData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          swal(
            "Movie updated!",
            "Your movie has been updated successfully!",
            "success"
          );
          const updatedMovieData = { ...movieData, genre: selectedGenres };
          reset(updatedMovieData);
          setRating(updatedMovieData.rating);
          setSelectedGenres(updatedMovieData.genre);
          setError("");
        } else {
          swal(
            "Failed!",
            "Failed to update the movie. Please try again.",
            "error"
          );
        }
      })
      .catch((err) => {
        console.error(err);
        swal(
          "Failed!",
          "Failed to update the movie. Please try again.",
          "error"
        );
      });
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Initialize AOS animations
  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-gray-400 via-red-950-400 to-green-950-500 px-1"
      data-aos="fade-in"
    >
      {/* Banner */}
      <div
        className="w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white py-8 px-6 md:px-12 rounded-lg shadow-lg mb-8"
        data-aos="fade-down"
      >
        <h1 className="text-3xl md:text-5xl font-extrabold text-center">
          Update Movie Details
        </h1>
        <p className="text-lg md:text-xl font-light text-center mt-2">
          Modify and save your movie information seamlessly.
        </p>
      </div>

      {/* Update Movie Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-lg rounded-lg p-8 max-w-2xl w-full mb-6"
        data-aos="zoom-in"
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Update Movie
        </h2>

        {/* Two-Column Layout for Inputs */}
        <div className="grid grid-cols-2 gap-6">
          {/* Movie Poster */}
          <div className="col-span-2 md:col-span-1">
            <label className="block text-gray-700 font-semibold mb-2">
              Movie Poster (Image URL)
            </label>
            <input
              type="url"
              {...register("poster", {
                required: "Poster URL is required.",
                pattern: {
                  value: /^https?:\/\/.+\.(jpg|jpeg|png|gif)$/i,
                  message: "Enter a valid image URL.",
                },
              })}
              className="w-full border rounded-lg p-2"
              placeholder="https://example.com/poster.jpg"
            />
            {errors.poster && (
              <p className="text-red-500 text-sm">{errors.poster.message}</p>
            )}
          </div>

          {/* Movie Title */}
          <div className="col-span-2 md:col-span-1">
            <label className="block text-gray-700 font-semibold mb-2">
              Movie Title
            </label>
            <input
              type="text"
              {...register("title", {
                required: "Title is required.",
                minLength: {
                  value: 2,
                  message: "Title must have at least 2 characters.",
                },
              })}
              className="w-full border rounded-lg p-2"
              placeholder="Enter movie title"
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}
          </div>

          {/* Genre Dropdown */}
          <div className="col-span-2 md:col-span-1 relative" ref={dropdownRef}>
            <label className="block text-gray-700 font-semibold mb-2">
              Genre
            </label>
            <div
              className="border rounded-lg p-2 cursor-pointer"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              {selectedGenres.length > 0
                ? selectedGenres.join(", ")
                : "Select Genre"}
            </div>
            {isDropdownOpen && (
              <div className="absolute bg-white border border-gray-300 rounded-lg shadow-lg mt-2 w-full z-10">
                {genres.map((genre) => (
                  <div key={genre} className="p-2 flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedGenres.includes(genre)}
                      onChange={() => handleGenreSelect(genre)}
                      className="mr-2"
                    />
                    <span>{genre}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Duration */}
          <div className="col-span-2 md:col-span-1">
            <label className="block text-gray-700 font-semibold mb-2">
              Duration (minutes)
            </label>
            <input
              type="number"
              {...register("duration", {
                required: "Duration is required.",
                min: {
                  value: 60,
                  message: "Duration must be at least 60 minutes.",
                },
              })}
              className="w-full border rounded-lg p-2"
              placeholder="Enter duration in minutes"
            />
          </div>

          {/* Release Year */}
          <div className="col-span-2 md:col-span-1">
            <label className="block text-gray-700 font-semibold mb-2">
              Release Year
            </label>
            <select
              {...register("releaseYear", {
                required: "Please select a release year.",
              })}
              className="w-full border rounded-lg p-2"
            >
              <option value="">Select Year</option>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
              <option value="2021">2021</option>
            </select>
          </div>

          {/* Rating */}
          <div className="col-span-2 md:col-span-1 mt-8">
            <div className="flex items-center">
              <label className="text-gray-700 font-semibold mr-4">
                Rating:
              </label>
              <Rating
                onClick={(rate) => setRating(rate)}
                ratingValue={rating}
                initialValue={rating}
                size={25}
                fillColor="#FFD700"
              />
            </div>
            {error && rating === 0 && (
              <p className="text-red-500 text-sm mt-2">{error}</p>
            )}
          </div>
        </div>

        {/* Summary */}
        <div className="mt-6">
          <label className="block text-gray-700 font-semibold mb-2">
            Summary
          </label>
          <textarea
            {...register("summary", {
              required: "Summary is required.",
              minLength: {
                value: 10,
                message: "Summary must have at least 10 characters.",
              },
            })}
            className="w-full border rounded-lg p-2"
            rows="4"
            placeholder="Write a short summary of the movie"
          ></textarea>
        </div>

        <div className="mt-8 text-center">
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-lg"
          >
            Update Movie
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateMovie;
