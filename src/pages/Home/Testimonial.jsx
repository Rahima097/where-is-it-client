import React from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { Autoplay } from 'swiper/modules';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Kamrul Hasan',
    role: 'Student',
    image: 'https://i.ibb.co/pry49Ltd/Kamrul-Hasan.png',
    quote: 'WhereIsIt helped me recover my lost laptop within hours—amazing service!',
  },
  {
    name: 'Farzana Karim',
    role: 'Teacher',
    image: 'https://i.ibb.co/27ykVCmw/Farzana-Karim.png',
    quote: 'I found my lost wallet thanks to the alert system. Great platform!',
  },
  {
    name: 'Tanvir Ahamed',
    role: 'Traveler',
    image: 'https://i.ibb.co/QFHtp9Hk/Tanvir-Ahamed.png',
    quote: 'My passport was returned to me in perfect condition. Very reliable.',
  },
  {
    name: 'Sumaiya Siddiqua',
    role: 'Entrepreneur',
    image: 'https://i.ibb.co/bRFzGRXJ/Sumaiya-Siddiqua.png',
    quote: 'Fast, smooth, and easy recovery process. Highly recommend WhereIsIt!',
  },
];

const Testimonial = () => {
  return (
    <section className="bg-white py-20 px-4">
      <motion.h2
        initial={{ scale: 0 }}
        animate={{ scale: 1, transition: { duration: 2 } }}
        className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8"
      >
        What Our{' '}
        <motion.span
          animate={{
            color: ['#fe6035', '#0a1a3d', '#8b5cf6', '#091057'],
            transition: { duration: 2, repeat: Infinity },
          }}
        >
          Clients Say
        </motion.span>
      </motion.h2>

      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        className="max-w-4xl mx-auto"
      >
        {testimonials.map((t, idx) => (
          <SwiperSlide key={idx}>
            <div className="flex flex-col items-center text-center px-6 py-10">
              <img
                src={t.image}
                alt={t.name}
                className="w-24 h-24 rounded-full border-4 border-primary object-cover mb-4"
              />
              <Quote className="w-8 h-8 text-secondary mb-2" />
              <p className="italic text-gray-700 mb-4">"{t.quote}"</p>
              <p className="font-semibold text-primary">{t.name}</p>
              <p className="text-sm text-gray-500">{t.role}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Testimonial;
