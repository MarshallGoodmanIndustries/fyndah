import React from "react";
import { FaPlus, FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";

const UpdatePassword = () => {
  const navigate = useNavigate();

  const { authToken, setAuthToken } = useContext(AuthContext);
  const [loadingPasswordUpdate, setLoadingPasswordUpdate] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");

  const [errors, setErrors] = useState({
    oldPassword: "",
    newPassword: "",
  });
  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };
  const handleOldPasswordChange = (e) => {
    setOldPassword(e.target.value);
  };
  const sendNewPassword = async () => {
    setErrors({
      oldPassword: "",
      newPassword: "",
    });
    let validationErrors = {};

    if (newPassword.trim() === "" || newPassword.length < 8) {
      validationErrors.newPassword =
        "new password should not be empty and it must be equals or more than 8 in characters";
      console.log(
        "new password should not be empty and it must be equals or more than 8 in characters"
      );
      // error.password =
      //   "Password is required! and make sure password length is not less than eight characters longs";
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$%*#?&])[A-Za-z\d@$%*#?&]{8,}$/.test(
        newPassword
      )
    ) {
      console.log(
        "Password must contain at least one lowercase letter, one uppercase letter, one digit, one special character, and be at least 8 characters long."
      );

      validationErrors.newPassword =
        "Password must contain at least one lowercase letter, one uppercase letter, one digit, one special character, and be at least 8 characters long.";
      // error.newPassword ="
    }
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    } else {
      try {
        setLoadingPasswordUpdate(true);

        const response = await axios.put(
          "https://api.fyndah.com/api/v1/auth/password/update",
          {
            old_password: oldPassword,
            new_password: newPassword,
            new_password_confirmation: newPassword,
          },
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        if (response.status === 200) {
          setOldPassword("");
          setNewPassword("");
          setAuthToken(null);
          sessionStorage.removeItem("authToken");
          Swal.fire({
            icon: "success",
            title: response.data.message + "...",
            text: "password update was successful..",
            timer: 2000,
            timerProgressBar: true,
          });
          setLoadingPasswordUpdate(false);
          navigate("/login");
        } else {
          throw new Error("password update failed");
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops... password update was not successful",
          footer: `<a href="#">password could not be changed . Please try again later. ${error.response.data.message}</a>`,
        });
        setLoadingPasswordUpdate(false);

        console.error("Error fetching data", error.response.data.message);
      }
    }
  };

  const [showPassword, setShowPassword] = useState(true);
  const [showOldPassword, setShowOldPassword] = useState(true);
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
        <h2 className="text-1xl font-bold mb-4">Change your Password</h2>
        <p className="mb-4">
       
          You will be redirected to the login page to use your new password if you proceed with changing it

        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}>
       

          <div>
            <div className="mb-4">
              <label htmlFor="oldPassword" className="block text-gray-700">
                Old password
              </label>
              <div className="flex pl-2 items-center justify-between mt-1  w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-none">
                <input
                  type={showOldPassword ? "password" : "text"}
                  value={oldPassword}
                  onChange={handleOldPasswordChange}
                  name="oldPassword"
                  id="oldPassword"
                  className="w-full p-2"
                />
                <div>
                  {showOldPassword ? (
                    <FaRegEye
                      className="cursor-pointer"
                      onClick={() => {
                        setShowOldPassword(!showOldPassword);
                      }}
                    />
                  ) : (
                    <FaRegEyeSlash
                      className="cursor-pointer"
                      onClick={() => {
                        setShowOldPassword(!showOldPassword);
                      }}
                    />
                  )}
                </div>
              </div>
              {/* {error.password && <div> {error.password} </div>} */}
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700">
                New password*
              </label>
              <div className="flex pl-2 items-center justify-between mt-1  w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-none">
                <input
                  type={showPassword ? "password" : "text"}
                  id="password"
                  value={newPassword}
                  name="password"
                  onChange={handleNewPasswordChange}
                  className="w-full p-2"
                />
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
              {errors.newPassword && (
                <div className="text-red-500 text-sm mt-1">
                  {errors.newPassword}
                </div>
              )}

              {/* {error.password && <div> {error.password} </div>} */}
            </div>
          </div>

          <button
            type="submit"
            onClick={sendNewPassword}
            className="w-full bg-blue-500 text-white font-bold py-2 rounded hover:bg-blue-700">
            {loadingPasswordUpdate ? "updating..." : "Update Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdatePassword;
