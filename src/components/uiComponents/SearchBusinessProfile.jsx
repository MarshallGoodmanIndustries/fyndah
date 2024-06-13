import { useContext, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaLocationDot } from "react-icons/fa6";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import Swal from "sweetalert2";
import classNames from "classnames";
// import { RiTimeLine } from "react-icons/ri";

const SearchBusinessProfile = ({id, businessProfileImg, businessName, businessTitle, businessLocation}) => {
    const { authToken } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [IsLoading, setIsLoading] = useState(false);

    const handleCreateConversation = async ()=> {
        if(!authToken){
            //set the lastRoute so that user can be navigated back to this spot if they happen to not be logged in while trying to access the checkout page
            sessionStorage.setItem("lastRoute", location.pathname)
            navigate('/login');
          }else{
            setIsLoading(true);
            try {
                const response = await axios.post(`https://axelonepostfeature.onrender.com/api/conversations/newconversation/${id}`, {}, {
                    headers: {
                        Authorization: `Bearer ${authToken}`
                    }
                });
                if(response.status === 200){
                    setIsLoading(false);
                    Swal.fire({
                        icon: "success",
                        title: "Connection Successful",
                        text: "You will be redirected to your message box.",
                        timer: 3000,
                        timerProgressBar: true,
                      });
                      setTimeout(()=>{
                        navigate("/dashboard/messages");
                      }, 3001);
                }
                console.log(response.data);
            } catch (error) {
                setIsLoading(false);
                console.log(error.message)
            }
          }
    };
  return (
    <div className="bg-primary transition-colors duration-300 rounded-lg w-full max-w-[300px] md:max-w-[80%] lg:max-w-[70%] p-4 flex flex-col md:flex-row md:justify-between gap-4 cursor-pointer">
        <div className="p-1 max-w-24 h-full mx-auto md:mx-0 bg-secondary rounded-lg">
            <img src={businessProfileImg} className="w-full h-full object-cover" alt="profile display" />
        </div>
        <div className="flex flex-col items-center md:items-start md:flex-1 gap-1">
            <h2 className="text-textDark font-poppins font-semibold text-lg md:text-xl">{businessName}</h2>
            <h3 className="text-gray-600 font-poppins font-normal text-base md:text-lg">{businessTitle}</h3>
            <div className="flex items-center">
                <div className="flex items-center gap-2">
                    <FaLocationDot className="w-4 h-4 md:w-5 md:h-5 text-gray-400" />
                    <p className="font-roboto text-gray-600 font-normal text-sm md:text-base">{businessLocation}</p>
                </div>
            </div>
        </div>
        <div className=" flex flex-col items-center md:items-end gap-2">
            <button disabled onClick={handleCreateConversation} className={classNames( IsLoading && "animate-pulse", "bg-accent py-1 px-2 rounded-lg text-primary font-poppins font-light text-sm md:text-base")}>{IsLoading ? "Connecting.." : "Connect"}</button>
            {/* <div className="flex items-center gap-2">
                <RiTimeLine className="w-4 h-4" />
                <p className="font-roboto text-gray-600 font-normal text-sm md:text-base">{businessTime}</p>
            </div> */}
        </div>
    </div>
  )
}

export default SearchBusinessProfile;