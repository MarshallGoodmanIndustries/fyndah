import { NavLink, useLocation } from "react-router-dom";
import { sideBarLinks, sideBarBotttomLinks } from "../../routes/Navigations";
import classNames from "classnames";



function SideBar() {
  const {pathname} = useLocation();

  return (
    <nav className="bg-secondary w-full h-full flex lg:flex-col lg:max-w-[20dvw] justify-between gap-4 lg:gap-8 px-4 py-6 lg:p-4">
        <menu className="flex lg:flex-col gap-4">
            {sideBarLinks.map(({title,link},index)=>(
                <li key={index} >
                  <NavLink to={link} className={classNames(pathname == link ? "text-accent" : "text-black"," text-opacity-80 font-lato font-medium text-base md:text-lg lg:text-xl flex items-center gap-2 hover:text-accentDark transition-all duration-300 pl-2 py-2 rounded-tl-lg rounded-bl-lg")}>
                      {title}
                  </NavLink>
                </li>
            ))}
        </menu>
        <menu>
            {sideBarBotttomLinks.map(({title,link},index) =>(
                <li key={index} >
                  <NavLink to={link} className={classNames("text-black text-opacity-80 font-lato font-medium text-base md:text-lg lg:text-xl flex items-center gap-2 hover:text-accentDark transition-all duration-300 pl-2 py-2 rounded-tl-lg rounded-bl-lg")}>
                      {title}
                  </NavLink>
                </li>
            ))}
        </menu>
    </nav>
  )
}

export default SideBar