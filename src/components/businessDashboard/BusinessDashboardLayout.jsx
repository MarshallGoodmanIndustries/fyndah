import  { useState } from 'react'
import Header from './Header'
import SideBar from './SideBar'
import { Outlet } from 'react-router-dom'
import './BusinessDashboard.css'

const BusinessDashboardLayout = () => {
  const [toggle, setToggle] = useState(false);
  const handleToggle = () => {
    setToggle(!toggle)
  }

  return (
    <div className='business-layout w-full font-roboto'>
      <section className='business-header w-full'>
        <Header toggle={toggle} handleToggle={handleToggle} />
      </section>
        <section className={`business-sidebar w-[250px] z-20 duration-500 ease-in-out sm:block ${toggle ? 'block' : 'hidden'}`}>
          <SideBar handleToggle={handleToggle} toggle={toggle} />
        </section>
        <section className='business-outlet w-full md:w-auto'>
        <Outlet />
        </section>
        
    </div>
  )
}

export default BusinessDashboardLayout;
