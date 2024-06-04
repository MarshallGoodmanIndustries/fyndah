import { useEffect, useState } from "react";
import { FeaturedPost, FeaturedPostLoading } from "../../uiComponents";
import { featuredPostsLoadingDummy } from "../../../routes/Navigations";
import { businesslogo } from "../../../assets/images";
import axios from "axios";




const FeaturedPosts = () => {
  const [posts, setPosts] = useState([]);
  

  useEffect(()=>{
    const url = "https://axelonepostfeature.onrender.com/api/homepage";
    const getPosts = async ()=> {
      try {
        const response = await axios.get(url);
        setPosts(response.data.data.posts);
        console.log(response.data.data.posts);
      } catch (error) {
        console.log(error.message);
      }
    }
    getPosts();
  }, []);
  
  console.log("posts: ", posts);

  return (
    <div className="grid grid-cols-1 items-center sm:grid-cols-2 md:grid-cols-3 gap-8 py-16 px-4 sm:px-5 md:px-6 lg:px-8">
      {!posts.length > 0 ? 
        (featuredPostsLoadingDummy.map((dummy, index)=> (
          <FeaturedPostLoading key={index} />
        ))) : 
        (posts.map(post => (
          <FeaturedPost 
            key={post._id}
            postId={post._id}
            profileImg={businesslogo}
            username={post.authorUsername} 
            timePosted={post.createdAt}
            textContent={post.description} 
            imgContent="https://i.pinimg.com/564x/4a/db/d0/4adbd0e50629b5c0b8acb8b6267ed47a.jpg" 
            noOflikes={post.likesCount}
          />
      )))}
    </div>
  )
}

export default FeaturedPosts;