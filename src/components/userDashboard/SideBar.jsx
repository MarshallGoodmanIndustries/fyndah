import { useState } from 'react'
import { Link } from 'react-router-dom';
import { FaUserLarge } from "react-icons/fa6";
import { MdAddBusiness } from "react-icons/md";
import { AiFillMessage } from "react-icons/ai";
import { BiSolidBusiness } from "react-icons/bi";
import { RiLogoutCircleLine } from "react-icons/ri";
import { TbBusinessplan } from "react-icons/tb";
// import { IoMdArrowDropright } from "react-icons/io";

const SideBar = ({handleToggle }) => {
  const [active, setActive] = useState(1)
  const handleItemClick = (index) => {
    setActive(index);
    handleToggle();
  };

  const isItemActive = (index) => index === active;
  return (
    <div className='px-[1rem] text-white font-inter py-[1rem]'>

      {/* PROFILE */}
      <Link to='profile'>
      <div onClick={() => {
        handleToggle,
        handleItemClick(1)
      }} 
      className={`flex cursor-pointer mb-1 hover:bg-white rounded-[4px] hover:text-textDark px-[1rem] py-[0.5rem] items-center justify-start gap-4 ${isItemActive(1) ? "bg-white text-textDark" : "text-white"} `}>
        <span>
        <FaUserLarge className='size-[1rem] lg:size-[1.25rem]' />
        </span>
        <h2 className='text-[1.1rem] mt-0 font-normal'>Profile</h2>
      </div>
      </Link>

      {/* favorite business */}
      <Link to='favoritebusiness'>
      <div onClick={() => {
        handleToggle,
        handleItemClick(2)
      }} 
      className={`flex cursor-pointer mb-1 hover:bg-white rounded-[4px] hover:text-textDark px-[1rem] py-[0.5rem] items-center justify-start gap-4 ${isItemActive(2) ? "bg-white text-textDark" : "text-white"} `}>
        <span>
        <MdAddBusiness className='size-[1rem] lg:size-[1.25rem]' />
        </span>
        <h2 className='text-[1.1rem] mt-0 font-normal'>Favorite Businesses</h2>
      </div>
      </Link>

      {/* messages */}
      <Link to='messages'>
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

      {/* createbuisness */}
      <Link to='createbuisness'>
      <div onClick={() => {
        handleToggle,
        handleItemClick(4)
      }} 
      className={`flex cursor-pointer mb-1 hover:bg-white rounded-[4px] hover:text-textDark px-[1rem] py-[0.5rem] items-center justify-start gap-4 ${isItemActive(4) ? "bg-white text-textDark" : "text-white"} `}>
        <span>
        <BiSolidBusiness className='size-[1rem] lg:size-[1.25rem]' />
        </span>
        <h2 className='text-[1.1rem] mt-0 font-normal'>Create a business</h2>
      </div>
      </Link>

      {/* mybusiness */}
      <Link to='mybusiness'>
      <div onClick={() => {
        handleToggle,
        handleItemClick(5)
      }} 
      className={`flex cursor-pointer mb-1 hover:bg-white rounded-[4px] hover:text-textDark px-[1rem] py-[0.5rem] items-center justify-start gap-4 ${isItemActive(5) ? "bg-white text-textDark" : "text-white"} `}>
        <span>
        <TbBusinessplan className='size-[1rem] lg:size-[1.25rem]' />
        </span>
        <h2 className='text-[1.1rem] mt-0 font-normal'>My Business</h2>

        {/* <span>
          <IoMdArrowDropright className='size-[1rem] lg:size-[1.25rem]'  />
        </span> */}
      </div>
      </Link>

      <div className='h-[15rem] lg:h-[20rem]' ></div>

      {/* logout */}
      <Link to='logout'>
      <div onClick={() => {
        handleToggle,
        handleItemClick(6)
      }} 
      className={`flex cursor-pointer mb-1 hover:bg-white rounded-[4px] hover:text-textDark px-[1rem] py-[0.5rem] items-center justify-start gap-4 ${isItemActive(6) ? "bg-white text-textDark" : "text-white"} `}>
        <span>
        <RiLogoutCircleLine className='size-[1rem] lg:size-[1.25rem]' />
        </span>
        <h2 className='text-[1.1rem] mt-0 font-normal '>Log out</h2>
      </div>
      </Link>

      {/* <div style={{height: "4rem"}}></div> */}
    </div>
  )
}

export default SideBar
