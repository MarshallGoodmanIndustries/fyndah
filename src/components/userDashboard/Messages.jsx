import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { FiArrowLeft } from "react-icons/fi";
import { Avatar, Input, InputGroup, InputLeftElement, Spinner } from "@chakra-ui/react";
import { ImSpinner9 } from "react-icons/im";
import { io } from "socket.io-client";
import MessageArea from "./MessageArea";
import { FiSearch } from "react-icons/fi";
import { format, isYesterday, isToday, differenceInHours } from 'date-fns';
import { FaArchive } from "react-icons/fa";
import { Link } from "react-router-dom";

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
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredConversations, setFilteredConversations] = useState(conversationOnPage);
  const [rows, setRows] = useState(1);
  const [totalUnreadConversations, setTotalUnreadConversations] = useState("")
  const { authToken, userMsgId } = useContext(AuthContext);


  // Hide the message list on mobile screens
  const hideTheListOnMobile = () => {
    if (window.innerWidth < 1000) {
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

    const lineCount = e.target.value.split('\n').length;
    setRows(lineCount < 11 ? lineCount : 10);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (value.trim() !== "") {
      setMessageLoading(true);
      setValue("");

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


    console.log("Creating socket with token:");
    const socket = io('https://axelonepostfeature.onrender.com', {
      query: { token: authToken },
      transports: ['websocket'], // Ensure we are using websockets
      reconnectionAttempts: 3, // Retry connecting 3 times
    });

    console.log("Socket created:", socket);

    socket.on("connect", () => {
      console.log("Connected to the server");
      socket.emit("joinRoom", { conversationId: id });
    });

    socket.on("new_message", async (data) => {
      console.log("New message received:", data);
      if (data.conversationId === id) {
        await getMessagesInConversation(id); // Fetch new messages on receiving a new message
      }
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
  }, [authToken, id]);

  console.log("usermgid: ", userMsgId)

  //format timestamp
  const formatTimestamp = (timestamp) => {
    const messageTime = new Date(timestamp);

    if (isToday(messageTime)) {
      return format(messageTime, 'p'); // Format as time, e.g., 5:30 PM
    } else if (isYesterday(messageTime)) {
      return 'Yesterday';
    } else {
      return format(messageTime, 'EEEE'); // Format as day of the week, e.g., 'Monday'
    }
  };


  //truncate message
  const truncateMessage = (message, maxLength) => {
    if (message.length <= maxLength) {
      return message;
    }
    return message.substring(0, maxLength) + '...';
  };

  console.log("id: ", id)

  //search functionality 
  useEffect(() => {
    // Filter conversations based on the search query
    setFilteredConversations(
      conversationOnPage.filter((item) =>
        item.members[1].name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, conversationOnPage]);

  // Function to highlight search query in the text
  const highlightText = (text, query) => {
    if (!query) return text;
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, index) =>
      part.toLowerCase() === query.toLowerCase() ? <span key={index} className="bg-yellow-300">{part}</span> : part
    );
  };

  // fetch unread messages for a user
  useEffect(() => {
    const getUnreadConversations = async () => {
      try {
        // setLoading(true);
        const response = await axios.get(
          `https://axelonepostfeature.onrender.com/api/messages/user/messages/unread`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        if (response.status === 200) {
          setTotalUnreadConversations(response.data.totalUnreadConversations);
          console.log("response: ", response.data);
          // setLoading(false);
        } else {
          // setLoading(false);
          throw new Error("Getting Total Unread Conversations failed");
        }
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    getUnreadConversations();
  }, [authToken]);

  // const setReadReceipt = async () => {
  //   try {
  //     const response = await axios.post(
  //       `https://axelonepostfeature.onrender.com/api/messages/user/messages/read`,
  //       {
  //         messageIds : [userMsgId],
  //         isRead: true
  //     },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${authToken}`,
  //         },
  //       }
  //     );

  //     if (response.status === 200) {
  //       console.log("Read receipt set", response.data);
  //     }

  //   } catch (error) {
  //     console.error(error)
  //   }
  // }

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
      <div className="lg:grid font-roboto lg:grid-cols-5">
        {/* initial lists */}
        {showListOfBusiness && (
          <div className="bg-conversation-area text-slate-800 p-6 h-screen overflow-y-scroll lg:col-span-2 pb-20">
            {filteredConversations.length >= 1 && <>
              <h2 className="text-[1.3rem] font-poppins font-bold mb-1">
                Chats{" "}

              </h2>
              <h2 className="text-[0.9rem] font-poppins font-medium mb-[1rem] text-lightRed"> {filteredConversations.length} Messages, {totalUnreadConversations} Unread </h2></>}

            <InputGroup className="mb-[1rem]">
              <InputLeftElement pointerEvents='none'>
                <FiSearch color='gray.300' />
              </InputLeftElement>
              <Input value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)} background='gray.200' variant='filled' type='text' placeholder='Search conversations' />
              <div className="p-2">
                <Link to='archived-messages'>
                  <span className='relative'>
                    <FaArchive
                      className=""
                      color="red"
                      size={25}
                    />
                    <p className="absolute top-[-7px] left-3 text-white rounded-full bg-lightRed px-1 text-[11px]">
                      0
                    </p>
                  </span>
                </Link>
              </div>




            </InputGroup>
            {filteredConversations.length === 0 ? (
              <p className="text-center">No conversations available at the moment. Go to the Feeds and message a business to initiate a conversation.</p>
            ) : (
              <ul className="list-none p-0">
                {filteredConversations.map((item, index) => (
                  <li
                    key={index}
                    onClick={() => {
                      setShowMessageBox(true);
                      // setReadReceipt();
                      getMessagesInConversation(item._id);
                      hideTheListOnMobile();
                    }}
                    className={`bg-white shadow-xl border-2 w-full flex gap-3 items-center p-4 rounded cursor-pointer transform transition duration-300 hover:bg-gray-300 ${id === item._id ? 'bg-gray-200' : ''
                      }`}
                  >
                    <Avatar src={item.members[1].logo} size="sm" />
                    <div className="flex w-full flex-col gap-1">
                      <div className="flex w-full justify-between">
                        <p className="font-medium text-[1rem]"> {highlightText(item.members[1].name, searchQuery)} </p>
                        <span className="text-[10px]">{formatTimestamp(item.lastMessage.createdAt)}</span>
                      </div>
                      <div className="flex w-full items-center justify-between">
                        <p className="text-[15px]">{truncateMessage(item.lastMessage.message, 45)}</p>
                        {item.unreadCount > 0 && (
                          <p className="text-white rounded-full bg-lightRed px-2 py-1 text-[11px]">
                            {item.unreadCount}
                          </p>
                        )}
                      </div>

                    </div>

                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* message component */}
        {!hideMessageComponent && (
          <div className="hidden lg:flex bg-message-area items-center justify-center h-screen col-span-3">
            <div>Click on any chat to start a Conversation</div>
          </div>
        )}
        {hideMessageComponent && conversationOnPage && (
          <MessageArea
            rows={rows}
            handleSubmit={handleSubmit}
            value={value}
            handleMessageChange={handleMessageChange}
            messageLoading={messageLoading}
            conversationOnPage={conversationInChat}
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
