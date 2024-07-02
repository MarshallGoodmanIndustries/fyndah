import { useEffect, useState, useContext } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AuthContext } from "../../context/AuthContext";

// helper function
import { TimeAgo } from "../../helperComponents";

// Icons
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import Swal from "sweetalert2";

const BuisinessPost = ({ postId , profileImg, username, textContent, imgContent, timePosted, refreshPost }) => {
    const { authToken } = useContext(AuthContext); 
    const [ timeAgo, setTimeAgo] = useState();
    const [ openEditModal, setOpenEditModal] = useState(false);
    const [ deletePostIsLoading, setDeletePostIsLoading] = useState(false);

    useEffect(() => {
        setTimeAgo(<TimeAgo isoString={timePosted} />);
    },[timePosted]);

    //delete post
    const handleDeletePost = async (postId) => {
        setDeletePostIsLoading(true);
        const url = `https://axelonepostfeature.onrender.com/api/post/${postId}`;
        
        try {
            const response = await axios.delete(url, {
                headers: {
                    'Authorization': `Bearer ${authToken}`
                }
            });
            if(response.status == 200){
                setDeletePostIsLoading(false);
                Swal.fire({
                    icon: "success",
                    title: "Action Success",
                    text: "You have successfully deleted your post.",
                    timer: 3000,
                    timerProgressBar: true,
                });
                refreshPost();
                setOpenEditModal(false);
               
            }
        } catch (error) {
            console.log(error.response.data.message);
            setDeletePostIsLoading(false);
            Swal.fire({
                icon: "error",
                title: "Action Failed",
                text: "An error occurred while trying to delete the post. Please try again later..",
                timer: 3000,
                timerProgressBar: true,
                footer: `${error.response.data.message || error.message}`
              });
              setOpenEditModal(false);
        }
    }
  return (
    <section className="w-full sm:max-w-[20rem] md:max-w-[23rem] gap-2 rounded-lg justify-self-center self-start shadow-md p-4">
        {/* post content container */}
        <div className="flex flex-col gap-4 w-full">
            <div className="flex items-center gap-2">
                {/* user profile image container */}
                <div className="w-full max-w-12 h-full rounded-full overflow-hidden">
                    <img src={profileImg} alt="business profile display" />
                </div>
                <h2 className="text-base text-textDark font-poppins font-semibold flex-1">{username}</h2>
                <p className="text-sm text-textDark font-roboto font-light ml-auto">{timeAgo}</p>
                <div className="relative">
                    <div onClick={()=> setOpenEditModal(!openEditModal) } className="cursor-pointer p-2 bg-textDark bg-opacity-0 hover:bg-opacity-10 transition-colors duration-300 flex gap-1 rounded-full self-center">
                        <div className="w-1 h-1 bg-textDark bg-opacity-40 rounded-full"></div>
                        <div className="w-1 h-1 bg-textDark bg-opacity-40 rounded-full"></div>
                       
                    </div>
                    {
                        openEditModal && (
                            <AnimatePresence>
                                <motion.div 
                                    initial={{opacity: 0, scale: 0.8}} //initial state
                                    animate={{opacity: 1, scale: 1}} //final state
                                    exit={{opacity: 0, scale: 0.7}} // exit state
                                    transition={{
                                        duration: 0.2, // Duration of the transition
                                        ease: "easeInOut", // Type of easing
                                        }}
                                    className="absolute top-full right-0 translate-y-8  flex flex-col gap-2 p-2 w-48 rounded-md bg-textDark text-primary z-50">
                                        <div onClick={()=> handleDeletePost(postId)} className="flex items-center justify-between hover:bg-gray-600 transition-all duration-300 rounded-lg cursor-pointer p-2">
                                            <p className="font-poppins text-sm font-normal">Delete</p>
                                            {
                                                deletePostIsLoading ? (
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
        </div>
    </section>
  )
}


export default BuisinessPost;