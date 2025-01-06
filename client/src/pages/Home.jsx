import { Link, useLoaderData } from "react-router-dom";
import Banner from "../components/banner/Banner";
import MovieCard from "../components/movie-card/MovieCard";
import { useMovieContext } from "../context/Context";
import { ArrowBigRight } from "lucide-react";
import AwardWinningMovie from "../components/award-wining/AwardWiningMovie";
import UpComing from "../components/upcomming/UpComing";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import PricingSection from "../components/pricing/PricingSection";
import MovieCategories from "../components/category/MovieCategory";

const Home = () => {
  const { loading, theme, movies } = useMovieContext();
  //console.log(movies);

  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="loading loading-bars loading-lg"></span>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen  ${
        theme === "dark"
          ? "bg-gray-900 text-white"
          : "bg-gray-300 text-gray-700"
      }`}
    >
      <Banner />
      <section className="py-20">
        <div className="text-center" data-aos="fade-up">
          <h2 className="text-4xl font-bold text-gray-600 dark:text-gray-200">
            Featured Movies
          </h2>
          <p className="font-bold py-3 text-gray-600 dark:text-gray-400">
            Check out the latest movies added to the collection.
          </p>
        </div>
        <div className="flex items-center justify-center mt-8 ">
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-11/12 mx-auto "
            data-aos="fade-up"
          >
            {movies.map((movie) => (
              <div
                key={movie._id}
                className="transform transition-transform duration-500 hover:scale-105 items-center justify-center flex"
                data-aos="zoom-in"
              >
                <MovieCard movie={movie} />
              </div>
            ))}
          </div>
        </div>
      </section>
      <div className="text-center py-8 flex flex-col md:flex-row items-center justify-evenly gap-2">
        <h2 className="text-xl md:text-3xl font-semibold flex">
          All Movies Here <ArrowBigRight size={32} className="mt-1" />
        </h2>
        <Link
          to="/all-movies"
          className="bg-gray-800 text-white py-3 px-6 rounded hover:bg-gray-900 flex items-center"
        >
          See All Movies
          <ArrowBigRight size={24} />
        </Link>
      </div>
      <section>
        <MovieCategories />
      </section>
      <section className="mt-10">
        <AwardWinningMovie />
      </section>
      <section className="mt-10">
        <UpComing />
      </section>
      <section>
        <PricingSection />
      </section>
    </div>
  );
};
export default Home;
