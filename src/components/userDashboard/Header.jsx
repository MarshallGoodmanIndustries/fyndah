import { useState, useContext } from "react";
import { logo_white } from "../../assets/images/index";
import { FaBell } from "react-icons/fa6";
import { BsListUl } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import { Avatar } from "@chakra-ui/react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Header = ({ handleToggle, toggle }) => {
  const { userData } = useContext(AuthContext);

  const user = userData?.username || ""; // Use optional chaining and provide a default empty string
  const userInitials = user ? user.slice(0, 1) : ""; // Handle empty user gracefully
  const notificationNumber = 0;

  return (
    <div className="text-white relative sm:px-[2rem] px-[1rem] items-center h-full flex justify-between z-20 font-inter">
      {/* LOGO */}

     
      
        <div className="hidden md:block ">
        <Link to="/">
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
          <img className="w-[70px]" src={logo_white} alt="" />
          </Link>
        </div>
     

      {/* USER PROFILES */}
      <div className="flex items-center justify-end md:gap-[1.8rem] gap-[1rem] lg:col-span-3 xl:col-span-2 col-span-2">
        <span className="relative cursor-pointer">
          <FaBell className=" size-[18px] md:size-[22px]" />
          <p className="absolute top-[-5px] left-2 text-white rounded-full bg-navyBlue px-1 text-[11px]">
            {notificationNumber}
          </p>
        </span>
        <div className="flex gap-3 items-center">
          <Avatar
            size="sm"
            name={user}
            src="https://cdn-icons-png.freepik.com/512/3177/3177440.png"
          />
          {user && (
            <h2 className="font-bold lg:block hidden text-[1rem]">{user}</h2>
          )}
        </div>
      </div>

      {/* RESPONSIVENESS */}
    </div>
  );
};

export default Header;
