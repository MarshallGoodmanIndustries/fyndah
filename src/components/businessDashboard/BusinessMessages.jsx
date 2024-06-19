import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { FiArrowLeft } from "react-icons/fi";
import { Spinner } from '@chakra-ui/react'

function Messages() {
  // State for conversations and UI control
  const [conversationOnPage, setConversationOnPage] = useState([]);
  const [showMessageBox, setShowMessageBox] = useState(false);
  const [showListOfBusiness, setShowListOfBusiness] = useState(true);
  const [allConversations, setAllConversations] = useState([]);
  const [conversationInChat, setConversationInChat] = useState([]);
  const [id, setId] = useState("");
  const [senderId, setSenderId] = useState("");
  const [messageLoading, setMessageLoading] = useState(false)
  const [loading, setLoading] = useState(false);
  const [hideUsers, setHideUsers] = useState(true);
  const [showMessage, setShowMessage] = useState(false);
  const [value, setValue] = useState("");
  const [prevMessages, setPrevMessages] = useState([]);

  const { authToken, socket } = useContext(AuthContext);

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
        const response = await axios.get(
          "https://axelonepostfeature.onrender.com/api/conversations/myconversations",
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        if (response.status === 200) {
          setConversationOnPage(response.data);
          console.log("response: ", response.data);
        } else {
          throw new Error("Getting all messages failed");
        }
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, [authToken]);

  // Fetch messages in a conversation
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
        setSenderId(response.data[0].senderId)
        console.log("converstaions: ", response.data);
      } else {
        throw new Error("Getting messages in a conversation failed");
      }
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  useEffect(() => {
    if (!socket) return;

    // Listen for incoming messages
    socket.on("receiveMessage", (message) => {
      setConversationInChat((prev) => [...prev, message]);
    });

    // Cleanup on unmount
    return () => {
      socket.off("receiveMessage");
    };
  }, [socket]);

  const handleMessageChange = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessageLoading(true);
    if (value.trim() !== "") {
      try {
        const response = await axios.post(
          `https://axelonepostfeature.onrender.com/api/messages/send-message/${id}`,
          { message: value },
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        if (response.status === 200) {
          const message = response.data;
          setValue("");
          setPrevMessages((prev) => [...prev, value]);
          socket.emit("sendMessage", message);  // Emit message to socket server
          console.log("Message sent", response.data);
          setMessageLoading(false)
          // getMessagesInConversation()
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  console.log("The id", id);
  console.log("sender id: ", senderId)

  return (
    <div className="py-10 items-top grid gap-4 min-h-[93vh] justify-between px-5 md:grid md:grid-cols-5">
      <div className="md:col-span-3 md:order-2">
        {!showMessageBox && (
          <center className="border flex items-center justify-center h-full py-4 px-4 w-full">
            <h1>Click on a message to start or continue your conversation</h1>
          </center>
        )}

        {showMessageBox && (
          <div className="bg-white border w-full h-full px-2 py-4 relative">
            {conversationInChat && conversationInChat.length > 0 ? (
              <div>
                {conversationInChat.map((convo, index) => (
                  <div className={
                    convo.senderId === senderId
                      ? "message sent"
                      : "message received"
                  } key={index}>
                    {convo.message}
                  </div>
                ))}
              </div>
            ) : (
              <div>No conversations yet for a user</div>
            )}

            <FiArrowLeft
              className="font-bold absolute top-0 left-0 mt-1 ml-1 cursor-pointer"
              onClick={() => {
                setShowListOfBusiness(true);
                setShowMessageBox(false);
              }}
            />
            <div className="flex gap-4 absolute items-center w-[95%] bottom-[1rem] right-3 ">
              <textarea
                className="p-2 border w-full border-blue-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="1"
                placeholder="Type your message here..."
                value={value}
                onChange={handleMessageChange}
              />
                <button
                  className=" px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition"
                  onClick={handleSubmit}
                >
                  {messageLoading ? <Spinner color='red.500' size='xs' /> : "Send"}
                </button>
            </div>
          </div>
        )}
      </div>

      {showListOfBusiness && (
        <div className=" flex flex-col gap-[1rem] border h-full col-span-2 md:order-1 px-4 py-4">
          {conversationOnPage.map((item, index) => (
            <div
              key={index}
              onClick={() => {
                setShowMessageBox(true);
                getMessagesInConversation(item._id);
                hideTheListOnMobile();
              }}
              className="border-2 border-blue-500 h-[3rem] flex items-center cursor-pointer p-4 shadow-md hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300 ease-in-out"
              style={{
                boxShadow:
                  "0 14px 16px rgba(05, 0, 255, 0.1), 0 10px 15px rgba(255, 255, 255, 0.2), 0 20px 25px rgba(255, 255, 255, 0.1)",
              }}
            >
              <h1 className="text-black hover:text-white">
                {item.members[1].name}
              </h1>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Messages;
