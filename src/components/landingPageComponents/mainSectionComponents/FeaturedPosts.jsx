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
        console.log("posts: ", response.data.data.posts);
      } catch (error) {
        console.log(error.message);
      }
    }
    getPosts();
  }, []);
  

  return (
    <section className="py-16 px-4 sm:px-5 md:px-6 lg:px-8 flex flex-col gap-16">
       <div className="text-center flex flex-col gap-4 items-center">
            <h5 className="font-poppins text-xs md:text-sm font-medium text-accent bg-accent bg-opacity-15 w-fit rounded-2xl p-2">Fyndah</h5>
            <h3 className="font-poppins text-xl md:text-2xl lg:text-3xl font-medium">Featured Posts</h3>
        </div>
      <div className="grid grid-cols-1 items-center sm:grid-cols-2 md:grid-cols-3 gap-8">
        {!posts.length > 0 ? 
          (featuredPostsLoadingDummy.map((dummy, index)=> (
            <FeaturedPostLoading key={index} />
          ))) : 
          (posts.map(post => (
            <FeaturedPost 
              key={post._id}
              postId={post._id}
              organizationId={post.organization}
              profileImg={businesslogo}
              username={post.authorUsername} 
              timePosted={post.createdAt}
              textContent={post.description} 
              imgContent={post.image} 
              noOflikes={post.likesCount}
            />
        )))}
      </div>
    </section>
  )
}

export default FeaturedPosts;