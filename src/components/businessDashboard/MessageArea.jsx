import { Spinner } from "@chakra-ui/react";
import { FiArrowLeft } from "react-icons/fi";

const MessageArea = ({ setMessageComponent,
  setShowListOfBusiness,
  conversationInChat,
  senderId,
  messageLoading,
  handleSubmit,
  value,
  handleMessageChange,}) => {
  return  <div className="md:col-span-3 bg-[#F5F5F5]">
  <div className="p-6 text-white overflow-y-scroll h-screen pb-20 md:fixed top-0">
    <FiArrowLeft onClick={(()=>{
      setMessageComponent(false)
      setShowListOfBusiness(true)
    })} className="text-black mb-6 mt-4 font-bold text-xl" />

<div className="block w-full mx-auto">


          {conversationInChat.map((convo, index) => (
            <div
              key={index}
              className={` p-3 rounded-tr-lg rounded-bl-lg flex ${
                convo.senderId === senderId ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`p-3 rounded-tr-lg rounded-bl-lg ${
                  convo.senderId === senderId
                    ? "bg-white text-black"
                    : "bg-[#3A7CA5] text-white"
                }`}
              >
                {convo.message}
              </div>
            </div>
          ))}
        </div>

    

    <div className="fixed bottom-0 w-full md:w-2/4 items-center right-0 p-2 shadow-lg bg-white border-t border-gray-300">
      <div className="flex items-center space-x-2">
        <textarea
          className="flex-grow p-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="1"
          placeholder="Type your message..."
          value={value}
          onChange={handleMessageChange}
        ></textarea>
        <button
        onClick={handleSubmit}
          className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
         {messageLoading ? <Spinner color="red.500" size="xs" /> : "Send"}
        </button>
      </div>
    </div>


  </div>
</div>
};

export default MessageArea;
