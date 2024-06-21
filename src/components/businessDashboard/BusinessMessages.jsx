import { useContext, useEffect, useState, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { FiArrowLeft } from "react-icons/fi";
import { Avatar, Spinner } from "@chakra-ui/react";
import { io } from "socket.io-client";
import MessageArea from "./MessageArea";

function BusinessMessages() {
  const [conversationOnPage, setConversationOnPage] = useState([]);
  const [showMessageBox, setShowMessageBox] = useState(false);
  const [showListOfBusiness, setShowListOfBusiness] = useState(true);
  const [conversationInChat, setConversationInChat] = useState([]);
  const [id, setId] = useState("");
  const [senderId, setSenderId] = useState("");
  const [messageLoading, setMessageLoading] = useState(false);
  const [value, setValue] = useState("");

  const { authToken, businessMsgId } = useContext(AuthContext);

  const chatContainerRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [conversationInChat]); // Scroll to bottom whenever messages change

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  };


  const hideTheListOnMobile = () => {
    if (window.innerWidth < 768) {
      setShowListOfBusiness(false);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://axelonepostfeature.onrender.com/api/conversations/orgconversations/${businessMsgId}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (response.status === 200) {
        setConversationOnPage(response.data);
        const theSenderId = response.data[0].members[0].id;
        setSenderId(theSenderId);
        console.log("response: ", response.data);
      } else {
        throw new Error("Getting all messages failed");
      }
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [authToken, businessMsgId]);


  const getMessagesInConversation = async (conversationId) => {
    try {
      const response = await axios.get(
        `https://axelonepostfeature.onrender.com/api/messages/${conversationId}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (response.status === 200) {
        setConversationInChat(response.data);
        setId(conversationId);
        console.log("conversations: ", response.data);
        window.scrollTo(100, 100);
      } else {
        throw new Error("Getting messages in a conversation failed");
      }
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  const handleMessageChange = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessageLoading(true);
    if (value.trim() !== "") {
      try {
        const message = {
          senderId: businessMsgId,
          conversationId: id,
          message: value,
          createdAt: new Date().toISOString(),
        };

        setConversationInChat((prev) => [...prev, message]);

        const response = await axios.post(
          `https://axelonepostfeature.onrender.com/api/messages/send-message/org/${id}`,
          { message: value },
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        if (response.status === 200) {
          console.log("Message sent", response.data);
        }

        setValue("");
        setMessageLoading(false);
      } catch (error) {
        console.error(error);
        setMessageLoading(false);
      }
    }
  };

  console.log("the id: ", id);
  console.log("sender id: ", senderId);

  // Ade's code
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

  //this chat contains a message from the business owner to the user and the message from the user to business owner
  const chats = [
    {
      id: 1,
      messageABusinessOwnerSent: [
        "Hello, how are you?",
        "you made a request to our business, how can we help you?",
        "you made a request to our business, how can we help you?",
        "Hello, how are you?",
        "you made a request to our business, how can we help you?",
        "you made a request to our business, how can we help you?",
        "Hello, how are you?",
        "you made a request to our business, how can we help you?",
        "you made a request to our business, how can we help you?",
        "Hello, i am good?",
        "yes i did i want to make some enquires?",
        "Hello, i am good?",
        "yes i did i want to make some enquires?",
        "Hello, i am good?",
        "yes i did i want to make some enquires?",
        "Hello, i am good?",
        "yes i did i want to make some enquires?",
      ],
      messageAUserSent: [
        "Hello, i am good?",
        "yes i did i want to make some enquires?",
        "Hello, i am good?",
        "yes i did i want to make some enquires?",
        "Hello, i am good?",
        "yes i did i want to make some enquires?",
        "Hello, i am good?",
        "yes i did i want to make some enquires?",
        "Hello, i am good?",
        "yes i did i want to make some enquires?",
        "Hello, i am good?",
        "yes i did i want to make some enquires?",
        "Hello, i am good?",
        "yes i did i want to make some enquires?",
        "Hello, i am good?",
        "yes i did i want to make some enquires?",
      ],
    },
    {
      id: 2,
      messageABusinessOwnerSent: [
        "Hello, how are you?",
        "you made a request to our business, how can we help you?",
      ],

      messageAUserSent: [
        "Hello, i am good?",
        "yes i did i want to make some enquires?",
      ],
    },
    {
      id: 3,
      messageABusinessOwnerSent: [
        "Hello, how are you?",
        "you made a request to our business, how can we help you?",
      ],

      messageAUserSent: [
        "Hello, i am good?",
        "yes i did i want to make some enquires?",
      ],
    },
    {
      id: 4,
      messageABusinessOwnerSent: [
        "Hello, how are you?",
        "you made a request to our business, how can we help you?",
      ],

      messageAUserSent: [
        "Hello, i am good?",
        "yes i did i want to make some enquires?",
      ],
    },
    {
      id: 5,
      messageABusinessOwnerSent: [
        "Hello, how are you?",
        "you made a request to our business, how can we help you?",
      ],

      messageAUserSent: [
        "Hello, i am good?",
        "yes i did i want to make some enquires?",
      ],
    },
    {
      id: 6,
      messageABusinessOwnerSent: [
        "Hello, how are you?",
        "you made a request to our business, how can we help you?",
      ],

      messageAUserSent: [
        "Hello, i am good?",
        "yes i did i want to make some enquires?",
      ],
    },
    {
      id: 7,
      messageABusinessOwnerSent: [
        "Hello, how are you?",
        "you made a request to our business, how can we help you?",
      ],

      messageAUserSent: [
        "Hello, i am good?",
        "yes i did i want to make some enquires?",
      ],
    },
    {
      id: 8,
      messageABusinessOwnerSent: [
        "Hello, how are you?",
        "you made a request to our business, how can we help you?",
      ],

      messageAUserSent: [
        "Hello, i am good?",
        "yes i did i want to make some enquires?",
      ],
    },
    {
      id: 9,
      messageABusinessOwnerSent: [
        "Hello, how are you?",
        "you made a request to our business, how can we help you?",
      ],

      messageAUserSent: [
        "Hello, i am good?",
        "yes i did i want to make some enquires?",
      ],
    },
    {
      id: 10,
      messageABusinessOwnerSent: [
        "Hello, how are you?",
        "you made a request to our business, how can we help you?",
      ],

      messageAUserSent: [
        "Hello, i am good?",
        "yes i did i want to make some enquires?",
      ],
    },
  ];
  const [messageInChat, setMessageInChat] = useState(null);
  const [hideMessageComponent, setMessageComponent] = useState(false);
  // the click event for all the conversation if their id matches
  const showUpMessages = (initialDataOnPage) => {
    const messageInsideTheObject = chats.find(
      (item) => item.id == initialDataOnPage.id
    );
    // i am setting the message in chat box to messageInChat
    setMessageInChat(messageInsideTheObject);
    console.log(messageInsideTheObject);
    // showing the messageComponent
    setMessageComponent(true);
  };

  let hideDaisy = false;

  useEffect(() => {
    console.log("Component Mounted");
    

    console.log("Creating socket with token:", authToken);
    const socket = io('https://axelonepostfeature.onrender.com', {
        query: { authToken },
        transports: ['websocket'], // Ensure we are using websockets
        reconnectionAttempts: 3, // Retry connecting 3 times
    });

    console.log("Socket created:", socket);

    socket.on('connect', () => {
      console.log('Connected to the server');
      socket.emit('joinRoom', { conversationId: id });
    });

    socket.on('new_message', (data) => {
      console.log('New message received:', data);
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from the server');
    });

    socket.on('connect_error', (err) => {
      console.error('Connection Error:', err);
    });

    socket.on('error', (err) => {
      console.error('Error:', err);
    });

    return () => {
      console.log("Component Unmounted, disconnecting socket");
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      <div className="md:grid grid-cols-5">
        {/* initial lists */}
        {showListOfBusiness && (
          <div className="bg-blue-900 text-white p-6 h-screen overflow-y-scroll md:col-span-2 md: pb-20">
            <h2 className="text-2xl font-bold mb-4">
              click to chat with your customers{" "}
            </h2>
            <ul className="list-none p-0">
              {businessData.map((user) => (
                <li
                  key={user.id}
                  onClick={() => {
                    showUpMessages(user);
                    hideTheListOnMobile();
                  }}
                  className="bg-blue-700 p-4 mb-2 rounded cursor-pointer my-2 transform transition duration-300 hover:bg-blue-500 hover:scale-5">
                  {user.name}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* message component */}
        {!hideMessageComponent && (
          <div className="hidden md:flex items-center justify-center h-screen col-span-3">
            <div>Click on any business to start a conversation </div>
          </div>
        )}
        {hideMessageComponent && messageInChat && (
          <MessageArea
            businessData={businessData}
            setMessageComponent={setMessageComponent}
            setShowListOfBusiness={setShowListOfBusiness}
            messageInChat={messageInChat}
          />
        )}
      </div>

      {hideDaisy && (
        <div className="flex flex-col md:flex-row h-[80vh]">
          <div
            className={`md:w-1/3 min-h-screen bg-gray-100 ${
              !showListOfBusiness && "hidden md:block"
            }`}>
            <p className="text-lightRed mb-4 font-medium text-lg font-roboto p-4">
              Chats
            </p>
            {conversationOnPage.map((item, index) => (
              <div
                key={index}
                onClick={() => {
                  setShowMessageBox(true);
                  getMessagesInConversation(item._id);
                  hideTheListOnMobile();
                }}
                className="h-20 flex items-center cursor-pointer p-4 shadow-md hover:bg-gray-300 text-white font-bold py-2 px-4 rounded transition-colors duration-300 ease-in-out"
                style={{
                  boxShadow:
                    "0 14px 16px rgba(5, 0, 255, 0.1), 0 10px 15px rgba(255, 255, 255, 0.1), 0 20px 25px rgba(255, 255, 255, 0.1)",
                }}>
                <Avatar
                  size="sm"
                  name={item.members[0].name}
                  src="https://cdn-icons-png.freepik.com/512/3177/3177440.png"
                />
                <h1 className="text-black capitalize hover:text-white ml-4">
                  {item.members[0].name}
                </h1>
              </div>
            ))}
          </div>
          <div className="md:w-2/3 w-full flex-1 bg-white">
            {!showMessageBox && (
              <center className="flex items-center justify-center h-full py-4 px-4 w-full">
                <h1>
                  Click on a message to start or continue your conversation
                </h1>
              </center>
            )}

            {showMessageBox && (
              <div
                id="chatContainer"
                ref={chatContainerRef}
                className="bg-white w-full mb-[3rem]  chat-container h-full  px-2 py-4 relative">
                {conversationInChat && conversationInChat.length > 0 ? (
                  <div>
                    {conversationInChat.map((convo, index) => (
                      <div
                        className={
                          convo.senderId === senderId
                            ? "message sent"
                            : "message received"
                        }
                        key={index}>
                        {convo.message}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div>No conversations yet for this user</div>
                )}

                <FiArrowLeft
                  className="font-bold absolute top-0 left-0 mt-1 ml-1 cursor-pointer md:hidden"
                  onClick={() => {
                    setShowListOfBusiness(true);
                    setShowMessageBox(false);
                  }}
                />
              </div>
            )}
          </div>
          <div className="flex gap-4 fixed bottom-[2px] w-[93%] lg:w-1/2 items-center right-3">
            <textarea
              className="p-2 border w-full border-blue-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="1"
              placeholder="Type your message here..."
              value={value}
              onChange={handleMessageChange}
            />
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition"
              onClick={handleSubmit}>
              {messageLoading ? <Spinner color="red.500" size="xs" /> : "Send"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default BusinessMessages;
