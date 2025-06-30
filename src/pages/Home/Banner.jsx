import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Link } from "react-router";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const Banner = () => {
  const slides = [
    {
      id: 1,
      title: "Lost Something?",
      subtitle: "Report it and let our community help you find it",
      image: "https://i.ibb.co/v6XLDDD0/lost-item.jpg",
      buttonText: "Report Lost Item",
      buttonLink: "/addItems",
    },
    {
      id: 2,
      title: "Found Something?",
      subtitle: "Help someone reunite with their lost belongings",
      image: "https://i.ibb.co/t7djQD8/found-item.jpg",
      buttonText: "Report Found Item",
      buttonLink: "/addItems",
    },
    {
      id: 3,
      title: "Reunite with Your Belongings",
      subtitle: "Browse through our database of found items",
      image: "https://i.ibb.co/jZrP977p/browse-data.jpg",
      buttonText: "Browse Items",
      buttonLink: "/allitems",
    },
  ];

  return (
    <div className="relative">
      <Swiper
        spaceBetween={0}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className="min-h-[60vh] md:min-h-[70vh] w-full bg-cover bg-center relative"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="absolute inset-0 bg-[#0a1a3db0] flex items-center justify-center px-4">
                <div className="text-center max-w-2xl mx-auto">
                  <motion.h1
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1 }}
                    className="text-4xl md:text-6xl font-bold mb-4 text-white"
                  >
                    <motion.span
                      animate={{
                        color: ["#fe6035", "#ffffff", "#8b5cf6"],
                        transition: { duration: 2, repeat: Infinity },
                      }}
                    >
                      {slide.title}
                    </motion.span>
                  </motion.h1>

                  <p className="text-lg md:text-2xl text-white mb-8">
                    {slide.subtitle}
                  </p>

                  <Link
                    to={slide.buttonLink}
                    className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-secondary"
                  >
                    {slide.buttonText}
                  </Link>
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
