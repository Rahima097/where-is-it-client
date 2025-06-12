
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext/AuthProvider';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Swal from 'sweetalert2';

const ItemDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [item, setItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [recoveredDate, setRecoveredDate] = useState(new Date());
  const [recoveredLocation, setRecoveredLocation] = useState('');

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/items/${id}`)
      .then(res => setItem(res.data))
      .catch(err => console.error(err));
  }, [id]);

  const handleRecover = async () => {
    if (!recoveredLocation) {
      return Swal.fire('Error', 'Please enter recovered location', 'error');
    }

    const recoveredInfo = {
      itemId: item._id,
      title: item.title,
      postType: item.postType,
      recoveredLocation,
      recoveredDate,
      recoveredBy: {
        name: user.displayName,
        email: user.email,
        image: user.photoURL
      }
    };

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/recovered`, recoveredInfo);
      if (res.data.modifiedCount || res.data.insertedId) {
        Swal.fire('Success', 'Item marked as recovered!', 'success');
        setItem({ ...item, status: 'recovered' });
        setShowModal(false);
      }
    } catch (err) {
      console.error(err);
      Swal.fire('Error', 'Something went wrong', 'error');
    }
  };

  if (!item) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">{item.title}</h1>

      <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col md:flex-row gap-8">
        {/* Left side - Details */}
        <div className="flex-1 space-y-3">
          <p><span className="font-semibold">Type:</span> {item.postType}</p>
          <p><span className="font-semibold">Category:</span> {item.category}</p>
          <p><span className="font-semibold">Location:</span> {item.location}</p>
          <p><span className="font-semibold">Date:</span> {new Date(item.date).toLocaleDateString()}</p>
          <p><span className="font-semibold">Status:</span> {item.status}</p>
          <p><span className="font-semibold">Description:</span> {item.description}</p>
          <p><span className="font-semibold">Contact Name:</span> {item.contactName}</p>
          <p><span className="font-semibold">Contact Email:</span> {item.contactEmail}</p>

          {item.status !== 'recovered' && (
            <button
              onClick={() => setShowModal(true)}
              className="btn btn-primary mt-4"
            >
              {item.postType === 'Lost' ? 'Found This!' : 'This is Mine!'}
            </button>
          )}
        </div>

        {/* Right side - Image */}
        <div className="flex-1">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-80 object-cover rounded-lg"
          />
        </div>
      </div>

      {/* Recovery Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-md space-y-4">
            <h3 className="text-xl font-semibold">Recovery Details</h3>

            <input
              type="text"
              placeholder="Recovered Location"
              value={recoveredLocation}
              onChange={e => setRecoveredLocation(e.target.value)}
              className="input input-bordered w-full"
            />

            <DatePicker
              selected={recoveredDate}
              onChange={(date) => setRecoveredDate(date)}
              className="input input-bordered w-full"
            />

            <div className="text-sm text-gray-700">
              <p><strong>Name:</strong> {user.displayName}</p>
              <p><strong>Email:</strong> {user.email}</p>
            </div>

            <div className="flex gap-2 justify-end">
              <button className="btn btn-primary" onClick={handleRecover}>Submit</button>
              <button className="btn btn-outline" onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemDetails;
