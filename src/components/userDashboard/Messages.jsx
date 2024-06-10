

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { FiArrowLeft } from "react-icons/fi";
import {ImSpinner9} from "react-icons/im"
import Swal from "sweetalert2";
function Messages() {
  const { userData } = useContext(AuthContext);
  const { authToken } = useContext(AuthContext);
// console.log(userData);
  const [allConversations, setAllConversations] = useState([]);
  const [conversationInChat, setConversationInChat] = useState([]);

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

          const messageresponse = response.data
          setAllConversations(messageresponse)

          console.log(messageresponse)
          // console.log("Form submitted", response.data);
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
        // Swal.fire({
        //   icon: "success",
        //   title: "Successful...",
        //   text: "Profile updated successfully",
        //   timer: 2000,
        //   timerProgressBar: true,
        // });

        const messageresponse = response.data
        setConversationInChat(messageresponse)

        console.log(messageresponse)
        // console.log("Form submitted", response.data);
      } else {
        throw new Error("Getting messages in a converstaion failed");
      }
    } catch (error) {
      console.error("Error fetching data", error);
    }

  }

  // const [id, setId] = useState("");
  // const [prevMessages, setPrevMessages] = useState([]);
  // const [loading, setLoading] = useState(false);
  // const [hideUsers, setHideUsers] = useState(true);
  // const [showMessage, setShowMessage] = useState(false);
  // const [value, setValue] = useState("");

  // useEffect(() => {
  //   const fetchData = async () => {
  //     setLoading(true);
  //     try {
  //       const conversation = await axios.get(
  //         `https://axelonepostfeature.onrender.com/api/messages/${id}`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${authToken}`,
  //             Accept: "application/json",
  //           },
  //         }
  //       );
  //       setConversationInChat(conversation.data);
  //       // console.log(conversation);
  //       const gottenMessage = conversation.data.map((item) => item.message);
  //       setPrevMessages(gottenMessage);
  //       setLoading(false);
  //     } catch (error) {
  //       console.error("Error fetching data", error);
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, [authToken, id]);

  // const handleShowMessageBox = (userId) => {
  
  //   console.log(conversationId)

  //   const foundConversation = conversationInChat.find(
  //     (item) => item.conversationId === userId._id
  //   );
  //   setHideUsers(false);
  //   if (foundConversation) {
  //       console.log(foundConversation.conversationId);
  //     setId(foundConversation.conversationId);
  //     setShowMessage(true);
  //     console.log("new message is found");

  //   } else {
  //     setShowMessage(true);
  //     setId(userId._id);
  //   }
  // };

//   const handleMessageChange = (e) => {
//     setValue(e.target.value);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (value.trim() !== "") {
//       try {
//         const response = await axios.post(
//           `https://axelonepostfeature.onrender.com/api/messages/send-message/${id}`,
//           { message: value },
//           {
//             headers: {
//               Authorization: `Bearer ${authToken}`,
//               Accept: "application/json",
//             },
//           }
//         );
//         // i dey hear una , i dun turn ghost god punish u
//         setPrevMessages((prev) => [...prev, value]);
//         if (response.status === 200) {
//           setValue("");
//         }
//       } catch (error) {
//         console.error(error);
//       }
//     }
//   };

  return (
    <div className="py-10 items-top justify-between px-5">
      <div>
        {allConversations.map((conversation, index) => (
          <div onClick={() => getMessagesInConversation(conversation._id)} key={index}> {conversation.members[1].name} </div>
        ))}
      </div>
      {/* <div className="col-span-5 relative">
        {showMessage ? (
          <h1
            className="absolute t-0 pl-2 pt-2 cursor-pointer"
            onClick={() => {
              setShowMessage(false);
              setHideUsers(true);
            }}>
            <FiArrowLeft />
          </h1>
        ) : null}
        {showMessage ? (
          <div className="py-10 p-5 border w-full">
            <div className="bg-white rounded-lg shadow-md">
              <div className="items-center justify-between p-5">
                

                {prevMessages.length>0? prevMessages.map((item,index)=> {
                    return <h4 className="mb-2 font-semibold" key={index}>  {item} </h4>
                }): <b> no message yet start writing a message </b> }
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
          <center>
            <h1 className="mb-4 text-2xl font-bold">
              Click on a message to start a conversation
            </h1>
            {loading &&  <ImSpinner9 className="h-10 w-10 text-gray-500 animate-spin text-center"/>}
          </center>
        )}
      </div> */}
      {/* <div className="grid gap-4">
        {hideUsers &&
          allConversations.map((item) => (
            <div
              key={item._id}
              className="gap-8 px-10 flex flex-auto min-h-[50px] rounded-lg border w-full border-2">
              <div className="flex-shrink-0">
                <h1
                  className="cursor-pointer p-5"
                  onClick={() => {
                    handleShowMessageBox(item);
                  }}> 
                  {item.members[0].name}
                </h1>
                {item._id}
              </div>
            </div>
          ))}
      </div> */}
    </div>
  );
}

export default Messages;
