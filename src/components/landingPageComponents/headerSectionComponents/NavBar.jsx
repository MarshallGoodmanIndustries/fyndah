import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { landingPageNavMenu } from "../../../routes/Navigations";
import { Button } from "../../uiComponents";
import { HiMiniBars3BottomRight } from "react-icons/hi2";
import { RxCross2 } from "react-icons/rx";
import { logo } from "../../../assets/images";
import classNames from "classnames";

function NavBar() {
    const navigate = useNavigate();
    const [revealNav, setRevealNav] = useState(false);
  return (
    <nav className='flex justify-between items-center z-50 bg-secondary w-full h-[16dvh] px-4 sm:px-5 md:px-6 lg:px-16'>
        <div className='max-w-[8rem] md:max-w-[10rem] h-auto transform -translate-x-3'>
            <img src={logo} className='w-full h-full object-cover' alt="Fyndah logo" />
        </div>

        <div onClick={()=> setRevealNav(true)} className="cursor-pointer sm:hidden">
            <HiMiniBars3BottomRight className="w-6 h-6 text-black" />
        </div>

        {/* mobile */}
        <div className={classNames(revealNav ? "right-0" : "-right-full", "flex flex-col items-center justify-center absolute top-0 z-50 w-[65%] h-dvh bg-secondary shadow-lg transition-all duration-300 gap-8 sm:hidden")}>
                <div onClick={()=> setRevealNav(false)} className="cursor-pointer absolute top-5 left-5">
                    <RxCross2 className="w-6 h-6 text-black text-opacity-70" />
                </div>
                <ul className="flex flex-col sm:flex-row items-center gap-4">
                    {landingPageNavMenu.map(({title, url}, index) => (
                        <li key={index}>
                            <NavLink to={url} className="text-base md:text-lg font-poppins font-normal">{title}</NavLink>
                        </li>
                    ))}
                </ul>
                <div className="">
                    <Button title="Sign up" action={()=> navigate('/signup')} />
                </div>
           </div>

        {/* desktop */}
        <div className="hidden sm:flex items-center flex-row  gap-8">
            <ul className="flex items-center gap-4">
                {landingPageNavMenu.map(({title, url}, index) => (
                    <li key={index}>
                        <NavLink to={url} className="md:text-lg font-poppins font-normal">{title}</NavLink>
                    </li>
                ))}
            </ul>
            <div className="">
                <button onClick={()=> navigate()} className="bg-accent text-primary font-poppins md:text-lg  rounded-lg py-2 px-4 capitalize font-medium">Register</button>
            </div>
        </div>
    </nav>
  )
}

export default NavBar;