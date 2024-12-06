import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const UpComing = () => {
  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  const movies = [
    {
      id: 1,
      title: "Guardians of the Galaxy Vol. 3",
      releaseDate: "2024-12-25",
      poster:
        "https://thecinegeek.com/wp-content/uploads/2023/04/guardians-of-the-galaxy-vol-3-1.jpg",
      description: "The galaxy's favorite misfits are back in action!",
    },
    {
      id: 2,
      title: "Avatar: The Way of Water",
      releaseDate: "2024-12-20",
      poster:
        "https://m.media-amazon.com/images/M/MV5BOWYwODRjYzYtOGM4OS00NTM5LWFiZjYtNDEzNDg4YmFmYTllXkEyXkFqcGc@._V1_.jpg",
      description: "Return to Pandora in this visually stunning sequel.",
    },
    {
      id: 3,
      title: "Oppenheimer",
      releaseDate: "2024-12-15",
      poster:
        "https://static.toiimg.com/imagenext/toiblogs/photo/blogs/wp-content/uploads/2023/07/ss_col_3c-1.jpg",
      description: "A gripping tale of the man behind the atomic bomb.",
    },
    {
      id: 4,
      title: "Dune: Part Two",
      releaseDate: "2024-12-17",
      poster:
        "https://miro.medium.com/v2/resize:fit:1400/1*SvqveyU-E2RAHPwHykl5YQ.jpeg",
      description: "The saga continues in the epic world of Arrakis.",
    },
    {
      id: 5,
      title: "Mission Impossible: Dead Reckoning Part Two",
      releaseDate: "2024-07-25",
      poster:
        "https://igenyesferfi.hu/wp-content/uploads/2020/06/mission-impossible-7-tom-cruise_resized_1200x.jpg",
      description:
        "Ethan Hunt returns for another thrilling espionage mission.",
    },
    {
      id: 6,
      title: "The Hunger Games: Ballad of Songbirds & Snakes",
      releaseDate: "2024-10-22",
      poster:
        "https://is1-ssl.mzstatic.com/image/thumb/McNnpStCTZ4sq6KfiZf_Kw/1200x675mf.jpg",
      description:
        "Explore the origin story of Panem in this prequel to the Hunger Games saga.",
    },
  ];

  const calculateDaysLeft = (releaseDate) => {
    const release = new Date(releaseDate);
    const today = new Date();
    const timeDiff = release - today;
    return Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="py-16 dark:bg-gradient-to-r dark:from-gray-900 dark:to-gray-800 text-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12" data-aos="fade-up">
          <h2 className="text-4xl font-bold mb-2 dark:text-white text-gray-700">
            Upcoming Releases
          </h2>
          <p className="text-lg dark:text-white text-gray-700">
            Discover the most anticipated movies hitting theaters soon!
          </p>
        </div>

        {/* Countdown Timer */}
        <div
          className="flex items-center justify-center bg-blue-600 rounded-lg p-6 mb-12 shadow-lg"
          data-aos="fade-right"
        >
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-2">
              {movies[0].title} - Arriving in{" "}
              <span className="text-yellow-300">
                {calculateDaysLeft(movies[0].releaseDate)} Days
              </span>
            </h3>
            <p className="text-sm text-gray-200">{movies[0].description}</p>
          </div>
        </div>

        {/* Movies Grid */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          data-aos="fade-up"
        >
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="bg-gray-800 rounded-lg overflow-hidden shadow-lg"
              data-aos="fade-up"
            >
              <img
                src={movie.poster}
                alt={movie.title}
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2">{movie.title}</h3>
                <p className="text-sm text-gray-400 mb-4">
                  Release Date:{" "}
                  {new Date(movie.releaseDate).toLocaleDateString()}
                </p>
                <p className="text-gray-300 text-sm">{movie.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UpComing;
