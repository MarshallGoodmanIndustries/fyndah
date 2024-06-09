import { Outlet} from "react-router-dom";
import SideBar from "./Sidebar";

// img
import { logo } from "../../assets/images";

const Policies = () => {
   
    
  return (
    <section className="">
        <div className="flex flex-col lg:flex-row h-full lg:h-dvh w-full gap-4">
            <SideBar />
            <section className="flex-1 overflow-y-auto rounded-lg bg-primary relative">
                <div className="w-full max-w-[28rem] h-auto opacity-15 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <img src={logo} className="w-full h-full object-cover" alt="fyndah logo" />
                </div>
                <Outlet />
            </section>
        </div>
        
    </section>
  )
}

export default Policies;