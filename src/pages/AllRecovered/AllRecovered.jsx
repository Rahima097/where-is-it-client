import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext/AuthProvider';
import Swal from 'sweetalert2';
import { FaTable, FaThLarge } from 'react-icons/fa';

const AllRecovered = () => {
  const { user } = useAuth();

  const [recoveredItems, setRecoveredItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [layout, setLayout] = useState('card');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (!user?.email) return;

    const fetchRecoveredItems = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/recovered?email=${user.email.toLowerCase()}`
        );
        setRecoveredItems(res.data);
      } catch (error) {
        console.error('Error fetching recovered items:', error);
        Swal.fire('Error', 'Failed to load recovered items', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchRecoveredItems();
  }, [user]);

  const filteredItems = recoveredItems.filter((item) => {
    const isOwner = item.recoveredBy?.email === user?.email;
    if (!isOwner) return false;

    const term = searchTerm.toLowerCase();
    return (
      item.title?.toLowerCase().includes(term) ||
      item.postType?.toLowerCase().includes(term) ||
      item.recoveredLocation?.toLowerCase().includes(term)
    );
  });

  if (loading) {
    return <div className="text-center py-10">Loading recovered items...</div>;
  }

  if (!user) {
    return (
      <div className="text-center py-10 text-red-600">
        Please login to view your recovered items.
      </div>
    );
  }

  return (
    <div className='bg-base-200'>
      <div className="max-w-6xl py-20 mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6 pb-20 text-primary text-center">
          My Recovered Items
        </h1>

        <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
          <input
            type="text"
            placeholder="Search by title, category or location"
            className="input input-bordered w-full max-w-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="Search recovered items"
          />

          <div className="btn-group">
            <button
              onClick={() => setLayout('card')}
              className={`btn btn-outline ${layout === 'card' ? 'btn-primary' : ''
                }`}
              aria-pressed={layout === 'card'}
              title="Card view"
            >
              <FaThLarge />
            </button>
            <button
              onClick={() => setLayout('table')}
              className={`btn btn-outline ${layout === 'table' ? 'btn-primary' : ''
                }`}
              aria-pressed={layout === 'table'}
              title="Table view"
            >
              <FaTable />
            </button>
          </div>
        </div>

        {filteredItems.length === 0 ? (
          <p className="text-center text-gray-500 mt-10 py-10 text-xl">
            {searchTerm
              ? 'No recovered items match your search.'
              : 'You have not added any recovered items yet.'}
          </p>
        ) : layout === 'card' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 pt-10 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item._id}
                className="card bg-base-100 shadow-md p-4 rounded-lg"
              >
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.title || 'Recovered Item'}
                    className="w-full h-48 object-cover rounded mb-3"
                  />
                )}
                <h2 className="text-xl text-primary font-semibold mb-2">
                  {item.title || 'No Title'}
                </h2>
                <p>
                  <strong>Category:</strong>{' '}
                  <span className="capitalize">{item.postType || 'N/A'}</span>
                </p>
                <p>
                  <strong>Location:</strong> {item.recoveredLocation || 'N/A'}
                </p>
                <p>
                  <strong>Date Recovered:</strong>{' '}
                  {item.recoveredDate
                    ? new Date(item.recoveredDate).toLocaleDateString()
                    : 'N/A'}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto pt-10">
            <table className="table w-full border border-primary  rounded-lg">
              <thead className='bg-gray-200 text-secondary'>
                <tr>
                  <th>#</th>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Location</th>
                  <th>Date Recovered</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.map((item, index) => (
                  <tr key={item._id} className="hover:bg-base-200">
                    <td>{index + 1}</td>
                    <td>{item.title || 'No Title'}</td>
                    <td className="capitalize">{item.postType || 'N/A'}</td>
                    <td>{item.recoveredLocation || 'N/A'}</td>
                    <td>
                      {item.recoveredDate
                        ? new Date(item.recoveredDate).toLocaleDateString()
                        : 'N/A'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllRecovered;
