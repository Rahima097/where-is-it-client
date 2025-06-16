import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import {
  MapPin,
  CalendarDays,
  Search,
  BadgeInfo,
} from "lucide-react";
// import WobbleBgAnimation from "../Shared/BackgroundAnimation/WobbleBgAnimation";

const LatestItems = () => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/items`);

        if (!Array.isArray(res.data)) {
          throw new Error("API response is not an array");
        }

        const latestItems = res.data
          // .filter((item) => item.status !== "recovered")
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .slice(0, 6);

        setItems(latestItems);
      } catch (error) {
        console.error("Failed to fetch items:", error);
        setError("Failed to fetch items");
      }
    };

    fetchItems();
  }, []);

  if (error) {
    return <div className="text-red-600">{error}</div>;
  }

  return (
    <section className="p-4 bg-transparent max-w-7xl mx-auto py-20">
      {/* <WobbleBgAnimation></WobbleBgAnimation> */}
      {/* Animated Title */}
      <motion.h2
        initial={{ scale: 0 }}
        animate={{ scale: 1, transition: { duration: 2 } }}
        className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-4"
      >
        Latest{" "}
        <motion.span
          animate={{
            color: ["#fe6035", "#0a1a3d", "#8b5cf6"],
            transition: { duration: 2, repeat: Infinity },
          }}
        >
          Find & Lost
        </motion.span>{" "}
        Items
      </motion.h2>

      <p className="text-center max-w-2xl mx-auto text-gray-600 mb-10">
        Here are the most recently reported lost or found items.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {items.map((item, i) => (
          <motion.div
            key={item._id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col"
          >
            <div className="relative overflow-hidden rounded-t-2xl h-48">
              <img
                src={item.thumbnail || item.image || "https://via.placeholder.com/300x200"}
                alt={item.title}
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-3 left-3 bg-primary text-white px-3 py-1 rounded-full text-xs font-semibold uppercase shadow">
                {item.postType}
              </span>
            </div>

            <div className="p-5 flex flex-col flex-grow space-y-3">
              <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                <BadgeInfo className="w-5 h-5 text-primary" />
                {item.title}
              </h3>

              <p className="text-gray-600 flex items-center gap-2 text-sm">
                <MapPin className="w-4 h-4 text-primary" />
                <span><strong>Location:</strong> {item.location || "Unknown"}</span>
              </p>

              <p className="text-gray-600 flex items-center gap-2 text-sm">
                <CalendarDays className="w-4 h-4 text-primary" />
                <span><strong>Date:</strong> {new Date(item.date).toLocaleDateString() || "N/A"}</span>
              </p>

              <div className="mt-auto flex justify-start">
                <button
                  onClick={() => navigate(`/items/${item._id}`)}
                  className="bg-primary hover:bg-primary-focus text-white font-semibold py-2 px-6 rounded-lg transition-colors  flex items-center justify-center gap-2"
                >
                  <Search className="w-4 h-4" />
                  View Details
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-10 text-center">
    
        <button
          onClick={() => navigate("/allItems")}
          className="btn btn-outline text-primary border-primary"
        >
          See All
        </button>
      </div>
    </section>
  );
};

export default LatestItems;
