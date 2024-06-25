import Swal from "sweetalert2";
import { useState, useEffect, useContext } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { FaPlus, FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { BsBoxArrowLeft } from "react-icons/bs";
import { AuthContext } from "../context/AuthContext";

import {
  Ellipse2,
  Ellipse4,
  Ellipse5,
  Ellipse6,
  Ellipse7,
  signup_bg,
} from "../../assets/images/index";
// import { Radio, RadioGroup, Stack } from '@chakra-ui/react'
import axios from "axios";
// import CountriesCode from "./CountriesCode";
// import codes from "country-calling-code";

function SignUp() {
  const { authToken } = useContext(AuthContext);

  const [revealPassword, setRevealPassword] = useState(false);
  const [revealConfirmPassword, setRevealConfirmPassword] = useState(false);
  const [showForm, setShowForm] = useState(true);
  // const [value, setValue] = useState('sms')
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
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    phone: "",
    password: "",
    confirmPassword: "",
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    setLoading(true);

    if (signupFormData.firstName.trim() === "") {
      newErrors.firstName = "Please enter a first name!";
    }
    if (signupFormData.lastName.trim() === "") {
      newErrors.lastName = "Please enter a last name!";
    }
    // if (!/^[a-zA-Z0-9._@-]+$/.test(signupFormData.username) || signupFormData.username.trim() === "") {
    //   newErrors.username = "Input a username and Username must not contain spaces!";
    // }
    if (
      !/^[a-zA-Z0-9_]+$/i.test(signupFormData.username) ||
      signupFormData.username.trim() === "" ||
      signupFormData.username.length < 5
    ) {
      newErrors.username =
        "Input a username, username must not be less than 5 in characters, Username must not contain spaces or special characters e.g (@,#.%)!";
    }

    // if (!/^[\w]+$/.test(signupFormData.username)||signupFormData.username.trim() === "") {
    //   newErrors.username = "input a username and Username must not contain spaces!";
    // }
    if (signupFormData.phone.trim() === "") {
      newErrors.phone = "Please enter a valid phone number e.g. US(+1XXXXXXXXXX)!";
    }
    if (
      signupFormData.password.trim() === "" ||
      signupFormData.password.length < 8
    ) {
      newErrors.password =
        "Password is required! and make sure password length is not less than eight characters longs";
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$%*#?&])[A-Za-z\d@$%*#?&]{8,}$/.test(
        signupFormData.password
      )
    ) {
      newErrors.password =
        "Password must contain at least one lowercase letter, one uppercase letter, one digit, one special character, and be at least 8 characters long.";
    }
    if (signupFormData.email.trim() === "") {
      newErrors.email = "Please enter your valid email address!";
    }
    if (signupFormData.confirmPassword !== signupFormData.password) {
      newErrors.confirmPassword =
        "The password field confirmation does not match!";
    } else if (signupFormData.confirmPassword.trim() === "") {
      newErrors.confirmPassword = "Password should not be empty!";
    }

    // Check if there are any errors and update the state
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false);

      window.scrollTo(0, 0);
    } else {
      try {
        const response = await axios.post(
          "https://api.fyndah.com/api/v1/auth/users",
          {
            firstname: signupFormData.firstName,
            lastname: signupFormData.lastName,
            email: signupFormData.email,
            username: signupFormData.username,
            phone_number: signupFormData.phone,
            password: signupFormData.password,
            password_confirmation: signupFormData.confirmPassword,
          },
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        if (response.data.status == "success") {
          Swal.fire({
            icon: "success",
            title: "Registration completed...",
            text:
              "Yay 🎉 You're all set Please check your email inbox for the verification link. Welcome aboard! " +
              signupFormData.username,
          });
          console.log('data:', response.data)
          console.log("Form submitted", signupFormData);

          setLoading(false);
          setShowForm(false);

          console.log("Form submitted", signupFormData);
        } else {
          throw new Error("Registration failed");
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Registration Failed!",
          footer: `<a href="#">Could not register your account. Please try again later. ${error.response.data.message}</a>`,
        });
        console.error(error.response.data.message);
        setLoading(false);
        setShowForm(true);
      }
    }
  };

  const countries = [
    { code: '+1', name: 'United States' },
    { code: '+44', name: 'United Kingdom' },
    { code: '+61', name: 'Australia' },
    // Add more countries as needed
  ]

  return (
    <div>

      {showForm ? (
        <section className="relative w-full h-full bg-white px-3 sm:px-4 md:px-6 lg:px-20 py-16 md:py-8 grid items-center grid-cols-1 md:grid-cols-2 gap-16 md:gap-8">
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
            className="absolute lg:fixed top-2 left-2 md:left-4 cursor-pointer">
            <BsBoxArrowLeft className="w-6 h-6 hover:text-secondary transition-all duration-300 text-blackclr" />
          </Link>

          {/* sign up sub heading */}
          <div className="relative z-10">
            <p className="text-accentDark text-lg md:text-xl font-medium font-dmsans">
              Unlock Your Luck with Every Entry
            </p>
            <h2 className="text-black text-3xl md:text-4xl font-bold font-lato capitalize mt-4 mb-8 xxsm:max-w-[100%] max-w-[90%] sm:max-w-[60%] md:max-w-[80%]">
              Sign Up, discover reliable services near you ,{" "}
              <span className="text-buttonBottom">&</span> simplify your life
              today!
            </h2>
            <div className="flex  items-center">
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
                Join Us<span className="text-buttonBottom">!</span>
              </h3>
              <p className="text-textGrey text-sm md:text-base font-normal">
                Ready to connect with top local professionals? Join our vibrant
                community and find professionals near you!
              </p>
            </div>
            <form
              action=""
              method="post"
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-1">
                <label htmlFor="firstName">
                  First Name<span className="text-red-500 ml-2">*</span>
                </label>
                <input
                  value={signupFormData.firstName}
                  onChange={handleChange}
                  type="text"
                  name="firstName"
                  id="firstName"
                  className="outline-none border border-solid border-textGrey text-blackclr text-base rounded-lg p-2"
                />

                {errors.firstName && (
                  <p className="text-red-600 text-[0.75rem] lg:text-[1rem]">
                    {" "}
                    {errors.firstName}{" "}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="lastName">
                  Last Name<span className="text-red-500 ml-2">*</span>
                </label>
                <input
                  value={signupFormData.lastName}
                  onChange={handleChange}
                  type="text"
                  name="lastName"
                  id="lastName"
                  className="outline-none border border-solid border-textGrey text-blackclr text-base rounded-lg p-2"
                />

                {errors.lastName && (
                  <p className="text-red-600 text-[0.75rem] lg:text-[1rem]">
                    {" "}
                    {errors.lastName}{" "}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-1 md:col-span-2">
                <label htmlFor="lastName">
                  Username<span className="text-red-500 ml-2">*</span>
                </label>
                <input
                  value={signupFormData.username}
                  onChange={handleChange}
                  type="text"
                  name="username"
                  id="username"
                  className="outline-none border border-solid border-textGrey text-blackclr text-base rounded-lg p-2"
                />

                {errors.username && (
                  <p className="text-red-600 text-[0.75rem] lg:text-[1rem]">
                    {" "}
                    {errors.username}{" "}
                  </p>
                )}
              </div>

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
                <label htmlFor="email">
                  Phone Number<span className="text-red-500 ml-2">*</span>
                </label>
                {/* <CountriesCode countries={countries} /> */}
                <input
                  value={signupFormData.phone}
                  onChange={handleChange}
                  type="text"
                  name="phone"
                  id="phone"
                  className="outline-none border border-solid border-textGrey text-blackclr text-base rounded-lg p-2"
                />

                {errors.phone && (
                  <p className="text-red-600 text-[0.75rem] lg:text-[1rem]">
                    {" "}
                    {errors.phone}{" "}
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
                    onClick={() => setRevealPassword(!revealPassword)}>
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

              <div className="flex flex-col gap-1 md:col-span-2">
                <label htmlFor="confirmPassword">
                  Confirm Password<span className="text-red-500 ml-2">*</span>
                </label>
                <div className="relative w-full outline-none border border-solid border-textGrey rounded-lg">
                  <input
                    value={signupFormData.confirmPassword}
                    onChange={handleChange}
                    type={revealConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    id="confirmPassword"
                    className="w-full text-blackclr text-base py-2 pl-2 pr-7 outline-none rounded-lg"
                  />
                  <span
                    className="absolute top-[50%] right-1 transform translate-y-[-50%] cursor-pointer"
                    onClick={() =>
                      setRevealConfirmPassword(!revealConfirmPassword)
                    }>
                    {revealConfirmPassword ? (
                      <FaRegEye className="w-4 h-4 text-blackclr" />
                    ) : (
                      <FaRegEyeSlash className="w-4 h-4 text-blackclr" />
                    )}
                  </span>
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-600 text-[0.75rem] lg:text-[1rem]">
                    {" "}
                    {errors.confirmPassword}{" "}
                  </p>
                )}
              </div>

              <button
                className="bg-accentDark text-white p-2 hover:text-[#fdba74] transition-all duration-300 rounded-lg font-lato text-lg md:col-span-2"
                type="submit">
                {loading ? "creating..." : "submit"}
              </button>
            </form>

            {/* already a user section */}
            <div className="flex justify-center items-center gap-2">
              <h3 className="lg:font-semibold font-medium">Already a user?</h3>
              <Link
                to="/login"
                className="text-accentDark hover:text-[#c2410c] font-semibold text-[1.1rem] lg:text-[1.3rem]">
                Login
              </Link>
            </div>
          </div>
        </section>
      ) : (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <div className="text-center text-green-500">
            <h1 className="text-10 font-bold">
              {" "}
              Welcome aboard Check your email for the verification link !
            </h1>
          </div>
        </div>
      )}
    </div>
  );
}

export default SignUp;
