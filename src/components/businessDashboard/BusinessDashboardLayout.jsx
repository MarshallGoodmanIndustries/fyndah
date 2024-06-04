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
    <div className='admin-layout font-inter'>
      <section className='business-header'>
        <Header toggle={toggle} handleToggle={handleToggle} />
      </section>
        <section className={`business-sidebar w-[250px] z-20 duration-500 ease-in-out sm:block ${toggle ? 'block' : 'hidden'}`}>
          <SideBar handleToggle={handleToggle} toggle={toggle} />
        </section>
        <section className='business-outlet w-screen'>
        <Outlet />
        </section>
        
    </div>
  )
}

export default BusinessDashboardLayout;
