import React from "react";

const awardWinningMovies = [
  {
    id: 1,
    title: "Judas and the Black Messiah",
    poster:
      "https://media.gqindia.com/wp-content/uploads/2021/04/oscar-winning-movies-on-netflix.jpg",
    award: "Oscar Award for Best Picture",
    year: 2023,
  },
  {
    id: 2,
    title: "Joker (2019)",
    poster:
      "https://media.gqindia.com/wp-content/uploads/2020/02/Oscar-winning-movies.jpg",
    award: "Oscar Award for Best Picture",
    year: 2020,
  },
  {
    id: 3,
    title: "Parasite (2019)",
    poster:
      "https://myfamilycinema.com/wp-content/uploads/2022/07/parasite-blog-1200x675-en.jpg",
    award: "Academy Award for Best Picture",
    year: 2021,
  },
];

const AwardWinningMovie = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-blue-900 via-gray-800 to-blue-900 text-white">
      <div className="container mx-auto md:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">
            Award-Winning Movies
          </h2>
          <p className="mt-4 text-lg">
            Discover the movies that have captivated audiences and critics
            alike.
          </p>
        </div>

        {/* Movie Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {awardWinningMovies.map((movie) => (
            <div
              key={movie.id}
              className="bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105"
            >
              {/* Movie Poster */}
              <img
                src={movie.poster}
                alt={movie.title}
                className="w-full h-64 object-cover"
              />
              {/* Movie Details */}
              <div className="p-6">
                <h3 className="text-xl font-semibold">{movie.title}</h3>
                <p className="mt-2 text-gray-400">{movie.award}</p>
                <p className="mt-1 text-gray-500">{movie.year}</p>
                <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition-colors">
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AwardWinningMovie;
