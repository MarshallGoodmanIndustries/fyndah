



const AdBanner = () => {
  return (
    <section className="relative flex flex-col md:flex-row md:justify-evenly items-end md:items-center gap-4  w-full md:h-40 overflow-hidden mb-8 p-4">
      <div className="absolute top-0 left-0 w-full h-full">
        <img src="https://i.pinimg.com/474x/3a/e0/c5/3ae0c5187d409bd67c915f71dbe32d65.jpg" className="w-full h-full object-cover" alt="background image of a business building" />
      </div> 
      <div className="bg-[#023047] bg-opacity-90 w-full h-full absolute top-0 left-0"></div>

      <div>
      <h4 className="text-primary relative z-10 font-poppins font-medium text-lg">Your <span className="text-accentDark">Logo</span></h4>
      {/* <img src="" alt="" /> */}
      </div>
      <h3 className="text-primary relative z-10 font-poppins font-normal text-base">Your Business Name</h3>
      <p className="text-primary relative z-10 font-poppins font-normal text-base">Your Business description</p>
      <button disabled className="bg-accent hover:bg-accentDark transition-all duration-300 relative z-10 text-primary font-poppins font-light text-base py-1 px-3 rounded-lg w-full md:w-fit">CTA button</button>
    </section>
  )
}

export default AdBanner;

