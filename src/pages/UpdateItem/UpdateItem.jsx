import React, { useEffect, useState } from 'react';
import { Helmet } from "react-helmet-async";
import { useParams, useNavigate } from 'react-router';
import { useAuth } from '../../contexts/AuthContext/AuthProvider';
import axios from 'axios';
import Swal from 'sweetalert2';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import WobbleBgAnimation from '../Shared/BackgroundAnimation/WobbleBgAnimation';
import { getAuth } from 'firebase/auth';

const UpdateItem = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();

    const [itemData, setItemData] = useState(null);
    const [date, setDate] = useState(new Date());

    const auth = getAuth();


    useEffect(() => {
        const fetchItemData = async () => {
            try {
                if (!user) return; 

                const token = await auth.currentUser.getIdToken();
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/items/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setItemData(res.data);
                setDate(new Date(res.data.date || Date.now()));
            } catch (err) {
                console.error(err);
            }
        };

        fetchItemData();
    }, [id, user]);

    const handleUpdateItem = async (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        const updatedItem = {
            postType: data.postType,
            image: data.image,
            title: data.title,
            description: data.description,
            category: data.category,
            location: data.location,
            date: date.toISOString(),
        };

        try {
            const token = await auth.currentUser.getIdToken();

            const res = await axios.patch(
                `${import.meta.env.VITE_API_URL}/items/${id}`,
                updatedItem,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (res.data.modifiedCount > 0 || res.data.acknowledged || res.status === 200) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Item updated successfully!',
                    showConfirmButton: false,
                    timer: 1500
                }).then(() => {
                    navigate('/myItems');
                });
            }
        } catch (err) {
            console.error(err);
            Swal.fire({
                icon: 'error',
                title: 'Update failed',
                text: err.response?.data?.message || err.message || 'Unknown error',
            });
        }
    };

    if (!itemData) {
        return <div className="text-center py-10">Loading...</div>;
    }

    return (
        <div className='bg-transparent py-10'>
            <Helmet>
                <title>Update Item | WhereIsItHub</title>
            </Helmet>
            <WobbleBgAnimation></WobbleBgAnimation>
            <div className="max-w-4xl mx-auto px-4 py-8">
                <div className="bg-base-200 shadow-xl rounded-xl p-8 space-y-6 ">
                    <h2 className="text-3xl font-bold text-center text-primary">Update Your Lost or Found Item</h2>

                    <form onSubmit={handleUpdateItem} className="space-y-8">
                        <div>
                            <h3 className="text-xl font-semibold mb-4 border-b pb-2 text-secondary">Item Details</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block mb-1 font-medium">Post Type</label>
                                    <select name="postType" className="select select-bordered w-full" defaultValue={itemData.postType} required>
                                        <option value="Lost">Lost</option>
                                        <option value="Found">Found</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block mb-1 font-medium">Thumbnail (Image URL)</label>
                                    <input
                                        type="text"
                                        name="image"
                                        defaultValue={itemData.image}
                                        placeholder="Image URL"
                                        className="input input-bordered w-full"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block mb-1 font-medium">Title</label>
                                    <input
                                        type="text"
                                        name="title"
                                        defaultValue={itemData.title}
                                        placeholder="Item Title"
                                        className="input input-bordered w-full"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block mb-1 font-medium">Category</label>
                                    <select name="category" className="select select-bordered w-full" defaultValue={itemData.category} required>
                                        <option value="pets">Pets</option>
                                        <option value="documents">Documents</option>
                                        <option value="gadgets">Gadgets</option>
                                        <option value="others">Others</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block mb-1 font-medium">Location Found/Lost</label>
                                    <input
                                        type="text"
                                        name="location"
                                        defaultValue={itemData.location}
                                        placeholder="Location"
                                        className="input input-bordered w-full"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block  mb-1 font-medium">Date Lost/Found</label>
                                    <DatePicker
                                        selected={date}
                                        onChange={(newDate) => setDate(newDate)}
                                        className="input input-bordered w-full"
                                        dateFormat="yyyy-MM-dd"
                                        required
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block mb-1 font-medium">Description</label>
                                    <textarea
                                        name="description"
                                        defaultValue={itemData.description}
                                        className="textarea textarea-bordered w-full"
                                        placeholder="Describe the item and where it was lost/found"
                                        rows={4}
                                        required
                                    ></textarea>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-xl font-semibold mb-4 border-b pb-2 text-secondary">Contact Info</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block mb-1 font-medium">Name</label>
                                    <input
                                        type="text"
                                        value={user.displayName}
                                        className="input input-bordered w-full bg-gray-100"
                                        readOnly
                                    />
                                </div>
                                <div>
                                    <label className="block mb-1 font-medium">Email</label>
                                    <input
                                        type="email"
                                        value={user.email}
                                        className="input input-bordered w-full bg-gray-100"
                                        readOnly
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="text-center">
                            <button type="submit" className="btn btn-primary px-10">
                                Update Item
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateItem;
