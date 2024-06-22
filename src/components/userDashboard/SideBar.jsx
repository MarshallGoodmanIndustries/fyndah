import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaUserLarge } from "react-icons/fa6";
import { AiFillMessage } from "react-icons/ai";
import { BiSolidBusiness } from "react-icons/bi";
import { RiLogoutCircleLine } from "react-icons/ri";
import { TbBusinessplan } from "react-icons/tb";
import { FaHome } from 'react-icons/fa';
import LogoutModalUser from './LogoutModal';
const SideBar = ({ handleToggle }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const location = useLocation();

  const LogoutOpenModal = () => setIsOpenModal(true);
  const LogOutCloseModal = () => setIsOpenModal(false);

  const getLinkClass = (path) => location.pathname.includes(path) ? "bg-white text-textDark" : "text-white";

  return (
    <div className='px-[1rem] flex flex-col h-full text-white font-inter py-[1rem]'>

      {/* PROFILE */}
      <Link to='profile'>
        <div onClick={handleToggle}
          className={`flex cursor-pointer mb-1 hover:bg-white rounded-[4px] hover:text-textDark px-[1rem] py-[0.5rem] items-center justify-start gap-4 ${getLinkClass('profile')}`}>
          <span>
            <FaUserLarge className='size-[1rem] lg:size-[1.25rem]' />
          </span>
          <h2 className='text-[1.1rem] mt-0 font-normal'>Profile</h2>
        </div>
      </Link>

      {/* messages */}
      <Link to='messages'>
        <div onClick={handleToggle}
          className={`flex cursor-pointer mb-1 hover:bg-white rounded-[4px] hover:text-textDark px-[1rem] py-[0.5rem] items-center justify-start gap-4 ${getLinkClass('messages')}`}>
          <span className='relative'>
            <b className='text-red-500 absolute top-0 right-0 -mt-3'> 0 </b>
            <AiFillMessage className='size-[1rem] lg:size-[1.25rem]' />
          </span>
          <h2 className='text-[1.1rem] mt-0 font-normal'>Messages</h2>
        </div>
      </Link>

      {/* createbuisness */}
      {/* <Link to='createbuisness'>
        <div onClick={handleToggle}
          className={`flex cursor-pointer mb-1 hover:bg-white rounded-[4px] hover:text-textDark px-[1rem] py-[0.5rem] items-center justify-start gap-4 ${getLinkClass('createbuisness')}`}>
          <span>
            <BiSolidBusiness className='size-[1rem] lg:size-[1.25rem]' />
          </span>
          <h2 className='text-[1.1rem] mt-0 font-normal'>Create a business</h2>
        </div>
      </Link>  */}

      {/* mybusiness */}
      <Link to='mybusiness'>
        <div onClick={handleToggle}
          className={`flex cursor-pointer mb-1 hover:bg-white rounded-[4px] hover:text-textDark px-[1rem] py-[0.5rem] items-center justify-start gap-4 ${getLinkClass('mybusiness')}`}>
          <span>
            <TbBusinessplan className='size-[1rem] lg:size-[1.25rem]' />
          </span>
          <h2 className='text-[1.1rem] mt-0 font-normal'>My Business</h2>
        </div>
      </Link>

      <div className='h-[15rem] xl:h-[20rem]' ></div>
      <div className='flex-1'></div>

      {/* logout */}
      <Link to='/'>
        <div onClick={handleToggle}
          className={`flex cursor-pointer mb-1 hover:bg-white rounded-[4px] hover:text-textDark px-[1rem] py-[0.5rem] items-center justify-start gap-4 ${getLinkClass('/')}`}>
          <span>
            <FaHome className='size-[1rem] lg:size-[1.25rem]' />
          </span>
          <h2 className='text-[1.1rem] mt-0 font-normal '>Feed</h2>
        </div>
      </Link>
      <button
        onClick={LogoutOpenModal}
        className={`flex cursor-pointer mb-1 hover:bg-white rounded-[4px] hover:text-textDark px-[1rem] py-[0.5rem] items-center justify-start gap-4 ${getLinkClass('logout')}`}>
        <span>
          <RiLogoutCircleLine className='size-[1rem] lg:size-[1.25rem]' />
        </span>
        <h2 className='text-[1.1rem] mt-0 font-normal'>Log out</h2>

      </button>

      <LogoutModalUser isOpen={isOpenModal} onClose={LogOutCloseModal} />

    </div>
  )
}

export default SideBar;
