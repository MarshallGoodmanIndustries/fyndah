import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import classNames from "classnames";
import axios from "axios";

// Components
import FeaturedPost_inner from "./FeaturedPost_inner";

// helper function
import { TimeAgo } from "../../helperComponents";

// icons
// import { RiVerifiedBadgeFill } from "react-icons/ri";
import { AiFillLike } from "react-icons/ai";
import { FaComment } from "react-icons/fa6";
import { BiSolidMessageDetail } from "react-icons/bi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Swal from "sweetalert2";



const FeaturedPost = ({postId, organizationId, orgMsgId, profileImg, username, timePosted, textContent, imgContent, noOflikes}) => {
    const { authToken, userData } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [like, setLike] = useState(false);
    const [likeCount, setLikeCount] = useState(noOflikes);
    const [comment, setComment] = useState(false);
    const [commentsData, setCommentsData] = useState([]);
    const [timeAgo, setTimeAgo] = useState();

    // loading states
    const [messageIsLoading, setMessageIsLoading] = useState(false);
    const [likeIsLoading, setLikeIsLoading] = useState(false);
    
    
    // fetch comments related to postId
    const getComments = async ()=> {
        const url = `https://axelonepostfeature.onrender.com/api/comments/${postId}`;
        try {
            const response = await axios.get(url);
            setCommentsData(response.data.data.comments);
        } catch (error) {
            console.log(error);
        }
    }

    //load initial comments
    useEffect(() => {
        getComments();
    }, [])

    const handleLike = async ()=>{

        if(!authToken){
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
            if(!like){
                setLikeIsLoading(true);
                const url = `https://axelonepostfeature.onrender.com/api/post/${postId}/like`;
    
                try {
                    const response = await axios.post(url,{}, {
                        headers: {
                            Authorization: `Bearer ${authToken}`,
                        }
                    });
                    if(response.status === 200){
                        setLikeIsLoading(false);
                        setLike(true);
                        setLikeCount(prevLikeCount => prevLikeCount + 1);
                    }
                } catch (error) {
                    setLikeIsLoading(false);
                    Swal.fire({
                        icon: "error",
                        title: "Action Failed",
                        text: "An error occurred while trying to like the post. Please try again later.",
                        timer: 5000,
                        timerProgressBar: true,
                        footer: `${error.response.data.message || error.message}`
                      });
                } 
            }else{
                setLikeIsLoading(true);
                const url = `https://axelonepostfeature.onrender.com/api/post/${postId}/unlike`;
                try {
                    const response = await axios.post(url, {}, {
                        headers: {
                            Authorization: `Bearer ${authToken}`,
                        }
                    } );
                    
                    if(response.status === 200){
                        setLikeIsLoading(false);
                        setLike(false);
                        setLikeCount(prevLikeCount => prevLikeCount - 1);
                    }
                } catch (error) {
                    setLikeIsLoading(false);
                    Swal.fire({
                        icon: "error",
                        title: "Action Failed",
                        text: "An error occurred while trying to unlike the post. Please try again later.",
                        timer: 5000,
                        timerProgressBar: true,
                        footer: `${error.response.data.message || error.message}`
                      });
                }
                
            }
        }
    }
    
    const handleCreateConversation = async ()=> {
        if(!authToken){
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
            setMessageIsLoading(true);
            try {
                const response = await axios.post(`https://axelonepostfeature.onrender.com/api/conversations/newconversation/${orgMsgId}`, {}, {
                    headers: {
                        Authorization: `Bearer ${authToken}`
                    }
                });
                if(response.status === 200){
                    setMessageIsLoading(false);
                    navigate("/dashboard/messages");
                }
            } catch (error) {
                setMessageIsLoading(false);
                Swal.fire({
                    icon: "error",
                    title: "Action Failed",
                    text: "An error occurred while trying to create a conversation. Please try again later.",
                    timer: 5000,
                    timerProgressBar: true,
                    footer: `${error.response.data.message || error.message}`
                  });
            }
        }
    };


    useEffect(() => {
        setTimeAgo(<TimeAgo isoString={timePosted} />);
    },[timePosted])
    
  return (
    <section className="relative w-full sm:max-w-[20rem] md:max-w-[23rem] gap-2 rounded-lg justify-self-center self-start shadow-sm p-4">

        {/* post content container */}
        <div className="flex flex-col gap-4 w-full">
            <div className="flex items-center gap-2">
                {/* user profile image container */}
                <div className="w-full max-w-12 h-full rounded-full overflow-hidden">
                    <img src={profileImg} alt="business profile display" />
                </div>
                <h2 className="text-base text-textDark font-poppins font-semibold flex-1">{username}</h2>
                {/* verified */}
                {/* <RiVerifiedBadgeFill className="w-4 h-4 text-accent flex-1" /> */}
                <p className="text-sm text-textDark font-roboto font-light ml-auto">{timeAgo}</p>
            </div>
            <div className="flex flex-col gap-2 w-full">
                {textContent && (
                    <p className="text-base text-textDark font-roboto font-normal">{textContent}</p>
                )}
                {
                    imgContent && (
                        <div className="w-full h-auto rounded-lg overflow-hidden">
                            <img src={imgContent} className="w-full h-full object-cover" alt="image describing post" />
                        </div>
                    )
                }
            </div>
            <div>
                {/* no of reactions container*/}
                <div className="flex items-center gap-4">
                    {/* likes icon container */}
                    <div onClick={handleLike} className="group flex items-center text-textDark font-poppins gap-1 cursor-pointer">
                        {
                            likeIsLoading ? <AiOutlineLoading3Quarters className="w-5 h-5 text-gray-600 animate-spin" /> :
                            <AiFillLike className={classNames(like ? "text-[#0566FF]" : "text-gray-600" ,"w-5 h-5")}/>
                        }
                        {likeCount}
                    </div>
                    {/* comments icon container */}
                    <div onClick={()=> setComment(!comment)} className="group flex items-center text-textDark font-poppins gap-1 cursor-pointer">
                        <FaComment className={classNames("w-5 h-5 text-gray-600")} />
                        {commentsData.length}
                    </div>

                    {/* Message icon container */}
                    {organizationId !== userData?.organization_id && (
                        <div onClick={handleCreateConversation} className="ml-auto group flex items-center text-textDark font-poppins gap-1 cursor-pointer">
                            {
                                messageIsLoading ? <AiOutlineLoading3Quarters className="w-5 h-5 text-gray-600 animate-spin" /> :
                                <BiSolidMessageDetail className="w-5 h-5 text-gray-600" />
                            }
                        </div>
                    )}
                </div>
                    
                {comment && <FeaturedPost_inner 
                    postId={postId}
                    userUsername={username} 
                    userImg={profileImg} 
                    timePosted={timeAgo} 
                    textContent={textContent} 
                    imgContent={imgContent}
                    handleLike={handleLike}
                    like={like}
                    setComment={setComment}
                    commentsData={commentsData}
                    setCommentsData={setCommentsData}
                    commentCount={commentsData.length}
                    refreshComment={getComments}
                    likeCount={likeCount}
                    activeUserImg="https://i.pinimg.com/474x/ef/25/82/ef2582721184c5ac19abb59c15923b11.jpg"
                    authorUserImg="https://i.pinimg.com/736x/6a/e8/27/6ae827fcca32bf53c2a286efeb0b145d.jpg"
                />}
            </div>
        </div>
    </section>
  )
}

export default FeaturedPost;