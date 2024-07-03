/* eslint-disable react/no-unescaped-entities */
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { Avatar, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { ImSpinner9 } from "react-icons/im";
import { io } from "socket.io-client";
import MessageArea from "./MessageArea";
import { FiArrowLeft, FiSearch } from "react-icons/fi";
import { format, isYesterday, isToday } from "date-fns";
import { FaArchive } from "react-icons/fa";
import { Link, Navigate, useNavigate } from "react-router-dom";
import {
  Spinner,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
} from "@chakra-ui/react";
import { BsArrowLeftCircleFill } from "react-icons/bs";
import BusinessArchiveMessageArea from "./BusinessArchiveMessageArea";

function BusinessArchiveMessage() {
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
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredConversations, setFilteredConversations] = useState(
    conversationOnPage
  );
  const [rows, setRows] = useState(1);
  const [totalUnreadConversations, setTotalUnreadConversations] = useState("");
  const [selectedConversation, setSelectedConversation] = useState(null);
  const { authToken, businessMsgId, currentRoute } = useContext(AuthContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [unreadCounts, setUnreadCounts] = useState({});
  const [numberofArchiveChats, setNumberOfArchivedChats] = useState("");
  const [archiveChats, setArchivedChats] = useState([]);

  // Socket.IO instance
  const socket = io("https://axelonepostfeature.onrender.com", {
    query: { token: authToken },
    transports: ["websocket"], // Ensure we are using websockets
    reconnectionAttempts: 3, // Retry connecting 3 times
  });

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
          `https://axelonepostfeature.onrender.com/api/messages/org/archived-messages`,
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
          setReceiverId(theReceiverId);
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
  }, [authToken, businessMsgId]);

  // Fetch messages in a conversation
  const getMessagesInConversation = async (conversationId) => {
    try {
      // setLoading(true);
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

    const lineCount = e.target.value.split("\n").length;
    setRows(lineCount < 11 ? lineCount : 10);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (value.trim() !== "") {
      setMessageLoading(true);
      setValue("");

      try {
        const message = {
          senderId: businessMsgId,
          conversationId: id,
          message: value,
          createdAt: new Date().toISOString(),
        };

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

          const emitMessage = response.data.message;

          // Emit the new message event
          socket.emit("receiveMessage", { businessMsgId, emitMessage });
          console.log(" conversations in chat: ", conversationInChat);
          getMessagesInConversation(id);
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
    const socket = io("https://axelonepostfeature.onrender.com", {
      query: { token: authToken },
      transports: ["websocket"], // Ensure we are using websockets
      reconnectionAttempts: 3, // Retry connecting 3 times
    });

    console.log("Socket created:", socket);

    socket.on("connect", () => {
      console.log("Connected to the server");
      socket.emit("joinRoom", { conversationId: id });
    });

    socket.on("receiveMessage", (data) => {
      console.log("New message received:", data);
      // setConversationInChat(conversationInChat)
      getMessagesInConversation(id);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from the server");
    });

    socket.on("connect_error", (err) => {
      console.error("Connection Error:", err);
    });

    socket.on("error", (err) => {
      console.error("Error:", err);
    });

    return () => {
      console.log("Component Unmounted, disconnecting socket");
      socket.disconnect();
    };
  }, [authToken, id, conversationInChat]);

  console.log("businessMsgId: ", businessMsgId);

  //format timestamp
  const formatTimestamp = (timestamp) => {
    const messageTime = new Date(timestamp);

    if (isToday(messageTime)) {
      return format(messageTime, "p"); // Format as time, e.g., 5:30 PM
    } else if (isYesterday(messageTime)) {
      return "Yesterday";
    } else {
      return format(messageTime, "EEEE"); // Format as day of the week, e.g., 'Monday'
    }
  };

  //truncate message
  const truncateMessage = (message, maxLength) => {
    if (message.length <= maxLength) {
      return message;
    }
    return message.substring(0, maxLength) + "...";
  };

  console.log("id: ", id);

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
    const parts = text.split(new RegExp(`(${query})`, "gi"));
    return parts.map((part, index) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <span key={index} className="bg-yellow-300">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  // fetch unread messages for a user
  useEffect(() => {
    const getUnreadConversations = async () => {
      try {
        // setLoading(true);
        const response = await axios.get(
          `https://axelonepostfeature.onrender.com/api/messages/org/messages/unread`,
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

  const markAsRead = async (messageId) => {
    try {
      const response = await axios.post(
        `https://axelonepostfeature.onrender.com/api/messages/organization/messages/read`,
        {
          conversationId: [messageId],
          isRead: true,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      const isRead = true;

      if (response.status === 200) {
        console.log("Message marked as read");
        // Emit the read event
        socket.emit("messageRead", { messageId, isRead });
        // Update the conversationInChat state to reflect the message as read
        // setConversationInChat((prev) =>
        //   prev.map((msg) =>
        //     msg.id === messageId ? { ...msg, isReadByRecipient: true } : msg
        //   )
        // );
      }
    } catch (error) {
      console.error("Error marking message as read", error);
    }
  };

  const handleContextMenu = (event, message) => {
    event.preventDefault();
    setSelectedConversation(message);
    onOpen();
  };

  const handleDelete = async () => {
    try {
      console.log("Delete message with ID:", id);

      const response = await axios.delete(
        `https://axelonepostfeature.onrender.com/api/messages/delete/conversation/${id}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      console.log(response.data);

      if (response.status === 200) {
        // Optionally, update your local state to remove the deleted message from the UI
        setConversationOnPage(
          filteredConversations.filter((convo) => convo._id !== id)
        );
      }
    } catch (error) {
      console.error("There was an error deleting the conversation:", error);
    }

    onClose();
  };

  const handleTouchStart = (event, conversation) => {
    const touchStartTime = new Date().getTime();
    const handleTouchEnd = () => {
      const touchEndTime = new Date().getTime();
      if (touchEndTime - touchStartTime > 500) {
        setSelectedConversation(conversation);
        onOpen();
      }
      document.removeEventListener("touchend", handleTouchEnd);
    };
    document.addEventListener("touchend", handleTouchEnd);
  };

  const handleConversationClick = (item) => {
    setShowMessageBox(true);
    markAsRead(item._id);
    setUnreadCounts((prevCounts) => ({
      ...prevCounts,
      [item._id]: 0,
    }));
    getMessagesInConversation(item._id);
    hideTheListOnMobile();
  };

  useEffect(() => {
    // Initialize the unread counts state with data from the API
    const initialUnreadCounts = {};
    filteredConversations.forEach((item) => {
      initialUnreadCounts[item._id] = item.unreadCount;
    });
    setUnreadCounts(initialUnreadCounts);
  }, [filteredConversations]);

  const handleToggleArchive = async () => {
    try {
      console.log("unarchiving message with ID:", id);

      const response = await axios.post(
        `https://axelonepostfeature.onrender.com/api/messages/org/${id}/toggle-archive`,
        {}, // This is the data parameter, which is empty in this case
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      console.log(" Unarchive conversation successful: ", response.data);

      if (response.status === 200) {
        // update local state to remove the deleted message from the UI
        setConversationOnPage(
          filteredConversations.filter((convo) => convo._id !== id)
        );
      }
    } catch (error) {
      console.error("There was an error archiving the conversation:", error);
    }

    onClose();
  };

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

  console.log("current route, ", currentRoute);

  return (
    <div>
      <div className="lg:grid  font-roboto lg:grid-cols-5">
        {/* initial lists */}
        {showListOfBusiness && (
          <div className="bg-conversation-area text-slate-800 p-6 h-screen overflow-y-scroll lg:col-span-2 pb-20">
            <a href={currentRoute}>
              <BsArrowLeftCircleFill className="text-gray-600 mb-1 font-bold text-xl block" />
            </a>
            {filteredConversations.length >= 1 && (
              <>
                <h2 className="text-[1.3rem] font-poppins font-bold mb-1">
                  Archived Chats{" "}
                </h2>
                <h2 className="text-[0.9rem] font-poppins font-medium mb-[1rem] text-lightRed">
                  {" "}
                  {filteredConversations.length} Messages,{" "}
                  {totalUnreadConversations} Unread{" "}
                </h2>

                <InputGroup className="mb-[1rem]">
                  <InputLeftElement pointerEvents="none">
                    <FiSearch color="gray.300" />
                  </InputLeftElement>
                  <Input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    background="gray.200"
                    variant="filled"
                    type="text"
                    placeholder="Search conversations"
                  />
                </InputGroup>
              </>
            )}

            {filteredConversations.length === 0 ? (
              <p className="text-center">No archived chat yet.</p>
            ) : (
              <ul className="list-none p-0">
                {filteredConversations.map((item, index) => (
                  <li
                    key={index}
                    onClick={() => handleConversationClick(item)}
                    onContextMenu={(event) =>
                      handleContextMenu(event, item._id)
                    }
                    onTouchStart={(event) => handleTouchStart(event, item._id)}
                    className={` relative shadow-xl border-2 w-full flex gap-3 items-center p-4 rounded cursor-pointer transform transition duration-300 hover:bg-gray-300 ${
                      id === item._id ? "bg-gray-300" : "bg-white"
                    }`}
                  >
                    <Avatar src={item.members[1].logo} size="sm" />
                    <div className="flex w-full flex-col gap-1">
                      <div className="flex w-full justify-between">
                        <p className="font-medium text-[1.1rem]">
                          {" "}
                          {highlightText(
                            item.members[1].name,
                            searchQuery
                          )}{" "}
                        </p>
                        <span className="text-[10px]">
                          {item.lastMessage
                            ? formatTimestamp(item.lastMessage.createdAt)
                            : ""}
                        </span>
                      </div>
                      <div className="flex w-full items-center justify-between">
                        <p className="text-[16px]">
                          {item.lastMessage
                            ? truncateMessage(item.lastMessage.message, 45)
                            : ""}
                        </p>
                        {unreadCounts[item._id] > 0 && (
                          <p className="text-white rounded-full bg-lightRed px-2 py-1 text-[11px]">
                            {unreadCounts[item._id]}
                          </p>
                        )}
                      </div>
                    </div>
                    {isOpen && selectedConversation === item._id && (
                      <div className="absolute z-50 top-0 left-0">
                        <Menu isOpen={isOpen} onClose={onClose}>
                          <MenuButton as="div" />
                          <MenuList background="black">
                            <MenuItem
                              className="text-[0.8rem]"
                              background="black"
                              color="white"
                              onClick={handleDelete}
                            >
                              Delete Conversation
                            </MenuItem>
                            <MenuItem
                              className="text-[0.8rem]"
                              background="black"
                              color="white"
                              onClick={handleToggleArchive}
                            >
                              Unarchive Conversation
                            </MenuItem>
                          </MenuList>
                        </Menu>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* message component */}
        {!hideMessageComponent && (
          <div className="hidden lg:flex bg-message-area items-center justify-center h-screen col-span-3">
            <div>
              These chats stay archived when new messages are received. Chats
              here won't display in your chat log.
            </div>
          </div>
        )}
        {hideMessageComponent && conversationOnPage && (
          <BusinessArchiveMessageArea
            setConversationInChat={setConversationInChat}
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

export default BusinessArchiveMessage;
