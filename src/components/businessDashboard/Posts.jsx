import { useState, useContext } from "react";
import {AuthContext} from "../context/AuthContext";
import axios from "axios";
import { IoIosAdd } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { ImSpinner9 } from "react-icons/im";
import Swal from "sweetalert2";


const Posts = () => {
    const { authToken } = useContext(AuthContext);
   const [description, setDescription] = useState("");
   const [image, setImage] = useState(null);
   const [previewSrc, setPreviewSrc] = useState("");
   const [isLoading, setIsLoading] = useState(false);

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
        <section className="flex flex-col items-center gap-2 mt-4 mr-6 w-full">            
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
        </section>
    )
}

export default Posts;