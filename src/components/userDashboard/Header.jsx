import { useState } from 'react'
import {logo_white} from '../../assets/images/index'
import { FaBell } from 'react-icons/fa6'
import { BsListUl } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import { Avatar} from '@chakra-ui/react'

const Header = ({handleToggle, toggle}) => {
  // const UserList = ['U', 'Lucy', 'Tom', 'Edward'];
  // const ColorList = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae'];
  const user = 'Edward Collins'
  const userInitials = user.slice(0, 1)
  const notificationNumber = 3


  

  return (
    <div className='text-white relative sm:px-[2rem] px-[1rem] items-center h-full flex justify-between z-20 font-inter'>
      {/* LOGO */}
      <div className='hidden md:block '>
      
        <img className='w-[150px] sm:w-[120px]' src={logo_white} alt='' />
      </div>

      <div className='md:hidden min-[500px]:gap-8 gap-4 flex items-center col-span-2'>
      <div onClick={handleToggle} className='sm:hidden cursor-pointer'>
        {toggle ? <AiOutlineClose className='size-[1.2rem]' /> : <BsListUl className='size-[1.2rem]' />}
      </div>
        <img className='w-[70px]' src={logo_white} alt='' />
      </div>

      {/* USER PROFILES */}
      <div className='flex items-center justify-end md:gap-[1.8rem] gap-[1rem] lg:col-span-3 xl:col-span-2 col-span-2'>
        <span className='relative cursor-pointer'>
          <FaBell className=' size-[18px] md:size-[22px]' />
          <p className='absolute top-[-5px] left-2 text-white rounded-full bg-navyBlue px-1 text-[11px]'>
            {' '}
            {notificationNumber}{' '}
          </p>
        </span>
        <div className='flex gap-3 items-center'>
        <Avatar size='sm'  name='Dan Abrahmov' src='https://bit.ly/dan-abramov' />
          {/* <Avatar size='default' className='bg-[#f56a00] align-middle md:text-[1rem] text-[0.85rem] font-semibold text-white'> {userInitials} </Avatar> */}
          <h2 className='font-bold lg:block hidden text-[1rem]'> {user} </h2>
        </div>

        
      </div>

      {/* RESPONSIVENESS */}
    </div>
  )
}

export default Header
