import { FeaturedPost } from "../../uiComponents";
import { businesslogo } from "../../../assets/images";


const FeaturedPosts = () => {
    
      

  return (
    <div className="py-8 px-4 sm:px-5 md:px-6 lg:px-8">
      <FeaturedPost 
        profileImg={businesslogo}
        username="Instablog" 
        timePosted="1d" 
        textContent="A Nigerian lady has said photographers weren't doing justice to BBNaija's Neo's looks." 
        imgContent="https://i.pinimg.com/564x/4a/db/d0/4adbd0e50629b5c0b8acb8b6267ed47a.jpg" 
        noOflikes={3}
        noOfComments={3}
      />
    </div>
  )
}

export default FeaturedPosts;