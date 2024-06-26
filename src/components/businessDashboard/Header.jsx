import { useState, useContext, useEffect } from "react";
import { logo_white } from "../../assets/images/index";
import { FaBell } from "react-icons/fa6";
import { BsListUl } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import { Avatar } from "@chakra-ui/react";
import { AuthContext } from "../context/AuthContext";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const Header = ({ handleToggle, toggle }) => {
  // const { userData } = useContext(AuthContext);

  // const user = userData?.username || ""; // Use optional chaining and provide a default empty string
  // const userInitials = user ? user.slice(0, 1) : ""; // Handle empty user gracefully
  const notificationNumber = 0;

  const { authToken } = useContext(AuthContext);

  const { id } = useParams();

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

  useEffect(() => {
    const fetchBusinessProfileData = async () => {
      try {
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


        if (businessProfileResponse.status === 200) {
          // console.log(businessProfileResponse.data)
        } else {
          throw new Error("Profile Details failed");
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchBusinessProfileData();
  }, [authToken, id]);

  return (
    <div className="text-white relative sm:px-[2rem] px-[1rem] items-center h-full flex justify-between z-20 font-inter">
      {/* LOGO */}
      <div className="hidden md:block ">
        <Link to="/">
          {" "}
          <img className="w-[150px] sm:w-[120px]" src={logo_white} alt="" />
        </Link>
      </div>

      <div className="md:hidden min-[500px]:gap-8 gap-4 flex items-center col-span-2">
        <div onClick={handleToggle} className="sm:hidden cursor-pointer">
          {toggle ? (
            <AiOutlineClose className="size-[1.2rem]" />
          ) : (
            <BsListUl className="size-[1.2rem]" />
          )}
        </div>
        <Link to="/">
          {" "}
          <img className="w-[70px]" src={logo_white} alt="" />
        </Link>
      </div>

      {/* USER PROFILES */}
      <div className="flex items-center justify-end md:gap-[1.8rem] gap-[1rem] lg:col-span-3 xl:col-span-2 col-span-2">
        <span className="relative cursor-pointer">
          <FaBell className=" size-[18px] md:size-[22px]" />
          <p className="absolute top-[-5px] left-2 text-white rounded-full bg-lightRed px-1 text-[11px]">
            {" "}
            {notificationNumber}{" "}
          </p>
        </span>
        <div className="flex gap-3 items-center">
          <Avatar
            size="sm"
            name={inputDefaultStates.businessName}
            src="https://cdn-icons-png.freepik.com/512/3177/3177440.png"
          />
          {/* <Avatar size='default' className='bg-[#f56a00] align-middle md:text-[1rem] text-[0.85rem] font-semibold text-white'> {userInitials} </Avatar> */}
          <h2 className="font-bold lg:block hidden text-[1rem]"> {inputDefaultStates.businessName} </h2>
        </div>
      </div>

      {/* RESPONSIVENESS */}
    </div>
  );
};

export default Header;
