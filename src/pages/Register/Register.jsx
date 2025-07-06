import Lottie from "lottie-react";
import registerLottieData from "../../assets/register.json";
import { useContext, useState } from "react";
import AuthContext from "../../context/AuthContext/AuthContext";
import SocialLogin from "../shared/SocialLogin";

const Register = () => {
  const [error, setError] = useState("");

  const { createUser } = useContext(AuthContext);

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    // Password validation
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{6,}$/;

    if (!passwordRegex.test(password)) {
      setError(
        "Password must be: \n- At least 6 characters \n- Contain at least one uppercase letter \n- Contain at least one number"
      );
      return;
    }

    console.log("Valid credentials:", { email, password });

    createUser(email, password)
      .then((result) => {
        console.log(result.user);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left w-96">
          <Lottie animationData={registerLottieData}></Lottie>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <h1 className="text-5xl ml-8 mt-4 font-bold">Register now!</h1>
          <form onSubmit={handleRegister} className="card-body">
            <fieldset className="fieldset">
              <label className="label">Email</label>
              <input
                type="email"
                name="email"
                className="input input-bordered"
                required
                placeholder="Email"
              />
              <label className="label">Password</label>
              <input
                type="password"
                name="password"
                className="input input-bordered"
                required
                placeholder="At least 6 chars, 1 uppercase, 1 number"
              />
              <div>
                <a className="link link-hover">Forgot password?</a>
              </div>
              {error && (
                <div style={{ color: "red", whiteSpace: "pre-line" }}>
                  {error}
                </div>
              )}
              <button className="btn btn-neutral mt-4">Register</button>
            </fieldset>
          </form>
          <SocialLogin></SocialLogin>
        </div>
      </div>
    </div>
  );
};

export default Register;
