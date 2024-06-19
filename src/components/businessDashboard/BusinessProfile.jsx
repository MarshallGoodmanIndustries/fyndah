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
  const { id } = useParams(); // Extract the 'id' parameter from the URL
  const [isLoading, setIsLoading] = useState(false)
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
    website: "",
    size: "",
    industry: "",
    subdomain: "",
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isEditable) {
      setIsEditable(true);
      return;
    }

    setIsEditable(false);
    try {
      Swal.fire({
        icon: "success",
        title: "Successful...",
        text: "Profile updated successfully",
        timer: 2000,
        timerProgressBar: true,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Update Failed!",
        footer: `<a href="#">Could not update profile. Please try again later. ${error.message}</a>`,
      });
      console.error(error);
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
          locationName: businessData.locations[0].locationName || "",
          website: businessData.website || "",
          size: businessData.size || "",
          industry: businessData.industry || "",
          subdomain: businessData.subdomain || "",
        });
  
  
        if (businessProfileResponse.status === 200) {
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

  return (
    <div className="md:m-[2rem] mr-[1rem] my-[1rem]  font-roboto  flex flex-col gap-[1rem] lg:gap-[2rem]">
      <div className="block relative items-center gap-[6rem]">
        {/* PROFILE IMAGE DISPLAY */}
        <Box className="w-full absolute rounded-t-3xl h-[160px]">
          <Image
            className="w-full h-[130px] lg:h-[160px] rounded-t-3xl object-cover "
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
        </Box>

        <div>
          <Box
            className="w-[80px] ml-[2rem] border-white border-4  relative top-[4rem] lg:w-[150px]"
            position="relative"
            display="inline-block"
            borderRadius="full"
            overflow="hidden"
          // boxSize="150px"
          >
            <Image
              className="w-[80px]  lg:w-[150px]"
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
          </Box>
        </div>
      </div>

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

            {/* WEBSITE */}
            <div className="flex mb-[1rem] lg:mb-0 flex-col gap-2 lg:gap-4">
              <div className="flex items-center justify-between">
                <label
                  className="font-normal text-neutral-500 text-[0.9rem] lg:text-[1.1rem]"
                  htmlFor="website"
                >
                  Website
                </label>
              </div>

              <InputGroup>
                <InputRightElement pointerEvents="none">
                  <FaMonument color="text-[#d1d5db]" />
                </InputRightElement>
                <Input
                  disabled={!isEditable}
                  name="website"
                  border="2px solid #d1d5db"
                  className="border"
                  variant="outline"
                  value={inputDefaultStates.website}
                  onChange={handleChange}
                  placeholder="Enter Business Website"
                />
              </InputGroup>
            </div>

            {/* INDUSTRY */}
            <div className="flex mb-[1rem] lg:mb-0 flex-col gap-2 lg:gap-4">
              <div className="flex items-center justify-between">
                <label
                  className="font-normal text-neutral-500 text-[0.9rem] lg:text-[1.1rem]"
                  htmlFor="industry"
                >
                  Industry
                </label>
                
              </div>

              <InputGroup>
                <InputRightElement pointerEvents="none">
                  <FaMonument color="text-[#d1d5db]" />
                </InputRightElement>
                <Input
                  disabled={!isEditable}
                  name="industry"
                  border="2px solid #d1d5db"
                  className="border"
                  variant="outline"
                  value={inputDefaultStates.industry}
                  onChange={handleChange}
                  placeholder="Enter Industry"
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
