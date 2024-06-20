import { useContext, useEffect, useState, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { FiArrowLeft } from "react-icons/fi";
import { Avatar, Spinner } from '@chakra-ui/react'
import { io } from "socket.io-client";

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
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = io("http://localhost:5173");
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

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
          }
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

  useEffect(() => {
    if (!socketRef.current) return;

    socketRef.current.on("receiveMessage", (message) => {
      setConversationInChat((prev) => [...prev, message]);
    });

    return () => {
      socketRef.current.off("receiveMessage");
    };
  }, []);

  const getMessagesInConversation = async (conversationId) => {
    try {
      const response = await axios.get(
        `https://axelonepostfeature.onrender.com/api/messages/${conversationId}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          }
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
            }
          }
        );

        if (response.status === 200) {
          socketRef.current.emit("sendMessage", message);
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

  console.log("the id: ", id)
  console.log("sender id: ", senderId)

  return (
    <div  className="flex flex-col md:flex-row h-[80vh]">
      <div className={`md:w-1/3 min-h-screen bg-gray-100 ${!showListOfBusiness && 'hidden md:block'}`}>
        <p className="text-lightRed mb-4 font-medium text-lg font-roboto p-4">Chats</p>
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
            }}
          >
            <Avatar size="sm" name={item.members[0].name} src="https://cdn-icons-png.freepik.com/512/3177/3177440.png" />
            <h1 className="text-black capitalize hover:text-white ml-4">
              {item.members[0].name}
            </h1>
          </div>
        ))}
      </div>
      <div className="md:w-2/3 w-full flex-1 bg-white">
        {!showMessageBox && (
          <center className="flex items-center justify-center h-full py-4 px-4 w-full">
            <h1>Click on a message to start or continue your conversation</h1>
          </center>
        )}

        {showMessageBox && (
          <div id="chatContainer" ref={chatContainerRef} className="bg-white w-full mb-[3rem]  chat-container h-full  px-2 py-4 relative">
            {conversationInChat && conversationInChat.length > 0 ? (
              <div>
                {conversationInChat.map((convo, index) => (
                  <div
                    className={
                      convo.senderId === senderId
                        ? "message sent"
                        : "message received"
                    }
                    key={index}
                  >
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
                onClick={handleSubmit}
              >
                {messageLoading ? <Spinner color="red.500" size="xs" /> : "Send"}
              </button>
            </div>
    </div>
  );
}

export default BusinessMessages;
