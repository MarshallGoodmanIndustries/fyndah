import { logo, logo_white } from "../../../assets/images";



const AdBanner = () => {
  return (
    <section className="relative flex justify-between w-full h-40  overflow-hidden rounded-lg">
       <div className="relative z-20 bg-black bg-opacity-80 flex items-center">
            <div className="">
                <img src={logo} className="w-24 h-full" alt="" />
            </div>
       </div>
        <img className="w-full h-full object-cover absolute top-0 left-0" src="https://img.freepik.com/free-photo/front-view-people-posing-work_23-2150697603.jpg?t=st=1717439954~exp=1717443554~hmac=93439b620d66521fafbcb8e99a640bdd1eb5c99f5b323a39f7f7abf6bde3051d&w=826" alt="" />
       <div className="relative z-20 bg-black bg-opacity-80">
            <h2>Digital Market & Promotion</h2>
            <p>www.yourwebsitehere.com</p>
            <button>Learn More</button>
       </div>
    </section>
  )
}

export default AdBanner;