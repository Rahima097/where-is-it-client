import React, { useEffect, useState } from 'react';
import { Helmet } from "react-helmet-async";
import axios from 'axios';
import { useNavigate } from 'react-router';
import {
  MapPin,
  CalendarDays,
  Search,
  BadgeInfo,
} from 'lucide-react';

const AllItems = () => {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchItems = async (search = '') => {
    try {
      setLoading(true);
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/items?search=${search}`);
      setItems(res.data);
    } catch (error) {
      console.error(error);
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    fetchItems(value);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <Helmet>
        <title>Lost & Found items  | WhereIsIt</title>
      </Helmet>
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">All Lost & Found Items</h2>

      {/* Search Input */}
      <div className="mb-8 flex justify-center">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search by title or location..."
          className="input input-bordered w-full max-w-md"
        />
      </div>

      {/* Loading Spinner */}
      {loading && (
        <div className="flex justify-center my-10">
          <svg
            className="animate-spin h-10 w-10 text-primary"
            xmlns="http://www.w3.org/2000/svg"
            fill="none" viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"
            />
            <path
              className="opacity-75" fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            />
          </svg>
        </div>
      )}

      {/* No Results */}
      {!loading && items.length === 0 && (
        <p className="text-center text-gray-500 mt-20 text-lg">No items found matching your search.</p>
      )}

      {/* Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.map(item => (
          <div key={item._id} className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col">
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllItems;
