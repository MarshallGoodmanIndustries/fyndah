import { useState } from 'react'
import { Link } from 'react-router-dom';
import { AiFillMessage } from "react-icons/ai";
import { RiLogoutCircleLine } from "react-icons/ri";
import { BsActivity } from "react-icons/bs";
import { AiOutlineStock } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";
import { CiViewTimeline } from "react-icons/ci";
import { MdOutlineRateReview } from "react-icons/md";
import { GiWallet } from "react-icons/gi";
import { FaHome } from 'react-icons/fa';

// import { IoMdArrowDropright } from "react-icons/io";

const SideBar = ({handleToggle }) => {
  const [active, setActive] = useState(4)
  const handleItemClick = (index) => {
    setActive(index);
    handleToggle();
  };

  const isItemActive = (index) => index === active;
  return (
    <div className='px-[1rem] text-white font-inter py-[1rem]'>

      {/* business profile */}
      <Link to='business-profile'>
      <div onClick={() => {
        handleToggle,
        handleItemClick(4)
      }} 
      className={`flex cursor-pointer mb-1 hover:bg-white rounded-[4px] hover:text-textDark px-[1rem] py-[0.5rem] items-center justify-start gap-4 ${isItemActive(4) ? "bg-white text-textDark" : "text-white"} `}>
        <span>
        <FaUserCircle className='size-[1rem] lg:size-[1.25rem]' />
        </span>
        <h2 className='text-[1.1rem] mt-0 font-normal'>Profile</h2>
      </div>
      </Link>

      {/* posts */}
      <Link to='posts'>
      <div onClick={() => {
        handleToggle,
        handleItemClick(1)
      }} 
      className={`flex cursor-pointer mb-1 hover:bg-white rounded-[4px] hover:text-textDark px-[1rem] py-[0.5rem] items-center justify-start gap-4 ${isItemActive(1) ? "bg-white text-textDark" : "text-white"} `}>
        <span>
        <BsActivity className='size-[1rem] lg:size-[1.25rem]' />
        </span>
        <h2 className='text-[1.1rem] mt-0 font-normal'>Posts</h2>
      </div>
      </Link>

      {/* leads */}
      <Link to='leads'>
      <div onClick={() => {
        handleToggle,
        handleItemClick(2)
      }} 
      className={`flex cursor-pointer mb-1 hover:bg-white rounded-[4px] hover:text-textDark px-[1rem] py-[0.5rem] items-center justify-start gap-4 ${isItemActive(2) ? "bg-white text-textDark" : "text-white"} `}>
        <span>
        <AiOutlineStock className='size-[1rem] lg:size-[1.25rem]' />
        </span>
        <h2 className='text-[1.1rem] mt-0 font-normal'>Leads</h2>
      </div>
      </Link>

      {/* business messages */}
      <Link to='/dashboard/messages'>
      <div onClick={() => {
        handleToggle,
        handleItemClick(3)
      }} 
      className={`flex cursor-pointer mb-1 hover:bg-white rounded-[4px] hover:text-textDark px-[1rem] py-[0.5rem] items-center justify-start gap-4 ${isItemActive(3) ? "bg-white text-textDark" : "text-white"} `}>
        <span>
        <AiFillMessage className='size-[1rem] lg:size-[1.25rem]' />
        </span>
        <h2 className='text-[1.1rem] mt-0 font-normal'>Messages</h2>
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
      <Link to='wallet'>
      <div onClick={() => {
        handleToggle,
        handleItemClick(7)
      }} 
      className={`flex cursor-pointer mb-1 hover:bg-white rounded-[4px] hover:text-textDark px-[1rem] py-[0.5rem] items-center justify-start gap-4 ${isItemActive(7) ? "bg-white text-textDark" : "text-white"} `}>
        <span>
        <GiWallet className='size-[1rem] lg:size-[1.25rem]' />
        </span>
        <h2 className='text-[1.1rem] mt-0 font-normal'>Wallet</h2>
      </div>
      </Link>

      <div className='h-[9rem] lg:h-[14rem]' ></div>

      {/* logout */}
      <Link to='businesslogout'>
      <div onClick={() => {
        handleToggle,
        handleItemClick(8)
      }} 
      className={`flex cursor-pointer mb-1 hover:bg-white rounded-[4px] hover:text-textDark px-[1rem] py-[0.5rem] items-center justify-start gap-4 ${isItemActive(8) ? "bg-white text-textDark" : "text-white"} `}>
        <span>
        <RiLogoutCircleLine className='size-[1rem] lg:size-[1.25rem]' />
        </span>
        <h2 className='text-[1.1rem] mt-0 font-normal '>Log out</h2>
      </div>
      </Link>

      <Link to='/'>
      <div onClick={() => {
        handleToggle,
        handleItemClick(7)
      }} 
      className={`flex cursor-pointer mb-1 hover:bg-white rounded-[4px] hover:text-textDark px-[1rem] py-[0.5rem] items-center justify-start gap-4 ${isItemActive(6) ? "bg-white text-textDark" : "text-white"} `}>
        <span>
        <FaHome  className='size-[1rem] lg:size-[1.25rem]' />
        </span>
        <h2 className='text-[1.1rem] mt-0 font-normal '>Back to home</h2>
      </div>
      </Link>
      

      {/* <div style={{height: "4rem"}}></div> */}
    </div>
  )
}

export default SideBar
