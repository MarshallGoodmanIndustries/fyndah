import { Box, Image, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { useState } from "react";
import { RiEdit2Fill } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa6";
import { Textarea } from '@chakra-ui/react'
import { MdLocationPin } from "react-icons/md";
import { FaMonument } from "react-icons/fa";

function Profile() {
    const [inputDefaultStates, setInputDefaultStates] = useState({
        firstName: "Phil",
        lastName: "Collins",
        bio: "Aspiring astronaut by day, stargazing baker by night. I'm always reaching for the sky, whether with a telescope or a whisk.",
        location: "Oak Avenue, Denver, United States",
        businessRegNumber: "",
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
    
        setInputDefaultStates({
          ...inputDefaultStates,
          [name]: value,
        });
      };

  return (
    <div className="m-[2rem] font-roboto flex flex-col gap-[2rem]">
      <div className="flex items-center gap-[6rem]">
        {/* PROFILE IMAGE DISPLAY */}
        <div>
        <Box
        className=""
      position="relative"
      display="inline-block"
      borderRadius="full"
      overflow="hidden"
      boxSize="150px"
    >
      <Image
        boxSize="150px"
        src="https://bit.ly/dan-abramov"
        alt="Dan Abramov"
      />
      <Box
        position="absolute"
        top="0"
        left="0"
        width="100%"
        height="100%"
        backgroundColor="rgba(0, 0, 0, 0.4)"
        opacity="0"
        display="flex"
        alignItems="center"
        justifyContent="center"
        transition="opacity 0.3s"
        _hover={{ opacity: 1 }}
      >
        <RiEdit2Fill color="white" size="23px" />
      </Box>
    </Box>

    <h2 className="text-navyBlue font-semibold text-[1.1rem] capitalize">Phil Collins</h2>
    <h2 className="text-navyBlue font-semibold text-[1.1rem] capitalize">Oak Avenue, Denver, United States</h2>
        </div>


        <h2 className=" text-black uppercase font-bold  text-center text-[1.3rem]">
          Account Information
        </h2>
      </div>

      {/* ACCOUNT SETTING */}
      <div className="">
        <h2 className="text-black mb-[1rem] text-[1.1rem] font-semibold">
          ACCOUNT SETTING
        </h2>
        <h2 className="text-lightRed mb-2 font-medium text-[1.1rem]">
          EDIT PROFILE
        </h2>

        {/* FORM */}
        <form action="">
            <div className="grid grid-cols-2 gap-x-[4rem] gap-y-[2rem]">
                {/* FIRST NAME */}
                <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                    <label className="font-normal text-neutral-500 text-[1.1rem]" htmlFor="firstName">First Name</label>
                    <span className="flex font-normal text-neutral-500 text-[1.1rem] gap-2 cursor-pointer hover:text-neutral-400  items-center"> <RiEdit2Fill /> Edit</span>
                    </div>
                    
                    <InputGroup>
    <InputRightElement pointerEvents='none'>
      <FaRegUser color="text-[#d1d5db]" />
    </InputRightElement>
    <Input border="2px solid #d1d5db" className="border" variant='outline' value={inputDefaultStates.firstName} onChange={handleChange} placeholder='First Name' />
  </InputGroup>             
                </div>

                {/* LAST NAME */}
                <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                    <label className="font-normal text-neutral-500  text-[1.1rem]" htmlFor="lastName">Last Name</label>
                    <span className="flex font-normal text-neutral-500  text-[1.1rem] gap-2 cursor-pointer hover:text-neutral-400  items-center"> <RiEdit2Fill /> Edit</span>
                    </div>
                    
                    <InputGroup>
    <InputRightElement pointerEvents='none'>
      <FaRegUser color="text-[#d1d5db]" />
    </InputRightElement>
    <Input border="2px solid #d1d5db" className="border" variant='outline' value={inputDefaultStates.lastName} onChange={handleChange} placeholder='Last Name' />
  </InputGroup>             
                </div>

                {/* BIO */}
                <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                    <label className="font-normal text-neutral-500  text-[1.1rem]" htmlFor="bio">Bio</label>
                    <span className="flex font-normal text-neutral-500  text-[1.1rem] gap-2 cursor-pointer hover:text-neutral-400  items-center"> <RiEdit2Fill /> Edit</span>
                    </div>
                    
                    <Textarea
                    border="2px solid #d1d5db"
                    rows='4'
        value={inputDefaultStates.bio}
        onChange={handleChange}
        placeholder='Input bio text here'
        size='sm'
      />             
                </div>

                {/* LOCATION */}
                <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                    <label className="font-normal text-neutral-500  text-[1.1rem]" htmlFor="location">Location</label>
                    <span className="flex font-normal text-neutral-500  text-[1.1rem] gap-2 cursor-pointer hover:text-neutral-400  items-center"> <RiEdit2Fill /> Edit</span>
                    </div>
                    
                    <InputGroup>
    <InputRightElement pointerEvents='none'>
      <MdLocationPin color="text-[#d1d5db]" />
    </InputRightElement>
    <Input border="2px solid #d1d5db" className="border" variant='outline' value={inputDefaultStates.location} onChange={handleChange} placeholder='Location' />
  </InputGroup>             
                </div>

                {/* BSUINESS REG NO */}
                <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                    <label className="font-normal text-neutral-500  text-[1.1rem]" htmlFor="businessregnumber">Add Business Registration Number</label>
                    <span className="flex font-normal text-neutral-500  text-[1.1rem] gap-2 cursor-pointer hover:text-neutral-400  items-center"> <RiEdit2Fill /> Edit</span>
                    </div>
                    
                    <InputGroup>
    <InputRightElement pointerEvents='none'>
      <FaMonument color="text-[#d1d5db]" />
    </InputRightElement>
    <Input border="2px solid #d1d5db" className="border" variant='outline' value={inputDefaultStates.businessRegNumber} onChange={handleChange} placeholder='Add a business registration number' />
  </InputGroup>             
                </div>

                <div className="col-span-2 my-[2rem] text-black mb-[1rem] text-[1.1rem] font-semibold">ACCOUNT MANAGEMENT</div>


            </div>
        </form>
      </div>
    </div>
  );
}

export default Profile;
