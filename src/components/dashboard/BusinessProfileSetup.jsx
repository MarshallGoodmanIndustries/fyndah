import { Input } from "@chakra-ui/react";
import { businessImg, businessImg2 } from "../../assets/images/index";
import { useState } from "react";

const BusinessProfileSetup = () => {
    const [businessInputs, setBusinessInputs] = useState({
        businessName: "",
        businessCategory: "",
        contactEmail: "",
        contactPhone: "",
        location: "",
        address: "",
        city: "",
        state: "",
        country: "",
        zipCode: "",
        description: "",
        websiteUrl: "",
        logo: null,
        coverPhoto: null,
    })

    const [socialMediaLinks, setSocialMediaLinks] = useState({
        instagram: "",
        facebook: "",
        twitter: "",
        whatsapp: "",
        linkedin: "",
    }) 

    const [primaryProducts, setPrimaryProducts] = useState([]);

    const [priceRange, setPriceRange] = useState({
        minimum: "",
        maximum: "",
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
    
        setBusinessInputs({
          ...businessInputs,
          [name]: value,
        });

        setSocialMediaLinks({
            ...socialMediaLinks,
            [name]: value,
          });

          setPrimaryProducts({
            ...primaryProducts,
            [name]: value,
          });

          setPriceRange({
            ...priceRange,
            [name]: value,
          });
    }

    
    
      return (
        <div className="relative ">
          <div className="absolute lg:top-[20%] xl:top-0 top-[35%] lg:left-[30%]">
            <img
              className="w-full h-full object-fill lg:object-cover"
              src={businessImg2}
              alt=""
            />
            <div className="absolute top-0 left-0 w-full h-full bg-white bg-opacity-80 filter blur-md"></div>
          </div>
    
          <div className="relative h-full z-10 mx-[1rem] xl:mx-[6rem] lg:mx-[3rem] my-[2rem] lg:mt-[4rem] ">
            <h1 className="text-black font-bold lg:mb-[4rem] mb-[1rem] text-center font-roboto text-[1.1rem] lg:text-[1.5rem]">
              BUSINESS ACCOUNT PROFILE SETUP
            </h1>
    
            <form
              className="grid grid-cols-1 font-roboto lg:grid-cols-2 gap-[2rem] lg:gap-[2rem] xl:gap-[4rem]"
              action=""
            >
              {/* BASIC INFORMATION */}
              <div>
                <h2 className="text-accentDark lg:mb-[2rem] mb-[1rem] text-center font-semibold text-[1rem] lg:text-[1.3rem] font-poppins">
                  BASIC INFORMATION
                </h2>
    
                <div className="flex gap-[1.5rem]">
                <label
                    className="text-black font-normal text-[0.9rem] md:text-[1rem] lg:text-[1.2rem]"
                    htmlFor="businessName"
                  >
                    Business Name
                  </label>
                  <Input
                    variant="flushed"
                    className="md:text-[1rem] text-[0.8rem] user-profile-input md:placeholder:text-[1rem] placeholder:text-[0.8rem]"
                    placeholder="Enter your official business name"
                    onChange={handleChange}
                    value={businessInputs.businessName}
                  />
    
                </div>
              </div>
    
              {/* USER INTERESTS */}
              <div>
                <h2 className="text-accentDark lg:mb-[2rem] mb-[1rem] text-center font-semibold text-[1rem] lg:text-[1.3rem] font-poppins">
                  USER INTERESTS
                </h2>
              </div>
            </form>
          </div>
        </div>
      );
}

export default BusinessProfileSetup;