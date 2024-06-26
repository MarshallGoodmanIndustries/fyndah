

// import { Spinner } from "@chakra-ui/react";
// import { FiArrowLeft } from "react-icons/fi";
// import { format, isToday, isYesterday } from 'date-fns';
// import { IoSend, IoCheckmarkDoneSharp } from "react-icons/io5";
// import { useEffect, useRef } from "react";

// const MessageArea = ({
//   setMessageComponent,
//   setShowListOfBusiness,
//   conversationInChat,
//   senderId,
//   messageLoading,
//   handleSubmit,
//   value,
//   handleMessageChange,
//   rows,
// }) => {
//   const messageContainerRef = useRef(null);

//   useEffect(() => {
//     if (messageContainerRef.current) {
//       messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
//     }
//   }, [conversationInChat]);

//   const formatTimestamp = (timestamp) => {
//     const date = new Date(timestamp);
//     let hours = date.getHours();
//     const minutes = date.getMinutes().toString().padStart(2, "0");
//     const ampm = hours >= 12 ? "PM" : "AM";
//     hours = hours % 12;
//     hours = hours ? hours : 12;
//     return `${hours.toString().padStart(2, "0")}:${minutes} ${ampm}`;
//   };

//   const groupMessagesByDate = (messages) => {
//     return messages.reduce((groups, message) => {
//       const date = new Date(message.timestamp).toDateString();
//       if (!groups[date]) {
//         groups[date] = [];
//       }
//       groups[date].push(message);
//       return groups;
//     }, {});
//   };

//   const groupedMessages = groupMessagesByDate(conversationInChat);

//   const formatDateHeader = (dateString) => {
//     try {
//       const date = new Date(dateString);
//       if (isNaN(date.getTime())) throw new Error("Invalid Date");
//       if (isToday(date)) {
//         return `Today, ${format(date, 'MMMM dd, yyyy')}`;
//       } else if (isYesterday(date)) {
//         return `Yesterday, ${format(date, 'MMMM dd, yyyy')}`;
//       } else {
//         return format(date, "EEEE, MMMM dd, yyyy");
//       }
//     } catch (error) {
//       console.error("Invalid date:", dateString, error);
//       return dateString;
//     }
//   };

//   return (
//     <div className="md:col-span-3 w-full bg-message-area bg-neutral-100">
//       <div className="p-6 text-white overflow-y-scroll h-screen pb-20 md:fixed top-0" ref={messageContainerRef}>
//         <FiArrowLeft
//           onClick={() => {
//             setMessageComponent(false);
//             setShowListOfBusiness(true);
//           }}
//           className="text-black mb-6 mt-4 font-bold text-xl"
//         />

//         <div className="block w-full py-[2rem] mx-auto">
//         {Object.keys(groupedMessages).map((dateString) => (
//             <div key={dateString}>
//               <div className="relative flex justify-center my-[2rem]">
//                 <div className="w-full text-gray-300 bg-gray-300 h-[1px]"></div>
//                 <div className="text-center py-1 px-2 absolute bg-slate-50 border-gray-300 border-[1px] top-[-15px] z-10 rounded-lg w-fit text-slate-800 font-medium">{formatDateHeader(dateString)}</div>
//               </div>
//               {groupedMessages[dateString].map((convo, index) => (
//                 <div
//                   key={`${dateString}-${index}`}
//                   className={`p-3 rounded-tr-lg rounded-bl-lg flex ${
//                     convo.senderId === senderId ? "justify-end" : "justify-start"
//                   }`}
//                 >
//                   <div
//                     className={`p-3 max-w-[85%] rounded-tr-lg rounded-bl-lg ${
//                       convo.senderId === senderId
//                         ? "bg-blue-500 text-white"
//                         : "bg-white text-slate-800"
//                     }`}
//                   >
//                     <div className="w-full">{convo.message}</div>
//                     <div className="text-[10px] items-center gap-1 flex justify-end">
//                       <p>{formatTimestamp(convo.timestamp)}</p>
//                       {convo.senderId === senderId && (
//                         <span className={convo.isReadByRecipient ? "text-lightRed" : "text-white"}>
//                           <IoCheckmarkDoneSharp size={14} />
//                         </span>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ))}

//         </div>

//         <div className="fixed bottom-0 z-20 w-full md:w-2/4 items-center right-0 px-2 py-3 shadow-lg bg-white border-t border-gray-300">
//           <div className="flex items-center space-x-2">
//             <textarea
//               className="flex-grow  p-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               rows={rows}
//               placeholder="Type your message..."
//               value={value}
//               required
//               onChange={handleMessageChange}
//               style={{ resize: 'none' }}
//             ></textarea>
//             <button
//               onClick={handleSubmit}
//               className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               {messageLoading ? <Spinner color="red.500" size={20} /> : <IoSend color="white" size={20} />}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MessageArea;


import { Spinner } from "@chakra-ui/react";
import { FiArrowLeft } from "react-icons/fi";
import { format, isToday, isYesterday } from 'date-fns';
import { IoSend, IoCheckmarkDoneSharp } from "react-icons/io5";
import { useEffect, useRef } from "react";

const Area2 = ({
  setMessageComponent,
  setShowListOfBusiness,
  conversationInChat,
  senderId,
  messageLoading,
  handleSubmit,
  value,
  handleMessageChange,
  rows,
}) => {
  const messageContainerRef = useRef(null);

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  }, [conversationInChat]);

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    return `${hours.toString().padStart(2, "0")}:${minutes} ${ampm}`;
  };

  const groupMessagesByDate = (messages) => {
    return messages.reduce((groups, message) => {
      const date = new Date(message.timestamp).toDateString();
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(message);
      return groups;
    }, {});
  };

  const groupedMessages = groupMessagesByDate(conversationInChat);

  const formatDateHeader = (dateString) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) throw new Error("Invalid Date");
      if (isToday(date)) {
        return `Today, ${format(date, 'MMMM dd, yyyy')}`;
      } else if (isYesterday(date)) {
        return `Yesterday, ${format(date, 'MMMM dd, yyyy')}`;
      } else {
        return format(date, "EEEE, MMMM dd, yyyy");
      }
    } catch (error) {
      console.error("Invalid date:", dateString, error);
      return dateString;
    }
  };

  return (
    <div className="md:col-span-3 w-full bg-message-area bg-neutral-100">
      <div className="p-6 text-white overflow-y-scroll h-screen pb-20 md:fixed top-0" ref={messageContainerRef}>
        <FiArrowLeft
          onClick={() => {
            setMessageComponent(false);
            setShowListOfBusiness(true);
          }}
          className="text-black mb-6 mt-4 font-bold text-xl"
        />

        <div className="block w-full py-[2rem] mx-auto">
          {Object.keys(groupedMessages).map((dateString) => (
            // <div key={dateString}>
            <div key={dateString} style={{width: '100%', whiteSpace: 'nowrap'}}>

              <div className="relative flex justify-center my-[2rem]">
                <div className="w-full text-gray-300 bg-gray-300 h-[1px]"></div>
                <div className="text-center py-1 px-2 absolute bg-slate-50 border-gray-300 border-[1px] top-[-15px] z-10 rounded-lg w-fit text-slate-800 font-medium">
                  {formatDateHeader(dateString)}
                </div>
              </div>
              {groupedMessages[dateString].map((convo, index) => (
                <div
                  key={`${dateString}-${index}`}
                  className={`p-3 rounded-tr-lg rounded-bl-lg flex ${
                    convo.senderId === senderId ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`p-3 max-w-[85%] rounded-tr-lg rounded-bl-lg ${
                      convo.senderId === senderId ? "bg-blue-500 text-white" : "bg-white text-slate-800"
                    }`}
                  >
                    <div className="w-full">{convo.message}</div>
                    <div className="text-[10px] items-center gap-1 flex justify-end">
                      <p>{formatTimestamp(convo.timestamp)}</p>
                      {convo.senderId === senderId && (
                        <span className={convo.isReadByRecipient ? "text-lightRed" : "text-white"}>
                          <IoCheckmarkDoneSharp size={14} />
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="fixed bottom-0 z-20 w-full md:w-2/4 items-center right-0 px-2 py-3 shadow-lg bg-white border-t border-gray-300">
          <div className="flex items-center space-x-2">
            <textarea
              className="flex-grow p-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={rows}
              placeholder="Type your message..."
              value={value}
              required
              onChange={handleMessageChange}
              style={{ resize: 'none' }}
            ></textarea>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {messageLoading ? <Spinner color="red.500" size={20} /> : <IoSend color="white" size={20} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Area2;

