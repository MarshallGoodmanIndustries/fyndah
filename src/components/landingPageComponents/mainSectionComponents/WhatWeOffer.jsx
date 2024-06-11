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
        <div className="text-center flex flex-col gap-4 items-center">
            <h5 className="font-poppins text-xs md:text-sm font-medium text-accent bg-accent bg-opacity-15 w-fit rounded-2xl p-2">Fyndah</h5>
            <h3 className="font-poppins text-xl md:text-2xl lg:text-3xl font-medium">What we offer</h3>
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