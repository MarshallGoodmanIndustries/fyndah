import { IoShieldCheckmark } from "react-icons/io5";
import { FaTools } from "react-icons/fa";

function WhatWeOffer() {
    const offers = [
        {
            title: "Validated Leads",
            description: "Get high-quality, pre-verified leads to ensure your revenue grows fast.",
            icon: <IoShieldCheckmark className="text-accent w-8 h-8 md:w-9 md:h-9" />
        },
        {
            title: "Comprehensive Tools",
            description: "Access everything you need to manage and expand your business from one platform.",
            icon: <FaTools className="text-accent w-8 h-8 md:w-9 md:h-9" />
        },
    ];


  return (
    <section id="whatweoffer" className="bg-secondary flex flex-col gap-16 py-24 px-4 sm:px-5 md:px-6 lg:px-16">
        <div className="md:w-fit md:mx-auto">
            <h2 className="text-black font-poppins text-2xl md:text-3xl  font-semibold uppercase">What We Offer</h2>
            <hr className="w-20 md:w-24 h-[2px] md:mx-auto md:mt-1 bg-orange-500 rounded-lg" />
        </div>
        <div className="flex flex-col md:flex-row md:justify-evenly gap-8">
            {offers.map(({title, description, icon}, index) => ( 
                <div key={index} className="flex flex-col gap-4 md:max-w-[24rem]">
                    <div className="md:mx-auto">{icon}</div>
                    <div className="md:text-center">
                        <h2 className="font-poppins text-xl md:text-2xl font-semibold text-black text-opacity-80">{title}</h2>
                        <p className="font-roboto text-lg md:text-xl font-normal text-black text-opacity-70 mt-2">{description}</p>
                    </div>
                </div>
            ))}
        </div>
    </section>
  )
}

export default WhatWeOffer;