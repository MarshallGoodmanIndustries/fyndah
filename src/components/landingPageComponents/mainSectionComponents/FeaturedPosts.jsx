import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { FeaturedPost, FeaturedPostLoading } from "../../uiComponents";
import { featuredPostsLoadingDummy } from "../../../routes/Navigations";
import { businesslogo } from "../../../assets/images";
import axios from "axios";




const FeaturedPosts = () => {
  const { authToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [getOrgDetails, setGetOrgDetails] = useState([])

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const containsPosts = posts.length > 0;
  const totalPages = Math.ceil(posts.length / 9);
  const postsForCurrentPage = posts.slice((currentPage - 1) * 9, currentPage * 9);

  useEffect(()=>{
    const url = "https://axelonepostfeature.onrender.com/api/homepage";
    const getPosts = async ()=> {
      try {
        const response = await axios.get(url);
        setPosts(response.data.data.posts);
      } catch (error) {
        console.log(error.message);
      }
    }
    getPosts();
  }, []);
  

  useEffect(() => {
    const url = "https://api.fyndah.com/api/v1/organization";
    const getOrgMessageId = async () => {
      try {
        const response = await axios.get(url);
        setGetOrgDetails(response.data.data)
        

      } catch(error) {
        console.error(error)
      }
    }
    getOrgMessageId();
  }, [])

  const handleSeeMore = ()=> {
    if(!authToken){
      //set the lastRoute so that user can be navigated back to this spot if they happen to not be logged in while trying to access the checkout page
      sessionStorage.setItem("lastRoute", location.pathname)
        navigate('/login');
    }else{
      setCurrentPage(prevPage => prevPage < totalPages ? prevPage + 1 : totalPages)
    }
  }

  
  

  // set current page for search results
  useEffect(() => {
    if (postsForCurrentPage.length === 0 && currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1)
    }
  }, [posts, currentPage, postsForCurrentPage]);

  // set current page for search results
  useEffect(() => {
    if (postsForCurrentPage.length === 0 && currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1)
    }
  }, [posts, currentPage, postsForCurrentPage]);

  const findOrganizationMsgId = (organizationId) => {
    const organization = getOrgDetails.find(org => org.id.toString() === organizationId.toString());
    return organization ? organization.msg_id : null;
  };
  

  return (
    <section className="py-16 px-4 sm:px-5 md:px-6 lg:px-8 flex flex-col gap-16">
       <div className="text-center flex flex-col gap-4 items-center">
            <h5 className="font-poppins text-xs md:text-sm font-medium text-accent bg-accent bg-opacity-15 w-fit rounded-2xl p-2">Fyndah</h5>
            <h3 className="font-poppins text-xl md:text-2xl lg:text-3xl font-medium">Featured Posts</h3>
        </div>
      <div className="grid grid-cols-1 items-center sm:grid-cols-2 md:grid-cols-3 gap-16 md:gap-8">
      {!containsPosts ? 
        (featuredPostsLoadingDummy.map((dummy, index) => (
          <FeaturedPostLoading key={index} />
        ))) : 
        (posts.map(post => {
          const msgId = findOrganizationMsgId(post.organization);
          return (
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
              orgMsgId={post.orgmsg_id}
              msgId={msgId}
            />
          );
        }))}
        {/* {!containsPosts ? 
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
        )))} */}
      </div>
      { totalPages > 9 && (
        <div className="flex items-center justify-between gap-4 w-full max-w-[300px] md:max-w-[80%] lg:max-w-[70%] mx-auto">
            <button className='group disabled:cursor-not-allowed disabled:text-gray-400' onClick={() => setCurrentPage(prevPage => (prevPage > 1 ? prevPage - 1 : 1))} disabled={currentPage === 1}>
              See less
            </button>
            <p className='text-textDark text-sm font-normal'>
              {currentPage} of {totalPages} pages
            </p>
            <button className='group disabled:cursor-not-allowed disabled:text-gray-400' onClick={handleSeeMore} disabled={currentPage === totalPages}>
              See more
            </button>
        </div>
      )}
    </section>
  )
}

export default FeaturedPosts;