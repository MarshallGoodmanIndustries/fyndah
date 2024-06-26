import { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import classNames from "classnames";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

// icons
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { AiFillLike } from "react-icons/ai";
import { FaComment } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { IoSendSharp } from "react-icons/io5";
import { AiOutlineLoading3Quarters } from "react-icons/ai";



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
    const { authToken } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [commentInput, setCommentInput] = useState("", []);
    const [isloading, setIsLoading] = useState(false)




    // add comment to postId
    const handleAddComment = async () => {
        if (!authToken) {
            //set the lastRoute so that user can be navigated back to this spot if they happen to not be logged in while trying to access the checkout page
            sessionStorage.setItem("lastRoute", location.pathname)
            navigate('/login');
        } else {
            setIsLoading(true);
            const url = `https://axelonepostfeature.onrender.com/api/comment/${postId}`;
            try {
                const response = await axios.post(url, { comment: commentInput }, {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    }
                })
                // console.log(response.status);
                setIsLoading(false);
                setCommentsData(response.data)
                refreshComment();
                setCommentInput("");
            } catch (error) {
                console.log(error.message)
            }
        }
    }

    //focus on comment input
    const handleCommentFocusMode = () => {
        const commentBox = document.getElementById('commentBox');
        commentBox.focus();
    }



    return (
        <div className="bg-textDark bg-opacity-95 fixed top-0 left-0 w-full h-dvh flex justify-center items-center py-4 z-50"> 
            <section id="postBox" className="bg-primary flex flex-col w-full h-full max-w-80 sm:max-w-96 md:max-w-[30rem] gap-4 rounded-lg overflow-y-auto scroll-">
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
                            <div key={comment._id} className="flex gap-2">
                                <div className="w-full max-w-8 h-full rounded-full overflow-hidden">
                                    <img src={authorUserImg} className="w-full h-full object-cover" alt="active user display profile" />
                                </div>
                                <div className="w-fit flex flex-col gap-1 bg-textDark bg-opacity-10 p-2 rounded-lg">
                                    <h4 className="font-poppins font-medium text-base text-textDark">{comment.author}</h4>
                                    <p className="font-roboto font-normal text-base text-textDark">{comment.comment}</p>
                                </div>
                                <div className="relative cursor-pointer p-2 bg-textDark bg-opacity-0 hover:bg-opacity-10 transition-colors duration-300 flex gap-1 rounded-full self-center">
                                    <div className="w-1 h-1 bg-textDark bg-opacity-40 rounded-full"></div>
                                    <div className="w-1 h-1 bg-textDark bg-opacity-40 rounded-full"></div>

                                    {/* <div className="">
                                        <button>Delete</button>
                                        <button>Edit</button>
                                    </div> */}
                                </div>
                                
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
                                        isloading ? (<AiOutlineLoading3Quarters className="w-4 h-4 text-textDark animate-spin" />) : 
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