import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { FiArrowLeft } from "react-icons/fi";

function Messages() {
  const { authToken } = useContext(AuthContext);
  const [allConversations, setAllConversations] = useState([]);
  const [conversationInChat, setConversationInChat] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const conversation = await axios.get(
          "https://axelonepostfeature.onrender.com/api/conversations/myconversations",
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
              Accept: "application/json",
            },
          }
        );
        setAllConversations(conversation.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    if (authToken) {
      fetchData();
    }
  }, [authToken]);
  const [id, setId] = useState("6662213209694e310e5825a9");
  console.log(id);

  const [prevMessages, setPrevMessages] = useState([]);
  console.log(prevMessages);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const conversation = await axios.get(
          `https://axelonepostfeature.onrender.com/api/messages/${id}`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
              Accept: "application/json",
            },
          }
        );
        setConversationInChat(conversation.data);
        const gottenMessage = conversation.data.map((item) => item.message);
        setPrevMessages(gottenMessage);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, [authToken, id]);
  const [hideUsers, setHideUsers] = useState(true);
  const [showMessage, setShowMessage] = useState(false);
  const handleSHowMessageBox = (userId) => {
    // Find the conversation in message1 that matches the clicked conversation
    const foundConversation = conversationInChat.find(
      (item) => item.conversationId === userId._id
    );
    console.log(allConversations);
    setHideUsers(false);
    if (foundConversation) {
      setId(foundConversation.conversationId);
      setShowMessage(true);
    } else {
      setShowMessage(true);
      setId(userId._id);
    }
  };
  const [value, setValue] = useState("");
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
              Accept: "application/json",
            },
          }
        );
        setPrevMessages((prev) => [...prev, value]);
        if (response.status === 200) {
          console.log("Successfully sent");
          setValue("");
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="py-10 items-top justify-between px-5">
      <div className="col-span-5 relative">
        {showMessage ? (
          <h1
            className="absolute t-0 pl-2 pt-2"
            onClick={() => {
              setShowMessage(false);

             
            }}>
            {" "}
            <FiArrowLeft />{" "}
          </h1>
        ) : null}
        {showMessage ? (
          <div className="py-10 p-5 border w-full">
            <div className="bg-white rounded-lg shadow-md">
              <div className="items-center justify-between p-5">
                {prevMessages.map((item, index) => (
                  <div key={index}>
                    <h4> {item} </h4>
                  </div>
                ))}
                {/* {Message.map((text) => {
                  return <p> {text} </p>;
                })} */}
              </div>

              <form onSubmit={handleSubmit}>
                <div className="mt-5 overflow-y-auto ">
                  <textarea
                    type="text"
                    value={value}
                    onChange={handleMessageChange}
                    rows="1"
                    className="w-full border-b outline-none resize-none p-2"
                    placeholder="Type a message..."></textarea>
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg m-2">
                    Send
                  </button>
                </div>
              </form>
            </div>
          </div>
        ) : (
          <h1 className="mb-4 text-2xl font-bold">
            Click on a message to start a conversation
          </h1>
        )}
      </div>
      <div className="grid gap-4">
        {hideUsers
          ? allConversations.map((item) => (
              <div
                key={item._id}
                className="gap-8 px-10 flex flex-auto min-h-[50px] rounded-lg border w-full border-2">
                <div className="flex-shrink-0">
                  <h1
                    className=" cursor-pointer p-5 "
                    onClick={() => {
                      handleSHowMessageBox(item);
                    }}>
                    {item.members[1].name}
                  </h1>
                </div>
              </div>
            ))
          : null}
      </div>
    </div>

    

 

   
  );
}

export default Messages;
