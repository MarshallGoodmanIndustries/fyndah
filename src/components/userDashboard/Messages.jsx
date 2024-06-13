import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { FiArrowLeft } from "react-icons/fi";
// import { HashRouter } from "react-router-dom";
function Messages() {
  // this is the initial conversation that would be showing for b users page
  const myConversation = [
    {
      members: [
        {
          id: "58",
          name: "daisy", //assuming you sent me a connection request through my business post i am going to be seeing your name in my own business message place
        },
        {
          id: "9",
          name: "Quwam business", //you that you sent me a connection request is going to be seeing my name in you user message page
        },
      ],
      updatedAt: "2024-06-05T07:22:42.308Z",
      __v: 0,
      _id: "666912492e1cf13b6d8d8935", //this is the id to check if it matches with the one in the conversation in a chat
    },
    {
      members: [
        {
          id: "58",
          name: "marvell", // if marvellous sent oscar a connection request oscar is going to have this marvellous name in his own business message page
        },
        {
          id: "9",
          name: "Oscar business", //while marvellous is going to be having oscar in her user message page
        },
      ],
      updatedAt: "2024-06-05T07:22:42.308Z",
      __v: 0,
      _id: "66678910",
    },
  ];
  // assuming the my conversation data is being fetched then using useState to set the conversation
  const [conversationOnPage, setConversationOnPage] = useState(myConversation);

  // hide the message box until the user click on any of the conversation
  const [showMessageBox, setShowMessageBox] = useState(false);

  // setting a state to toggle the visibility of the list of the people in the chats
  const [showListOfBusiness, setShowListOfBusiness] = useState(true);

  // hiding the message list on mobile screen
  const hideTheListOnMobile = () => {
    if (window.innerWidth < 768) {
      setShowListOfBusiness(false);
    }
  };
  return (
    <div className="py-10 items-top grid gap-4 justify-between px-5 md:grid md:grid-cols-5">
      {/* so i want to map through the conversation array now and i am going to be rendering the members[1].name because this is a users page and users are supposed to be seeing the name of the people business they sent a connection request to */}
      <div className="md:col-span-3 md:order-2">
        {showMessageBox ? (
          ""
        ) : (
          <center className="border flex items-center justify-center h-full py-4 px-4 w-full" >
         
           <h1> click on a message to start or continue your conversation{" "}</h1>
          </center>
        )}

        {showMessageBox && (
          <div className="bg-white border px-2 py-4 relative">
            {/* the arrow icon to show the list of the business when it is clicked*/}
            <FiArrowLeft
              className="font-bold absolute top-0 left-0 mt-1 ml-1 cursor-pointer"
              onClick={() => {
                setShowListOfBusiness(true);
                setShowMessageBox(false);
              }}
            />

            {/* message beign sent should be mapped here */}

            <div className="grid mt-4">
              <textarea
                className="p-2 w-full border border-blue-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 "
                rows="1"
                cols="500"
                placeholder="Type your message here..."
              />
              <div className="flex justify-end">
                <button className="mt-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition">
                  Send
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {showListOfBusiness && (
        <div className="grid border md:grid gap-4 col-span-2 md:order-1 px-4 py-4" >
          {conversationOnPage.map((item, index) => {
            return (
              <div
                key={index}
                //click any of the initial message to start a conversation
                onClick={() => {
                  setShowMessageBox(true);
                  hideTheListOnMobile();
                }}
                className="border-2 border-blue-500 rounded-lg cursor-pointer p-4 shadow-md hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300 ease-in-out" style={{ boxShadow: '0 14px 16px rgba(05, 0, 255, 0.1), 0 10px 15px rgba(255, 255, 255, 0.2), 0 20px 25px rgba(255, 255, 255, 0.1)' }}>
                  {/* in the business message page it should be {item.members[0].name so the business owner can get the name of the person that sends the request} */}
                <h1 className="text-black hover:text-white"> {item.members[1].name} </h1>
              </div>
            );
          })}
        </div>
      )}


      

      {/* conditional operator to show up the conversation box */}
    </div>
  );
}

export default Messages;
