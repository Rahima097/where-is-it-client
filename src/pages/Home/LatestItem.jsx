import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const LatestItems = () => {
    const [items, setItems] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const res = await axios.get("http://localhost:3000/items"); // your backend URL

                if (!Array.isArray(res.data)) {
                    throw new Error("API response is not an array");
                }

                const latestItems = res.data
                    .filter((item) => item.status !== "recovered")
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
        <section className="p-4 max-w-7xl mx-auto py-20">
            <h2 className="text-3xl text-secondary font-bold mb-6 text-center pb-3">
                Latest Find & Lost Items
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {items.map((item) => (
                    <div
                        key={item._id}
                        className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col"
                    >
                        <div className="relative overflow-hidden rounded-t-2xl h-48">
                            <img
                                src={item.thumbnail || item.image || "https://via.placeholder.com/300x200"}
                                alt={item.title}
                                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                            />
                            {/* Badge */}
                            <span className="absolute top-3 left-3 bg-primary text-white px-3 py-1 rounded-full text-xs font-semibold uppercase shadow-lg">
                                {item.postType}
                            </span>
                        </div>

                        <div className="p-5 flex flex-col flex-grow">
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                {item.title}
                            </h3>

                            <p className="text-gray-600 mb-1">
                                <span className="font-medium">Location:</span>{" "}
                                {item.location || "Unknown"}
                            </p>
                            <p className="text-gray-600 mb-4">
                                <span className="font-medium">Date:</span>{" "}
                                {new Date(item.date).toLocaleDateString() || "N/A"}
                            </p>

                            <div className="mt-auto flex justify-start">
                                <button
                                    onClick={() => navigate(`/items/${item._id}`)}
                                    className="bg-primary hover:bg-primary-focus text-white font-semibold py-2 px-6 rounded-lg transition-colors w-auto"
                                >
                                    View Details
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-8 text-center">
                <button
                    onClick={() => navigate("/allItems")}
                    className="btn btn-outline text-primary border-primary btn-secondary"
                >
                    See All
                </button>
            </div>
        </section>
    );
};

export default LatestItems;
