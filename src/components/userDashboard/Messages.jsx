import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

function Messages() {
  const { authToken } = useContext(AuthContext);
  const [message, setMessage] = useState([]);
  
//   console.log(message);
  const [message1, setMessage1] = useState([]);
//   console.log(message1);
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
        console.log(conversation.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    if (authToken) {
      fetchData();
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const conversation = await axios.get(
          "https://axelonepostfeature.onrender.com/api/messages/6661660abbf6bfe8f6234c41",
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
              Accept: "application/json",
            },
          }
        );
        console.log(conversation.data);
        setMessage1(conversation.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    if (authToken) {
      fetchData();
    }
  }, []);

//   const [showChat, setSHowChat] = useState(false);


  const [showMessage, setShowMessage] = useState(false);
  const [messageInChatBox, setMessageInChatBox] = useState({});
  console.log(messageInChatBox);
//   console.log(messageInChatBox)
  const handleSHowMessageBox = (eachUserId) => {
    // setShowMessage=message.find((item)=>item.id==id)
    const messageInTheChat = message1.find(
      (message) => message._id == eachUserId._id
    );
    setShowMessage(true);
    setMessageInChatBox(messageInTheChat)
    console.log(messageInTheChat);

  };
  return (
    <div className="py-10 flex items-top justify-between">
      <div className="gap-4 grid">
        {/* {message?.map((item)=>{
    return <div className="grid grid-cols-5">
       <div className="col-span-2">
       <h1>{item._id}</h1>
        <h1> {item.members.join("")} </h1>
        <h1> {item.updatedAt} </h1>
       </div>



        <div class="px-4 py-10 border col-span-3">
        <div class="bg-white p-6 rounded-lg shadow-md">
            <div class="mb-4">
                <textarea rows="2" className="w-full border-b border-gray-300 outline-none resize-none p-2" placeholder="Type a message..."></textarea>
            </div>
            <div class="flex justify-end space-x-2">
                <button class="bg-blue-600 text-white px-4 py-2 rounded-lg">Send</button>
            </div>
        </div>
    </div>
        
    </div>
})} */}
        {message?.map((item) => {
          return (
            <div
              className="gap-8 px-10"
              onClick={() => {
                handleSHowMessageBox(item);
              }}>
              <div className="" key={item._id}>
                <h1>{item._id}</h1>
                <h1>{item.members}</h1>
                <h1>{item.updatedAt}</h1>
              </div>
            </div>
          );
        })}
      </div>

      <div className="p-5 m-5 border w-full">
        {showMessage ? (
          <div className="col-span-3 px-4 py-10 border w-full">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="mb-4">
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
