import { useState, useContext, useEffect } from "react";
import {AuthContext} from "../context/AuthContext";
import axios from "axios";
import Swal from "sweetalert2";

// components
import { BuisinessPost } from "../uiComponents";

// images
import { businesslogo } from "../../assets/images";

// icons
import { IoIosAdd } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { ImSpinner9 } from "react-icons/im";


const Posts = () => {
    const { authToken } = useContext(AuthContext);
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);
    const [previewSrc, setPreviewSrc] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    // business posts related states
    const [businessPosts, setBuisinessPosts] = useState([]);
    const containsBusinessPosts = businessPosts?.length > 0;


    const handleImageChange = (e) => {
        if(e.target.files){
            setImage(e.target.files[0]);
            setPreviewSrc(URL.createObjectURL(e.target.files[0]));
        }
    }

    const handleRemovePreview = (e) => {
            e.stopPropagation(); //prevent the click event on the cross icon to reach the label and trigger the file input
            setPreviewSrc("");
            setImage(null);
    }

    // get posts related to business function 
    const getBusinessPosts = async () => {
        const url = "https://axelonepostfeature.onrender.com/api/myposts";
        try {
            const response = await axios.get(url, {
                headers: {
                    "Authorization": `Bearer ${authToken}`
                }
            })
            setBuisinessPosts(response.data.posts);
        } catch (error) {
            console.error(error.response.data.message || error.message);
        }
    }


    // initial rendering of business posts
    useEffect(() => {
        getBusinessPosts();
    }, [])

    const handlePostSubmission = async (e) => {
            e.preventDefault();

            const url = "https://axelonepostfeature.onrender.com/api/post";
            setIsLoading(true);
            try {
                const response = await axios.post(
                    url,
                    {description: description, image: image},{
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                        'Content-Type': 'multipart/form-data'
                    }}
                )
                if (response.data.status == "success") {
                    setIsLoading(false);
                    Swal.fire({
                    icon: "success",
                    title: "Successful",
                    text: "Post created successfully.",
                    timer: 3000,
                    timerProgressBar: true,
                    });
                    setDescription("")
                    setPreviewSrc("");
                    setImage(null);
                    getBusinessPosts();
                }
            } catch (error) {
                setIsLoading(false);
                Swal.fire({
                    icon: "error",
                    title: "Oops! Something went wrong",
                    text: "Failed to complete your post. Please try again.",
                    timer: 3000,
                    timerProgressBar: true,
                    footer: `Error Details: ${error.response.data.message}`,
                });
            }
    };

   
   
   
    return (
        <section className="flex flex-col items-center gap-8 mt-4 mr-6 w-full p-4 ">            
            <form onSubmit={handlePostSubmission} method="post" encType="" className="flex flex-col gap-4 py-4 w-full max-w-80 md:max-w-96">
                <div className="flex flex-col gap-2">
                    <label htmlFor="description" className="font-poppins font-normal text-base text-textDark">Description</label>
                    <textarea 
                        value={description}
                        onChange={(e)=> setDescription(e.target.value)}
                        id="description" 
                        rows={4}  
                        className="resize-y text-textDark font-roboto text-base font-light border border-gray-300 bg-gray-100 rounded-lg outline-none p-2" 
                    />
                </div>
                <div className="relative border-2 border-dashed border-gray-300 w-full h-32 rounded-lg overflow-hidden">
                    <label htmlFor="image" className=" cursor-pointer">
                        <input type="file" name="image" id="image" accept=".jpg,.jpeg,.png" onChange={handleImageChange} />
                        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-gray-100 ">
                            <IoIosAdd className="w-6 h-6 text-gray-300" />
                        </div>
                    </label>
                    {
                        previewSrc && (
                            <div className="absolute top-0 w-full h-full">
                                <img src={previewSrc} className="w-full h-full object-cover" alt={image?.name} />
                                <button onClick={handleRemovePreview} className="hover:scale-105 hover:bg-gray-300 transform transition-all duration-300 absolute rounded-full bg-gray-200 p-1 top-2 right-2 z-50">
                                    <RxCross2 className="w-4 h-4 text-textDark" />
                                </button>
                            </div>
                        )
                    }
                </div>
                <button type="submit" disabled={description.trim() !== "" ? false : true} className="flex justify-center items-center disabled:cursor-not-allowed disabled:bg-gray-500 transition-all duration-300 bg-accent hover:bg-accentDark font-poppins font-light text-lg py-2 px-4 rounded-lg text-primary">
                    {isLoading ? <ImSpinner9 className="animate-spin text-center" size={22} /> : "Post"}
                </button>
            </form>
            {
                containsBusinessPosts && ( 
                    <>
                        <hr className="w-full h-[1px] bg-gray-100" />
                        <h3 className="font-poppins font-semibold text-2xl text-textDark text-opacity-85">Posts</h3> 
                    </>
            )
            }
            {/* Business related posts */}
            <div className="flex flex-col gap-6">
                {businessPosts.map(post => (
                    <BuisinessPost 
                    key={post._id}
                    postId={post._id}
                    organizationId={post.organization}
                    profileImg={businesslogo}
                    username={post.authorUsername} 
                    timePosted={post.createdAt}
                    textContent={post.description} 
                    imgContent={post.image} 
                    noOflikes={post.likesCount}
                    orgMsgId={post.orgmsg_id}
                    refreshPost={getBusinessPosts}
                  />
                ))}
            </div>
        </section>
    )
}

export default Posts;