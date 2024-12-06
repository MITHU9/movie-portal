import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { useMovieContext } from "../context/Context";
import { useState } from "react";

const Login = () => {
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const location = useLocation();

  //console.log(location);
  const { signInWithGoogle, signInWithEmail, setLoading, loading } =
    useMovieContext();
  const navigate = useNavigate();

  const from = location.state?.from || "/";

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((res) => {
        if (res.user) {
          //console.log(res.user);
          navigate(from);
        } else {
          console.log("User not found");
        }
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    signInWithEmail(email, password)
      .then((res) => {
        if (res.user) {
          navigate(from);
          setLoading(false);
          setError(null);
        } else {
          setError("user not found! Try again");
          setLoading(false);
        }
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => setLoading(false));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="loading loading-bars loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="mt-32">
      <div className="mt-10 flex items-center justify-center ">
        <div className="card bg-base-100 w-full max-w-md shrink-0 shadow-2xl">
          <h2 className="text-center mt-5 text-3xl font-bold">
            Sign in to your account
          </h2>
          <div className=" mt-6 gap-3 px-8">
            <button
              onClick={handleGoogleSignIn}
              className="btn w-full bg-success text-white hover:text-primary font-bold text-xl "
            >
              <FaGoogle className="mt-1" />
              Google
            </button>
          </div>
          <div className="divider text-gray-500">Or Email And Password</div>
          <form onSubmit={handleSignIn} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control relative">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="password"
                className="input input-bordered"
                required
              />

              {showPassword ? (
                <IoMdEyeOff
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-[53px]"
                />
              ) : (
                <IoMdEye
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-[53px]"
                />
              )}

              <label className="label">
                <Link
                  to="/auth/forgot-password"
                  className="label-text-alt link link-hover text-sm"
                >
                  Forgot password?
                </Link>
              </label>
            </div>
            <div className="form-control mt-2">
              <button className="btn bg-success text-white font-bold text-lg hover:text-primary">
                Login
              </button>
            </div>
            {error && (
              <div className="text-red-600">
                <label>{error}</label>
              </div>
            )}
          </form>
          <div className="mb-3 text-center">
            <p>
              Don`t have an account?{" "}
              <Link
                to="/auth/register"
                className="link link-hover text-green-500 font-semibold"
              >
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
