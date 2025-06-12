import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext/AuthProvider";
import axios from "axios";
import { Link } from "react-router";
import Swal from "sweetalert2";

const MyItems = () => {
  const { user } = useContext(AuthContext);
  const [myItems, setMyItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      setLoading(true);
      axios
        .get(`${import.meta.env.VITE_API_URL}/myItems?email=${user.email}`)
        .then((res) => {
          setMyItems(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [user]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${import.meta.env.VITE_API_URL}/items/${id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              Swal.fire("Deleted!", "Item has been deleted.", "success");
              setMyItems(myItems.filter((item) => item._id !== id));
            } else {
              Swal.fire("Failed", "Item could not be deleted", "error");
            }
          })
          .catch(() => {
            Swal.fire("Error", "Something went wrong", "error");
          });
      }
    });
  };

  if (loading) {
    return <div className="text-center my-20">Loading...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6 text-center">Manage My Items</h2>
      {myItems.length === 0 ? (
        <p className="text-center text-gray-600">No items found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full border rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Status</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {myItems.map((item) => (
                <tr key={item._id}>
                  <td>{item.title}</td>
                  <td>{item.category}</td>
                  <td>{item.status || "Pending"}</td>
                  <td>
                    <Link
                      to={`/updateItems/${item._id}`}
                      className="btn btn-sm bg-blue-500 text-white"
                    >
                      Update
                    </Link>
                  </td>
                  <td>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="btn btn-sm bg-red-500 text-white"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyItems;
