import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AiFillMessage } from "react-icons/ai";
import { RiLogoutCircleLine } from "react-icons/ri";
import { BsActivity } from "react-icons/bs";
// import { AiOutlineStock } from "react-icons/ai";
import { FaHistory } from "react-icons/fa";
import { LuFileSearch2 } from "react-icons/lu";
import { MdLeaderboard } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { GiWallet } from "react-icons/gi";
import { FaHome } from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";
import { Select } from "@chakra-ui/react";
import { TiUserDelete } from "react-icons/ti";
import { FaPeopleRobbery } from "react-icons/fa6";
import { RiMailSettingsFill } from "react-icons/ri";
import { PiUserSwitchFill } from "react-icons/pi";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import Swal from "sweetalert2";

import LogoutModal from "./LogoutModal";

const SideBar = ({ handleToggle }) => {
  const { authToken } = useContext(AuthContext);
  const { id, name } = useParams();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [totalUnreadConversations, setTotalUnreadConversations] = useState("");

  // Function to determine if an item is active based on the current path
  const isActive = (path) => location.pathname.includes(path);

  const [isOpenModal, setIsOpenModal] = useState(false);
  const LogoutOpenModal = () => setIsOpenModal(true);
  const LogOutCloseModal = () => setIsOpenModal(false);
  const API = "https://api.fyndah.com/api/v1/users/organizations/logout";
  const body = {};

  const handleSwitching = async () => {
    setIsLoading(true);
    try {
      const responseSwitch = await axios.post(API, body, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      console.log(responseSwitch.data);
      if (responseSwitch.data.status == "success") {
        Swal.fire({
          icon: "success",
          title: "successful",
          text: "You have sucessfully switched account.",
          timer: 2000,
          timerProgressBar: true,
        });
        sessionStorage.removeItem("lastRoute");
        navigate("/dashboard/mybusiness");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Something went wrong..",
        text:
          "Unexpected error could be your network connection is bad or your session is over try to login again.",
        footer: `<a href="#">Could not switch. Please try again later. ${
          error.response?.data?.message || error.message
        }</a>`,
      });
      sessionStorage.setItem("lastRoute", location.pathname);
      navigate("/login");
      console.log(error.response ? error.response.data : error.message);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  // fetch unread messages for a business
  useEffect(() => {
    const getUnreadConversations = async () => {
      try {
        // setLoading(true);
        const response = await axios.get(
          `https://axelonepostfeature.onrender.com/api/messages/org/messages/unread`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        if (response.status === 200) {
          setTotalUnreadConversations(response.data.totalUnreadConversations);
          console.log("response: ", response.data);
          // setLoading(false);
        } else {
          // setLoading(false);
          throw new Error("Getting Total Unread Conversations failed");
        }
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    getUnreadConversations();
  }, [authToken]);

  return (
    <>
      <div className="px-[1rem] text-white font-inter py-[1rem] overflow-y-auto h-full scrollBar">
        {/* business profile */}
        <Link to="business-profile">
          <div
            onClick={handleToggle}
            className={`flex cursor-pointer mb-1 hover:bg-white rounded-[4px] hover:text-textDark px-[1rem] py-[0.5rem] items-center justify-start gap-4 ${
              isActive("business-profile")
                ? "bg-white text-textDark"
                : "text-white"
            } `}
          >
            <span>
              <FaUserCircle className="size-[1rem] lg:size-[1.25rem]" />
            </span>
            <h2 className="text-[1.1rem] mt-0 font-normal">Profile</h2>
          </div>
        </Link>

        {/* posts */}
        <Link to="posts">
          <div
            onClick={handleToggle}
            className={`flex cursor-pointer mb-1 hover:bg-white rounded-[4px] hover:text-textDark px-[1rem] py-[0.5rem] items-center justify-start gap-4 ${
              isActive("posts") ? "bg-white text-textDark" : "text-white"
            } `}
          >
            <span>
              <BsActivity className="size-[1rem] lg:size-[1.25rem]" />
            </span>
            <h2 className="text-[1.1rem] mt-0 font-normal">Posts</h2>
          </div>
        </Link>

        {/* business messages */}
        <Link
          onClick={() => setTotalUnreadConversations(0)}
          to="businessmessages"
        >
          <div
            onClick={handleToggle}
            className={`flex cursor-pointer mb-1 hover:bg-white rounded-[4px] hover:text-textDark px-[1rem] py-[0.5rem] items-center justify-start gap-4 ${
              isActive("businessmessages")
                ? "bg-white text-textDark"
                : "text-white"
            } `}
          >
            <span className="relative">
              <AiFillMessage className="size-[1rem] lg:size-[1.25rem]" />
              <p className="absolute top-[-5px] left-3 text-white rounded-full bg-lightRed px-1 text-[11px]">
                {totalUnreadConversations}
              </p>
            </span>
            <h2 className="text-[1.1rem] mt-0 font-normal">Messages</h2>
          </div>
        </Link> 

        {/* Business Search Request */}
        <Link to={`/businessDashboard/${id}/${name}/search-request`}>
          <div
            onClick={handleToggle}
            className={`flex cursor-pointer mb-1 hover:bg-white rounded-[4px] hover:text-textDark px-[1rem] py-[0.5rem] items-center justify-start gap-4 ${
              isActive("search-request")
                ? "bg-white text-textDark"
                : "text-white"
            } `}
          >
            <span>
              <LuFileSearch2 className="size-[1rem] lg:size-[1.25rem]" />
            </span>
            <h2 className="text-[1.1rem] mt-0 font-normal">Search Requests</h2>
          </div>
        </Link>

        {/* Search Requests History
        <Link to={`/businessDashboard/${id}/${name}/search-request-history`}>
          <div
            onClick={handleToggle}
            className={`flex cursor-pointer mb-1 hover:bg-white rounded-[4px] hover:text-textDark px-[1rem] py-[0.5rem] items-center justify-start gap-4 ${isActive("search-request-history")
              ? "bg-white text-textDark"
              : "text-white"
              } `}
          >
            <span>
              <FaHistory className="size-[1rem] lg:size-[1.25rem]" />
            </span>
            <h2 className="text-[1.1rem] mt-0 font-normal">
              Search Requests History
            </h2>
          </div>
        </Link> */}

        {/* Leads */}
        <Link to={`/businessDashboard/${id}/${name}/leads`}>
          <div
            onClick={handleToggle}
            className={`flex cursor-pointer mb-3 hover:bg-white rounded-[4px] hover:text-textDark px-[1rem] py-[0.5rem] items-center justify-start gap-4 ${
              isActive("leads") ? "bg-white text-textDark" : "text-white"
            } `}
          >
            <span>
              <MdLeaderboard className="size-[1rem] lg:size-[1.25rem]" />
            </span>
            <h2 className="text-[1.1rem] mt-0 font-normal">Leads</h2>
          </div>
        </Link>

        {/* wallet */}
        <Link to="wallet">
          <div
            onClick={handleToggle}
            className={`flex cursor-pointer mb-1 hover:bg-white rounded-[4px] hover:text-textDark px-[1rem] py-[0.5rem] items-center justify-start gap-4 ${
              isActive("wallet") ? "bg-white text-textDark" : "text-white"
            } `}
          >
            <span>
              <GiWallet className="size-[1rem] lg:size-[1.25rem]" />
            </span>
            <h2 className="text-[1.1rem] mt-0 font-normal">Wallet</h2>
          </div>
        </Link>

        <div className="h-[8.2rem] xl:h-[8.9rem]"></div>

        {/* Switch Business */}
        <button
          onClick={handleSwitching}
          className={`w-full flex cursor-pointer mb-1 hover:bg-white rounded-[4px] hover:text-textDark px-[1rem] py-[0.5rem] items-center justify-start gap-4 ${
            isActive("logout") ? "bg-white text-textDark" : "text-white"
          } `}
        >
          <span>
            <PiUserSwitchFill className="size-[1rem] lg:size-[1.25rem]" />
          </span>
          <h2 className="text-[1.1rem] mt-0 font-normal ">Switch Businesses</h2>
        </button>
        {/* logout */}
        <button
          onClick={LogoutOpenModal}
          className={`w-full flex cursor-pointer mb-1 hover:bg-white rounded-[4px] hover:text-textDark px-[1rem] py-[0.5rem] items-center justify-start gap-4 ${
            isActive("logout") ? "bg-white text-textDark" : "text-white"
          } `}
        >
          <span>
            <RiLogoutCircleLine className="size-[1rem] lg:size-[1.25rem]" />
          </span>
          <h2 className="text-[1.1rem] mt-0 font-normal ">Log out</h2>
        </button>

        {/* Account Management */}

        <Select
          color="white"
          sx={{
            "> option": {
              // fontSize: ['48px', '72px'],
              fontWeight: "400",
              fontSize: "1.1rem",
              background: "#4299E1",
              color: "white",
            },
          }}
          variant="flushed"
          className=" text-[1.1rem] mt-0 font-normal"
          placeholder="Account Management"
        >
          <option value="option1">
            <RiMailSettingsFill className="size-4 lg:size-5" /> Change Email
          </option>
          <option color="green" value="option2">
            <FaPeopleRobbery className="size-4 lg:size-5" />
            Invite Member
          </option>
          <option value="option3">
            <TiUserDelete className="size-[1rem] lg:size-[1.25rem]" />
            Delete Account
          </option>
        </Select>

        <Link to="/">
          <div
            onClick={handleToggle}
            className={`flex cursor-pointer mb-1 hover:bg-white rounded-[4px] hover:text-textDark px-[1rem] py-[0.5rem] mt-1 items-center justify-start gap-4 ${
              isActive("home") ? "bg-white text-textDark" : "text-white"
            } `}
          >
            <span>
              <FaHome className="size-[1rem] lg:size-[1.25rem]" />
            </span>
            <h2 className="text-[1.1rem] mt-0 font-normal ">Feed</h2>
          </div>
        </Link>
      </div>
      <LogoutModal isOpen={isOpenModal} onClose={LogOutCloseModal} />
    </>
  );
};

export default SideBar;
