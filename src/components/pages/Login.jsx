import Swal from "sweetalert2";
import { useState, useEffect } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { FaPlus, FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { BsBoxArrowLeft } from "react-icons/bs";
import {
  Ellipse2,
  Ellipse4,
  Ellipse5,
  Ellipse6,
  Ellipse7,
  signup_bg,
} from "../../assets/images/index";


function Login() {
  const [revealPassword, setRevealPassword] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [location]);

  const [signupFormData, setSignupFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setSignupFormData({
      ...signupFormData,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const handleSubmit = (e) => {
    //validate inputs
    try {
      e.preventDefault();
      const newErrors = {};
      if (signupFormData.password.trim() === "") {
        newErrors.password = "Password is required!";
      }
      if (signupFormData.email.trim() === "") {
        newErrors.email = "Please Enter Your Registered Email Address!";
      }

      //check for errors
      if (Object.values(newErrors).some((error) => error !== "")) {
        setErrors(newErrors);
      } else {
        //form submission successful
        Swal.fire({
          icon: "success",
          title: "Successful...",
          text: "You have been succesfully logged in!",
          timer: 3000,
          timerProgressBar: true,
          // footer: '<a href="#">Could not register your account try again later..., ${error}</a>'
        });
        console.log("Form submitted", signupFormData);
        navigate("/");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Authentication Failed!",
        footer:
          '<a href="#">App encountered an error while being logged in. Kindly Try again later..., ${error}</a>',
      });
      console.error(error);
    }
  };

  return (
    <section className="relative w-full h-screen bg-white px-3 sm:px-4 md:px-6 lg:px-20 py-16 md:py-8 grid items-center grid-cols-1 md:grid-cols-2 gap-16 md:gap-8">
      {/* background image */}
      <div className="absolute top-0 left-0 w-full h-full">
        <img
          src={signup_bg}
          className="h-screen w-full object-cover"
          alt="background shape"
        />
      </div>

      <Link
        to="/"
        className="absolute lg:fixed top-2 left-2 md:left-4 cursor-pointer"
      >
        <BsBoxArrowLeft className="w-6 h-6 hover:text-secondary transition-all duration-300 text-blackclr" />
      </Link>

      {/* sign up sub heading */}
      <div className="relative z-10">
        <p className="text-accentDark text-lg md:text-xl font-medium font-dmsans">
        Welcome Back!
        </p>
        <h2 className="text-black text-3xl md:text-4xl font-bold font-lato capitalize mt-4 mb-8 xxsm:max-w-[100%] max-w-[90%] sm:max-w-[60%] md:max-w-[80%]">
        Continue your search for the best services near you!
        </h2>
        <div className="flex items-center">
          <div className="w-[2rem] h-[2rem] rounded-[50%] overflow-hidden bg-white relative z-[5] shadow-lg border-2 border-solid border-primary">
            <img
              src={Ellipse2}
              className="w-full h-full  object-cover"
              alt="client close up"
            />
          </div>
          <div className="w-[2rem] h-[2rem] rounded-[50%] overflow-hidden relative z-[4] shadow-lg -ml-1 border-2 border-solid border-primary">
            <img
              src={Ellipse4}
              className="w-full h-full  object-cover"
              alt="client close up"
            />
          </div>
          <div className="w-[2rem] h-[2rem] rounded-[50%] overflow-hidden relative z-[3] shadow-lg  -ml-1 border-2 border-solid border-primary">
            <img
              src={Ellipse5}
              className="w-full h-full  object-cover"
              alt="client close up"
            />
          </div>
          <div className="w-[2rem] h-[2rem] rounded-[50%] overflow-hidden relative z-[2] shadow-lg bg-blackclr -ml-1 border-2 border-solid border-primary">
            <img
              src={Ellipse6}
              className="w-full h-full  object-cover"
              alt="client close up"
            />
          </div>
          <div>
            <FaPlus className="w-6 h-6 text-accent font-semibold" />
          </div>
          <div className="w-[2rem] h-[2rem] rounded-[50%] overflow-hidden shadow-lg border-2 border-solid border-buttonBottom">
            <img
              src={Ellipse7}
              className="w-full h-full  object-cover"
              alt="client close up"
            />
          </div>
        </div>
      </div>

      {/* sign up form */}
      <div className="grid grid-cols-1 gap-8 relative z-10 bg-signupBg shadow-md p-8 rounded-lg">
        <div>
          <h3 className="text-2xl text-accentDark font-bold font-lato mb-2">
            Welcome Back<span className="text-buttonBottom">!</span>
          </h3>
          <p className="text-textGrey text-sm md:text-base font-light">
          Eager to connect with skilled professionals near you? Rejoin our dynamic community and continue your journey to finding the best local services near you!
          </p>
        </div>
        <form
          action=""
          method="post"
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div className="flex flex-col gap-1 md:col-span-2">
            <label htmlFor="email">
              Email<span className="text-red-500 ml-2">*</span>
            </label>
            <input
              value={signupFormData.email}
              onChange={handleChange}
              type="email"
              name="email"
              id="email"
              className="outline-none border border-solid border-textGrey text-blackclr text-base rounded-lg p-2"
            />

            {errors.email && (
              <p className="text-red-600 text-[0.75rem] lg:text-[1rem]">
                {" "}
                {errors.email}{" "}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1 md:col-span-2">
            <label htmlFor="password">
              Password<span className="text-red-500 ml-2">*</span>
            </label>
            <div className="relative w-full border border-solid border-textGrey rounded-lg">
              <input
                value={signupFormData.password}
                onChange={handleChange}
                type={revealPassword ? "text" : "password"}
                name="password"
                id="password"
                className="w-full text-blackclr text-base py-2 pl-2 pr-7 outline-none rounded-lg"
              />
              <span
                className="absolute top-[50%] right-1 transform translate-y-[-50%] cursor-pointer"
                onClick={() => setRevealPassword(!revealPassword)}
              >
                {revealPassword ? (
                  <FaRegEye className="w-4 h-4 text-blackclr" />
                ) : (
                  <FaRegEyeSlash className="w-4 h-4 text-blackclr" />
                )}
              </span>
            </div>
            {errors.password && (
              <p className="text-red-600 text-[0.75rem] lg:text-[1rem]">
                {" "}
                {errors.password}{" "}
              </p>
            )}
          </div>
          
          <button
            className="bg-accentDark text-white p-2 hover:text-[#fdba74] transition-all duration-300 rounded-lg font-lato text-lg md:col-span-2"
            type="submit"
          >
            Login
          </button>
        </form>

        {/* already a user section */}
        <div className="flex justify-center items-center gap-2">
          <h3 className="lg:font-semibold font-medium">New Here?</h3>
          <Link
            to="/login"
            className="text-accentDark hover:text-[#c2410c] font-semibold text-[1.1rem] lg:text-[1.3rem]"
          >
            Register
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Login;