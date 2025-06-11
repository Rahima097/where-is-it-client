import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router';

const AllItems = () => {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

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
          <div key={item._id} className="bg-white rounded-xl shadow-xl hover:shadow-2xl transition duration-300">
            <img src={item.image} alt={item.title} className="w-full h-56 object-cover rounded-t-xl" />
            <div className="p-5 space-y-2">
              <h3 className="text-xl font-semibold text-gray-800">{item.title}</h3>
              <p className="text-sm text-gray-600"><span className="font-medium">Type:</span> {item.postType}</p>
              <p className="text-sm text-gray-600"><span className="font-medium">Location:</span> {item.location}</p>
              <p className="text-sm text-gray-600"><span className="font-medium">Date:</span> {new Date(item.date).toLocaleDateString()}</p>

              <Link to={`/items/${item._id}`} className="btn btn-sm btn-primary mt-3">
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllItems;
