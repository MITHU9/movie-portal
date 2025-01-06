import React from "react";
import Marquee from "react-fast-marquee";

const MovieCategories = () => {
  return (
    <section className="bg-gray-100 dark:bg-gray-900 py-16">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-8" data-aos="fade-up">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100">
            Explore Various Categories
          </h2>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Discover your favorite genres and dive into endless entertainment.
          </p>
        </div>

        {/* Marquee Section */}
        <Marquee
          gradient={false}
          speed={50}
          pauseOnHover
          className="overflow-hidden py-4"
        >
          {[
            "Action",
            "Comedy",
            "Drama",
            "Sci-Fi",
            "Horror",
            "Romance",
            "Adventure",
            "Thriller",
            "Fantasy",
            "Documentary",
            "Animated",
            "Mystery",
            "Biography",
            "Crime",
          ].map((category, index) => (
            <div
              key={index}
              className="bg-blue-600 text-white rounded-full px-6 py-3 text-lg font-semibold shadow-md mx-4 hover:shadow-lg hover:bg-blue-700 transition"
            >
              {category}
            </div>
          ))}
        </Marquee>

        {/* Additional Info */}
        <div className="text-center mt-8 text-gray-600 dark:text-gray-400">
          <p>Stay tuned for new categories and updates every week!</p>
        </div>
      </div>
    </section>
  );
};

export default MovieCategories;
