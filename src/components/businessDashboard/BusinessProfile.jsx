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
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { useState } from "react";
import { RiEdit2Fill } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa6";
import { Textarea } from "@chakra-ui/react";
import { MdLocationPin } from "react-icons/md";
import { FaMonument } from "react-icons/fa";
import { PiUserSwitchFill } from "react-icons/pi";
import { TiUserDelete } from "react-icons/ti";
import { FaPeopleRobbery } from "react-icons/fa6";
import { RiMailSettingsFill } from "react-icons/ri";
import { FaCaretDown } from "react-icons/fa6";
import Swal from "sweetalert2";

function BusinessProfile() {
  const [inputDefaultStates, setInputDefaultStates] = useState({
    firstName: "Phil",
    lastName: "Collins",
    bio: "XYZ Enterprises specializes in innovative tech solutions for small and medium-sized businesses, delivering cutting-edge software and personalized customer service. Our team of experts is dedicated to driving growth and efficiency through tailored technology strategies.",
    location: "Oak Avenue, Denver, United States",
    businessRegNumber: "",
    category: "",
    addProduct: "",
    removeProduct: "",
  });

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

  const handleSubmit = (e) => {
    try {
      e.preventDefault();
      console.log(inputDefaultStates);
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

  return (
    <div className="md:m-[2rem] mr-[1rem] my-[1rem]  font-roboto  flex flex-col gap-[1rem] lg:gap-[2rem]">
      <div className="block relative items-center gap-[6rem]">
        {/* PROFILE IMAGE DISPLAY */}
        <Box className="w-full absolute rounded-t-3xl h-[160px]">
          <Image
            className="w-full h-[130px] lg:h-[160px] rounded-t-3xl object-cover "
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
        </div>
      </div>

      {/* ACCOUNT DETAILS */}
      <div className="mt-[2.5rem]">
        <h2 className="text-navyBlue font-semibold text-[0.8rem] lg:text-[1.1rem] capitalize">
          Marshall Associates
        </h2>
        <h2 className="text-navyBlue font-semibold text-[0.8rem] lg:text-[1.1rem] capitalize">
          Oak Avenue, Denver, United States
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
            <div className="flex mb-[1rem] lg:mb-0 flex-col gap-2 lg:gap-4">
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
            </div>

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
            <div className="flex mb-[1rem] lg:mb-0 flex-col gap-2 lg:gap-4">
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
            </div>

            {/* SAVE BUTTON */}
            <div className="flex justify-center">
              <Button type="save" colorScheme="blue">
                Submit
              </Button>
            </div>

            {/* ACCOUNT MANAGEMENT */}

            <div className="col-span-2 my-[2rem] flex justify-around text-lightRed mb-[1rem] text-[0.8rem] lg:text-[1.1rem] font-semibold">
              ACCOUNT MANAGEMENT
            </div>
            <div className="col-span-2 gap-x-[0.5rem] md:justify-between gap-y-[1rem] grid grid-cols-2 items-center xl:grid-cols-4">
              <div className="flex lg:mb-0 items-center lg:gap-[1rem] gap-[0.5rem]">
                <h2 className="font-normal  cursor-pointer text-black  text-[0.9rem] lg:text-[1.1rem]">
                  Switch Account
                </h2>
                <PiUserSwitchFill className=" size-4 lg:size-5" />
              </div>

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

            {/* INVENTORY MANAGEMENT */}

            <div className="col-span-2 my-[2rem] flex justify-around text-lightRed mb-0 text-[0.8rem] lg:text-[1.1rem] font-semibold">
              INVENTORY MANAGEMENT
            </div>

            <h2 className="text-navyBlue mt-[1rem] lg:mt-0 font-medium text-[0.8rem] lg:text-[1.1rem]">
              PRODUCT
            </h2>

            <TableContainer
            whiteSpace="wrap"
              className="col-span-2 flex-wrap  text-[0.8rem] lg:text-[1rem]"
              width="100%"
            >
              <Table variant="striped">
                <TableCaption>All Products marketed by user</TableCaption>
                <Thead>
                  <Tr>
                    <Th>Item Name</Th>
                    <Th>Item Description</Th>
                    <Th isNumeric>Total Units Sold</Th>
                    <Th isNumeric>Unit Price</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>Eco-Friendly Water Bottle</Td>
                    <Td>
                      A reusable water bottle made from sustainable materials,
                      designed to keep drinks cold for up to 24 hours
                    </Td>
                    <Td isNumeric>$19.99</Td>
                    <Td isNumeric>5,200</Td>
                  </Tr>
                  <Tr>
                    <Td>Wireless Noise-Canceling Headphones</Td>
                    <Td>
                      High-quality wireless headphones with active noise
                      cancellation, offering superior sound and comfort for long
                      listening sessions.
                    </Td>
                    <Td isNumeric>$149.99</Td>
                    <Td isNumeric>3,800</Td>
                  </Tr>
                  <Tr>
                    <Td>Smart Home Hub</Td>
                    <Td>
                      A central device that connects and controls various smart
                      home products, offering seamless automation and voice
                      control features.
                    </Td>
                    <Td isNumeric>$99.99</Td>
                    <Td isNumeric>2,500</Td>
                  </Tr>
                </Tbody>
                <Tfoot></Tfoot>
              </Table>
            </TableContainer>

            {/* STOCKS */}
            <h2 className="text-navyBlue font-medium text-[0.8rem] lg:text-[1.1rem]">
              STOCK
            </h2>

            <TableContainer
              whiteSpace="wrap"
              className="col-span-2 text-[0.8rem] lg:text-[1rem]"
              width="100%"
            >
              <Table variant="striped">
                <TableCaption>All Products in stock</TableCaption>
                <Thead>
                  <Tr>
                    <Th>In Stock</Th>
                    <Th>Low in Stock</Th>
                    <Th>Out of Stock</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>Solar-Powered Phone Charger</Td>
                    <Td>Bluetooth Smartwatch</Td>
                    <Td>Portable Air Purifier</Td>
                  </Tr>
                  <Tr>
                    <Td>Smart Thermostat</Td>
                    <Td>Wireless Charging Pad</Td>
                    <Td>Noise-Canceling Earbuds</Td>
                  </Tr>
                  <Tr>
                    <Td>Fitness Tracker Band</Td>
                    <Td>4K Ultra HD Action Camera</Td>
                    <Td>Smart LED Light Bulbs</Td>
                  </Tr>
                </Tbody>
                <Tfoot></Tfoot>
              </Table>
            </TableContainer>

            {/* CATEGORIES */}

            <h2 className="text-navyBlue mt-[1rem] font-medium text-[0.8rem] lg:text-[1.1rem]">
              CATEGORIES
            </h2>

            <div className="col-span-2 flex flex-col gap-[1rem]">
              {/* ADD CATEGORY */}
              <div className="flex mb-[0.5rem] lg:mb-0 w-full  lg:w-1/2 flex-col gap-2 lg:gap-2">
                <label
                  className="font-normal text-neutral-500 text-[0.9rem] lg:text-[1.1rem]"
                  htmlFor="category"
                >
                  Add a Category
                </label>

                <Input
                  name="category"
                  border="2px solid #d1d5db"
                  className="border"
                  variant="outline"
                  value={inputDefaultStates.category}
                  onChange={handleChange}
                  placeholder="Add Category"
                />
              </div>

              {/* edit CATEGORY */}
              <div className="lg:flex block mb-[1rem] lg:mb-0 flex-col gap-2 lg:gap-2">
                <h2
                  className="font-normal text-lightRed mb-[0.5rem] lg:mb-0 text-[0.9rem] lg:text-[1.1rem]"
                >
                  Edit Category
                </h2>
                <div className="grid lg:gap-[2rem] md:gap-[1.5rem] grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                  <div className="flex md:col-span-2 lg:col-span-1 mb-[1rem] lg:mb-0 flex-col gap-2 lg:gap-2">
                    <label
                      className="font-normal text-neutral-500 text-[0.9rem] lg:text-[1.1rem]"
                      htmlFor="category"
                    >
                      Add Product
                    </label>

                    <Input
                      name="addProduct"
                      border="2px solid #d1d5db"
                      className="border"
                      variant="outline"
                      value={inputDefaultStates.addProduct}
                      onChange={handleChange}
                      placeholder="Add a product"
                    />
                  </div>

                  <div className="flex mb-[1rem] lg:mb-0 flex-col gap-2 lg:gap-2">
                    <h2 className="font-normal text-neutral-500 text-[0.9rem] lg:text-[1.1rem]">
                      Remove Product
                    </h2>

                    <Menu>
                      {({ isOpen }) => (
                        <>
                          <MenuButton
                            isActive={isOpen}
                            as={Button}
                            rightIcon={<FaCaretDown />}
                          >
                            Select Product
                          </MenuButton>
                          <MenuList>
                            <MenuItem>Fitness Tracker Band</MenuItem>
                            <MenuItem onClick={() => alert("gotten")}>
                              Smart LED Light Bulbs
                            </MenuItem>
                            <MenuItem onClick={() => alert("gotten")}>
                              Wireless Charging Pad
                            </MenuItem>
                            <MenuItem onClick={() => alert("gotten")}>
                              Electric Standing Desk
                            </MenuItem>
                          </MenuList>
                        </>
                      )}
                    </Menu>
                  </div>

                  <div className="flex mb-[1rem]  lg:mb-0 flex-col gap-2 lg:gap-2">
                    <h2 className="font-normal text-neutral-500 text-[0.9rem] lg:text-[1.1rem]">
                      Move Product
                    </h2>

                    <Menu>
                      {({ isOpen }) => (
                        <>
                          <MenuButton
                            isActive={isOpen}
                            as={Button}
                            rightIcon={<FaCaretDown />}
                          >
                            Select Product
                          </MenuButton>
                          <MenuList>
                            <MenuItem>Fitness Tracker Band</MenuItem>
                            <MenuItem onClick={() => alert("gotten")}>
                              Smart LED Light Bulbs
                            </MenuItem>
                            <MenuItem onClick={() => alert("gotten")}>
                              Wireless Charging Pad
                            </MenuItem>
                            <MenuItem onClick={() => alert("gotten")}>
                              Electric Standing Desk
                            </MenuItem>
                          </MenuList>
                        </>
                      )}
                    </Menu>
                  </div>
                </div>
              </div>
            </div>

            {/* STOCKS */}
            <h2 className="text-navyBlue mt-[1rem] font-medium text-[0.8rem] lg:text-[1.1rem]">
              ORDERS
            </h2>

            <TableContainer
              whiteSpace="wrap"
              className="col-span-2 text-[0.8rem] lg:text-[1rem]"
              width="100%"
            >
              <Table variant="striped">
                <TableCaption>All orders made</TableCaption>
                <Thead>
                  <Tr>
                    <Th color="blue">Pending </Th>
                    <Th color="green">Delivered</Th>
                    <Th color="red">Cancelled</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>Solar-Powered Phone Charger</Td>
                    <Td>Bluetooth Smartwatch</Td>
                    <Td>Portable Air Purifier</Td>
                  </Tr>
                  <Tr>
                    <Td>Smart Thermostat</Td>
                    <Td>Wireless Charging Pad</Td>
                    <Td>Noise-Canceling Earbuds</Td>
                  </Tr>
                  <Tr>
                    <Td>Fitness Tracker Band</Td>
                    <Td>4K Ultra HD Action Camera</Td>
                    <Td>Smart LED Light Bulbs</Td>
                  </Tr>
                </Tbody>
                <Tfoot></Tfoot>
              </Table>
            </TableContainer>

            {/* SALES */}
            <h2 className="text-navyBlue mt-[1rem] font-medium text-[0.8rem] lg:text-[1.1rem]">
              SALES
            </h2>

            <TableContainer
              whiteSpace="wrap"
              className="col-span-2 text-[0.8rem] lg:text-[1rem]"
              width="100%"
            >
              <Table variant="striped">
                <TableCaption>Total sales made</TableCaption>
                <Thead>
                  <Tr>
                    <Th>Sale </Th>
                    <Th>Today </Th>
                    <Th>Weekly</Th>
                    <Th>Monthly</Th>
                    <Th>Custom</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>Total Sales</Td>
                    <Td>35</Td>
                    <Td>45</Td>
                    <Td>20</Td>
                    <Td>30</Td>
                  </Tr>
                  <Tr>
                    <Td>Best Seller</Td>
                    <Td>Daisy Dawn</Td>
                    <Td>Sleek Eenju</Td>
                    <Td>Hack Harick</Td>
                    <Td>Quwam Ade</Td>
                  </Tr>
                  <Tr>
                    <Td>Low Sales</Td>
                    <Td>Solar-Powered Phone Charger</Td>
                    <Td>Bluetooth Smartwatch</Td>
                    <Td>Portable Air Purifier</Td>
                    <Td>Portable Air Purifier</Td>
                  </Tr>
                </Tbody>
                <Tfoot></Tfoot>
              </Table>
            </TableContainer>
          </div>
        </form>
      </div>
    </div>
  );
}

export default BusinessProfile;
