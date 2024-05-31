import { RiVerifiedBadgeFill } from "react-icons/ri";
// import { BiSolidLike } from "react-icons/bi";

const FeaturedPost = ({profileImg, username, timePosted, postContent}) => {
  return (
    <section>
        <div>
            <img src={profileImg} alt="business profile display" />
        </div>
        <div>
            <div>
                <h2>{username}</h2>
                <RiVerifiedBadgeFill className="w-4 h-4" />
                <p>. {timePosted}</p>
            </div>
            <p>{postContent}</p>
            <div>
                <div>

                </div>
            </div>
        </div>
    </section>
  )
}

export default FeaturedPost;