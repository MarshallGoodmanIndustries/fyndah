import { useState } from "react";
import { Link } from "react-router-dom";
import { AiFillMessage } from "react-icons/ai";
import { RiLogoutCircleLine } from "react-icons/ri";
import { BsActivity } from "react-icons/bs";
import { AiOutlineStock } from "react-icons/ai";
import { FaHistory } from "react-icons/fa";
import { LuFileSearch2 } from "react-icons/lu";
import { MdLeaderboard } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
// import { CiViewTimeline } from "react-icons/ci";
// import { MdOutlineRateReview } from "react-icons/md";
import { GiWallet } from "react-icons/gi";
import { FaHome } from "react-icons/fa";
// import { useContext } from "react";
// import Swal from "sweetalert2";
// import { AuthContext } from "../context/AuthContext";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { IoMdArrowDropright } from "react-icons/io";
import { useParams } from "react-router-dom";
import LogoutModal from "./LogoutModal";

const SideBar = ({ handleToggle }) => {
  const { id, name } = useParams();

  const [active, setActive] = useState(4);
  const handleItemClick = (index) => {
    setActive(index);
    handleToggle();
  };

  const [isOpenModal, setIsOpenModal] = useState(false);
  const LogoutOpenModal = () => setIsOpenModal(true);
  const LogOutCloseModal = () => setIsOpenModal(false);

  const isItemActive = (index) => index === active;
  return (
    <>
      <div className="px-[1rem] text-white font-inter py-[1rem]">
        {/* business profile */}
        <Link to="business-profile">
          <div
            onClick={() => {
              handleToggle, handleItemClick(4);
            }}
            className={`flex cursor-pointer mb-1 hover:bg-white rounded-[4px] hover:text-textDark px-[1rem] py-[0.5rem] items-center justify-start gap-4 ${
              isItemActive(4) ? "bg-white text-textDark" : "text-white"
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
            onClick={() => {
              handleToggle, handleItemClick(1);
            }}
            className={`flex cursor-pointer mb-1 hover:bg-white rounded-[4px] hover:text-textDark px-[1rem] py-[0.5rem] items-center justify-start gap-4 ${
              isItemActive(1) ? "bg-white text-textDark" : "text-white"
            } `}
          >
            <span>
              <BsActivity className="size-[1rem] lg:size-[1.25rem]" />
            </span>
            <h2 className="text-[1.1rem] mt-0 font-normal">Posts</h2>
          </div>
        </Link>

        {/* leads */}

        {/* business messages */}
        <Link to="businessmessages">
          <div
            onClick={() => {
              handleToggle, handleItemClick(3);
            }}
            className={`flex cursor-pointer mb-1 hover:bg-white rounded-[4px] hover:text-textDark px-[1rem] py-[0.5rem] items-center justify-start gap-4 ${
              isItemActive(3) ? "bg-white text-textDark" : "text-white"
            } `}
          >
            <span>
              <AiFillMessage className="size-[1rem] lg:size-[1.25rem]" />
            </span>
            <h2 className="text-[1.1rem] mt-0 font-normal">Messages</h2>
          </div>
        </Link>

        {/* Business Search Request */}

        <Link to={`/businessDashboard/${id}/${name}/search-request`}>
          <div
            onClick={() => {
              handleToggle, handleItemClick(9);
            }}
            className={`flex cursor-pointer mb-1 hover:bg-white rounded-[4px] hover:text-textDark px-[1rem] py-[0.5rem] items-center justify-start gap-4 ${
              isItemActive(9) ? "bg-white text-textDark" : "text-white"
            } `}
          >
            <span>
              <LuFileSearch2 className="size-[1rem] lg:size-[1.25rem]" />
            </span>
            <h2 className="text-[1.1rem] mt-0 font-normal">Search Requests</h2>
          </div>
        </Link>

        {/*This Page is to show the history of all Search Request Ever made by a users as it relates to this Business  */}
        <Link to={`/businessDashboard/${id}/${name}/search-request-history`}>
          <div
            onClick={() => {
              handleToggle, handleItemClick(10);
            }}
            className={`flex cursor-pointer mb-1 hover:bg-white rounded-[4px] hover:text-textDark px-[1rem] py-[0.5rem] items-center justify-start gap-4 ${
              isItemActive(10) ? "bg-white text-textDark" : "text-white"
            } `}
          >
            <span>
              <FaHistory  className="size-[1rem] lg:size-[1.25rem]" />
            </span>
            <h2 className="text-[1.1rem] mt-0 font-normal">
              Search Requests History
            </h2>
          </div>
        </Link>

        {/* Leads */}
        <Link to={`/businessDashboard/${id}/${name}/leads`}>
          <div
            onClick={() => {
              handleToggle, handleItemClick(11);
            }}
            className={`flex cursor-pointer mb-1 hover:bg-white rounded-[4px] hover:text-textDark px-[1rem] py-[0.5rem] items-center justify-start gap-4 ${
              isItemActive(11) ? "bg-white text-textDark" : "text-white"
            } `}
          >
            <span>
              <MdLeaderboard className="size-[1rem] lg:size-[1.25rem]" />
            </span>
            <h2 className="text-[1.1rem] mt-0 font-normal">Leads</h2>
          </div>
        </Link>

        {/* timeline */}
        {/* <Link to='timeline'>
      <div onClick={() => {
        handleToggle,
        handleItemClick(5)
      }} 
      className={`flex cursor-pointer mb-1 hover:bg-white rounded-[4px] hover:text-textDark px-[1rem] py-[0.5rem] items-center justify-start gap-4 ${isItemActive(5) ? "bg-white text-textDark" : "text-white"} `}>
        <span>
        <CiViewTimeline className='size-[1rem] lg:size-[1.25rem]' />
        </span>
        <h2 className='text-[1.1rem] mt-0 font-normal'>Timeline</h2>
      </div>
      </Link> */}

        {/* reviews */}
        {/* <Link to='reviews'>
      <div onClick={() => {
        handleToggle,
        handleItemClick(6)
      }} 
      className={`flex cursor-pointer mb-1 hover:bg-white rounded-[4px] hover:text-textDark px-[1rem] py-[0.5rem] items-center justify-start gap-4 ${isItemActive(6) ? "bg-white text-textDark" : "text-white"} `}>
        <span>
        <MdOutlineRateReview className='size-[1rem] lg:size-[1.25rem]' />
        </span>
        <h2 className='text-[1.1rem] mt-0 font-normal'>Reviews</h2>
      </div>
      </Link> */}

        {/* wallet */}
        <Link to="wallet">
          <div
            onClick={() => {
              handleToggle, handleItemClick(7);
            }}
            className={`flex cursor-pointer mb-1 hover:bg-white rounded-[4px] hover:text-textDark px-[1rem] py-[0.5rem] items-center justify-start gap-4 ${
              isItemActive(7) ? "bg-white text-textDark" : "text-white"
            } `}
          >
            <span>
              <GiWallet className="size-[1rem] lg:size-[1.25rem]" />
            </span>
            <h2 className="text-[1.1rem] mt-0 font-normal">Wallet</h2>
          </div>
        </Link>

        <div className="h-[9rem] xl:h-[14rem]"></div>

        {/* logout */}
        <button
          onClick={LogoutOpenModal}
          className={`flex cursor-pointer mb-1 hover:bg-white rounded-[4px] hover:text-textDark px-[1rem] py-[0.5rem] items-center justify-start gap-4 ${
            isItemActive(8) ? "bg-white text-textDark" : "text-white"
          } `}
        >
          <span>
            <RiLogoutCircleLine className="size-[1rem] lg:size-[1.25rem]" />
          </span>
          <h2 className="text-[1.1rem] mt-0 font-normal ">Log out</h2>
        </button>

        <Link to="/">
          <div
            onClick={() => {
              handleToggle, handleItemClick(7);
            }}
            className={`flex cursor-pointer mb-1 hover:bg-white rounded-[4px] hover:text-textDark px-[1rem] py-[0.5rem] items-center justify-start gap-4 ${
              isItemActive(6) ? "bg-white text-textDark" : "text-white"
            } `}
          >
            <span>
              <FaHome className="size-[1rem] lg:size-[1.25rem]" />
            </span>
            <h2 className="text-[1.1rem] mt-0 font-normal ">Back to home</h2>
          </div>
        </Link>

        {/* <div style={{height: "4rem"}}></div> */}
      </div>
      <LogoutModal isOpen={isOpenModal} onClose={LogOutCloseModal} />
    </>
  );
};

export default SideBar;
