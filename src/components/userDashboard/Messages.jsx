import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

function Messages() {
  const { authToken } = useContext(AuthContext);
  const [message, setMessage] = useState([]);
  const [message1, setMessage1] = useState([]);
  // console.log(authToken);
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
        setMessage(conversation.data);
        // console.log(conversation.data)
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    if (authToken) {
      fetchData();
    }
  }, [authToken]);
  const [id, setId] = useState("6662213209694e310e5825a9");
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
        setMessage1(conversation.data);
        console.log(conversation.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, [authToken, id]);

  // fetchData();
  //  },[])

  const [showMessage, setShowMessage] = useState(false);
  // const [messageInChatBox, setMessageInChatBox] = useState([]);
  // console.log(messageInChatBox);
  const handleSHowMessageBox = (userId) => {
    // Find the conversation in message1 that matches the clicked conversation
    const foundConversation = message1.find(
      (item) => item.conversationId === userId._id
    );

    // If a matching conversation is found, update the id state
    if (foundConversation) {
      setId(foundConversation.conversationId);
      setShowMessage(true);
      console.log("found"); // Assuming conversationId is the unique identifier
    } else {
      // console.log("not found");
      setShowMessage(true);
      console.log(userId._id);
      setId(userId._id);
    }
  };

  return (
    <div className="py-10 flex items-top justify-between">
      <div className="grid gap-4 ">
        {message?.map((item) => {
          return (
            <div
              key={item._id}
              className="gap-8 px-10 cursor-pointer"
              onClick={() => {
                handleSHowMessageBox(item);
              }}>
              <div className="">
                <h1>{item._id}</h1>
              </div>
            </div>
          );
        })}
      </div>

      <div className="p-5 m-5 border w-full">
        {showMessage ? (
          <div className="col-span-3 px-4 py-10 border w-full">
            <div className="bg-white p-6 rounded-lg shadow-md">
              {/* <div className="flex justify-end">
                <h1>send</h1>
              </div>

              <div className="flex justify-start mb-4">
                <h1>receive</h1>
              </div> */}
              
             <div className="grid grid-cols-2 items-center justify-between"> {message1?.map((item) => {
                return (
                  <div key={item._id} className="grid grid-cols-2">
                    {item.message}
                  </div>
                );
              })}</div> 

              <div className="mt-5">
                <textarea
                  rows="2"
                  className="w-full border-b border-gray-300 outline-none resize-none p-2"
                  placeholder="Type a message..."></textarea>
              </div>
              <div className="flex justify-end space-x-2">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
                  Send
                </button>
              </div>
            </div>
          </div>
        ) : (
          <h1>click on a message to start a conversation</h1>
        )}
      </div>

      {/* <div className="col-span-3 px-4 py-10 border w-full">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="mb-4">

                {messageInChatBox?.map((item)=>{
                    return<div key={item.id}>

                        <h1> {item.sender} </h1>
                        <h1> {item.message} </h1>

                    </div>
                })}
                <textarea
                  rows="2"
                  className="w-full border-b border-gray-300 outline-none resize-none p-2"
                  placeholder="Type a message..."></textarea>
              </div>
              <div className="flex justify-end space-x-2">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
                  Send
                </button>
              </div>
            </div>
          </div> */}
    </div>
  );
}

export default Messages;
