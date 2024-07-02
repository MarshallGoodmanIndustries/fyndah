import Swal from "sweetalert2";
import { useState, useEffect, useContext } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { FaPlus, FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { BsBoxArrowLeft } from "react-icons/bs";
const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};
import {
  Ellipse2,
  Ellipse4,
  Ellipse5,
  Ellipse6,
  Ellipse7,
  signup_bg,
} from "../../assets/images/index";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
function Login() {
  const query = useQuery();
  const token = query.get('token');
  useEffect(() => {
    if (token) {
      console.log('Current page URL:', window.location.href); // Log the current page URL
      console.log('Token:', token); // Log the token
    }
  }, [token]);
  const [revealPassword, setRevealPassword] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { setAuthToken, setUserData, setUserMsgId, userMsgId, authToken } =
    useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [loadingResend, setLoadingResend] = useState(false);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [location]);

  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setLoginFormData({
      ...loginFormData,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: "",
    });
  };

  // code to hide the resend verification link by defalut so when a user tries to login but thier email is not verified their resend verification link is going to appear

  const [showVerificationLink, setShowVerificationLink] = useState(false);

  // submit form for login
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    setLoading(true);

    if (loginFormData.password.trim() === "") {
      newErrors.password = "Password is required!";
    }
    if (loginFormData.email.trim() === "") {
      newErrors.email =
        "Please enter your registered email address or username!";
    }

    if (Object.values(newErrors).some((error) => error !== "")) {
      setErrors(newErrors);
    } else {
      try {
        const response = await axios.post(
          "https://api.fyndah.com/api/v1/auth/login",
          {
            email_or_username: loginFormData.email,
            password: loginFormData.password,
          }
        );

        if (response.status === 200) {
          // console.log("API Response:", response.data);
          const token = response.data.token.original.access_token;
          const userData = response.data.data; // Directly access the data object
          console.log("User Data: ", userData);
          // console.log("User Token: ", token);

          if (userData) {
            setUserData(userData); // Set the user data in the auth context
            setAuthToken(token); // Set the auth token in the auth context
            setUserMsgId(userData.msg_id);
            Swal.fire({
              icon: "success",
              title: "Successful...",
              text: "Successfully logged in",
              timer: 2000,
              timerProgressBar: true,
            });
            setLoading(false);

            // Check if there is a last route session variable set
            const lastRoute = sessionStorage.getItem("lastRoute");
            setTimeout(() => {
              if (lastRoute) {
                // Navigate to the last route
                navigate(lastRoute);
              } else {
                // Navigate to the dashboard
                navigate("/");
              }
            }, 1000);

            const sendAutomaticMessage = async () => {
              try {
                const response = await axios.post(
                  `https://axelonepostfeature.onrender.com/api/messages/webhook/user-registered`,
                  {
                    msg_id: userMsgId,
                    username: userData.username,
                  },
                  {
                    headers: {
                      Authorization: `Bearer ${authToken}`,
                    },
                  }
                );

                if (response.status === 200) {
                  console.log("Automatic message sent", response.data);
                }
              } catch (error) {
                console.error(error);
              }
            };

            sendAutomaticMessage();
          } else {
            console.error("User data is not in the expected format or empty");
            Swal.fire({
              icon: "error",
              title: "Error...",
              text: "User data is not in the expected format or empty",
            });
          }
        } else {
          console.error("API responded with status:", response.status);
          Swal.fire({
            icon: "error",
            title: "Error...",
            text: `API responded with status: ${response.status}`,
          });
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Login Failed!",
          footer: `<a href="#">Could not log in. Please try again later. ${error.response.data.message}</a>`,
        });
        console.error("Login error", error.response.data.message);
        if (
          error.response.data.message ==
          "Email not verified. Click on the resend verification link to verify your email!"
        ) {
          setShowVerificationLink(true); //i am showing the resend button if the user created an account without verifying their email so once the user clciks on it the verification email is going to be sent to the user
        }
        setLoading(false);
      }
    }
  };

  // handle resend email resend verification
  const reSendVerificationLink = async () => {
    setLoadingResend(true);

    try {
      const response = await axios.post(
        "https://api.fyndah.com/api/v1/auth/email/resend",
        {
          email: loginFormData.email,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: response.data.message + "...",
          text: "continue exploring our site..",
        });
        setLoadingResend(false);
      } else {
        throw new Error("re-send email link failed");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        footer: `<a href="#">Could not re-send verification link . Please try again later. ${error.response.data.message}</a>`,
      });
      console.error("Error fetching data", error.response.data.message);
    }
  };

  // hide forgot password section
  const [hideResetBox, setHideResetBox] = useState(false);
  const [loadingPasswordLink,setLoadingPasswordLink]=useState(false)
  const [emailThatIsReceivingResetLink,setEmailThatIsReceivingResetLink]=useState("")

  const HandleReceivingResetEmailOnChange=(e)=>{
    setEmailThatIsReceivingResetLink(e.target.value)
  }
  // forgot password link to user email
  const sendPasswordResetLink = async () => {
    setLoadingPasswordLink(true);
    try {
      const response = await axios.post(
        "https://api.fyndah.com/api/v1/auth/password/forgot",
        {
          email: emailThatIsReceivingResetLink,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: response.data.message + "...",
          text: "instructions to reset your password has been sent to your email..",
        });
        setLoadingPasswordLink(false);
      } else {
        throw new Error("re-send email link failed");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        footer: `<a href="#">Could not re-send verification link . Please try again later. ${error.response.data.message}</a>`,
      });
      setLoadingPasswordLink(false);

      console.error("Error fetching data", error.response.data.message);
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
        className="absolute lg:fixed top-2 left-2 md:left-4 cursor-pointer">
        <BsBoxArrowLeft className="w-6 h-6 hover:text-secondary transition-all duration-300 text-black" />
      </Link>

      <div className="relative">
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

      {hideResetBox ? (
        <div className="flex items-center justify-center z-10  bg-gray-100 py-5 px-3">
          <div className="bg-white p-3 rounded-lg shadow-md  max-w-md">
            <h1 className="text-2xl font-semibold mb-4 text-center">
              Reset Your Password
            </h1>
            <p className="text-gray-600  mb-6">
              Fear not. We’ll email you instructions to reset your password. 
            </p>
            <div className="mb-4">
              <label htmlFor="Email" className="block text-gray-700">
              Email
              </label>
              <input
                type="email"
                id="Email"
                value={emailThatIsReceivingResetLink}
                onChange={HandleReceivingResetEmailOnChange}
                name="Email"
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex flex-wrap justify-between items-center gap-2">
              <button onClick={sendPasswordResetLink} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
               {loadingPasswordLink? "sending..":" send reset link"}
              </button>
              <Link href="/login" className="text-blue-500 underline" onClick={(()=>{
                setHideResetBox(false)
              })}>
                Return to login
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8 relative z-10 bg-signupBg shadow-md p-8 rounded-lg">
          <div>
            <h3 className="text-2xl text-accentDark font-bold font-lato mb-2">
              Welcome Back<span className="text-buttonBottom">!</span>
            </h3>
            <p className="text-textGrey text-sm md:text-base font-normal">
              Eager to connect with skilled professionals near you? Rejoin our
              dynamic community and continue your journey to finding the best
              local services near you!
            </p>
          </div>
          <form
            action=""
            method="post"
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-1 md:col-span-2">
              <label htmlFor="email">
                Email or username<span className="text-red-500 ml-2">*</span>
              </label>
              <input
                value={loginFormData.email}
                onChange={handleChange}
                type="text"
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
                  value={loginFormData.password}
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

            <button
              className="bg-accentDark text-white p-2 hover:text-[#fdba74] transition-all duration-300 rounded-lg font-lato text-lg md:col-span-2"
              type="submit">
              {loading ? "loading..." : "submit"}
            </button>
          </form>

          {/* already a user section */}
          <div className="grid items-center justify-center">
            <div className="flex gap-4 items-center justify-between">
              <div className="flex justify-center items-center gap-2">
                <h3 className="text-sm lg:font-semibold">New Here?</h3>
                <Link
                  to="/signup"
                  className="text-accentDark hover:text-[#c2410c] font-semibold text-sm lg:text-sm">
                  Register
                </Link>
              </div>

              <Link
                onClick={(()=>{
                                  setHideResetBox(true)

                })}
                className="cursor-pointer text-accentDark hover:text-[#fdba74] font-semibold text-sm lg:text-sm">
                Reset password
              </Link>
            </div>

            {showVerificationLink && (
              <button
                onClick={reSendVerificationLink}
                className="rounded mt-5 font-bold p-3 border hover:text-white hover:bg-[#c2410c] ">
                {loadingResend ? "sending..." : "re-send verification link"}
              </button>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

export default Login;
