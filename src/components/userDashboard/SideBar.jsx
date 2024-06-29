import { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaUserLarge } from "react-icons/fa6";
import { AiFillMessage } from "react-icons/ai";
import { BiSolidBusiness } from "react-icons/bi";
import { RiLogoutCircleLine } from "react-icons/ri";
import { TbBusinessplan } from "react-icons/tb";
import { FaHome } from 'react-icons/fa';
import LogoutModalUser from './LogoutModal';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const SideBar = ({ handleToggle }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { authToken} = useContext(AuthContext);
  const location = useLocation();
  const [totalUnreadConversations, setTotalUnreadConversations] = useState("")

  const LogoutOpenModal = () => setIsOpenModal(true);
  const LogOutCloseModal = () => setIsOpenModal(false);

  const getLinkClass = (path) => location.pathname.includes(path) ? "bg-white text-textDark" : "text-white";

  // fetch unread messages for a user
  useEffect(() => {
    const getUnreadConversations = async () => {
      try {
        // setLoading(true);
        const response = await axios.get(
          `https://axelonepostfeature.onrender.com/api/messages/user/messages/unread`,
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
            <AiFillMessage className='size-[1rem] lg:size-[1.25rem]' />
            <p className="absolute top-[-5px] left-3 text-white rounded-full bg-lightRed px-1 text-[11px]">
            {totalUnreadConversations}
          </p>
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
