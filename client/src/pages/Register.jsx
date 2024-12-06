import { Link, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { useState } from "react";
import { useMovieContext } from "../context/Context";

const Register = () => {
  const {
    signInWithGoogle,
    createUserWithEmail,
    setLoading,
    updateUser,
    loading,
  } = useMovieContext();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((res) => {
        if (res.user) {
          //console.log(res.user);
          navigate("/");
        } else {
          setError("User not found");
        }
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const photo = e.target.photoURL.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const checkbox = e.target.checkbox.checked;

    const upperCase = /[A-Z]/;
    const lowerCase = /[a-z]/;

    if (password.length < 6) {
      setError("Password must be at least 6 characters or long");
      return;
    }
    if (!upperCase.test(password)) {
      setError("Password must contain at least one uppercase letter");
      return;
    }
    if (!lowerCase.test(password)) {
      setError("Password must contain at least one lowercase letter");
      return;
    }

    if (checkbox) {
      createUserWithEmail(email, password, name)
        .then((res) => {
          if (res.user) {
            updateUser({ displayName: name, photoURL: photo })
              .then(() => {
                console.log("User Updated");
              })
              .catch((err) => {
                console.log(err);
              });
            navigate("/");
          } else {
            setError("Registration Failed");
            setLoading(false);
          }
        })
        .catch((err) => {
          setError(err.message);
        });
    } else {
      setError("Please accept terms & conditions");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="loading loading-bars loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="mt-20">
      <div className="mt-10 flex items-center justify-center ">
        <div className="card bg-base-100 w-full max-w-lg shrink-0 shadow-2xl">
          <h2 className="text-center mt-5 text-3xl font-bold">
            Create new account
          </h2>
          <div className="px-8 mt-6 gap-3">
            <button
              onClick={handleGoogleSignIn}
              className="btn bg-success text-white hover:text-primary w-full font-bold text-xl"
            >
              <FaGoogle className="mt-1" />
              Google
            </button>
          </div>
          <div className="divider text-gray-500">Or Email And Password</div>
          <form onSubmit={handleFormSubmit} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="name"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">PhotoURL</span>
              </label>
              <input
                type="text"
                name="photoURL"
                placeholder="PhotoURL"
                className="input input-bordered"
              />
            </div>
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
            </div>
            <div className="form-control">
              <label className="cursor-pointer label justify-start gap-2">
                <input
                  type="checkbox"
                  name="checkbox"
                  className="checkbox checkbox-success"
                />
                <span className="label-text">Accept terms and conditions</span>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn bg-success text-white hover:text-primary font-semibold text-lg">
                Register
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
              Already have an account?{" "}
              <Link
                to="/auth/login"
                className="link link-hover text-green-500 font-semibold"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Register;
