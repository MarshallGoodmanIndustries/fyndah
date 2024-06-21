import React from "react";
import { FiArrowLeft } from "react-icons/fi";

const MessageArea = ({setMessageComponent,setShowListOfBusiness,messageInChat}) => {
  return  <div className="md:col-span-3 bg-[#F5F5F5]">
  <div className="p-6 text-white overflow-y-scroll h-screen pb-20 md:fixed top-0">
    <FiArrowLeft onClick={(()=>{
      setMessageComponent(false)
      setShowListOfBusiness(true)
    })} className="text-black mb-6 mt-4 font-bold text-xl" />

    <div className="mb-8 flex justify-end">
      <div>
        {messageInChat.messageABusinessOwnerSent.map((msg, index) => (
          <p key={index} className=" border mb-3 bg-[#333333] p-3 rounded-tr-lg rounded-bl-lg text-white ">
            <strong>Owner:</strong> {msg}
          </p>
        ))}
      </div>
    </div>

    <div className="block">
      {messageInChat.messageAUserSent.map((msg, index) => (
        <p
          key={index}
          className="border mb-3 bg-[#3A7CA5] p-3 rounded-tr-lg rounded-bl-lg ">
          <strong>User:</strong> {msg} <br />
        </p>
      ))}
    </div>

    <div className="fixed bottom-0 w-full md:w-2/4 items-center right-0 p-2 shadow-lg bg-white border-t border-gray-300">
      <div className="flex items-center space-x-2">
        <textarea
          className="flex-grow p-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="1"
          placeholder="Type your message..."
        ></textarea>
        <button
          className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Send
        </button>
      </div>
    </div>


  </div>
</div>
};

export default MessageArea;
