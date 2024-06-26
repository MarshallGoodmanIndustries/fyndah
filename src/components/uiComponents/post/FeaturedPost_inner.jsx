import { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import classNames from "classnames";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";

// icons
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { AiFillLike } from "react-icons/ai";
import { FaComment } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { IoSendSharp } from "react-icons/io5";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
// import { FaEdit } from "react-icons/fa";
import Swal from "sweetalert2";



const FeaturedPost_inner = (
    {   postId,
        userImg,
        userUsername,
        activeUserImg,
        timePosted,
        textContent,
        imgContent, like,
        handleLike,
        likeCount,
        setComment,
        commentCount,
        refreshComment,
        commentsData,
        setCommentsData,
        authorUserImg,
    }) => {
    const { authToken, userData } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [commentInput, setCommentInput] = useState("", []);
    const [commentModals, setCommentModals] = useState({});
    
    // loading states
    const [addCommentIsloading, setAddCommentIsLoading] = useState(false);
    const [deleteCommentIsloading, setDeleteCommentIsLoading] = useState(false);
        
    // add comment to postId
    const handleAddComment = async () => {
        if (!authToken) {
            Swal.fire({
                icon: "warning",
                title: "Login required",
                text: "You will be redirected to the login page.",
                timer: 3000,
                timerProgressBar: true,
              });
              setTimeout(()=>{
                //set the lastRoute so that user can be navigated back to this spot if they happen to not be logged in while trying to access the checkout page
                sessionStorage.setItem("lastRoute", location.pathname);
                navigate('/login');
              }, 3001);
        } else {
            setAddCommentIsLoading(true);
            const url = `https://axelonepostfeature.onrender.com/api/comment/${postId}`;
            try {
                const response = await axios.post(url, { comment: commentInput }, {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    }
                })
                setAddCommentIsLoading(false);
                setCommentsData(response.data)
                refreshComment();
                setCommentInput("");
            } catch (error) {
                setAddCommentIsLoading(false);

                //if error is authorization
                if(error.response.status == 401){
                    Swal.fire({
                        icon: "warning",
                        title: "Login required",
                        text: "You will be redirected to the login page.",
                        timer: 3000,
                        timerProgressBar: true,
                      });
                      setTimeout(()=>{
                        //set the lastRoute so that user can be navigated back to this spot if they happen to not be logged in while trying to access the checkout page
                        sessionStorage.setItem("lastRoute", location.pathname);
                        navigate('/login');
                      }, 3001);
                }else{
                    Swal.fire({
                        icon: "error",
                        title: "Failed to Comment",
                        text: "We encountered an error while processing your comment. Please try again later.",
                        timer: 5000,
                        timerProgressBar: true,
                        footer: `${error.response.data.message}`
                      });
                }
            }
        }
    }

    //delete comment 
    const handleDeleteComment = async (commentId) => {
        setDeleteCommentIsLoading(true);
        const url = `https://axelonepostfeature.onrender.com/api/comment/delete/${commentId}`;
        
        try {
            const response = await axios.delete(url, {
                headers: {
                    'Authorization': `Bearer ${authToken}`
                }
            });
            if(response.status == 200){
                refreshComment();
                setDeleteCommentIsLoading(false);


                //delete comment id from modalState
                setCommentModals(prevState => {
                    const updatedState = {...prevState};
                    delete updatedState[commentId];

                    return updatedState;
                });
            }
        } catch (error) {
            console.log(error.response.data.message);
            setDeleteCommentIsLoading(false);
        }
    }

    //focus on comment input
    const handleCommentFocusMode = () => {
        const commentBox = document.getElementById('commentBox');
        commentBox.focus();
    }

    //open edit modal of specific comment
    const handleOpenEditModal = (commentId) => {
        setCommentModals(prevState => {
             // Create a copy of the prevState and set the first key value pair
            const updatedState = {...prevState, [commentId]: false };

            // Iterate over each modal ID in the prevState
            Object.keys(updatedState).forEach(currentId => {
            // Set all modals to false, except the one being interacted with
            updatedState[currentId] = currentId === commentId ? !prevState[commentId] : false;
            });
            return updatedState;
        });
    };
  


    return (
        <div className="bg-textDark bg-opacity-95 fixed top-0 left-0 w-full h-dvh flex justify-center items-center py-4 z-50"> 
            <section id="postBox" className="post_inner bg-primary flex flex-col w-full h-full max-w-80 sm:max-w-96 md:max-w-[30rem] gap-4 rounded-lg overflow-y-auto">
                <div className="sticky top-0 bg-primary z-30 border-b border-gray-200 p-4 flex justify-between items-center">
                    <div className="w-full max-w-12 h-full rounded-full overflow-hidden">
                        <img src={userImg} alt="business profile display" />
                    </div>
                    <h2 className="flex-1 font-poppins font-semibold text-center text-lg">{userUsername}&#39;s Post</h2>
                    <div onClick={() => setComment(false)} className="p-1 bg-textDark bg-opacity-10 rounded-full cursor-pointer">
                        <RxCross2 className="w-5 h-5 text-textDark" />
                    </div>
                </div>
                <div className="p-4">
                    {/* post content container */}
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                            <h2 className="text-base text-textDark font-poppins font-semibold">{userUsername}</h2>
                            <RiVerifiedBadgeFill className="w-4 h-4 text-accent" />
                            <p className="text-sm text-textDark font-roboto font-light ml-auto">{timePosted}</p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <p className="text-base text-textDark font-roboto font-normal">{textContent}</p>
                            <div className="w-full h-auto rounded-lg overflow-hidden">
                                <img src={imgContent} className="w-full h-full object-cover" alt="image describing post" />
                            </div>
                        </div>

                        {/* no of reactions container*/}
                        <div className="flex items-center justify-between gap-4">
                            {/* likes container */}
                            <p className="group flex items-center text-textDark text-base font-poppins gap-1 cursor-pointer">
                                {likeCount} Like{likeCount > 1 ? 's' : ""}
                            </p>
                            {/* comments container */}
                            <p className="group flex items-center text-textDark text-base font-poppins gap-1 cursor-pointer">
                                {commentCount} Comment{commentCount > 1 ? 's' : ""}
                            </p>
                        </div>

                        {/*reactions container*/}
                        <div className="flex items-center justify-between gap-4 border-y border-gray-200 py-4 mb-4">
                            {/* like icon container */}
                            <div onClick={handleLike} className="text-textDark font-poppins cursor-pointer">
                                <AiFillLike className={classNames(like ? "text-[#0566FF]" : "text-gray-600", "w-7 h-7")} />
                            </div>
                            {/* comment icon container */}
                            <div onClick={handleCommentFocusMode} className="text-textDark font-poppins cursor-pointer">
                                <FaComment className={classNames("w-7 h-7 text-gray-600")} />
                            </div>
                        </div>

                        {/* comments box */}
                        {commentsData?.length > 0 && commentsData.map(comment => (
                            <div key={comment._id} className="relative flex gap-2 w-fit">
                                <div className="w-full max-w-8 h-full rounded-full overflow-hidden">
                                    <img src={authorUserImg} className="w-full h-full object-cover" alt="active user display profile" />
                                </div>
                                <div className="w-fit flex flex-col gap-1 bg-textDark bg-opacity-10 p-2 rounded-lg">
                                    <h4 className="font-poppins font-medium text-sm text-textDark">{comment.author}</h4>
                                    <p className="font-roboto font-normal text-base text-textDark">{comment.comment}</p>
                                </div>
                                {
                                    (authToken && userData.username == comment.author ) && (
                                        <div onClick={()=> handleOpenEditModal(comment._id)} className="cursor-pointer p-2 bg-textDark bg-opacity-0 hover:bg-opacity-10 transition-colors duration-300 flex gap-1 rounded-full self-center">
                                            <div className="w-1 h-1 bg-textDark bg-opacity-40 rounded-full"></div>
                                            <div className="w-1 h-1 bg-textDark bg-opacity-40 rounded-full"></div>
                                        </div>
                                    )
                                }
                                
                                {
                                    commentModals[comment._id] && (
                                        <AnimatePresence>
                                            <motion.div 
                                                initial={{opacity: 0, scale: 0.8}} //initial state
                                                animate={{opacity: 1, scale: 1}} //final state
                                                exit={{opacity: 0, scale: 0.7}} // exit state
                                                transition={{
                                                    duration: 0.2, // Duration of the transition
                                                    ease: "easeInOut", // Type of easing
                                                  }}
                                                className="absolute top-full right-0 -translate-y-2  flex flex-col gap-2 p-2 w-32 rounded-md bg-textDark text-primary z-[999999]">
                                                    <div onClick={()=> handleDeleteComment(comment._id)} className="flex items-center justify-between hover:bg-gray-600 transition-all duration-300 rounded-lg cursor-pointer p-2">
                                                        <p className="font-poppins text-sm font-normal">Delete</p>
                                                        {
                                                            deleteCommentIsloading ? (
                                                                <AiOutlineLoading3Quarters className="w-4 h-4 text-primary animate-spin" />
                                                            ) : (
                                                                <MdDelete className="text-primary w-4 h-4"/>
                                                            )
                                                        }
                                                    </div>
                                                    {/* <div className="flex items-center justify-between hover:bg-gray-600 transition-all duration-300 rounded-lg cursor-pointer p-2">
                                                        <p className="font-poppins text-sm font-normal">Edit</p>
                                                        <FaEdit className="text-primary w-4 h-4"/>
                                                    </div> */}
                                            </motion.div>
                                        </AnimatePresence>
                                    )
                                }

                            </div>
                        ))}


                        {/* active user comment box */}
                        <div className="sticky bottom-0 bg-primary py-4 flex items-center gap-2">
                            <div className="w-full max-w-8 h-full rounded-full overflow-hidden">
                                <img src={activeUserImg} className="w-full h-full object-cover" alt="active user display profile" />
                            </div>
                            <div className="flex-1 flex items-center p-2 gap-2 bg-textDark bg-opacity-10 rounded-lg">
                                <textarea
                                    onChange={(e) => setCommentInput(e.target.value)}
                                    value={commentInput}
                                    id="commentBox"
                                    rows="1"
                                    className="w-full outline-none px-2 py-4 bg-transparent resize-none text-textDark text-base"
                                ></textarea>
                                <button 
                                    onClick={handleAddComment} 
                                    disabled={!commentInput} 
                                    className={classNames("disabled:cursor-not-allowed group")}
                                >
                                    {
                                        addCommentIsloading ? (<AiOutlineLoading3Quarters className="w-4 h-4 text-textDark animate-spin" />) : 
                                        (<IoSendSharp className="w-4 h-4 text-textDark group-disabled:text-opacity-70" />)
                                    }
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default FeaturedPost_inner;