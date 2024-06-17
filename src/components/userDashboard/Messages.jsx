import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { FiArrowLeft } from "react-icons/fi";
import Swal from "sweetalert2";

function Messages() {
  // Initial conversation data for demonstration purposes
  const myConversation = [
    {
      members: [
        {
          id: "58",
          name: "Daisy",
        },
        {
          id: "9",
          name: "Quwam business",
        },
      ],
      updatedAt: "2024-06-05T07:22:42.308Z",
      __v: 0,
      _id: "666912492e1cf13b6d8d8935",
    },
    {
      members: [
        {
          id: "58",
          name: "Marvell",
        },
        {
          id: "9",
          name: "Oscar business",
        },
      ],
      updatedAt: "2024-06-05T07:22:42.308Z",
      __v: 0,
      _id: "66678910",
    },
  ];

  // State for conversations and UI control
  const [conversationOnPage, setConversationOnPage] = useState(myConversation);
  const [showMessageBox, setShowMessageBox] = useState(false);
  const [showListOfBusiness, setShowListOfBusiness] = useState(true);
  const [allConversations, setAllConversations] = useState([]);
  const [conversationInChat, setConversationInChat] = useState([]);
  const [id, setId] = useState("");
  const [prevMessages, setPrevMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hideUsers, setHideUsers] = useState(true);
  const [showMessage, setShowMessage] = useState(false);
  const [value, setValue] = useState("");

  // Context values
  const { userData, authToken } = useContext(AuthContext);

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
          Swal.fire({
            icon: "success",
            title: "Successful...",
            text: "Profile updated successfully",
            timer: 2000,
            timerProgressBar: true,
          });

          setAllConversations(response.data);
          console.log(response.data);
        } else {
          throw new Error("Getting all messages failed");
        }
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    if (authToken) {
      fetchData();
    }
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
        setHideUsers(false);
        setShowMessage(true);
        console.log(response.data);
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
          setValue("");
          setPrevMessages((prev) => [...prev, value]);
          console.log("Message sent", response.data);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  console.log("The id", id);

  return (
    <div className="py-10 items-top grid gap-4 justify-between px-5 md:grid md:grid-cols-5">
      <div className="md:col-span-3 md:order-2">
        {!showMessageBox && (
          <center className="border flex items-center justify-center h-full py-4 px-4 w-full">
            <h1>Click on a message to start or continue your conversation</h1>
          </center>
        )}

        {showMessageBox && (
          <div className="bg-white border px-2 py-4 relative">
            <FiArrowLeft
              className="font-bold absolute top-0 left-0 mt-1 ml-1 cursor-pointer"
              onClick={() => {
                setShowListOfBusiness(true);
                setShowMessageBox(false);
              }}
            />
            <div className="grid mt-4">
              <textarea
                className="p-2 w-full border border-blue-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="1"
                placeholder="Type your message here..."
                value={value}
                onChange={handleMessageChange}
              />
              <div className="flex justify-end">
                <button
                  className="mt-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition"
                  onClick={handleSubmit}>
                  Send
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {showListOfBusiness && (
        <div className="grid border md:grid gap-4 col-span-2 md:order-1 px-4 py-4">
          {conversationOnPage.map((item, index) => (
            <div
              key={index}
              onClick={() => {
                setShowMessageBox(true);
                hideTheListOnMobile();
              }}
              className="border-2 border-blue-500 rounded-lg cursor-pointer p-4 shadow-md hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300 ease-in-out"
              style={{
                boxShadow:
                  "0 14px 16px rgba(05, 0, 255, 0.1), 0 10px 15px rgba(255, 255, 255, 0.2), 0 20px 25px rgba(255, 255, 255, 0.1)",
              }}>
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
