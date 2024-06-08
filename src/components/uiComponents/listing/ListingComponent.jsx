import { MdLocationPin } from "react-icons/md";


const ListingComponent = () => {
  return (
    <div className="rounded-lg overflow-hidden bg-gray-50 justify-self-center w-full lg:max-w-96 grid grid-rows-subgrid row-span-3">
        <div className="relative h-48 overflow-hidden group">
            <img src="https://i.pinimg.com/564x/a8/3c/42/a83c42c598310e38e9d533e60c258d28.jpg" className="transform scale-[1.03] group-hover:scale-100 transition-all duration-300 w-full h-full object-cover" alt="business flyer" />
            <div className="absolute bottom-0 left-0 flex items-center gap-1 bg-black bg-opacity-35 w-full h-12 p-4">
                <MdLocationPin className="w-4 h-4 text-primary font-light" />
                <span className="text-primary font-poppins font-light text-xs">Nigeria</span>
            </div>
        </div>
        <div className=" flex flex-col gap-2">
            <div className="p-4">
                <h3 className="font-poppins font-normal text-lg text-textDark">MGM</h3>
                <p className="font-poppins font-light text-sm md:text-base text-textDark">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi quos repudiandae perspiciatis enim mollitia tenetur deserunt expedita corporis architecto, inventore voluptatibus veniam natus nostrum iusto suscipit assumenda? Iste, in sint.</p>
            </div>
            <div className="border-t border-gray-200 p-4 flex items-center gap-2">
                <div className="max-w-12 h-full overflow-hidden rounded-full">
                    <img src="https://i.pinimg.com/564x/a8/3c/42/a83c42c598310e38e9d533e60c258d28.jpg" className="w-full h-full object-cover" alt="business logo" />
                </div>
                <div>
                    <h4 className="font-poppins font-normal text-base  text-textDark">Marshall Goodman Industries</h4>
                    <p className="font-roboto font-light text-sm  text-textDark">IT Consultants</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ListingComponent;