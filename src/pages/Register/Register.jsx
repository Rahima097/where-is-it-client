import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../../contexts/AuthContext/AuthProvider";
import { toast } from "react-toastify";
import Lottie from "lottie-react";
import { FaGoogle } from "react-icons/fa"
import registerAnim from "../../assets/AnimationImg/register.json";
import BgAnimation from "../Shared/BackgroundAnimation/BgAnimation";

const Register = () => {
  const { createUser, updateUserProfile, googleLogin } = useContext(AuthContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const photo = form.photo.value;
    const password = form.password.value;

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!passwordRegex.test(password)) {
      const msg = "Password must have uppercase, lowercase & 6+ characters.";
      setError(msg);
      toast.error(msg);
      return;
    }

    createUser(email, password)
      .then(() => {
        updateUserProfile(name, photo);
        toast.success("Registered successfully");
        navigate("/");
      })
      .catch((err) => {
        setError(err.message);
        toast.error(err.message);
      });
  };

  const handleGoogleRegister = () => {
    googleLogin()
      .then(() => {
        toast.success("Registered with Google");
        navigate("/");
      })
      .catch((err) => {
        setError(err.message);
        toast.error(err.message);
      });
  };

  return (
    <div className="relative min-h-screen w-12/12 mx-auto overflow-hidden flex items-center justify-center">
      <BgAnimation></BgAnimation>
      <div className="relative z-20 w-full max-w-6xl mx-auto bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl grid grid-cols-1 md:grid-cols-2 p-8 md:p-16">
        <div className="flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-Secondary mb-6">Register now</h2>
          <form onSubmit={handleRegister} className="space-y-4">
            <input name="name" type="text" placeholder="Full Name" className="input input-bordered w-full" required />
            <input name="email" type="email" placeholder="Email" className="input input-bordered w-full" required />
            <input name="photo" type="text" placeholder="Photo URL (optional)" className="input input-bordered w-full" />
            <input name="password" type="password" placeholder="Password" className="input input-bordered w-full" required />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button className="btn btn-primary w-full">Register</button>
            <button onClick={handleGoogleRegister} type="button" className="btn btn-outline w-full"><FaGoogle className='text-2xl text-secondary' />
              Register with Google
            </button>
          </form>
          <p className="text-sm mt-4 text-gray-700">
            Already have an account?{" "}
            <Link to="/login" className="text-primary font-semibold">Login</Link>
          </p>
        </div>
        <div className="hidden md:flex items-center justify-center">
          <Lottie animationData={registerAnim} loop className="w-full max-w-md" />
        </div>
      </div>
    </div>
  );
};

export default Register;
