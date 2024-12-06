import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const Banner = () => {
  const images = [
    {
      src: "https://mir-s3-cdn-cf.behance.net/projects/404/d6d419211214255.Y3JvcCwxMzgwLDEwODAsMjcwLDA.jpg",
      alt: "The Batman (2022) Official Trailer",
      text: "Justice League",
    },
    {
      src: "https://i.ytimg.com/vi/3YzMNPtNVxE/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCyOwqFZmx6bVpbxH49jWsTgFRbJw",
      alt: "SPIDER-MAN NO WAY HOME 2021 ORIGINAL OFFICIAL CINEMA MOVIE",
      text: "Spider Man No Way Home",
    },
    {
      src: "https://carnegiecarnegie.org/wp-content/uploads/2023/12/Movie-slider.jpg",
      alt: "The epic saga examines the life of theoretical physicist J",
      text: "Oppenheimer (2023)",
    },
  ];

  return (
    <div className="w-full mx-auto mt-2">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        className="w-full"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <div
              className="w-full h-[400px] md:h-[500px] bg-cover bg-center relative"
              style={{ backgroundImage: `url(${image.src})` }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white px-4">
                  <h2 className="text-2xl md:text-4xl font-bold drop-shadow-lg">
                    {image.text}
                  </h2>
                  <p className="mt-2 text-lg md:text-xl font-medium italic drop-shadow-md">
                    {image.alt}
                  </p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
