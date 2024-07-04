import { useContext, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaLocationDot } from "react-icons/fa6";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import Swal from "sweetalert2";
import classNames from "classnames";
// import { RiTimeLine } from "react-icons/ri";


//searchBusinessProfile props: org_id, msg_id,
const SearchBusinessProfile = ({ businessProfileImg, businessName, businessTitle, businessLocation, org_id, msg_id}) => {
    const { authToken, userData } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [IsLoading, setIsLoading] = useState(false);
    

    const handleCreateConversation = async ()=> {
        if(!authToken){
            // redirect to login page
            Swal.fire({
                icon: "warning",
                title: "Login required",
                text: "You will be redirected to the login page.",
                timer: 3000,
                timerProgressBar: true,
              });
            setTimeout(()=>{
            sessionStorage.setItem("lastRoute", location.pathname); //set last route in other to be redirected back to current page
            navigate('/login');
            }, 3001);
          }else{
            setIsLoading(true);
            try {
                const response = await axios.post(`https://axelonepostfeature.onrender.com/api/conversations/newconversation/${msg_id}`, {}, {
                    headers: {
                        Authorization: `Bearer ${authToken}`
                    }
                });
                if(response.status === 200){
                    setIsLoading(false);
                    Swal.fire({
                        icon: "success",
                        title: "Conversation Creation Successful",
                        text: "You will be redirected to your message box.",
                        timer: 3000,
                        timerProgressBar: true,
                      });
                      setTimeout(()=>{
                        navigate("/dashboard/messages");
                      }, 3001);
                }
            } catch (error) {
                setIsLoading(false);
                Swal.fire({
                    icon: "error",
                    title: "Conversation Creation Failed",
                    text: "It seems there was an issue creating your new conversation. Please try again later.",
                    timer: 3000,
                    timerProgressBar: true,
                    footer: `Error details: ${error?.response?.data?.message || error?.message}`
                });
                
            }
          }
    };
    
  return (
    <div className="bg-primary transition-colors duration-300 rounded-lg w-full max-w-[300px] md:max-w-[80%] lg:max-w-[70%] p-4 flex flex-col md:flex-row md:justify-between gap-4">
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
            {org_id !== +userData?.organization_id && (
                <button onClick={handleCreateConversation} className={classNames( IsLoading && "animate-pulse", "bg-accent py-1 px-2 rounded-lg text-primary font-poppins font-light text-sm md:text-base")}>{IsLoading ? "Sending.." : "Send a message"}</button>
            )}
            {/* <div className="flex items-center gap-2">
                <RiTimeLine className="w-4 h-4" />
                <p className="font-roboto text-gray-600 font-normal text-sm md:text-base">{businessTime}</p>
            </div> */}
        </div>
    </div>
  )
}

export default SearchBusinessProfile;