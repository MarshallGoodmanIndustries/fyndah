import React, { useState } from 'react';
import { MdSend } from 'react-icons/md';
import { FiArrowLeft } from 'react-icons/fi';

const ChatComponent = () => {
  const businessData = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" },
    { id: 3, name: "Alice Johnson" },
    { id: 4, name: "Bob Brown" },
    { id: 5, name: "Charlie Davis" },
    { id: 6, name: "David Wilson" },
    { id: 7, name: "Emma Thomas" },
    { id: 8, name: "Fiona Lee" },
    { id: 9, name: "George Clark" },
    { id: 10, name: "Hannah Lewis" },
  ];

  const chats = [
    {
      id: 1,
      messageABusinessOwnerSent: [
        "Hello, how are you?",
        "You made a request to our business, how can we help you?",
      ],
      messageAUserSent: [
        "Hello, I am good.",
        "Yes, I did. I want to make some inquiries.",
      ],
    },
    {
      id: 2,
      messageABusinessOwnerSent: [
        "Hello, how are you?",
        "You made a request to our business, how can we help you?",
      ],
      messageAUserSent: [
        "Hello, I am good.",
        "Yes, I did. I want to make some inquiries.",
      ],
    },
    // ... other chat objects ...
  ];

  const [messageInChat, setMessageInChat] = useState(null);
  const [hideMessageComponent, setMessageComponent] = useState(false);
  const [showListOfBusiness, setShowListOfBusiness] = useState(true);

  const showUpMessages = (user) => {
    const messageInsideTheObject = chats.find((item) => item.id === user.id);
    setMessageInChat(messageInsideTheObject);
    setMessageComponent(true);
    setShowListOfBusiness(false); // Hide the business list on mobile
  };

  const hideTheListOnMobile = () => {
    setShowListOfBusiness(false);
  };

  return (
    <div className="md:grid grid-cols-5">
      {showListOfBusiness && (
        <div className="bg-blue-900 text-white p-6 h-screen overflow-y-scroll md:col-span-2 md:pb-20">
          <h2 className="text-2xl font-bold mb-4">
            Click to chat with business owners
          </h2>
          <ul className="list-none p-0">
            {businessData.map((user) => (
              <li
                key={user.id}
                onClick={() => {
                  showUpMessages(user);
                  hideTheListOnMobile();
                }}
                className="bg-blue-700 p-4 mb-2 rounded cursor-pointer my-2 transform transition duration-300 hover:bg-blue-500 hover:scale-5"
              >
                {user.name}
              </li>
            ))}
          </ul>
        </div>
      )}

      {!hideMessageComponent && (
        <div className="hidden md:flex items-center justify-center h-screen col-span-3">
          <div>Click on any business to start a conversation</div>
        </div>
      )}
      
      {hideMessageComponent && messageInChat && (
        <div className="h-screen overflow-y-scroll md:col-span-3 bg-blue-300 md:overflow-y-hidden relative">
          <div className="p-6 text-white h-full flex flex-col">
            <div className="flex-grow overflow-auto mb-4">
              <FiArrowLeft className="text-black mb-6 mt-4 font-bold text-xl cursor-pointer" />
              <div className="mb-8 flex justify-end">
                <div>
                  {messageInChat.messageABusinessOwnerSent.map((msg, index) => (
                    <p key={index} className="mb-1">
                      <strong>Owner:</strong> {msg}
                    </p>
                  ))}
                </div>
              </div>

              <div className="block">
                {messageInChat.messageAUserSent.map((msg, index) => (
                  <p
                    key={index}
                    className="border mb-3 bg-black p-3 rounded-tr-lg rounded-bl-lg"
                  >
                    <strong>User:</strong> {msg} <br />
                  </p>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4 fixed bottom-0 left-0 right-0 p-4 bg-blue-900">
              <textarea
                className="p-2 w-full text-black border border-blue-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="1"
                placeholder="Type your message here..."
              />
              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition">
                <MdSend />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatComponent;
