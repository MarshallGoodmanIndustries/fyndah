import { Link } from "react-router-dom";

import { landingPageFooterMenu } from "../../../routes/Navigations";
import { logo_white } from "../../../assets/images";
import { FaLocationDot } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
// import { FaFacebook } from "react-icons/fa6";
// import { FaInstagram } from "react-icons/fa6";
// import { FaTwitter } from "react-icons/fa6";
// import { FaWhatsapp } from "react-icons/fa6";
import { MdOutlineArrowOutward } from "react-icons/md";

const Footer = () => {

  return (
    <footer className="bg-[#0a1128] px-4 sm:px-5 py-16 md:px-6 lg:px-16 font-poppins">
      <div className="flex flex-wrap gap-12">
        {/* brand group */}
        <div className="flex-1 md:flex-[1.5]">
          <div className="max-w-[8rem] md:max-w-[10rem] h-auto transform -translate-x-3">
              <Link to="/">
                  <img src={logo_white} className="w-full h-auto object-cover" alt="brand logo" />
              </Link>
          </div>
          <h3 className="text-base text-primary my-4">Fyndah is an expansive business database with a wide range of data points. We aim to be the most comprehensive directory of the web today.</h3>
          <p className="text-sm text-primary font-normal">© 2024 Marshall Goodman Industries Ltd. All rights reserved</p>
        </div>

        {/* contact group */}
        <div className="flex-[1] flex flex-col gap-4">
          <h3 className="text-primary text-lg font-semibold">Get In Touch</h3>
          <div className="flex items-center gap-2">
            <div className="text-primary"><FaLocationDot size={16}/></div>
            <p className="text-base w-full text-primary">Road 1 house 18, federal housing Egbu, Owerri, Imo, Nigeria </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-primary"><MdEmail size={16}/></div>
            <p className="text-base w-full text-primary">info@fyndah.com</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-primary"><FaPhoneAlt size={16}/></div>
            <p className="text-base w-full text-primary">+234 813 958 9815</p>
          </div>
        </div>
        

        {/* website links */}
        <div className="flex-[1] flex flex-col gap-4">
          <h3 className="text-primary text-lg font-semibold">Company</h3>
          {landingPageFooterMenu.map(link => (
            <a 
              key={link.title} 
              href={link.anchor}
              className="text-primary text-base flex items-center gap-1 group"
            >
              {link.title}
              <div className="group-hover:translate-x-1 group-hover:-translate-y-1  transform transition-all duration-300">
                <MdOutlineArrowOutward size={12} />
              </div>
            </a>
          ))}
        </div>

        {/* newsletter group */}
        <div className="flex-1 md:flex-[1.5] flex flex-col gap-4">
          <h3 className="text-primary text-lg font-semibold">Join our Newsletter</h3>
          <form action="#" className="flex flex-col gap-3">
            <label htmlFor="email" className="text-base text-primary">Your Email</label>
            <input className="p-2 rounded-[0.625rem] border border-solid border-white outline-none placeholder:text-sm text-sm" placeholder="johndoe@mail.com" type="email" name="email" id="email" />
            <button 
              type="button"
              className="bg-accent text-primary font-poppins md:text-lg rounded-lg py-1 px-4 capitalize font-light transition-all duration-300" 
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </footer>
  )
}

export default Footer
