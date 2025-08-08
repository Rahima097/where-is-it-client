import React, { useEffect, useState } from "react";
import { motion,} from "framer-motion";
import lost from "../../assets/Img/lost.jpg";
import found from "../../assets/Img/found.jpg";
import { Link } from "react-router";
import WobbleBgAnimation from "./BackgroundAnimation/WobbleBgAnimation";

const About = () => {
  const [isMobile, setIsMobile] = useState(false);
 

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize(); 
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className="bg-base-200 py-20 px-4 md:px-10 overflow-hidden">
      <WobbleBgAnimation></WobbleBgAnimation>
      <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row-reverse items-center gap-10">
        {/* Right: Images */}
        <div className="w-full lg:w-1/2 flex flex-col gap-6 items-center">
          {isMobile ? (
            <>
              <img
                src={lost}
                className="w-full max-w-xs sm:max-w-sm border-primary border-s-8 border-b-8 rounded-t-[40px] rounded-br-[40px] shadow-2xl object-cover"
              />
              <img
                src={found}
                className="w-full max-w-xs sm:max-w-sm border-primary border-s-8 border-b-8 rounded-t-[40px] rounded-br-[40px] shadow-2xl object-cover"
              />
            </>
          ) : (
            <>
              <motion.img
                src={lost}
                animate={{ y: [100, 150, 100] }}
                transition={{ duration: 5, repeat: Infinity }}
                className="w-full max-w-sm border-primary border-s-8 border-b-8 rounded-t-[40px] rounded-br-[40px] shadow-2xl object-cover"
              />
              <motion.img
                src={found}
                animate={{ x: [100, 150, 100] }}
                transition={{ duration: 10, delay: 5, repeat: Infinity }}
                className="w-full max-w-sm border-primary border-s-8 border-b-8 rounded-t-[40px] rounded-br-[40px] shadow-2xl object-cover"
              />
            </>
          )}
        </div>

        {/* Left: Text */}
        <div className="w-full lg:w-1/2 space-y-6 text-center lg:text-left">
          <motion.h1
            initial={{ scale: 0 }}
            animate={{ scale: 1, transition: { duration: 2 } }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold"
          >
            About{" "}
            <motion.span
              animate={{
                color: ["#fe6035", "#0a1a3d", "#8b5cf6"],
                transition: { duration: 2, repeat: Infinity },
              }}
            >
              WhereIsItHub
            </motion.span>
          </motion.h1>
          <p className="text-base md:text-lg text-gray-700">
            WhereIsItHub is your trusted platform for reuniting people with their lost or found belongings. Whether it's keys, documents, pets, or phones — we help connect the community to restore what’s missing.
          </p>
          <p className="text-sm md:text-base text-gray-700">
            With secure listings, real-time updates, and recovery tracking, our platform empowers users to act fast, stay informed, and help others.
          </p>
           <Link to="/allItems" className="btn btn-primary">Explore Items</Link>
        </div>
      </div>
    </section>
  );
};

export default About;
