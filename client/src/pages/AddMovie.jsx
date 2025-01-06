import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Rating } from "react-simple-star-rating";
import { useMovieContext } from "../context/Context";
import swal from "sweetalert";
import AOS from "aos";
import "aos/dist/aos.css";

const AddMovie = () => {
  const { user } = useMovieContext();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [rating, setRating] = useState(0);
  const [error, setError] = useState("");
  const [selectedGenres, setSelectedGenres] = useState([]);
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

  // Initialize AOS
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  // Handle Genre Selection
  const handleGenreSelect = (genre) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter((g) => g !== genre));
    } else {
      setSelectedGenres([...selectedGenres, genre]);
    }
  };

  // Handle form submission
  const onSubmit = (data) => {
    const userMail = user?.email;
    if (rating === 0) {
      setError("Please select a rating.");
      return;
    }
    const movieData = { ...data, rating, userMail, genre: selectedGenres };
    console.log("Movie Data: ", movieData);

    // Send movieData to the server
    fetch("https://server-side-movie-portal.vercel.app/add-movie", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(movieData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          swal(
            "Movie Added!",
            "Your movie has been added successfully!",
            "success"
          );
          setRating(0);
          reset();
          setSelectedGenres([]);
          setError("");
        } else {
          swal(
            "Failed!",
            "Failed to add the movie. Please try again.",
            "error"
          );
        }
      })
      .catch((err) => {
        console.error(err);
        swal("Failed!", "Failed to add the movie. Please try again.", "error");
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-gray-500 to-red-950-700 flex flex-col items-center justify-center">
      {/* Banner Section */}
      <div
        className="w-full text-center py-10 bg-gradient-to-r from-purple-700 via-purple-800 to-purple-900 text-white shadow-lg mb-10"
        data-aos="fade-down"
      >
        <h1 className="text-3xl md:text-5xl font-extrabold">Add a New Movie</h1>
        <p className="text-lg mt-2">
          Share your favorite movies and help others discover hidden gems!
        </p>
      </div>

      {/* Form Section */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-lg rounded-lg p-8 max-w-2xl w-full mb-10"
        data-aos="zoom-in"
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Add a Movie
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
              <option value="2021">2019</option>
              <option value="2021">2018</option>
              <option value="2021">2017</option>
              <option value="2021">2016</option>
              <option value="2021">2015</option>
              <option value="2021">2012</option>
              <option value="2021">2010</option>
              <option value="2021">2008</option>
              <option value="2021">2000</option>
              <option value="2021">1999</option>
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

export default AddMovie;
