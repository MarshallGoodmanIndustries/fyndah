import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ListingComponent } from "../../uiComponents";
import axios from "axios";

//images
import { businessFeature } from "../../../assets/images";

const FeaturedListings = () => {
  const { authToken } = useContext(AuthContext);
  const [featuredBusinesses, setFeaturedBusinesses] = useState();

  useEffect(() =>{
    const url = "https://api.fyndah.com/api/v1/organization/featured";
    try {
      axios.get(url, {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      }).then(response => {
        setFeaturedBusinesses(response.data.data);
      }).catch(error => {
        console.log(error.message);
      });
    } catch (error) {
      console.log(error.message);
    }
  },[authToken]);
  return (
    <section className="py-16 px-4 sm:px-5 md:px-6 lg:px-8 flex flex-col gap-16">
        <div className="text-center flex flex-col gap-4 items-center">
            <h5 className="font-poppins text-xs md:text-sm font-medium text-accent bg-accent bg-opacity-15 w-fit rounded-2xl p-2">Fyndah</h5>
            <h3 className="font-poppins text-xl md:text-2xl lg:text-3xl font-medium">Featured Listings</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 grid-rows-1 gap-8">
            {featuredBusinesses?.map(({id, org_bio, org_name, business_categories})=>(
              <ListingComponent key={id} logo={businessFeature} cover_image={businessFeature} org_bio={org_bio} org_name={org_name} business_categories={business_categories} />
            ))}
        </div>
    </section>
  )
}

export default FeaturedListings;