import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import tos from "./data/tos";

const Tos = () => {
    const location = useLocation();

  useEffect(() => {
      window.scrollTo({
          top: 0,
          left: 0,
          behavior: "instant"
      });
  }, [location]);
  return (
    <section className="w-full p-6 relative">
        <h1 className="font-poppins font-bold font-lg text-2xl lg:text-3xl sm:text-center text-accent capitalize">Terms of services</h1>
        {tos?.map(({numbering, title, desc},index)=>(
            <div key={index} className="relative z-20 flex flex-col gap-2 mt-8">
                <h3 className="font-poppins font-semibold text-lg"><span className="font-base font-semibold mr-2">{numbering}.</span>{title}</h3>
                <p className="font-roboto font-normal text-base md:text-lg">{desc}</p>
            </div>
        ))}
    </section>
  )
}

export default Tos;