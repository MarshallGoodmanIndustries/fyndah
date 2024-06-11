import { FaLocationDot } from "react-icons/fa6";
import { RiTimeLine } from "react-icons/ri";

const SearchBusinessProfile = ({businessProfileImg, businessName, businessTitle, businessLocation, businessTime}) => {
  return (
    <div className="bg-primary border hover:border-[1.3px] hover:border-accent transition-colors duration-300 rounded-lg w-full max-w-[300px] md:max-w-[80%] lg:max-w-[70%] p-4 flex flex-col md:flex-row md:justify-between gap-4 cursor-pointer">
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
            <button className="bg-accent py-1 px-2 rounded-lg text-primary font-poppins font-light text-sm md:text-base">Message</button>
            <div className="flex items-center gap-2">
                <RiTimeLine className="w-4 h-4" />
                <p className="font-roboto text-gray-600 font-normal text-sm md:text-base">{businessTime}</p>
            </div>
        </div>
    </div>
  )
}

export default SearchBusinessProfile;