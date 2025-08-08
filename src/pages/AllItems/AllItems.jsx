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
import { motion } from 'framer-motion';

const AllItems = () => {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [sortOption, setSortOption] = useState('date-desc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const navigate = useNavigate();

  const fetchItems = async (search = '') => {
    try {
      setLoading(true);
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/items?search=${search}`);
      let fetchedItems = res.data || [];
      setItems(sortItems(fetchedItems, sortOption));
      setCurrentPage(1); 
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

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim() === '') {
      fetchItems('');
    }
  };

  const handleSearchSubmit = () => {
    fetchItems(searchTerm);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearchSubmit();
    }
  };

  const handleSortChange = (e) => {
    const selectedOption = e.target.value;
    setSortOption(selectedOption);
    const sortedItems = sortItems(items, selectedOption);
    setItems(sortedItems);
    setCurrentPage(1); 
  };

  const sortItems = (data, option) => {
    const sorted = [...data];
    switch (option) {
      case 'title-asc':
        return sorted.sort((a, b) => a.title.localeCompare(b.title));
      case 'title-desc':
        return sorted.sort((a, b) => b.title.localeCompare(a.title));
      case 'date-asc':
        return sorted.sort((a, b) => new Date(a.date) - new Date(b.date));
      case 'date-desc':
        return sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
      default:
        return sorted;
    }
  };

  // Pagination logic
  const totalPages = Math.ceil(items.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedItems = items.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <Helmet>
        <title>All Items | WhereIsItHub</title>
      </Helmet>

      {/* Animated Title */}
      <motion.h2
        initial={{ scale: 0 }}
        animate={{ scale: 1, transition: { duration: 2 } }}
        className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-4"
      >
        All Lost &{' '}
        <motion.span
          animate={{
            color: ['#fe6035', '#0a1a3d', '#8b5cf6', '#091057'],
            transition: { duration: 2, repeat: Infinity },
          }}
        >
          Found Items
        </motion.span>
      </motion.h2>

      <p className="text-center max-w-2xl mx-auto text-gray-600 text-sm md:text-base mb-12">
        Browse all available lost and found campaigns — use the search and sorting options to find what you’re looking for.
      </p>

      {/* Search & Sort Bar */}
      <div className="mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Search Input + Button */}
        <div className="flex w-full max-w-md">
          <div className="relative flex-grow">
            <span className="absolute left-3 top-2.5 text-gray-400">
              <Search className="w-5 h-5" />
            </span>
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              onKeyDown={handleKeyDown}
              placeholder="Search by title or location..."
              className="input input-bordered pl-10 w-full"
            />
          </div>
          <button
            onClick={handleSearchSubmit}
            className="ml-2 btn btn-primary flex items-center gap-2"
          >
            <Search className="w-4 h-4" />
            Search
          </button>
        </div>

        {/* Sort Dropdown */}
        <select
          value={sortOption}
          onChange={handleSortChange}
          className="select w-full select-bordered lg:w-48 md:w-48"
        >
          <option value="date-desc">Newest First</option>
          <option value="date-asc">Oldest First</option>
          <option value="title-asc">Title A-Z</option>
          <option value="title-desc">Title Z-A</option>
        </select>
      </div>

      {/* Loading Spinner */}
      {loading && (
        <div className="flex justify-center my-10">
          <svg className="animate-spin h-10 w-10 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
          </svg>
        </div>
      )}

      {/* No Results */}
      {!loading && items.length === 0 && (
        <p className="text-center text-gray-500 mt-20 text-lg">No items found matching your search.</p>
      )}

      {/* Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {paginatedItems.map(item => (
          <div key={item._id} className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col">
            <div className="relative overflow-hidden rounded-t-2xl h-48">
              <img
                src={item.thumbnail || item.image || 'https://via.placeholder.com/300x200'}
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
                <span><strong>Location:</strong> {item.location || 'Unknown'}</span>
              </p>

              <p className="text-gray-600 flex items-center gap-2 text-sm">
                <CalendarDays className="w-4 h-4 text-primary" />
                <span><strong>Date:</strong> {new Date(item.date).toLocaleDateString() || 'N/A'}</span>
              </p>

              <div className="mt-auto flex justify-start">
                <button
                  onClick={() => navigate(`/items/${item._id}`)}
                  className="bg-primary hover:bg-primary-focus text-white font-semibold py-2 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <Search className="w-4 h-4" />
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-12 space-x-2">
          <button
            className="btn btn-outline"
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>

          {[...Array(totalPages)].map((_, idx) => (
            <button
              key={idx}
              className={`btn ${currentPage === idx + 1 ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => setCurrentPage(idx + 1)}
            >
              {idx + 1}
            </button>
          ))}

          <button
            className="btn btn-outline"
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default AllItems;
