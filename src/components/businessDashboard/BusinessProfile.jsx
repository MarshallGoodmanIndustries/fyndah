import {
  Box,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Button,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { RiEdit2Fill } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa6";
import { Textarea } from "@chakra-ui/react";
import { MdLocationPin } from "react-icons/md";
import { FaMonument } from "react-icons/fa";
import { PiUserSwitchFill } from "react-icons/pi";
import { TiUserDelete } from "react-icons/ti";
import { FaPeopleRobbery } from "react-icons/fa6";
import { RiMailSettingsFill } from "react-icons/ri";
import Swal from "sweetalert2";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ImSpinner9 } from "react-icons/im";

function BusinessProfile() {
  const { authToken } = useContext(AuthContext);
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false)
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [coverPhoto, setCoverPhoto] = useState(null);
  const [selectedCoverFile, setSelectedCoverFile] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [showButton, setShowButton] = useState(false)
  const navigate = useNavigate();
  const routeLocation = useLocation()

  const [inputDefaultStates, setInputDefaultStates] = useState({
    businessName: "",
    email: "",
    phone: "",
    bio: "",
    address: "",
    city: "",
    state: "",
    country: "",
    zip_code: "",
    size: "",
    locationName: ""
  });

  const [isEditable, setIsEditable] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setInputDefaultStates({
      ...inputDefaultStates,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setShowButton(true)
      setProfilePhoto(URL.createObjectURL(file)); // Set the profile photo immediately
    }
  };

  const handleCoverPhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedCoverFile(file);
      setShowButton(true)
      setCoverPhoto(URL.createObjectURL(file)); // Set the cover photo immediately
    }
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
      formData.append("org_name", inputDefaultStates.businessName);
      formData.append("org_bio", inputDefaultStates.bio);
      formData.append("address", inputDefaultStates.address);
      formData.append("state", inputDefaultStates.state);
      formData.append("email", inputDefaultStates.email);
      formData.append("phone", inputDefaultStates.phone);
      formData.append("city", inputDefaultStates.city);
      formData.append("country", inputDefaultStates.country);
      formData.append("zip_code", inputDefaultStates.zip_code);
      formData.append("location_name", inputDefaultStates.locationName);

      const response = await axios.post(
        `https://api.fyndah.com/api/v1/organization/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
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
        console.log(response.data);
        console.log(formData)
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

  useEffect(() => {
    const fetchBusinessProfileData = async () => {
      try {
        setIsLoading(true);
        const businessProfileResponse = await axios.get(
          `https://api.fyndah.com/api/v1/organization/${id}`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        const businessData = businessProfileResponse.data.data;

        setInputDefaultStates({
          businessName: businessData.org_name || "",
          email: businessData.email || "",
          phone: businessData.phone || "",
          bio: businessData.org_bio || "",
          address: businessData.locations[0].address || "",
          city: businessData.locations[0].city || "",
          state: businessData.locations[0].state || "",
          country: businessData.locations[0].country || "",
          zip_code: businessData.locations[0].zip_code || "",
          locationName: businessData.locations[0].location_name || "",
        });
        setProfilePhoto(businessData.logo)
        setCoverPhoto(businessData.cover_image)
  
  
        if (businessProfileResponse.status === 200) {
          setProfilePhoto(businessData.logo);
          setCoverPhoto(businessData.cover_image);
          console.log(businessProfileResponse.data)
        } else {
          setIsLoading(false);
          throw new Error("Profile Details failed");
        }
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    }

    fetchBusinessProfileData();
  }, [authToken, id]);

  const location = `${inputDefaultStates.address}  ${inputDefaultStates.city}`
  // console.log("my id:", id)
  const API = "https://api.fyndah.com/api/v1/users/organizations/logout";
  const body = {};
  const handleSwitching = async () => {
    setIsLoading(true)
    try {
      const responseSwitch = await axios.post(API, body, {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      })
      console.log(responseSwitch.data)
      if (responseSwitch.data.status == "success") {
        Swal.fire({
          icon: "success",
          title: "successful",
          text: "You have sucessfully switched account.",
          timer: 2000,
          timerProgressBar: true,
        });
        sessionStorage.removeItem("lastRoute");
        navigate('/dashboard/mybusiness');
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Something went wrong..",
        text: "Unexpected error could be your network connection is bad or your session is over try to login again.",
        footer: `<a href="#">Could not switch. Please try again later. ${error.response?.data?.message || error.message
          }</a>`,
      });
      sessionStorage.setItem("lastRoute", routeLocation.pathname)
      navigate("/login");
      console.log(error.response ? error.response.data : error.message)
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">
      <p> <ImSpinner9 className="animate-spin text-blue-500 hover:text-blue-800" size={50} /> </p>
      <span>Please wait...</span>
    </div>
  }

  const handleSubmitPhoto = async () => {
    try {
      setIsLoading(true);
      setShowButton(false)
      const response = await axios.post(
        "https://api.fyndah.com/api/v1/users/profile",
        {
          logo: selectedFile,
          cover_image: selectedCoverFile
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'multipart/form-data'
          },
        }
      );

      if (response.status === 200) {
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
  
  }

  return (
    <div className="md:m-[2rem] mr-[1rem] my-[1rem]  font-roboto  flex flex-col gap-[1rem] lg:gap-[2rem]">
      <div className="block relative items-center gap-[6rem]">
        {/* PROFILE IMAGE DISPLAY */}
        <Box className="w-full absolute rounded-t-3xl h-[160px]">
        <Image
  className="w-full h-[160px] object-cover rounded-full"
  src={coverPhoto || "https://cdn-icons-png.freepik.com/512/3177/3177440.png"}
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
                onChange={handleCoverPhotoChange}
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
  src={profilePhoto || "https://cdn-icons-png.freepik.com/512/3177/3177440.png"}
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
        </div>
      </div>

      {showButton && <Button
    onClick={handleSubmitPhoto}
    className="my-2 py-2 px-4 bg-blue-500 text-white rounded"
  >
    Upload Profile Photo
  </Button>}

      {/* ACCOUNT DETAILS */}
      <div className="mt-[2.5rem]">
        <h2 className="text-navyBlue font-semibold text-[0.8rem] lg:text-[1.1rem] capitalize">
          {inputDefaultStates.businessName}
        </h2>
        <h2 className="text-navyBlue font-semibold text-[0.8rem] lg:text-[1.1rem] capitalize">
          {location}
        </h2>
      </div>

      {/* ACCOUNT SETTING */}
      <h2 className=" text-lightRed uppercase font-bold mt-[1.5rem] lg:mt-0  text-center text-[1rem] lg:text-[1.3rem]">
        Account Setting
      </h2>

      <div className="">
        <h2 className="text-black mb-3 lg:mb-2 font-medium text-[0.8rem] lg:text-[1.1rem]">
          EDIT PROFILE
        </h2>

        {/* FORM */}
        <form onSubmit={handleSubmit} action="">
          <div className="lg:grid block grid-cols-2 gap-x-[4rem] gap-y-[2rem]">

            {/* BUSINESS NAME */}
            <div className="flex mb-[1rem] lg:mb-0 flex-col gap-2 lg:gap-4">
              <div className="flex items-center justify-between">
                <label
                  className="font-normal text-neutral-500 text-[0.9rem] lg:text-[1.1rem]"
                  htmlFor="businessName"
                >
                  Business Name
                </label>
              </div>

              <InputGroup>
                <InputRightElement pointerEvents="none">
                  <FaRegUser color="text-[#d1d5db]" />
                </InputRightElement>
                <Input
                  disabled={!isEditable}
                  name="businessName"
                  border="2px solid #d1d5db"
                  className="border"
                  variant="outline"
                  value={inputDefaultStates.businessName}
                  onChange={handleChange}
                  placeholder="Business Name"
                />
              </InputGroup>
            </div>

            {/* EMAIL */}
            <div className="flex mb-[1rem] lg:mb-0 flex-col gap-2 lg:gap-4">
              <div className="flex items-center justify-between">
                <label
                  className="font-normal text-neutral-500 text-[0.9rem] lg:text-[1.1rem]"
                  htmlFor="email"
                >
                  Email
                </label>
              </div>

              <InputGroup>
                <InputRightElement pointerEvents="none">
                  <FaRegUser color="text-[#d1d5db]" />
                </InputRightElement>
                <Input
                  disabled={!isEditable}
                  name="email"
                  type="email"
                  border="2px solid #d1d5db"
                  className="border"
                  variant="outline"
                  value={inputDefaultStates.email}
                  onChange={handleChange}
                  placeholder="Email"
                />
              </InputGroup>
            </div>

            {/* BIO */}
            <div className="flex mb-[1rem] lg:mb-0 flex-col gap-2 lg:gap-4">
              <div className="flex items-center justify-between">
                <label
                  className="font-normal text-neutral-500 text-[0.9rem] lg:text-[1.1rem]"
                  htmlFor="bio"
                >
                  Bio
                </label>
                
              </div>

              <Textarea
                disabled={!isEditable}
                name="bio"
                border="2px solid #d1d5db"
                rows="4"
                value={inputDefaultStates.bio}
                onChange={handleChange}
                placeholder="Input bio text here"
                size="sm"
              />
            </div>

            {/* PHONE */}
            <div className="flex mb-[1rem] lg:mb-0 flex-col gap-2 lg:gap-4">
              <div className="flex items-center justify-between">
                <label
                  className="font-normal text-neutral-500 text-[0.9rem] lg:text-[1.1rem]"
                  htmlFor="phone"
                >
                  Business Phone
                </label>
              </div>

              <InputGroup>
                <InputRightElement pointerEvents="none">
                  <MdLocationPin color="text-[#d1d5db]" />
                </InputRightElement>
                <Input
                  disabled={!isEditable}
                  name="phone"
                  border="2px solid #d1d5db"
                  className="border"
                  variant="outline"
                  value={inputDefaultStates.phone}
                  onChange={handleChange}
                  placeholder="Enter Phone"
                />
              </InputGroup>
            </div>

            {/* ADDRESS */}
            <div className="flex mb-[1rem] lg:mb-0 flex-col gap-2 lg:gap-4">
              <div className="flex items-center justify-between">
                <label
                  className="font-normal text-neutral-500 text-[0.9rem] lg:text-[1.1rem]"
                  htmlFor="address"
                >
                  Business Address
                </label>
               
              </div>

              <InputGroup>
                <InputRightElement pointerEvents="none">
                  <FaMonument color="text-[#d1d5db]" />
                </InputRightElement>
                <Input
                  disabled={!isEditable}
                  name="address"
                  border="2px solid #d1d5db"
                  className="border"
                  variant="outline"
                  value={inputDefaultStates.address}
                  onChange={handleChange}
                  placeholder="Enter Business Address"
                />
              </InputGroup>
            </div>

            {/* CITY */}
            <div className="flex mb-[1rem] lg:mb-0 flex-col gap-2 lg:gap-4">
              <div className="flex items-center justify-between">
                <label
                  className="font-normal text-neutral-500 text-[0.9rem] lg:text-[1.1rem]"
                  htmlFor="city"
                >
                  Business City
                </label>
                
              </div>

              <InputGroup>
                <InputRightElement pointerEvents="none">
                  <FaMonument color="text-[#d1d5db]" />
                </InputRightElement>
                <Input
                  disabled={!isEditable}
                  name="city"
                  border="2px solid #d1d5db"
                  className="border"
                  variant="outline"
                  value={inputDefaultStates.city}
                  onChange={handleChange}
                  placeholder="Enter Business City"
                />
              </InputGroup>
            </div>

            {/* STATE */}
            <div className="flex mb-[1rem] lg:mb-0 flex-col gap-2 lg:gap-4">
              <div className="flex items-center justify-between">
                <label
                  className="font-normal text-neutral-500 text-[0.9rem] lg:text-[1.1rem]"
                  htmlFor="state"
                >
                  Business State
                </label>
                
              </div>

              <InputGroup>
                <InputRightElement pointerEvents="none">
                  <FaMonument color="text-[#d1d5db]" />
                </InputRightElement>
                <Input
                  disabled={!isEditable}
                  name="state"
                  border="2px solid #d1d5db"
                  className="border"
                  variant="outline"
                  value={inputDefaultStates.state}
                  onChange={handleChange}
                  placeholder="Enter Business State"
                />
              </InputGroup>
            </div>

            {/* COUNTRY */}
            <div className="flex mb-[1rem] lg:mb-0 flex-col gap-2 lg:gap-4">
              <div className="flex items-center justify-between">
                <label
                  className="font-normal text-neutral-500 text-[0.9rem] lg:text-[1.1rem]"
                  htmlFor="country"
                >
                  Business Country
                </label>
                
              </div>

              <InputGroup>
                <InputRightElement pointerEvents="none">
                  <FaMonument color="text-[#d1d5db]" />
                </InputRightElement>
                <Input
                  disabled={!isEditable}
                  name="country"
                  border="2px solid #d1d5db"
                  className="border"
                  variant="outline"
                  value={inputDefaultStates.country}
                  onChange={handleChange}
                  placeholder="Enter Business Country"
                />
              </InputGroup>
            </div>

            {/* ZIP CODE */}
            <div className="flex mb-[1rem] lg:mb-0 flex-col gap-2 lg:gap-4">
              <div className="flex items-center justify-between">
                <label
                  className="font-normal text-neutral-500 text-[0.9rem] lg:text-[1.1rem]"
                  htmlFor="zip_code"
                >
                  Zip Code
                </label>
               
              </div>

              <InputGroup>
                <InputRightElement pointerEvents="none">
                  <FaMonument color="text-[#d1d5db]" />
                </InputRightElement>
                <Input
                  disabled={!isEditable}
                  name="zip_code"
                  border="2px solid #d1d5db"
                  className="border"
                  variant="outline"
                  value={inputDefaultStates.zip_code}
                  onChange={handleChange}
                  placeholder="Enter Zip Code"
                />
              </InputGroup>
            </div>

            {/* INDUSTRY */}
            <div className="flex mb-[1rem] lg:mb-0 flex-col gap-2 lg:gap-4">
              <div className="flex items-center justify-between">
                <label
                  className="font-normal text-neutral-500 text-[0.9rem] lg:text-[1.1rem]"
                  htmlFor="locationName"
                >
                  Location Name
                </label>
                
              </div>

              <InputGroup>
                <InputRightElement pointerEvents="none">
                  <FaMonument color="text-[#d1d5db]" />
                </InputRightElement>
                <Input
                  disabled={!isEditable}
                  name="locationName"
                  border="2px solid #d1d5db"
                  className="border"
                  variant="outline"
                  value={inputDefaultStates.locationName}
                  onChange={handleChange}
                  placeholder="Enter Location Name"
                />
              </InputGroup>
            </div>

            {/* SAVE BUTTON */}
            <div className="flex flex-col lg:flex-row items-center justify-end mt-[1rem] mr-[1.5rem] w-full gap-[1rem]">
              <Button
                leftIcon={isLoading ? <ImSpinner9 className="animate-spin" /> : <RiEdit2Fill size="23px" />}
                className="py-[1.5rem] rounded-[10px] text-[0.7rem] w-[100%] lg:w-auto lg:text-[1rem]"
                type="submit"
                colorScheme="blue"
                variant="solid"
                disabled={isLoading}
              >
                {isEditable ? "Save" : "Edit"}
              </Button>
            </div>
            {/* ACCOUNT MANAGEMENT */}

            <div className="col-span-2 my-[2rem] flex justify-around text-lightRed mb-[1rem] text-[0.8rem] lg:text-[1.1rem] font-semibold">
              ACCOUNT MANAGEMENT
            </div>
            <div className="col-span-2 gap-x-[0.5rem] md:justify-between gap-y-[1rem] grid grid-cols-2 items-center xl:grid-cols-4">
            <div className="flex mb-[1rem] lg:mb-0 items-center gap-[1rem]">
              <Button
                onClick={handleSwitching}
                leftIcon={<PiUserSwitchFill size="23px" />}
                className="py-[1.5rem] rounded-[10px] text-[0.7rem] w-[100%] order-2 lg:order-1 lg:w-auto lg:text-[1rem]"
                colorScheme="red"
                variant="solid"
              >
                Switch to Business Account
              </Button>
            </div>
              {/* <div className="flex lg:mb-0 items-center lg:gap-[1rem] gap-[0.5rem]">
                <h2 onClick={handleSwitching} className="font-normal  cursor-pointer text-black  text-[0.9rem] lg:text-[1.1rem]">
                  Switch Account
                </h2>
                <PiUserSwitchFill className=" size-4 lg:size-5" />
              </div> */}

              <div className="flex items-center lg:gap-[1rem] gap-[0.5rem]">
                <h2 className="font-normal cursor-pointer text-black  text-[0.9rem] lg:text-[1.1rem]">
                  Delete Account
                </h2>
                <TiUserDelete className="size-4 lg:size-5" />
              </div>

              <div className="flex items-center lg:gap-[1rem] gap-[0.5rem]">
                <h2 className="font-normal cursor-pointer text-black  text-[0.9rem] lg:text-[1.1rem]">
                  Invite Member
                </h2>
                <FaPeopleRobbery className="size-4 lg:size-5" />
              </div>

              <div className="flex items-center lg:gap-[1rem] gap-[0.5rem]">
                <h2 className="font-normal cursor-pointer text-black  text-[0.9rem] lg:text-[1.1rem]">
                  Change email
                </h2>
                <RiMailSettingsFill className="size-4 lg:size-5" />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default BusinessProfile;
