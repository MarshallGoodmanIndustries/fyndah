import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

function Messages() {
  const { authToken } = useContext(AuthContext);
  const [message, setMessage] = useState([]);
  const [message1, setMessage1] = useState([]);
  

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
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    if (authToken) {
      fetchData();
    }
  }, [authToken]);

  // fetch message data specific to ids
  const fetchData = async (id) => {
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
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };
      
  

  // const [showMessage, setShowMessage] = useState(false);
  // const [messageInChatBox, setMessageInChatBox] = useState([]);
  // console.log(messageInChatBox);

  const handleSHowMessageBox = (userId) => {
    fetchData(userId);
    //perform comparison operation below
    // message1.find()
    
    // setShowMessage(true);
  };

  return (
    <div className="py-10 flex items-top justify-between">
      <div className="gap-4 grid">
      
        {message?.map((item) => {
          return (
            <div key={item._id}
            className="gap-8 px-10 cursor-pointer"
              onClick={() => {
                handleSHowMessageBox(item._id);
              }}>
              <div className="" >
                <h1>{item._id}</h1>
                {/* <h1>{item.members}</h1>
                <h1>{item.updatedAt}</h1> */}
              </div>
            </div>
          );
        })}
      </div>

      {/* <div className="p-5 m-5 border w-full">
        {showMessage ? (
          <div className="col-span-3 px-4 py-10 border w-full">
            <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex justify-end">
                <h1 >send</h1>
        


                </div>

                <div className="flex justify-start mb-4">
                <h1>receive</h1>
                </div>

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
      </div> */}

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
