import React, { useEffect } from "react";
import Swal from "sweetalert2";
import { useState, useContext } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { BsBoxArrowLeft } from "react-icons/bs";
import axios from "axios";

import { AuthContext } from "../context/AuthContext";
import { FaPlus, FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const ResetPassword = () => {
  const { authToken } = useContext(AuthContext);

  const query = useQuery();
  const token = query.get("token");
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Current page URL:", window.location.href); // Log the current page URL
  }, []);

  const [loadingPasswordChange, setLoadingPasswordChange] = useState(false);

  const [password, setSaveNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const error = {
    password: "",
    confirmPassword: "",
  };

  const handlePasswordChange = (e) => {
    setSaveNewPassword(e.target.value);
  };

  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const sendNewPassword = async () => {
    if (password.trim() === "" || password.length < 8) {
      error.password =
        "Password is required! and make sure password length is not less than eight characters longs";
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$%*#?&])[A-Za-z\d@$%*#?&]{8,}$/.test(
        password
      )
    ) {
      error.password =
        "Password must contain at least one lowercase letter, one uppercase letter, one digit, one special character, and be at least 8 characters long.";
    }

    if (password !== confirmPassword) {
      error.confirmPassword = console.log(
        "The password field confirmation does not match!"
      );
    } else if (confirmPassword.trim() === "") {
      error.confirmPassword = "Password should not be empty!";
      console.log("Password should not be empty!");
    } else {
      try {
        setLoadingPasswordChange(true);

        const response = await axios.post(
          "https://api.fyndah.com/api/v1/auth/password/reset",
          {
            //
            password: password,
            token:token,
            password_confirmation: confirmPassword,
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
            text: "password reset was successful you can now use it to login..",
            timer: 2000,
            timerProgressBar: true,
          });
          navigate("/login");

          setLoadingPasswordChange(false);
        } else {
          throw new Error("password reset failed");
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops... password reset was not successful",
          footer: `<a href="#">password could not be changed . Please try again later. ${error.response.data.message}</a>`,
        });
        setLoadingPasswordChange(false);

        console.error("Error fetching data", error.response.data.message);
      }
    }
  };

  const [showPassword, setShowPassword] = useState(true);
  const [showCPassword, setShowCPassword] = useState(true);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-4 text-center">
          Reset Your Password
        </h1>
        <p className="text-gray-600 mb-6">
          This is going to be your new password
        </p>
        <div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">
              New password*
            </label>
            <div className="flex pl-2 items-center justify-between mt-1  w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-none">
              <input
                type={showPassword ? "password" : "text"}
                id="password"
                value={password}
                name="password"
                onChange={handlePasswordChange}
                className="w-full p-2"
              />
              <p> {error.password} </p>
              <div>
                {showPassword ? (
                  <FaRegEye
                    className="cursor-pointer"
                    onClick={() => {
                      setShowPassword(!showPassword);
                    }}
                  />
                ) : (
                  <FaRegEyeSlash
                    className="cursor-pointer"
                    onClick={() => {
                      setShowPassword(!showPassword);
                    }}
                  />
                )}
              </div>
            </div>
            {error.password && <div> {error.password} </div>}
          </div>

          <div className="mb-4">
            <label htmlFor="Cpassword" className="block text-gray-700">
              Confirm password
            </label>
            <div className="flex pl-2 items-center justify-between mt-1  w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-none">
              <input
                type={showCPassword ? "password" : "text"}
                value={confirmPassword}
                onChange={handleConfirmPassword}
                name="Cpassword"
                id="Cpassword"
                className="w-full p-2"
              />
              <div>
                {showCPassword ? (
                  <FaRegEye
                    className="cursor-pointer"
                    onClick={() => {
                      setShowCPassword(!showCPassword);
                    }}
                  />
                ) : (
                  <FaRegEyeSlash
                    className="cursor-pointer"
                    onClick={() => {
                      setShowCPassword(!showCPassword);
                    }}
                  />
                )}
              </div>
            </div>
            {error.password && <div> {error.password} </div>}
          </div>
        </div>
        <div className="flex justify-between items-center">
          <button
            onClick={sendNewPassword}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
            {loadingPasswordChange ? "saving..." : "save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
