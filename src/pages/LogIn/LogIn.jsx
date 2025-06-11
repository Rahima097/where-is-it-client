import { useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import { AuthContext } from "../../contexts/AuthContext/AuthProvider";
import { toast } from "react-toastify";

const Login = () => {
  const { signIn, googleLogin } = useContext(AuthContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    signIn(email, password)
      .then(() => {
        toast.success("Logged in successfully");
        navigate(from, { replace: true });
      })
      .catch((err) => setError(err.message));
  };

  const handleGoogleLogin = () => {
    googleLogin()
      .then(() => {
        toast.success("Logged in with Google");
        navigate(from, { replace: true });
      })
      .catch((err) => setError(err.message));
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form onSubmit={handleLogin} className="card w-96 bg-base-100 shadow-xl p-6 space-y-4">
        <h2 className="text-xl font-bold">Login</h2>
        <input type="email" name="email" placeholder="Email" className="input input-bordered w-full" required />
        <input type="password" name="password" placeholder="Password" className="input input-bordered w-full" required />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button className="btn btn-primary w-full">Login</button>
        <button type="button" onClick={handleGoogleLogin} className="btn btn-outline w-full">Login with Google</button>
        <p className="text-sm">Don't have an account? <Link to="/register" className="text-blue-500">Register</Link></p>
      </form>
    </div>
  );
};

export default Login;
