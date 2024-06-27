// import React from 'react'
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
// import { FiArrowLeft } from "react-icons/fi";
import { Avatar, Input, InputGroup, InputLeftElement, } from "@chakra-ui/react";
import { ImSpinner9 } from "react-icons/im";
import { io } from "socket.io-client";
import MessageArea from "./MessageArea";
import { FiSearch } from "react-icons/fi";
import { format, isYesterday, isToday, } from 'date-fns';
import { Link } from "react-router-dom";
import { FaArchive } from "react-icons/fa";
import ArchivedMessagesArea from "./ArchivedMessagesArea";

function ArchivedMessage() {
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

    // testing dummy data
    const [data, setData] = useState([])
    const [dataBizz, setDataBizz] = useState([])




    // Hide the message list on mobile screens
    const hideTheListOnMobile = () => {
        if (window.innerWidth < 1000) {
            setShowListOfBusiness(false);
        }
    };




    // Fetch conversations
    useEffect(() => {
        // dummy data

        setData([
            {
                id: 1,
                sender: "Alice",
                message: "Hello, Bob!",
                timestamp: "12:00 PM"
            },
            {
                id: 2,
                sender: "Bob",
                message: "Hi Alice How are you?",
                timestamp: "12:05 PM"
            },
            {
                id: 3,
                sender: "Alice",
                message: "I'm good, thanks How about you?",
                timestamp: "12:10 PM"
            },
            {
                id: 4,
                sender: "Bob",
                message: "Doing great Just finished a project.",
                timestamp: "12:15 PM"
            }
        ])
    }, [])

    useEffect(() => {
        // dummy data
        const conversationDataBack = [
            {
                sender: "Alice",
                message: "Hello, Bob!",
                timestamp: "12:00 PM"
            },
            {
                sender: "Bob",
                message: "Hi Alice How are you?",
                timestamp: "12:05 PM"
            },
            {
                sender: "Alice",
                message: "I'm good, thanks How about you?",
                timestamp: "12:10 PM"
            },
            {
                sender: "Bob",
                message: "Doing great Just finished a project.",
                timestamp: "12:15 PM"
            }
        ];

    }, [])
    // Fetch messages in a conversation
    const getMessagesInConversation = async () => {

    };

    const handleMessageChange = (e) => {
        setValue(e.target.value);

    };



    const handleSubmit = async (e) => {
        e.preventDefault();

    };



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
                        {data.length >= 1 && <>
                            <h2 className="text-[1.3rem] font-poppins font-bold mb-1">
                                Chats{" "}

                            </h2>
                            <h2 className="text-[0.9rem] font-poppins font-medium mb-[1rem] text-lightRed"> {filteredConversations.length} Messages, {totalUnreadConversations} Unread </h2></>}

                        <div className=" flex">
                            <div className="w-full flex justify-center">
                                <h3 className=" text-center font-semibold p-2">Archived</h3>
                            </div>
                            <button className="justify-end items-end bg-white p-2 shadow-md rounded-md text-orange-500">Edit</button>
                        </div>
                        <div className="flex items-center justify-center">
                            <h5 className="font-sm text-center p-6">
                                <hr className="border border-black" />
                                These chats stay archived when new messages are received.
                                chat here won display in your chat log.
                                <hr className="border border-black mb-3" />
                            </h5>
                        </div>





                        {data.length === 0 ? (
                            <p className="text-center">No archived chat yet...</p>
                        ) : (
                            <ul className="list-none p-0">
                                {data.map((item, index) => (
                                    <li
                                        key={index}
                                        onClick={() => {
                                            setShowMessageBox(true);
                                            // setReadReceipt();
                                            getMessagesInConversation(item.id);
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
                        <div>Click on any chat to to see conversations</div>
                    </div>
                )}
                {hideMessageComponent && conversationOnPage && (
                    <ArchivedMessagesArea
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


export default ArchivedMessage