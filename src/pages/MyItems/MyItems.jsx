import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { AuthContext } from "../../contexts/AuthContext/AuthProvider";
import { Link } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const MyItems = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [myItems, setMyItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      setLoading(true);
      axiosSecure
        .get(`/myItems?email=${user.email}`)
        .then((res) => {
          setMyItems(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [user, axiosSecure]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/items/${id}`)
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
    return <div className="flex justify-center my-10">
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
        </div>;
  }

  return (
    <div className="">
      <Helmet>
        <title>Manage My Items  | WhereIsItHub</title>
      </Helmet>
      <div className="max-w-6xl mx-auto py-20 p-4">
        <h2 className="text-3xl font-bold mb-6 text-primary text-center">Manage My Items</h2>
        {myItems.length === 0 ? (
          <>
            <div className="flex flex-col justify-center items-center py-10">
              <p className="text-center text-xl font-bold text-gray-600">No items found. Didn't added any item yet?</p>
              <Link to="/addItems" className="btn btn-primary mt-10 ">Add Items</Link>
            </div>
          </>

        ) : (
          <div className="overflow-x-auto ">
            <table className="table w-full border border-primary rounded-lg">
              <thead className="bg-gray-200 text-secondary">
                <tr>
                  <th>#</th>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Status</th>
                  <th>Update</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {myItems.map((item, index) => (
                  <tr key={item._id}>
                    <td>{index + 1}</td>
                    <td>{item.title}</td>
                    <td>{item.category}</td>
                    <td>{item.status || "Pending"}</td>
                    <td>
                      <Link
                        to={`/updateItems/${item._id}`}
                        className="btn btn-sm bg-secondary text-white"
                      >
                        Update
                      </Link>
                    </td>
                    <td>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="btn btn-sm bg-primary text-white"
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
    </div>
  );
};

export default MyItems;
