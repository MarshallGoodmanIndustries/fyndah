import { ListingComponent } from "../../uiComponents";


const FeaturedListings = () => {
  return (
    <section className="py-16 px-4 sm:px-5 md:px-6 lg:px-8 flex flex-col gap-16">
        <div className="text-center flex flex-col gap-4 items-center">
            <h5 className="font-poppins text-xs md:text-sm font-medium text-accent bg-accent bg-opacity-15 w-fit rounded-2xl p-2">Fyndah</h5>
            <h3 className="font-poppins text-xl md:text-2xl lg:text-3xl font-medium">Featured Listings</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 grid-rows-1 gap-8">
            <ListingComponent />
            <ListingComponent />
            <ListingComponent />
        </div>
    </section>
  )
}

export default FeaturedListings;