import {
  Spinner,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
} from "@chakra-ui/react";
import { FiArrowLeft } from "react-icons/fi";
import { format, isToday, isYesterday } from "date-fns";
import { IoSend, IoCheckmarkDoneSharp } from "react-icons/io5";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { BsArrowLeftCircleFill } from "react-icons/bs";
import { FaCircleArrowLeft } from "react-icons/fa6";

const ArchivedMessagesArea = ({
  setConversationInChat,
  setMessageComponent,
  setShowListOfBusiness,
  conversationInChat,
  senderId,
  messageLoading,
  handleSubmit,
  value,
  handleMessageChange,
  rows,
}) => {
  const messageContainerRef = useRef(null);
  const { authToken, userMsgId } = useContext(AuthContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedMessage, setSelectedMessage] = useState(null);

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  }, [conversationInChat]);

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    return `${hours.toString().padStart(2, "0")}:${minutes} ${ampm}`;
  };

  const groupMessagesByDate = (messages) => {
    return messages.reduce((groups, message) => {
      const date = new Date(message.timestamp).toDateString();
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(message);
      return groups;
    }, {});
  };

  const groupedMessages = groupMessagesByDate(conversationInChat);

  const formatDateHeader = (dateString) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) throw new Error("Invalid Date");
      if (isToday(date)) {
        return `Today, ${format(date, "MMMM dd, yyyy")}`;
      } else if (isYesterday(date)) {
        return `Yesterday, ${format(date, "MMMM dd, yyyy")}`;
      } else {
        return format(date, "EEEE, MMMM dd, yyyy");
      }
    } catch (error) {
      console.error("Invalid date:", dateString, error);
      return dateString;
    }
  };

  const handleContextMenu = (event, message) => {
    event.preventDefault();
    setSelectedMessage(message);
    onOpen();
  };

  const handleDelete = async () => {
    try {
      console.log("Delete message with ID:", selectedMessage);

      const response = await axios.delete(
        `https://axelonepostfeature.onrender.com/api/messages/delete/${selectedMessage}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      console.log(response.data);

      if (response.status === 200) {
        // update local state to remove the deleted message from the UI
        setConversationInChat(
          conversationInChat.filter((msg) => msg._id !== selectedMessage)
        );
      }
    } catch (error) {
      console.error("There was an error deleting the message:", error);
    }

    onClose();
  };

  const handleTouchStart = (event, message) => {
    const touchStartTime = new Date().getTime();
    const handleTouchEnd = () => {
      const touchEndTime = new Date().getTime();
      if (touchEndTime - touchStartTime > 500) {
        setSelectedMessage(message);
        onOpen();
      }
      document.removeEventListener("touchend", handleTouchEnd);
    };
    document.addEventListener("touchend", handleTouchEnd);
  };

  return (
    <div className="lg:col-span-3 font-roboto block w-full bg-message-area bg-neutral-100">
      {/* Fixed position for the arrow */}
      <div className="fixed block lg:hidden top-[5rem] md:left-[260px] left-0 z-30 pl-[2px] pr-[5px] ">
        <BsArrowLeftCircleFill
          size={18}
          onClick={() => {
            setMessageComponent(false);
            setShowListOfBusiness(true);
          }}
          className=" text-gray-600 font-bold text-xl "
        />
      </div>
      <div
        className="p-4 text-white overflow-y-scroll h-screen pt-16"
        ref={messageContainerRef}
      >
        <div className="block w-full mb-[3rem] py-[2rem] mx-auto">
          {Object.keys(groupedMessages).map((dateString) => (
            <div key={dateString}>
              <div className="relative flex justify-center my-[2rem]">
                <div className="w-full text-gray-300 bg-gray-300 h-[1px]"></div>
                <div className="text-center py-1 px-2 absolute bg-slate-50 border-gray-300 border-[1px] top-[-15px] z-10 rounded-lg w-fit text-slate-800 font-medium">
                  {formatDateHeader(dateString)}
                </div>
              </div>
              {groupedMessages[dateString].map((convo, index) => (
                <div
                  key={`${dateString}-${index}`}
                  className={`p-3 rounded-tr-lg rounded-bl-lg flex ${
                    convo.senderId === userMsgId
                      ? "justify-end"
                      : "justify-start"
                  }`}
                  onContextMenu={(event) => handleContextMenu(event, convo._id)}
                  onTouchStart={(event) => handleTouchStart(event, convo._id)}
                >
                  <div
                    className={`p-3 max-w-[85%] relative rounded-tr-lg rounded-bl-lg ${
                      convo.senderId === userMsgId
                        ? "bg-blue-500 text-white"
                        : "bg-white text-slate-800"
                    }`}
                  >
                    {/* <div className="w-full">{convo.message}</div> */}
                    <pre
                      className="p-1 font-roboto"
                      style={{ whiteSpace: "break-spaces" }}
                    >
                      {convo.message}
                    </pre>
                    <div className="text-[10px] items-center gap-1 flex justify-end">
                      <p>{formatTimestamp(convo.timestamp)}</p>
                      {convo.senderId === userMsgId && (
                        <span
                          className={
                            convo.isReadByRecipient
                              ? "text-lightRed"
                              : "text-white"
                          }
                        >
                          <IoCheckmarkDoneSharp size={14} />
                        </span>
                      )}
                    </div>
                    {isOpen && selectedMessage === convo._id && (
                      <div className="absolute left-0 bottom-1 ">
                        <Menu isOpen={isOpen} onClose={onClose}>
                          <MenuButton as="div" />
                          <MenuList background="black">
                            <MenuItem
                              background="black"
                              color="white"
                              onClick={handleDelete}
                            >
                              Delete
                            </MenuItem>
                          </MenuList>
                        </Menu>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="fixed bottom-0 z-20 w-full lg:w-[770px] md:w-[517px] items-center right-0 px-2 py-3 shadow-lg bg-white border-t border-gray-300">
          <div className="flex items-center space-x-2">
            <textarea
              className="flex-grow  p-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={rows}
              placeholder="Type your message..."
              value={value}
              required
              onChange={handleMessageChange}
              style={{ resize: "none", height: "45px", overflowY: "auto" }}
            ></textarea>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {messageLoading ? (
                <Spinner color="red.500" size={20} />
              ) : (
                <IoSend color="white" size={20} />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArchivedMessagesArea;
