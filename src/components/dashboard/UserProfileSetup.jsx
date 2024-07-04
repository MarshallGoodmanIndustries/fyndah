import { userImg } from "../../assets/images/index";
import { Input, useOutsideClick, ListItem, Box, List, Button } from "@chakra-ui/react";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { MdOutlineLocationCity } from "react-icons/md";
import { FaLocationDot, FaMapLocation } from "react-icons/fa6";
import { Checkbox } from "@chakra-ui/react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const UserProfileSetup = () => {
  const [isDropdownVisible, setIsDropdownVisible] = useState({
    country: false,
    state: false,
    cities: false,
  });
  const [countryInput, setCountryInput] = useState("");
  const [stateInput, setStateInput] = useState("");
  const [citiesInput, setCitiesInput] = useState("");
  const [states, setStates] = useState([]);
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const countryRef = useRef();
  const stateRef = useRef();
  const citiesRef = useRef();
  const { authToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const [interests, setInterests] = useState([]);

  const address = `${citiesInput}, ${stateInput}`

  const interestsList = [
    "Food and Cooking",
    "Fashion",
    "Technology",
    "Travel",
    "Sports",
    "Music",
    "Movies and TV Shows",
    "Books and Literature",
    "Art and Photography",
    "Fitness and Wellness",
    "Gaming",
    "Gardening",
    "DIY and Crafts",
    "Pets and Animals",
    "Science and Nature",
    "Finance and Investing",
    "Health and Nutrition",
    "History and Culture",
    "Cars and Motorcycles",
    "Education and Learning",
    "Outdoor Activities (Hiking, Camping, etc.)",
    "Home Improvement",
    "Parenting and Family",
    "Beauty and Skincare",
    "Social Media",
    "Spirituality and Religion",
    "Comedy and Entertainment",
  ];

  const handleCheckboxChange = (interest) => {
    setInterests((prevInterests) => {
      if (prevInterests.includes(interest)) {
        // Remove interest if it's already in the array
        return prevInterests.filter((i) => i !== interest);
      } else {
        // Add interest if it's not in the array
        return [...prevInterests, interest];
      }
    });
  };

  // Hide the country dropdown when clicking outside of the component
  useOutsideClick({
    ref: countryRef,
    handler: () =>
      setIsDropdownVisible((prevState) => ({
        ...prevState,
        country: false,
      })),
  });

  // Hide the state dropdown when clicking outside of the component
  useOutsideClick({
    ref: stateRef,
    handler: () =>
      setIsDropdownVisible((prevState) => ({
        ...prevState,
        state: false,
      })),
  });

  // Hide the cities dropdown when clicking outside of the component
  useOutsideClick({
    ref: citiesRef,
    handler: () =>
      setIsDropdownVisible((prevState) => ({
        ...prevState,
        cities: false,
      })),
  });

  // const handleCountryFocus = () => {
  //   setIsDropdownVisible((prevState) => ({
  //     ...prevState,
  //     country: true,
  //   }));
  // };

  // const handleCountryChange = (e) => {
  //   setCountryInput(e.target.value);
  //   setIsDropdownVisible((prevState) => ({
  //     ...prevState,
  //     country: true,
  //   }));
  // };

  // const handleStateFocus = () => {
  //   setIsDropdownVisible((prevState) => ({
  //     ...prevState,
  //     state: true,
  //   }));
  // };

  // const handleStateChange = (e) => {
  //   setStateInput(e.target.value);
  //   setIsDropdownVisible((prevState) => ({
  //     ...prevState,
  //     state: true,
  //   }));
  // };

  // const handleCitiesFocus = () => {
  //   setIsDropdownVisible((prevState) => ({
  //     ...prevState,
  //     cities: true,
  //   }));
  // };

  // const handleCitiesChange = (e) => {
  //   setCitiesInput(e.target.value);
  //   setIsDropdownVisible((prevState) => ({
  //     ...prevState,
  //     cities: true,
  //   }));
  // };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const countryResponse = await axios.get(
  //         "https://test-api.fyndah.com/api/v1/locations/countries",
  //         {
  //           headers: {
  //             Authorization: `Bearer ${authToken}`,
  //           },
  //         }
  //       );
  //       // console.log(countryResponse.data.countries);
  //       const countryArray = Object.values(countryResponse.data.countries);
  //       setCountries(countryArray);

  //       const stateResponse = await axios.get(
  //         `https://test-api.fyndah.com/api/v1/locations/states/${countryInput}`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${authToken}`,
  //           },
  //         }
  //       );
  //       // console.log(stateResponse.data.states);
  //       setStates(stateResponse.data.states);

  //       const citiesResponse = await axios.get(
  //         `https://test-api.fyndah.com/api/v1/locations/cities/${countryInput}/${stateInput}`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${authToken}`,
  //           },
  //         }
  //       );
  //       // console.log(citiesResponse.data.states);
  //       setCities(citiesResponse.data.states);
  //     } catch (error) {
  //       console.error("Error fetching data", error);
  //     }
  //   };

  //   fetchData();
  // }, [authToken, countryInput, stateInput]);


  // const filteredCountries = countries.filter((country) =>
  //   country.toLowerCase().includes(countryInput.toLowerCase())
  // );
  // const filteredStates = states.filter((state) =>
  //   state.state_name.toLowerCase().includes(stateInput.toLowerCase())
  // );
  // const filteredCities = cities.filter((city) =>
  //   city.city_name.toLowerCase().includes(citiesInput.toLowerCase())
  // );

  // console.log(interests);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://test-api.fyndah.com/api/v1/users/profile",
        {
          country_of_residence: countryInput,
          address: address,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Successful...",
          text: "Account created successfully. Use the Email token for email verification.",
          timer: 2000,
          timerProgressBar: true,
        });
        // console.log("country, state, city", countryInput, stateInput, citiesInput)
        // console.log("My interests: ", interests);
        // console.log("Form submitted", response.data);
        navigate("/dashboard/profile");
      } else {
        throw new Error("Registration failed");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Registration Failed!",
        footer: `<a href="#">Could not set up profile. Please try again later. ${error.message}</a>`,
      });
      console.error(error);
    }
  }



  return (
    <div className="relative ">
      <div className="absolute lg:top-[20%] xl:top-0 top-[35%] left-0">
        <img
          className="w-full h-full object-fill lg:object-contain"
          src={userImg}
          alt=""
        />
        <div className="absolute top-0 left-0 w-full h-full bg-white bg-opacity-80 filter blur-md"></div>
      </div>

      <div className="relative h-full z-3 mx-[1rem] xl:mx-[6rem] lg:mx-[3rem] my-[2rem] lg:mt-[4rem] ">
        <h1 className="text-black font-bold lg:mb-[4rem] mb-[1rem] text-center font-roboto text-[1.1rem] lg:text-[1.5rem]">
          USER ACCOUNT PROFILE SETUP
        </h1>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 font-roboto lg:grid-cols-2 gap-[2rem] lg:gap-[2rem] xl:gap-[4rem]"
          action=""
        >
          {/* BASIC INFORMATION */}
          <div>
            <h2 className="text-accentDark lg:mb-[2rem] mb-[1rem] text-center font-semibold text-[1rem] lg:text-[1.3rem] font-poppins">
              BASIC INFORMATION
            </h2>

            <div className="flex flex-col gap-[1.5rem] lg:gap-[3rem]">
              <p className="text-black uppercase font-medium text-[0.9rem] lg:text-[1.2rem]">
                Location
              </p>

              <div className="flex items-center gap-[1rem]">
                <div className="flex items-center gap-[0.5rem] md:gap-[0.8rem] xl:gap-[1.5rem]">
                  <MdOutlineLocationCity className="md:size-6 size-4" />
                  <label
                    className="text-black font-normal text-[0.9rem] md:text-[1rem] lg:text-[1.2rem]"
                    htmlFor="country"
                  >
                    Country
                  </label>
                </div>

                <Box className="w-full" position="relative" ref={countryRef}>
                  <Input
                    variant="flushed"
                    className="md:text-[1rem] text-[0.8rem] user-profile-input md:placeholder:text-[1rem] placeholder:text-[0.8rem]"
                    placeholder="Enter the name of your Country"
                    // onFocus={handleCountryFocus}
                    onChange={(e) => setCountryInput(e.target.value)}
                    value={countryInput}
                  />
                  {/* {isDropdownVisible.country && (
                    <Box
                      position="absolute"
                      width="100%"
                      mt={2}
                      bg="white"
                      borderWidth="1px"
                      borderRadius="md"
                      boxShadow="md"
                      zIndex="1"
                    >
                      <List>
                        {filteredCountries.map((country, index) => (
                          <ListItem
                            key={index}
                            className="lg:text-[1rem] text-[0.8rem]"
                            px={4}
                            py={2}
                            _hover={{
                              backgroundColor: "gray.100",
                              cursor: "pointer",
                            }}
                            onClick={() => {
                              setCountryInput(country.country_name);
                              setIsDropdownVisible((prevState) => ({
                                ...prevState,
                                country: false,
                              }));
                            }}
                          >
                            {country.country_name}
                          </ListItem>
                        ))}
                      </List>
                    </Box>
                  )} */}
                </Box>
              </div>

              {/* STATE/PROVINCE */}
              <div className="flex items-center gap-[1rem]">
                <div className="flex items-center gap-[0.5rem] md:gap-[0.8rem] xl:gap-[1.5rem]">
                  <FaMapLocation className="md:size-6 size-4" />
                  <label
                    className="text-black font-normal text-[0.9rem] md:text-[1rem] lg:text-[1.2rem]"
                    htmlFor="state"
                  >
                    State
                  </label>
                </div>

                <Box className="w-full" position="relative" ref={stateRef}>
                  <Input
                    variant="flushed"
                    className="md:text-[1rem] text-[0.8rem] user-profile-input md:placeholder:text-[1rem] placeholder:text-[0.8rem]"
                    placeholder="Enter the name of your State"
                    // onFocus={handleStateFocus}
                    onChange={(e) => setStateInput(e.target.value)}
                    value={stateInput}
                  />
                  {/* {isDropdownVisible.state && (
                    <Box
                      position="absolute"
                      width="100%"
                      mt={2}
                      bg="white"
                      borderWidth="1px"
                      borderRadius="md"
                      boxShadow="md"
                      zIndex="1"
                    >
                      <List>
                        {filteredStates.map((state, index) => (
                          <ListItem
                            key={index}
                            className="lg:text-[1rem] text-[0.8rem]"
                            px={4}
                            py={2}
                            _hover={{
                              backgroundColor: "gray.100",
                              cursor: "pointer",
                            }}
                            onClick={() => {
                              setStateInput(state.state_name);
                              setIsDropdownVisible((prevState) => ({
                                ...prevState,
                                state: false,
                              }));
                            }}
                          >
                            {state.state_name}
                          </ListItem>
                        ))}
                      </List>
                    </Box>
                  )} */}
                </Box>
              </div>

              {/* CITIES*/}
              <div className="flex items-center gap-[1rem]">
                <div className="flex items-center gap-[0.5rem] md:gap-[0.8rem] xl:gap-[1.5rem]">
                  <FaLocationDot className="md:size-6 size-4" />
                  <label
                    className="text-black font-normal text-[0.9rem] md:text-[1rem] lg:text-[1.2rem]"
                    htmlFor="cities"
                  >
                    City
                  </label>
                </div>

                <Box className="w-full " position="relative" ref={citiesRef}>
                  <Input
                    className="md:text-[1rem] text-[0.8rem] user-profile-input md:placeholder:text-[1rem] placeholder:text-[0.8rem]"
                    variant="flushed"
                    placeholder="Enter the name of your city"
                    // onFocus={handleCitiesFocus}
                    onChange={(e) => setCitiesInput(e.target.value)}
                    value={citiesInput}
                  />
                  {/* {isDropdownVisible.cities && (
                    <Box
                      position="absolute"
                      width="100%"
                      mt={2}
                      bg="white"
                      borderWidth="1px"
                      borderRadius="md"
                      boxShadow="md"
                      zIndex="1"
                    >
                      <List>
                        {filteredCities.map((city, index) => (
                          <ListItem
                            key={index}
                            className="lg:text-[1rem] text-[0.8rem]"
                            px={4}
                            py={2}
                            _hover={{
                              backgroundColor: "gray.100",
                              cursor: "pointer",
                            }}
                            onClick={() => {
                              setCitiesInput(city.city_name);
                              setIsDropdownVisible((prevState) => ({
                                ...prevState,
                                cities: false,
                              }));
                            }}
                          >
                            {city.city_name}
                          </ListItem>
                        ))}
                      </List>
                    </Box>
                  )} */}
                </Box>
              </div>
            </div>
          </div>

          {/* USER INTERESTS */}
          <div>
            <h2 className="text-accentDark lg:mb-[2rem] mb-[1rem] text-center font-semibold text-[1rem] lg:text-[1.3rem] font-poppins">
              USER INTERESTS
            </h2>

            {/* OPTIONS */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-[1rem]">
              {interestsList.map((interest, index) => (
                <Checkbox
                  border="orange"
                  className="text-black checkbox font-roboto text-[0.5rem] lg:text-[1.3rem] font-normal"
                  key={index}
                  // fontSize="smaller"
                  onChange={() => handleCheckboxChange(interest)}
                  isChecked={interests.includes(interest)}
                  colorScheme="orange"
                >
                  {interest}
                </Checkbox>
              ))}
            </div>
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserProfileSetup;
