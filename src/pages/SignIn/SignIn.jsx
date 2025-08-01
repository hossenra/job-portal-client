import Lottie from "lottie-react";
import loginLottieData from "../../assets/login.json";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext/AuthContext";
import SocialLogin from "../shared/SocialLogin";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const SignIn = () => {
  const { signInUser } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  console.log("in signIn page", location);
  const from = location.state || "/";

  const handleSignIn = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);

    signInUser(email, password)
      .then((result) => {
        console.log("sign in", result.user.email);
        const user = { email: result.user.email };
        axios
          .post("http://localhost:3000/jwt", user, { withCredentials: true })
          .then((res) => {
            console.log(res.data);
          });

        // navigate(from);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left w-96">
          <Lottie animationData={loginLottieData} loop={true} />
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <h1 className="text-5xl ml-8 mt-4 font-bold">Login now!</h1>
          <form onSubmit={handleSignIn} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                className="input input-bordered"
                required
                placeholder="Email"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                className="input input-bordered"
                required
                placeholder="At least 6 chars, 1 uppercase, 1 number"
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-neutral">
                Login
              </button>
            </div>
          </form>
          <SocialLogin></SocialLogin>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
