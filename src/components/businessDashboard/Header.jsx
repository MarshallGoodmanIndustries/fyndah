import { useState, useContext, useEffect } from "react";
import { logo_white } from "../../assets/images/index";
import { FaBell } from "react-icons/fa6";
import { BsListUl } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import { Avatar, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const Header = ({ handleToggle, toggle }) => {
  const { authToken, businessMsgId, reload } = useContext(AuthContext);

  const [notificationMessage, setNotificationMessage] = useState([]);
  const [conversationId, setConversationId] = useState("");

  // Fetch conversations
  useEffect(() => {
    const fetchData = async () => {
      try {
        // setLoading(true);
        const response = await axios.get(
          `https://axelonepostfeature.onrender.com/api/conversations/orgconversations/${businessMsgId}`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        if (response.status === 200) {
          setNotificationMessage(response.data);
          console.log("response: ", response.data);
          // setLoading(false);
        } else {
          // setLoading(false);
          throw new Error("Getting all messages failed");
        }
      } catch (error) {
        console.error("Error fetching notifications", error);
        // setLoading(false);
      }
    };

    fetchData();
  }, [authToken, businessMsgId]);

  const filteredMessages = notificationMessage.filter(
    (message) => message.unreadCount > 0
  );

  const { id } = useParams();

  const [inputDefaultStates, setInputDefaultStates] = useState({
    businessName: "",
    email: "",
    phone: "",
    bio: "",
    address: "",
    city: "",
    state: "",
    country: "",
    zip_code: "",
    size: "",
    locationName: "",
    logo: "",
  });

  // added the reload state to force a reload of the profile
  useEffect(() => {
    const fetchBusinessProfileData = async () => {
      try {
        const businessProfileResponse = await axios.get(
          `https://test-api.fyndah.com/api/v1/organization/${id}`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        const businessData = businessProfileResponse.data.data;
        setInputDefaultStates({
          businessName: businessData.org_name || "",
          email: businessData.email || "",
          phone: businessData.phone || "",
          bio: businessData.org_bio || "",
          address: businessData.locations[0].address || "",
          city: businessData.locations[0].city || "",
          state: businessData.locations[0].state || "",
          country: businessData.locations[0].country || "",
          zip_code: businessData.locations[0].zip_code || "",
          locationName: businessData.locations[0].location_name || "",
          logo: businessData.logo || "",
        });

        if (businessProfileResponse.status === 200) {
          // console.log(businessProfileResponse.data)
        } else {
          throw new Error("Profile Details failed");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchBusinessProfileData();
  }, [authToken, id, reload]);

  return (
    <div className="text-white relative sm:px-[2rem] px-[1rem] items-center h-full flex justify-between z-50 font-inter">
      {/* LOGO */}
      <div className="hidden md:block ">
        <Link to="/">
          {" "}
          <img className="w-[150px] sm:w-[120px]" src={logo_white} alt="" />
        </Link>
      </div>

      <div className="md:hidden min-[500px]:gap-8 gap-4 flex items-center col-span-2">
        <div onClick={handleToggle} className="sm:hidden cursor-pointer">
          {toggle ? (
            <AiOutlineClose className="size-[1.2rem]" />
          ) : (
            <BsListUl className="size-[1.2rem]" />
          )}
        </div>
        <Link to="/">
          {" "}
          <img className="w-[70px]" src={logo_white} alt="" />
        </Link>
      </div>

      {/* USER PROFILES */}
      <div className="flex items-center justify-end md:gap-[1.8rem] gap-[1rem] lg:col-span-3 xl:col-span-2 col-span-2">
        {filteredMessages.length > 0 ? (
          <Menu>
            {({ isOpen }) => (
              <>
                <MenuButton
                  isActive={isOpen}
                  cursor="pointer"
                  position="relative"
                >
                  <span className="relative cursor-pointer">
                    <FaBell className="size-[18px] md:size-[22px]" />
                    <p className="absolute top-[-5px] left-0 text-white rounded-full bg-lightRed px-1 text-[11px]">
                      {filteredMessages.length}
                    </p>
                  </span>
                </MenuButton>
                <MenuList
                  color="black"
                  className="text-black w-[100px] text-[13px] md:text-[1rem] sm:w-auto"
                >
                  {filteredMessages.map((message) => (
                    <MenuItem
                      onClick={() => setConversationId(message._id)}
                      key={message._id}
                    >
                      You have {message.unreadCount} unread Messages from{" "}
                      {message.members[1].name}
                    </MenuItem>
                  ))}
                </MenuList>
              </>
            )}
          </Menu>
        ) : (
          <div className="relative cursor-pointer">
            <FaBell className="size-[18px] md:size-[22px]" />
            <p className="absolute top-[-5px] left-0 text-white rounded-full bg-lightRed px-1 text-[11px]">
              {filteredMessages.length}
            </p>
          </div>
        )}

        <div className="flex gap-3 items-center">
          <Avatar
            size="sm"
            name={inputDefaultStates.businessName}
            src={inputDefaultStates?.logo}
          />
          {/* <Avatar size='default' className='bg-[#f56a00] align-middle md:text-[1rem] text-[0.85rem] font-semibold text-white'> {userInitials} </Avatar> */}
          <h2 className="font-bold lg:block hidden text-[1rem]">
            {" "}
            {inputDefaultStates.businessName}{" "}
          </h2>
        </div>
      </div>

      {/* RESPONSIVENESS */}
    </div>
  );
};

export default Header;
