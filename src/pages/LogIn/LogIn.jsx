import { useContext, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate, useLocation } from "react-router";
import { AuthContext } from "../../contexts/AuthContext/AuthProvider";
import { toast } from "react-toastify";
import Lottie from "lottie-react";
import { FaGoogle } from "react-icons/fa";
import loginAnim from "../../assets/AnimationImg/login.json";
import WobbleBgAnimation from "../Shared/BackgroundAnimation/WobbleBgAnimation";


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
      .catch((err) => {
        setError(err.message);
        toast.error(err.message);
      });
  };

  const handleGoogleLogin = () => {
    googleLogin()
      .then(() => {
        toast.success("Logged in with Google");
        navigate(from, { replace: true });
      })
      .catch((err) => {
        setError(err.message);
        toast.error(err.message);
      });
  };

  return (
    <div className="relative min-h-screen w-12/12 mx-auto overflow-hidden flex items-center justify-center">
      <Helmet>
        <title>Login | WhereIsItHub</title>
      </Helmet>
      <WobbleBgAnimation></WobbleBgAnimation>
      <div className="relative z-20 w-full max-w-6xl mx-auto bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl grid grid-cols-1 md:grid-cols-2 p-8 md:p-16">
        <div className="flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-Secondary mb-6">Login now</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <input name="email" type="email" placeholder="Email" className="input input-bordered w-full" required />
            <input name="password" type="password" placeholder="Password" className="input input-bordered w-full" required />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button className="btn btn-primary w-full">Login</button>
            <button onClick={handleGoogleLogin} type="button" className="btn btn-outline w-full flex items-center gap-2">
              <FaGoogle className='text-2xl text-secondary' />
              Login with Google
            </button>
          </form>
          <p className="text-sm mt-4 text-gray-700">
            Don't have an account?{" "}
            <Link to="/register" className="text-primary font-semibold">Register</Link>
          </p>
        </div>
        <div className="hidden md:flex items-center justify-center">
          <Lottie animationData={loginAnim} loop className="w-full max-w-md" />
        </div>
      </div>
    </div>
  );
};

export default Login;
