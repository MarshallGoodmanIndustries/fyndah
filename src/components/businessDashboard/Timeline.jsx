import { BusinessTimeline } from "../uiComponents/business";
import { businesslogo } from "../../assets/images";

const Timeline = () => {
    return ( 
        <>
            <section className="w-full flex sm:justify-end py-4 px-4 sm:px-5 md:px-6 lg:px-8 ">
                <section className="w-full border flex flex-col items-center lg:items-start lg:flex-row p-2 sm:p-4 pt-4 pb-6 gap-4 border-b border-gray-300 rounded-lg">
                    <div className="w-fit">
                        <div className="max-w-24 rounded-full border-2 border-primary border-opacity-20">
                            <img src={businesslogo} className="w-full h-full" alt="business timeline display" />
                        </div>
                        {/* <p className="font-poppins font-normal text-textDark text-base text-center">MGI</p> */}
                    </div>
                    <div className="flex flex-col text-center lg:text-start  sm:max-w-[70%] md:max-w-[60%] lg:max-w-[50%]">
                        <h2 className="font-poppins text-textDark font-medium text-lg">Marshall Goodman Industries Ltd.</h2>
                        <p className="font-poppins text-blue-500 font-light text-[0.8rem]">Information Technology Company</p>
                        <p className="font-roboto font-light text-textDark text-base">MGI is a leading provider of Enterprise Software Solutions, Digital Security & IT Consulting Services Globally</p>
                        <p className="font-poppins font-light text-blue-500 text-[0.8rem]">40 Bank Street Canary Wharf, London, United Kingdom</p>
                    </div>
                    <div className="flex-1 flex justify-end">
                        <button className=" font-poppins text-base font-light text-primary bg-accent hover:bg-accentDark transition-all duration-300 rounded-lg py-1 px-4">Message</button>
                    </div>
                </section>
            </section>
            <BusinessTimeline /> 
        </>
    
)
}

export default Timeline;