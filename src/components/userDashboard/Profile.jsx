import {
  Box,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Button,
} from "@chakra-ui/react";
import { useEffect, useState, useContext } from "react";
import { RiEdit2Fill } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa6";
import { MdLocationPin } from "react-icons/md";
import { PiUserSwitchFill } from "react-icons/pi";
import Swal from "sweetalert2";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { ImSpinner9 } from "react-icons/im";
import { useLocation, useNavigate } from "react-router-dom";
import ModalComponent from "../uiComponents/ModalComponet";

function Profile() {
  const { authToken, setUserData } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [showButton, setShowButton] = useState(false);
  const locations = useLocation();

  const navigate = useNavigate();
  const [inputDefaultStates, setInputDefaultStates] = useState({
    firstName: "",
    lastName: "",
    phone_number: "",
    location: "",
    businessRegNumber: "",
  });

  const fullName = `${inputDefaultStates.firstName} ${inputDefaultStates.lastName}`;
  const [isEditable, setIsEditable] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputDefaultStates({
      ...inputDefaultStates,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isEditable) {
      setIsEditable(true);
      return;
    }

    setIsEditable(false);
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("firstname", inputDefaultStates.firstName);
      formData.append("lastname", inputDefaultStates.lastName);
      formData.append("address", inputDefaultStates.location);
      formData.append("phone_number", inputDefaultStates.phone_number);
      if (selectedFile) {
        formData.append("profile_photo_path", selectedFile);
      }

      const response = await axios.post(
        "https://api.fyndah.com/api/v1/users/profile",
        formData,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Successful...",
          text: "Profile updated successfully",
          timer: 2000,
          timerProgressBar: true,
        });

        console.log(formData);
        if (selectedFile) {
          setProfilePhoto(URL.createObjectURL(selectedFile));
        }
      } else {
        setIsLoading(false);
        throw new Error("Profile Update failed");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Update Failed!",
        footer: `<a href="#">Could not update profile. Please try again later. ${error.response.data.message}</a>`,
      });
      console.error(error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setShowButton(true);
      setProfilePhoto(URL.createObjectURL(file)); // Set the profile photo immediately
    }
  };

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setIsLoading(true);
        sessionStorage.removeItem("lastRoute");

        const profileResponse = await axios.get(
          "https://api.fyndah.com/api/v1/users/profile",
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        const userData = profileResponse.data.data.user;
        const alldata = sessionStorage.setItem("data", userData);
        console.log(alldata);
        setInputDefaultStates({
          firstName: userData.firstname || "",
          lastName: userData.lastname || "",
          location: userData.address || "",
          phone_number: userData.phone_number || "",
        });
        setProfilePhoto(userData.profile_photo_path);
        console.log(profilePhoto);
        console.log(profileResponse.data);
        if (profileResponse.status === 200) {
          console.log(profileResponse.data);
          setProfilePhoto(userData.profile_photo_path);
          console.log(profilePhoto, "image"); //console logining the image path
        } else {
          setIsLoading(false);
          throw new Error("Profile Details failed");
        }
      } catch (error) {
        console.error(error);
        setIsLoading(false);
        if (axios.isAxiosError(error)) {
          // Handle AxiosError
          console.error("Error message:", error.message);
          if (error.response) {
            console.error("Status code:", error.response.status);
            console.error("Response data:", error.response.data);
            console.error("Response msg:", error.response.data.message);
            if (error.response.data.status === "error") {
              sessionStorage.setItem("lastRoute", locations.pathname);
              navigate("/login");
            }
          } else if (error.request) {
            console.error("No response received:", error.request);
          } else {
            console.error("Request setup error:", error.message);
          }
        } else {
          // Handle non-AxiosError
          console.error("Unexpected error:", error);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, [authToken]);
  const handleSwitchAccount = () => {
    navigate("/dashboard/mybusiness");
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>
          <ImSpinner9
            className="animate-spin text-blue-500 hover:text-blue-800"
            size={50}
          />
        </p>
        <span>Please wait...</span>
      </div>
    );
  }

  const handleSubmitPhoto = async () => {
    try {
      setIsLoading(true);
      setShowButton(false);
      const response = await axios.post(
        "https://api.fyndah.com/api/v1/users/profile",
        {
          profile_photo_path: selectedFile,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status == 200) {
        setUserData((prevState) => ({
          ...prevState,
          profile_photo_path: response.data.data.profile_photo_path,
        }));
        Swal.fire({
          icon: "success",
          title: "Successful...",
          text: "Profile photo updated successfully",
          timer: 2000,
          timerProgressBar: true,
        });
        console.log(response.data);
      } else {
        setIsLoading(false);
        throw new Error("Profile photo Update failed");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Update Failed!",
        footer: `<a href="#">Could not update profile photo. Please try again later. ${error.response.data.message}</a>`,
      });

      console.error(error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="md:m-[2rem] mr-[1rem] my-[1rem]  font-roboto  flex flex-col gap-[1rem] lg:gap-[2rem]">
      <div className="md:flex block items-center gap-[6rem]">
        <div>
          <Box
            className="w-[80px] rounded-full lg:w-[100px] h-[100px]"
            position="relative"
            display="inline-block"
            borderRadius="full"
            overflow="hidden"
          >
            <Image
              className="w-[80px] lg:w-[100px] h-[100px] object-cover rounded-full"
              src={
                profilePhoto ||
                "https://cdn-icons-png.freepik.com/512/3177/3177440.png"
              }
              alt="Profile"
            />
            <Box
              position="absolute"
              top="0"
              left="0"
              width="100%"
              height="100%"
              backgroundColor="rgba(0, 0, 0, 0.4)"
              opacity="0"
              display="flex"
              alignItems="center"
              justifyContent="center"
              transition="opacity 0.3s"
              _hover={{ opacity: 1 }}
            >
              <RiEdit2Fill color="white" size="23px" />
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  opacity: 0,
                  cursor: "pointer",
                }}
              />
            </Box>
          </Box>
          {/* <Box
            className="w-[80px] lg:w-[150px]"
            position="relative"
            display="inline-block"
            borderRadius="full"
            overflow="hidden"
          >
            <Image
              className="w-[80px] lg:w-[150px]"
              src="https://cdn-icons-png.freepik.com/512/3177/3177440.png"
              alt="Dan Abramov"
            />
            <Box
              position="absolute"
              top="0"
              left="0"
              width="100%"
              height="100%"
              backgroundColor="rgba(0, 0, 0, 0.4)"
              opacity="0"
              display="flex"
              alignItems="center"
              justifyContent="center"
              transition="opacity 0.3s"
              _hover={{ opacity: 1 }}
            >
              <RiEdit2Fill color="white" size="23px" />
            </Box>
          </Box> */}

          {showButton && (
            <Button
              onClick={handleSubmitPhoto}
              className="my-2 py-2 px-4 bg-blue-500 text-white rounded"
            >
              Upload Profile Photo
            </Button>
          )}

          <h2 className="text-navyBlue font-semibold text-[0.8rem] lg:text-[1.1rem] capitalize">
            {fullName}
          </h2>
          <h2 className="text-navyBlue font-semibold text-[0.8rem] lg:text-[1.1rem] capitalize">
            {inputDefaultStates.location}
          </h2>
        </div>

        <h2 className=" text-black uppercase font-bold mt-[1.5rem] lg:mt-0  text-center text-[1rem] lg:text-[1.3rem]">
          Account Information
        </h2>
      </div>

      <div className="">
        <h2 className="text-lightRed mb-[1rem] text-center text-[0.8rem] lg:text-[1.1rem] font-semibold">
          ACCOUNT SETTING
        </h2>
        <h2 className="text-black mb-3 lg:mb-2 font-medium text-[0.8rem] lg:text-[1.1rem]">
          EDIT PROFILE
        </h2>

        <form onSubmit={handleSubmit} action="">
          <div className="lg:grid block grid-cols-2 gap-x-[4rem] gap-y-[2rem]">
            <div className="flex mb-[1rem] lg:mb-0 flex-col gap-2 lg:gap-4">
              <div className="flex items-center justify-between">
                <label
                  className="font-normal text-neutral-500 text-[0.9rem] lg:text-[1.1rem]"
                  htmlFor="firstName"
                >
                  First Name
                </label>
              </div>

              <InputGroup>
                <InputRightElement pointerEvents="none">
                  <FaRegUser color="text-[#d1d5db]" />
                </InputRightElement>
                <Input
                  disabled={!isEditable}
                  name="firstName"
                  border="2px solid #d1d5db"
                  className="border"
                  variant="outline"
                  value={inputDefaultStates.firstName}
                  onChange={handleChange}
                  placeholder="First Name"
                />
              </InputGroup>
            </div>

            <div className="flex mb-[1rem] lg:mb-0 flex-col gap-2 lg:gap-4">
              <div className="flex items-center justify-between">
                <label
                  className="font-normal text-neutral-500 text-[0.9rem] lg:text-[1.1rem]"
                  htmlFor="lastName"
                >
                  Last Name
                </label>
              </div>

              <InputGroup>
                <InputRightElement pointerEvents="none">
                  <FaRegUser color="text-[#d1d5db]" />
                </InputRightElement>
                <Input
                  disabled={!isEditable}
                  name="lastName"
                  border="2px solid #d1d5db"
                  className="border"
                  variant="outline"
                  value={inputDefaultStates.lastName}
                  onChange={handleChange}
                  placeholder="Last Name"
                />
              </InputGroup>
            </div>

            <div className="flex mb-[1rem] lg:mb-0 flex-col gap-2 lg:gap-4">
              <div className="flex items-center justify-between">
                <label
                  className="font-normal text-neutral-500 text-[0.9rem] lg:text-[1.1rem]"
                  htmlFor="location"
                >
                  Location
                </label>
              </div>

              <InputGroup>
                <InputRightElement pointerEvents="none">
                  <MdLocationPin color="text-[#d1d5db]" />
                </InputRightElement>
                <Input
                  disabled={!isEditable}
                  name="location"
                  border="2px solid #d1d5db"
                  className="border"
                  variant="outline"
                  value={inputDefaultStates.location}
                  onChange={handleChange}
                  placeholder="Location"
                />
              </InputGroup>
            </div>

            <div className="flex mb-[1rem] lg:mb-0 flex-col gap-2 lg:gap-4">
              <div className="flex items-center justify-between">
                <label
                  className="font-normal text-neutral-500 text-[0.9rem] lg:text-[1.1rem]"
                  htmlFor="Phone Number"
                >
                  Phone Number
                </label>
              </div>

              <InputGroup>
                <InputRightElement pointerEvents="none">
                  <PiUserSwitchFill color="text-[#d1d5db]" />
                </InputRightElement>
                <Input
                  disabled={!isEditable}
                  name="phone_number"
                  border="2px solid #d1d5db"
                  className="border"
                  variant="outline"
                  value={inputDefaultStates.phone_number}
                  onChange={handleChange}
                  placeholder="Phone Number"
                />
              </InputGroup>
            </div>
          </div>

          {/* <div className="lg:flex items-center  mt-[2rem] justify-end"> */}
          <div className="flex flex-col lg:flex-row items-center justify-end mt-[3rem] mr-[1.5rem] w-full gap-[1rem]">
            {/* <Button
                onClick={handleSwitchAccount}
                leftIcon={<PiUserSwitchFill size="23px" />}
                className="py-[1.5rem] rounded-[10px] text-[0.7rem] w-[100%] order-2 lg:order-1 lg:w-auto lg:text-[1rem]"
                colorScheme="red"
                variant="solid"
              >
                Switch to Business Account
              </Button> */}
            <Button
              leftIcon={
                isLoading ? (
                  <ImSpinner9 className="animate-spin" />
                ) : (
                  <RiEdit2Fill size="23px" />
                )
              }
              className="py-[1.5rem] rounded-[10px] text-[0.7rem] w-[100%] lg:w-auto lg:text-[1rem]"
              type="submit"
              colorScheme="blue"
              variant="solid"
              disabled={isLoading}
            >
              {isEditable ? "Save" : "Edit"}
            </Button>
          </div>

          <div className="col-span-2 my-[2rem] flex justify-around text-lightRed mb-[1rem] text-[0.8rem] lg:text-[1.1rem] font-semibold">
            ACCOUNT MANAGEMENT
          </div>
          <div className="flex mb-[1rem] lg:mb-0 items-center gap-[1rem]">
            <Button
              onClick={handleSwitchAccount}
              leftIcon={<PiUserSwitchFill size="23px" />}
              className="py-[1.5rem] rounded-[10px] text-[0.7rem] w-[100%] order-2 lg:order-1 lg:w-auto lg:text-[1rem]"
              colorScheme="red"
              variant="solid"
            >
              Switch to Business Account
            </Button>
          </div>
          {/* </div> */}
        </form>
      </div>
    </div>
  );
}

export default Profile;
