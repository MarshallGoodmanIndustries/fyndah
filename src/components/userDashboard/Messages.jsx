import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { FiArrowLeft } from "react-icons/fi";
import { Avatar, Spinner } from "@chakra-ui/react";
import { ImSpinner9 } from "react-icons/im";
import { io } from "socket.io-client";
import MessageArea from "./MessageArea";

function Messages() {
  const [conversationOnPage, setConversationOnPage] = useState([]);
  const [showMessageBox, setShowMessageBox] = useState(false);
  const [showListOfBusiness, setShowListOfBusiness] = useState(true);
  const [conversationInChat, setConversationInChat] = useState([]);
  const [id, setId] = useState("");
  const [senderId, setSenderId] = useState("");
  const [receiverId, setReceiverId] = useState("");
  const [messageLoading, setMessageLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("");
  const [hideMessageComponent, setMessageComponent] = useState(false);

  const { authToken, userMsgId} = useContext(AuthContext);

  // Hide the message list on mobile screens
  const hideTheListOnMobile = () => {
    if (window.innerWidth < 768) {
      setShowListOfBusiness(false);
    }
  };

  // Fetch conversations
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://axelonepostfeature.onrender.com/api/conversations/userconversations/${userMsgId}`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        if (response.status === 200) {
          setConversationOnPage(response.data);
          const theSenderId = response.data[0].members[0].id;
          const theReceiverId = response.data[1].members[1].id;
          setSenderId(theSenderId);
          setReceiverId(theReceiverId)
          console.log("response: ", response.data);
          setLoading(false);
        } else {
          setLoading(false);
          throw new Error("Getting all messages failed");
        }
      } catch (error) {
        console.error("Error fetching data", error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [authToken, userMsgId]);

  // Fetch messages in a conversation
  const getMessagesInConversation = async (conversationId) => {
    try {
      setLoading(true);
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
        setLoading(false);
        setMessageComponent(true);
        window.scroll(100, 100);
      } else {
        setLoading(false);
        throw new Error("Getting messages in a conversation failed");
      }
    } catch (error) {
      setLoading(false);
      console.error("Error fetching data", error);
    } finally {
      setLoading(false);
    }
  };

  const handleMessageChange = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessageLoading(true);
    setValue("");
    if (value.trim() !== "") {
      try {
        const message = {
          senderId: userMsgId,
          conversationId: id,
          message: value,
          createdAt: new Date().toISOString(),
        };

        // Optimistically update the UI
        setConversationInChat((prev) => [...prev, message]);

        const response = await axios.post(
          `https://axelonepostfeature.onrender.com/api/messages/send-message/user/${id}`,
          { message: value },
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        if (response.status === 200) {
          console.log("Message sent", response.data);
          setValue("");
        }

        
        setMessageLoading(false);
      } catch (error) {
        console.error(error);
        setMessageLoading(false);
      }
    }
  };

  useEffect(() => {
    const socket = io("https://axelonepostfeature.onrender.com", {
      query: {token : authToken}
    }) ;
    socket.on("connect", () => {
      console.log("connected")

      socket.emit("join", id)
    })
    socket.on("receiveMessage", (message) => {
      setConversationInChat((prev) => [...prev, message]);
      console.log("message received")
    })

    socket.on("disconnect", () => {
      console.log("disconnected")
    })

    // Cleanup on unmount
    return () => {
      socket.disconnect()
    };
  }, []);

  let daisyComponent = false;
 

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>
          <ImSpinner9
            className="animate-spin text-blue-500 hover:text-blue-800"
            size={50}
          />
        </p>
        <span>Please wait...</span>
      </div>
    );
  }

  return (
    <div>
      {/* my own component starts here */}
      <div className="md:grid grid-cols-5">
        {/* initial lists */}
        {showListOfBusiness && (
          <div className="bg-blue-900 text-white p-6 h-screen overflow-y-scroll md:col-span-2 md: pb-20">
            <h2 className="text-2xl font-bold mb-4">
              click to chat with business owners{" "}
            </h2>
            <ul className="list-none p-0">
              {conversationOnPage.map((item, index) => (
                <li
                key={index}
                onClick={() => {
                  setShowMessageBox(true);
                  getMessagesInConversation(item._id);
                  hideTheListOnMobile();
                }}
                  className="bg-blue-700 p-4 mb-2 rounded cursor-pointer my-2 transform transition duration-300 hover:bg-blue-500 hover:scale-5">
                  {item.members[1].name}
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
        {hideMessageComponent && conversationOnPage && (
          <MessageArea
          handleSubmit={handleSubmit}
          value={value}
          handleMessageChange={handleMessageChange}
          messageLoading={messageLoading}
          conversationOnPage={conversationOnPage}
         setMessageComponent={setMessageComponent}
         setShowListOfBusiness={setShowListOfBusiness}
         conversationInChat={conversationInChat}
         senderId={senderId}
       />
    
        )}

       
      </div>
      {/* ends here  */}

      {/* i dun hide your component for here */}
      {daisyComponent && (
        <div className="flex flex-col mb-[3rem] md:flex-row h-[80vh]">
          <div
            className={`md:w-1/3 bg-white ${
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
                  name={item.members[1].name}
                  src="https://cdn-icons-png.freepik.com/512/3177/3177440.png"
                />
                <h1 className="text-black capitalize hover:text-white ml-4">
                  {item.members[1].name}
                </h1>
              </div>
            ))}
          </div>
          <div className="md:w-2/3 flex-1 bg-white">
            {!showMessageBox && (
              <center className="flex items-center justify-center h-full py-4 px-4 w-full">
                <h1>
                  Click on a message to start or continue your conversation
                </h1>
              </center>
            )}

            {showMessageBox && (
              <div className="bg-white w-full mb-[3rem] chat-container h-full  px-2 py-4 relative">
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
                <div className="flex gap-4 fixed bottom-[2px] w-[93%] md:w-[42%] xl:w-[1/2] lg:w-[48%] items-center right-3">
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
                    {messageLoading ? (
                      <Spinner color="red.500" size="xs" />
                    ) : (
                      "Send"
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Messages;
