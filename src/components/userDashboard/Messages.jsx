import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { FiArrowLeft } from "react-icons/fi";

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
  const [hideUsers, setHideUsers] = useState(true);
  const [showMessage, setShowMessage] = useState(false);
  const handleSHowMessageBox = (userId) => {
    // Find the conversation in message1 that matches the clicked conversation
    const foundConversation = message1.find(
      (item) => item.conversationId === userId._id
    );
    setHideUsers(false);
    // If a matching conversation is found or not, update the id state
    if (foundConversation) {
      setId(foundConversation.conversationId);
      setShowMessage(true);
      console.log("found");
    } else {
      setShowMessage(true);
      setId(userId._id);
    }
  };

  return (
    <div className="py-10  flex items-top justify-between grid px-5">
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
              <div className="items-center justify-between">
                {message1?.map((item) => (
                  <div
                    key={item._id}
                    className="flex justify-end flex-auto min-h-[50px]">
                    {item.message}
                  </div>
                ))}
              </div>
              <div className="mt-5 overflow-y-auto ">
                <textarea
                  rows="1"
                  className="w-full border-b outline-none resize-none p-2"
                  placeholder="Type a message..."></textarea>
              </div>
              <div className="flex justify-end space-x-2">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg m-2">
                  Send
                </button>
              </div>
            </div>
          </div>
        ) : (
          <h1 className="mb-4 text-2xl font-bold">
            Click on a message to start a conversation
          </h1>
        )}
      </div>
      <div className="grid gap-4 col-span-2">
        {hideUsers
          ? message.map((item) => (
              <div
                key={item._id}
                className="gap-8 px-10 flex flex-auto min-h-[50px]">
                <div className="flex-shrink-0">
                  <h1
                    className=" cursor-pointer"
                    onClick={() => {
                      handleSHowMessageBox(item);
                    }}>
                    {item._id}
                  </h1>
                </div>
              </div>
            ))
          : null}
      </div>
    </div>

    // <div className="py-10  px-5 flex items-top justify-between grid grid-cols-5">
    //   <div className="grid gap-4 col-span-2">
    //     {message?.map((item) => {
    //       return (
    //         <div
    //           key={item._id}
    //           className="gap-8 px-10 cursor-pointer"
    //           onClick={() => {
    //             handleSHowMessageBox(item);
    //           }}>
    //           <div className="">
    //             <h1>{item._id}</h1>
    //           </div>
    //         </div>
    //       );
    //     })}
    //   </div>

    //   <div className="p-5 m-5 border w-full col-span-3">
    //     {showMessage ? (
    //       <div className="col-span-3 px-4 py-10 border w-full">
    //         <div className="bg-white p-6 rounded-lg shadow-md">

    //          <div className="items-center justify-between"> {message1?.map((item) => {
    //             return (
    //               <div key={item._id} className="flex justify-end">
    //                 {item.message}
    //               </div>
    //             );
    //           })}</div>

    //           <div className="mt-5">
    //             <textarea
    //               rows="2"
    //               className="w-full border-b border-gray-300 outline-none resize-none p-2"
    //               placeholder="Type a message..."></textarea>
    //           </div>
    //           <div className="flex justify-end space-x-2">
    //             <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
    //               Send
    //             </button>
    //           </div>
    //         </div>
    //       </div>
    //     ) : (
    //       <h1>click on a message to start a conversation</h1>
    //     )}
    //   </div>

    // </div>
  );
}

export default Messages;
