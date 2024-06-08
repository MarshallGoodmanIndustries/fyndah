import {
  Box,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Table,
  Button,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import { useEffect, useState, useContext } from "react";
import { RiEdit2Fill } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa6";
// import { Textarea } from "@chakra-ui/react";
import { MdLocationPin } from "react-icons/md";
// import { FaMonument } from "react-icons/fa";
import { PiUserSwitchFill } from "react-icons/pi";
// import { TiUserDelete } from "react-icons/ti";
import Swal from "sweetalert2";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { ImSpinner9 } from "react-icons/im";

function Profile() {
  const { authToken } = useContext(AuthContext);
  const [isLoading, setIsloading] = useState(false)
  // const [errorMessage, setErrorMessage] = useState("")
  const [inputDefaultStates, setInputDefaultStates] = useState({
    firstName: "",
    lastName: "",
    bio: "",
    location: "",
    businessRegNumber: "",
  });

  const fullName = `${inputDefaultStates.firstName}  ${inputDefaultStates.lastName}`

  const [isEditable, setIsEditable] = useState({
    firstName: false,
    lastName: false,
    bio: false,
    location: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setInputDefaultStates({
      ...inputDefaultStates,
      [name]: value,
    });
  };

  const toggleEdit = (field) => {
    setIsEditable({
      ...isEditable,
      [field]: !isEditable[field],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsloading(true)
      const response = await axios.post(
        "https://api.fyndah.com/api/v1/users/profile",
        {
          firstname: inputDefaultStates.firstName,
          lastname: inputDefaultStates.lastName,
          address: inputDefaultStates.location,

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
          title: "Successful...",
          text: "Profile updated successfully",
          timer: 2000,
          timerProgressBar: true,
        });
        console.log("Form submitted", response.data);
      } else {
        setIsloading(false)
        throw new Error("Profile Update failed");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Update Failed!",
        footer: `<a href="#">Could not update profile. Please try again later. ${error.message}</a>`,
      });
      console.error(error);
      setIsloading(false)
    } finally {
      setIsloading(false)
    }
  };

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const profileResponse = await axios.get(
          "https://api.fyndah.com/api/v1/users/profile",
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        const userData = profileResponse.data.data.user;

        setInputDefaultStates({
          firstName: userData.firstname || "",
          lastName: userData.lastname || "",
          location: userData.address || "",
          businessRegNumber: "", // Add the respective data field if available in the response
        });

        console.log(profileResponse.data);
      } catch (error) {
        console.error(error.message);
      }
    }

    fetchProfileData();
  }, [authToken]);

  // const switchAccount = async () => {
  //   try {
  //     const 

  //     const response = await axios.post(
  //       "https://api.fyndah.com/api/v1/users/organizations/1/switch",
  //       {
  //         headers: {
  //           Authorization: `Bearer ${authToken}`,
  //         },
  //       }
  //     );

  //     if (response.status === 200) {
  //       Swal.fire({
  //         icon: "success",
  //         title: `${response.data.status}........`,
  //         text: `${response.data.message}`,
  //         timer: 2000,
  //         timerProgressBar: true,
  //       });
  //       console.log("Form submitted", response.data);
  //     } else {
  //       setErrorMessage(response.data.message)
  //       throw new Error("Profile Update failed");
  //     }
  //   } catch (error) {
  //     Swal.fire({
  //       icon: "error",
  //       title: "Oops...",
  //       text: `${errorMessage}`,
  //       footer: `<a href="#">Could not update profile. Please try again later. ${error.message}</a>`,
  //     });
  //     console.error(error);
  //   }
  // }

  return (
    <div className="md:m-[2rem] mr-[1rem] my-[1rem]  font-roboto  flex flex-col gap-[1rem] lg:gap-[2rem]">
      <div className="md:flex block items-center gap-[6rem]">
        {/* PROFILE IMAGE DISPLAY */}
        <div>
          <Box
            className="w-[80px] lg:w-[150px]"
            position="relative"
            display="inline-block"
            borderRadius="full"
            overflow="hidden"
          // boxSize="150px"
          >
            <Image
              className="w-[80px] lg:w-[150px]"
              // boxSize="150px"
              src="https://bit.ly/dan-abramov"
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

      {/* ACCOUNT SETTING */}
      <div className="">
        <h2 className="text-lightRed mb-[1rem] text-center text-[0.8rem] lg:text-[1.1rem] font-semibold">
          ACCOUNT SETTING
        </h2>
        <h2 className="text-black mb-3 lg:mb-2 font-medium text-[0.8rem] lg:text-[1.1rem]">
          EDIT PROFILE
        </h2>

        {/* FORM */}
        <form onSubmit={handleSubmit} action="">
          <div className="lg:grid block grid-cols-2 gap-x-[4rem] gap-y-[2rem]">
            {/* FIRST NAME */}
            <div className="flex mb-[1rem] lg:mb-0 flex-col gap-2 lg:gap-4">
              <div className="flex items-center justify-between">
                <label
                  className="font-normal text-neutral-500 text-[0.9rem] lg:text-[1.1rem]"
                  htmlFor="firstName"
                >
                  First Name
                </label>
                <span
                  className="flex font-normal text-neutral-500 text-[0.9rem] lg:text-[1.1rem] gap-2 cursor-pointer hover:text-neutral-400  items-center"
                  onClick={() => toggleEdit("firstName")}
                >
                  {" "}
                  <RiEdit2Fill /> Edit
                </span>
              </div>

              <InputGroup>
                <InputRightElement pointerEvents="none">
                  <FaRegUser color="text-[#d1d5db]" />
                </InputRightElement>
                <Input
                  disabled={!isEditable.firstName}
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

            {/* LAST NAME */}
            <div className="flex mb-[1rem] lg:mb-0 flex-col gap-2 lg:gap-4">
              <div className="flex items-center justify-between">
                <label
                  className="font-normal text-neutral-500 text-[0.9rem] lg:text-[1.1rem]"
                  htmlFor="lastName"
                >
                  Last Name
                </label>
                <span
                  className="flex font-normal text-neutral-500 text-[0.9rem] lg:text-[1.1rem] gap-2 cursor-pointer hover:text-neutral-400  items-center"
                  onClick={() => toggleEdit("lastName")}
                >
                  {" "}
                  <RiEdit2Fill /> Edit
                </span>
              </div>

              <InputGroup>
                <InputRightElement pointerEvents="none">
                  <FaRegUser color="text-[#d1d5db]" />
                </InputRightElement>
                <Input
                  disabled={!isEditable.lastName}
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

            {/* BIO */}
            {/* <div className="flex mb-[1rem] lg:mb-0 flex-col gap-2 lg:gap-4">
              <div className="flex items-center justify-between">
                <label
                  className="font-normal text-neutral-500 text-[0.9rem] lg:text-[1.1rem]"
                  htmlFor="bio"
                >
                  Bio
                </label>
                <span
                  className="flex font-normal text-neutral-500 text-[0.9rem] lg:text-[1.1rem] gap-2 cursor-pointer hover:text-neutral-400  items-center"
                  onClick={() => toggleEdit("bio")}
                >
                  {" "}
                  <RiEdit2Fill /> Edit
                </span>
              </div>

              <Textarea
                disabled={!isEditable.bio}
                name="bio"
                border="2px solid #d1d5db"
                rows="4"
                value={inputDefaultStates.bio}
                onChange={handleChange}
                placeholder="Input bio text here"
                size="sm"
              />
            </div> */}

            {/* LOCATION */}
            <div className="flex mb-[1rem] lg:mb-0 flex-col gap-2 lg:gap-4">
              <div className="flex items-center justify-between">
                <label
                  className="font-normal text-neutral-500 text-[0.9rem] lg:text-[1.1rem]"
                  htmlFor="location"
                >
                  Location
                </label>
                <span
                  className="flex font-normal text-neutral-500 text-[0.9rem] lg:text-[1.1rem] gap-2 cursor-pointer hover:text-neutral-400  items-center"
                  onClick={() => toggleEdit("location")}
                >
                  {" "}
                  <RiEdit2Fill /> Edit
                </span>
              </div>

              <InputGroup>
                <InputRightElement pointerEvents="none">
                  <MdLocationPin color="text-[#d1d5db]" />
                </InputRightElement>
                <Input
                  disabled={!isEditable.location}
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

            {/* BSUINESS REG NO */}
            {/* <div className="flex mb-[1rem] lg:mb-0 flex-col gap-2 lg:gap-4">
              <div className="flex items-center justify-between">
                <label
                  className="font-normal text-neutral-500 text-[0.9rem] lg:text-[1.1rem]"
                  htmlFor="businessregnumber"
                >
                  Add Business Registration Number
                </label>
                <span
                  className="flex font-normal text-neutral-500 text-[0.9rem] lg:text-[1.1rem] gap-2 cursor-pointer hover:text-neutral-400  items-center"
                  onClick={() => toggleEdit("businessRegNumber")}
                >
                  {" "}
                  <RiEdit2Fill /> Edit
                </span>
              </div>

              <InputGroup>
                <InputRightElement pointerEvents="none">
                  <FaMonument color="text-[#d1d5db]" />
                </InputRightElement>
                <Input
                  disabled={!isEditable.businessRegNumber}
                  name="businessRegNumber"
                  border="2px solid #d1d5db"
                  className="border"
                  variant="outline"
                  value={inputDefaultStates.businessRegNumber}
                  onChange={handleChange}
                  placeholder="Add a business registration number"
                />
              </InputGroup>
            </div> */}

            {/* SAVE BUTTON */}
            <div className="flex justify-center">
              {isLoading ?
                <p> <ImSpinner9 className="animate-spin text-blue-700 hover:text-blue-500" size={22} /> </p> :
                <Button type="save" colorScheme="blue">
                  Submit
                </Button>
              }

            </div>

            <div className="col-span-2 my-[2rem] flex justify-around text-lightRed mb-[1rem] text-[0.8rem] lg:text-[1.1rem] font-semibold">
              ACCOUNT MANAGEMENT
            </div>
            <div className="flex mb-[1rem] lg:mb-0 items-center gap-[1rem]">
              <h2 className="font-normal  cursor-pointer text-black  text-[0.9rem] lg:text-[1.1rem]">
                Switch Account
              </h2>
              <PiUserSwitchFill className=" size-4 lg:size-5" />
            </div>

            {/* <div className="flex items-center gap-[1rem]">
              <h2 className="font-normal cursor-pointer text-black  text-[0.9rem] lg:text-[1.1rem]">
                Delete Account
              </h2>
              <TiUserDelete className="size-4 lg:size-5" />
            </div> */}

            {/* <div className="col-span-2 my-[2rem] flex justify-around text-lightRed mb-[1rem] text-[0.8rem] lg:text-[1.1rem] font-semibold">
              WISHLIST
            </div> */}

            {/* <ul className="">
              <li className="text-[0.9rem]">Marshall Associates</li>
              <li className="text-[0.9rem]">Daisy Dawn</li>
            </ul> */}

            {/* <div className="col-span-2 my-[2rem] uppercase flex justify-around text-lightRed mb-[1rem] text-[0.8rem] lg:text-[1.1rem] font-semibold">
              Purchasing History
            </div> */}

            {/* <TableContainer whiteSpace="wrap" className="col-span-2 text-[0.8rem] lg:text-[1rem]" width="100%">
              <Table variant="simple">
                <TableCaption>
                  All Transactions made within the app
                </TableCaption>
                <Thead>
                  <Tr>
                    <Th>Date</Th>
                    <Th>Purchase</Th>
                    <Th isNumeric>Amount</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>24/04/2025</Td>
                    <Td>Two minimal sweaters</Td>
                    <Td isNumeric>$200</Td>
                  </Tr>
                  <Tr>
                    <Td>25/04/2025</Td>
                    <Td>Five sweat shirts</Td>
                    <Td isNumeric>$120</Td>
                  </Tr>
                </Tbody>
                <Tfoot></Tfoot>
              </Table>
            </TableContainer> */}
          </div>
        </form>
      </div>
    </div>
  );
}

export default Profile;
