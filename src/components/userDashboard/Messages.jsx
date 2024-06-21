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


  // useEffect(() => {
  //   const socket = io("https://axelonepostfeature.onrender.com", {
  //     query: {token : authToken}
  //   }) ;
  //   console.log("auth token", authToken)
  //   socket.on("connect", () => {
  //     console.log("connected")

  //     socket.emit("join", id)
  //   })
  //   socket.on("receiveMessage", (message) => {
  //     setConversationInChat((prev) => [...prev, message]);
  //     console.log("message received")
  //   })
  //   return () => {
  //     socket.disconnect()
  //   };
  // }, []); 

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
    </div>
  );
}

export default Messages;
