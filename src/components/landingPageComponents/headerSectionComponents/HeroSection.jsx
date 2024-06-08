import { useEffect, useState, useContext } from "react";
import axios from "axios";
import classNames from "classnames";
import { AuthContext } from "../../context/AuthContext";

// 
import { searchQueryCategories, searchQueryRatings, searchQueryBusinessProfiles } from "../../../routes/Navigations";

// icons
import { FaBuilding } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { SearchBusinessProfile, Loading } from "../../uiComponents";

function HeroSection() {
  const { authToken } = useContext(AuthContext);

  // form data
  const [businessName, setBusinessName] = useState("");
  const [businessLocation, setBusinessLocation] = useState("");
  const [businessCategory, setBusinessCategory] = useState("");
  const [businessRating, setBusinessRating] = useState("");
  const [recommendValue, SetRecommendValue] = useState(true);

  const [suggestions, setSuggestions] = useState([]);
  const [previouslySuggestedValue, setPreviouslySuggestedValue] = useState("");
  const [searchResults, setSearchResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const autocompleteApiKey = "17af202f70b44748976eff28573589db";

  // pagination
  const [businesses, setBusinesses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const containsBusinesses = businesses.length > 0;
  const totalPages = Math.ceil(businesses.length / 3);
  const businessesForCurrentPage = businesses.slice((currentPage - 1) * 3, currentPage * 3);

  useEffect(() => {
    if (businessesForCurrentPage.length === 0 && currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1)
    }
  }, [businesses, currentPage, businessesForCurrentPage]);


  // autocomplete useEffect
  useEffect(() => {
    const fetchData = async () => {
      if(businessLocation !== "" && previouslySuggestedValue !== businessLocation){
        
        try {
          const response = await axios.get(`https://api.geoapify.com/v1/geocode/autocomplete?text=${businessLocation}&apiKey=${autocompleteApiKey}`);
          setSuggestions(response.data.features);
        } catch (err) {
          console.log(err.message || 'An error occurred');
        } finally {
          // setLoading(false);
        }
      }
    };
    
    const timerId = setTimeout(fetchData, 300); // Adjust debounce time as needed
    return () => clearTimeout(timerId); // Cleanup timeout on unmount
  },[businessLocation, previouslySuggestedValue])

  const handleSuggestionClick = (selectedSuggestion)=> {
    setBusinessLocation(selectedSuggestion.properties.formatted);
    setPreviouslySuggestedValue(selectedSuggestion.properties.formatted);
    setSuggestions([]);
  }

  const handleOnSubmission = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setBusinesses(searchQueryBusinessProfiles);
      setIsLoading(false);
    }, 3000)

    // try {
    //   const response = await axios.get(`https://api.fyndah.com/api/v1/search?query=${businessName, businessLocation, businessCategory, businessRating}&fields=country,state,org_name`, {
    //     headers: {
    //       'Authorization': `Bearer ${authToken}`,
    //     }
    //   });
    //   console.log(response.data);
    //   setIsLoading(false);
    // } catch (error) {
    //   console.log(error.message);
    //   setIsLoading(false);
    // }
  };
 
  
 
  return (
    <section className="bg-secondary w-full h-full flex flex-col justify-center py-8 px-4 sm:px-5 md:px-6 lg:px-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-xl md:text-4xl text-textDark font-poppins font-bold tracking-wide text-center uppercase">Discover local businesses</h1>
        <p className="text-sm md:text-lg text-textDark font-roboto font-light text-center">Search, connect and thrive.</p>
      </div>
      <form method="post" onSubmit={handleOnSubmission} className="searchBox flex flex-col items-center md:flex-row md:items-start w-full md:max-w-[80%] lg:max-w-[85%] md:mx-auto gap-4 rounded-sm md:rounded-md px-4 md:px-8 py-6 md:py-24 mt-4">
        <div className="flex flex-col items-center gap-4 w-full">
          <div className="flex flex-col items-center md:flex-row gap-4 w-full">
            <div className="flex items-center gap-2 bg-primary bg-opacity-90 backdrop-blur-sm border-b-4  transition-all duration-300 border-accent focus-within:border-accentDark p-2 md:p-4 w-full rounded-sm">
              <FaBuilding className="w-4 h-4 text-textDark text-opacity-70" />
              <input 
                value={businessName}
                onChange={(e)=> setBusinessName(e.target.value)}
                type="text" 
                className="bg-transparent outline-none w-full font-roboto font-light text-textDark placeholder:font-poppins placeholder:text-base placeholder:font-light" 
                placeholder="Business" 
                name="business_name" 
                required
              />
            </div>
            <div className="relative flex items-center gap-2 bg-primary bg-opacity-90 backdrop-blur-sm border-b-4 transition-all duration-300 border-accent focus-within:border-accentDark p-2 md:p-4 w-full rounded-sm">
              <FaLocationDot className="w-4 h-4 text-textDark text-opacity-70" />
              <input 
                value={businessLocation}
                onChange={(e)=> setBusinessLocation(e.target.value)}
                type="text" 
                className="bg-transparent outline-none w-full font-roboto font-light text-textDark placeholder:font-poppins placeholder:text-base placeholder:font-light" 
                placeholder="Country, state/city" 
                name="location" 
                required 
              />
              <ul className="absolute left-0 bottom-0 flex flex-col gap-1 w-full border transform translate-y-[105%] bg-inherit">
                {suggestions.map((suggestion,index)=>(
                  <li key={index} onClick={()=> handleSuggestionClick(suggestion)} className="p-2 w-full hover:bg-accent hover:bg-opacity-70 cursor-pointer">
                    {suggestion.properties.formatted}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="flex  justify-center items-center flex-wrap md:flex-nowrap md:items-start gap-2 w-full">
            <select value={businessCategory} onChange={(e)=> setBusinessCategory(e.target.value)} name="category" className="cursor-pointer w-full md:max-w-[24%] outline-none font-poppins font-light text-base p-1 rounded-md bg-primary bg-opacity-90">
              <option value="" defaultValue="null">Category</option>
              {searchQueryCategories.map((category,index)=>(
                <option key={index} value={category} className="font-poppins font-light text-sm">{category}</option>
              ))}
            </select>
            <select value={businessRating} onChange={(e)=> setBusinessRating(e.target.value)} name="rating" className="cursor-pointer w-full md:max-w-[24%] outline-none font-poppins font-light text-base p-1 rounded-md bg-primary bg-opacity-90">
              <option value="" defaultValue="null">Rating</option>
              {searchQueryRatings.map((rate,index)=>(
                <option key={index} value={rate} className="font-poppins font-light text-sm">{rate}</option>
              ))}
            </select>
            <div className="flex items-center gap-1 md:flex-1 md:justify-end">
              <input type="checkbox" checked={recommendValue} onChange={(e)=> SetRecommendValue(e.target.checked)} id="recommended" className="cursor-pointer w-4 h-4 md:w-5 md:h-5" />
              <label htmlFor="recommended" className="font-poppins text-base cursor-pointer text-primary">Recommend?</label>
            </div>
          </div>
        </div>
        <div className="bg-accent hover:bg-accentDark transition-all duration-300 p-2 md:p-4 rounded-lg cursor-pointer">
          <button type="submit" className="text-primary font-poppins font-light text-base md:text-lg ">Search</button>
        </div>
      </form>
      <div className="w-fit mx-auto my-4">
        {isLoading && <Loading />}
      </div>
      <div className={classNames(containsBusinesses ? "h-full" : "h-0" , "flex flex-col items-center gap-6 mt-4")}>
        {containsBusinesses && businessesForCurrentPage.map((profile,index) => (
            <SearchBusinessProfile 
              key={index}
              businessProfileImg={profile.businessProfileImg}
              businessName={profile.businessName}
              businessTitle={profile.businessTitle}
              businessLocation={profile.businessLocation}  
              businessRating={profile.businessRating}
              businessCategory={profile.businessCategory}
              businessTime={profile.businessTime}
            />
        ))}
          { totalPages > 0 && (
            <div className="flex items-center justify-between gap-4 w-full max-w-[300px] md:max-w-[80%] lg:max-w-[70%]">
                <button className='group disabled:cursor-not-allowed disabled:text-gray-400' onClick={() => setCurrentPage(prevPage => (prevPage > 1 ? prevPage - 1 : 1))} disabled={currentPage === 1}>
                See less
                </button>
                <p className='text-bGrey text-base font-normal'>
                  {currentPage} of {totalPages} pages
                </p>
                <button className='group disabled:cursor-not-allowed disabled:text-gray-400' onClick={() => setCurrentPage(prevPage => prevPage < totalPages ? prevPage + 1 : totalPages)} disabled={currentPage === totalPages}>
                  See more
                </button>
            </div>
          )}
          
      </div>
    </section>
  )
}

export default HeroSection;