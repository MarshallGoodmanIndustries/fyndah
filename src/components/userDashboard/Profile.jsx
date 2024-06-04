import { Image } from "@chakra-ui/react";

function Profile() {
  return (
    <div className="m-[2rem] flex flex-col gap-[2rem]">
      <div className="flex items-center gap-[3rem]">
        {/* PROFILE IMAGE DISPLAY */}
        <div>
          <Image
            borderRadius="full"
            boxSize="150px"
            src="https://bit.ly/dan-abramov"
            alt="Dan Abramov"
          />
        </div>
        <h2 className=" text-black uppercase font-bold text-center text-[1.3rem]">
          Account Information
        </h2>
      </div>

      {/* ACCOUNT SETTING */}
      <div className="">
        <h2 className="text-black mb-[1rem] text-[1.1rem] font-semibold">
          ACCOUNT SETTING
        </h2>
        <h2 className="text-lightRed font-medium text-[1.1rem]">
          EDIT PROFILE
        </h2>
      </div>
    </div>
  );
}

export default Profile;
