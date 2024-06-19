import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import FeaturedPost_inner from "./FeaturedPost_inner";
import classNames from "classnames";
import axios from "axios";

// helper function
import { TimeAgo } from "../../helperComponents";
// icons
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { AiFillLike } from "react-icons/ai";
import { FaComment } from "react-icons/fa6";
import { BiSolidMessageDetail } from "react-icons/bi";
import ConfirmationModal from "./ConfirmationModal";


const FeaturedPost = ({postId, organizationId, msgId , profileImg, username, timePosted, textContent, imgContent, noOflikes}) => {
    const { authToken } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [like, setLike] = useState(false);
    const [likeCount, setLikeCount] = useState(noOflikes);
    const [comment, setComment] = useState(false);
    const [commentsData, setCommentsData] = useState([]);
    const [timeAgo, setTimeAgo] = useState();
    const [confirmationModal, setConfirmationModal] = useState(false);
    
     
    
    
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
            //set the lastRoute so that user can be navigated back to this spot if they happen to not be logged in while trying to access the checkout page
            sessionStorage.setItem("lastRoute", location.pathname)
            navigate('/login');
        }else{
            // console.log("You are logged in");
            console.log(authToken);
            // console.log(localStorage.getItem('authToken'));
             if(!like){
                const url = `https://axelonepostfeature.onrender.com/api/post/${postId}/like`;
     
                 try {
                     const response = await axios.post(url,{}, {
                         headers: {
                             Authorization: `Bearer ${authToken}`,
                         }
                     });
                    //  console.log(response.data);
                     if(response.status === 200){
                         setLike(true);
                         setLikeCount(prevLikeCount => prevLikeCount + 1);
                     }
                 } catch (error) {
                     console.log(error.message);
                 }
                 
             }else{
                 const url = `https://axelonepostfeature.onrender.com/api/post/${postId}/unlike`;
                 try {
                     const response = await axios.post(url, {}, {
                         headers: {
                             Authorization: `Bearer ${authToken}`,
                         }
                     } );
                     
                     if(response.status === 200){
                         setLike(false);
                         setLikeCount(prevLikeCount => prevLikeCount - 1);
                     }
                 } catch (error) {
                     console.log(error.message);
                 }
                 
             }
        }
    }

    const handleMessage = ()=> {
        if(!authToken){
            //set the lastRoute so that user can be navigated back to this spot if they happen to not be logged in while trying to access the checkout page
            sessionStorage.setItem("lastRoute", location.pathname)
            navigate('/login');
        }else{
            setConfirmationModal(true);
        }
    }
    useEffect(() => {
        setTimeAgo(<TimeAgo isoString={timePosted} />);
    },[timePosted])
    
  return (
    <section className="relative w-full max-w-[300px] gap-2 rounded-lg justify-self-center self-start">

        {/* post content container */}
        <div className="flex flex-col gap-4 w-full">
            <div className="flex items-center gap-2">
                {/* user profile image container */}
                <div className="w-full max-w-12 h-full rounded-full overflow-hidden">
                    <img src={profileImg} alt="business profile display" />
                </div>
                <h2 className="text-base text-textDark font-poppins font-semibold">{username}</h2>
                {/* verified */}
                <RiVerifiedBadgeFill className="w-4 h-4 text-accent" />
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
            <div className="">
                {/* no of reactions container*/}
                <div className="flex items-center gap-4">
                    {/* likes icon container */}
                    <div onClick={handleLike} className="group flex items-center text-textDark font-poppins gap-1 cursor-pointer">
                        <AiFillLike className={classNames(like ? "text-[#0566FF]" : "text-gray-600" ,"w-5 h-5")}/>
                        {likeCount}
                    </div>
                    {/* comments icon container */}
                    <div onClick={()=> setComment(!comment)} className="group flex items-center text-textDark font-poppins gap-1 cursor-pointer">
                        <FaComment className={classNames("w-5 h-5 text-gray-600")} />
                        {commentsData.length}
                    </div>

                    <div onClick={handleMessage} className="ml-auto group flex items-center text-textDark font-poppins gap-1 cursor-pointer">
                        <BiSolidMessageDetail className="w-5 h-5 text-gray-600" />
                    </div>

                    {confirmationModal && (<ConfirmationModal setConfirmationModal={setConfirmationModal} msgId={msgId} org_id={organizationId} />)}
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