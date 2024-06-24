// import { MdLocationPin } from "react-icons/md";


const ListingComponent = ({logo, cover_image, org_bio, org_name, business_categories}) => {
  return (
    <div className="rounded-lg overflow-hidden bg-gray-50 justify-self-center w-full lg:max-w-96 grid grid-rows-subgrid row-span-3">
        <div className="relative h-48 overflow-hidden group">
            <img src={cover_image} className="transform scale-[1.03] group-hover:scale-100 transition-all duration-300 w-full h-full object-cover" alt="business flyer" />
            {/* <div className="absolute bottom-0 left-0 flex items-center gap-1 bg-primary bg-opacity-25 w-full h-12 p-4">
                <MdLocationPin className="w-4 h-4 text-textDark font-light" />
                <span className="text-textDark font-poppins font-light text-xs">{country}</span>
            </div> */}
        </div>
        <div className=" flex flex-col gap-2">
            <div className="p-4">
                <h3 className="font-poppins font-normal text-lg text-textDark">{org_name}</h3>
                <p className="font-poppins font-light text-sm md:text-base text-textDark">{org_bio}</p>
            </div>
            <div className="border-t border-gray-200 p-4 flex items-center gap-2">
                <div className="max-w-12 h-full overflow-hidden rounded-full">
                    <img src={logo} className="max-w-full w-full h-auto object-cover" alt="business logo" />
                </div>
                <div>
                    <h4 className="font-poppins font-normal text-base  text-textDark">{org_name}</h4>
                    <p className="font-roboto font-light text-sm  text-textDark">{business_categories[0].name}</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ListingComponent;