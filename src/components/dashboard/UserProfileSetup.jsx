import { userImg } from "../../assets/images/index";
import {
  Input,
  useOutsideClick,
  ListItem,
  Box,
  List,
} from "@chakra-ui/react";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

const UserProfileSetup = () => {
  const [isDropdownVisible, setIsDropdownVisible] = useState({
    country: false,
    state: false,
  });
  const [countryInput, setCountryInput] = useState("");
  const [stateInput, setStateInput] = useState("");
  const [states, setStates] = useState([]);
  const [countries, setCountries] = useState([]);
  const countryRef = useRef();
  const stateRef = useRef();
  const { authToken } = useContext(AuthContext);

  // Hide the country dropdown when clicking outside of the component
  useOutsideClick({
    ref: countryRef,
    handler: () => setIsDropdownVisible((prevState) => ({
      ...prevState,
      country: false,
    })),
  });

  // Hide the state dropdown when clicking outside of the component
  useOutsideClick({
    ref: stateRef,
    handler: () => setIsDropdownVisible((prevState) => ({
      ...prevState,
      state: false,
    })),
  });

  const handleCountryFocus = () => {
    setIsDropdownVisible((prevState) => ({
      ...prevState,
      country: true,
    }));
  };

  const handleCountryChange = (e) => {
    setCountryInput(e.target.value);
    setIsDropdownVisible((prevState) => ({
      ...prevState,
      country: true,
    }));
  };

  const handleStateFocus = () => {
    setIsDropdownVisible((prevState) => ({
      ...prevState,
      state: true,
    }));
  };

  const handleStateChange = (e) => {
    setStateInput(e.target.value);
    setIsDropdownVisible((prevState) => ({
      ...prevState,
      state: true,
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const countryResponse = await axios.get(
          "https://api.fyndah.com/api/v1/locations/countries",
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        console.log(countryResponse.data);
        setCountries(countryResponse.data);

        const stateResponse = await axios.get(
          `https://api.fyndah.com/api/v1/locations/states/${countryInput}`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        console.log(stateResponse.data);
        setStates(stateResponse.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, [authToken, countryInput]);

  const filteredCountries = countries.filter((country) =>
    country.country_name.toLowerCase().includes(countryInput.toLowerCase())
  );
  const filteredStates = states.filter((state) =>
    state.state_name.toLowerCase().includes(stateInput.toLowerCase())
  );

  return (
    <div className="relative ">
      <div className="absolute top-0 left-0">
        <img className="w-full h-full object-contain" src={userImg} alt="" />
        <div className="absolute top-0 left-0 w-full h-full bg-white bg-opacity-90 filter blur-md"></div>
      </div>

      <div className="relative z-10 mx-[6rem] my-[4rem] ">
        <h1 className="text-black font-bold mb-[4rem] text-center font-roboto text-[1.5rem]">
          USER ACCOUNT PROFILE SETUP
        </h1>

        <form className="grid grid-cols-1 lg:grid-cols-2 gap-[2rem]" action="">
          {/* BASIC INFORMATION */}
          <div>
            <h2 className="text-accentDark mb-[2rem] font-semibold text-[1.3rem] text-center font-poppins">
              BASIC INFORMATION
            </h2>

            <div className="flex flex-col gap-[1rem]">
              <p className="text-black uppercase font-medium text-[1.2rem]">
                Location
              </p>

              <div className="flex items-center gap-[1rem]">
                <label
                  className="text-black font-normal text-[1.2rem]"
                  htmlFor="country"
                >
                  Country
                </label>

                <Box className="w-full" position="relative" ref={countryRef}>
                  <Input
                    variant="flushed"
                    placeholder="Enter the name of your Country"
                    onFocus={handleCountryFocus}
                    onChange={handleCountryChange}
                    value={countryInput}
                  />
                  {isDropdownVisible.country && (
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
                  )}
                </Box>
              </div>

              {/* STATE/PROVINCE */}
              <div className="flex items-center gap-[1rem]">
                <label
                  className="text-black font-normal text-[1.2rem]"
                  htmlFor="state"
                >
                  State/Province
                </label>

                <Box className="w-full" position="relative" ref={stateRef}>
                  <Input
                    variant="flushed"
                    placeholder="Enter the name of your State"
                    onFocus={handleStateFocus}
                    onChange={handleStateChange}
                    value={stateInput}
                  />
                  {isDropdownVisible.state && (
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
                  )}
                </Box>
              </div>
            </div>
          </div>

          {/* USER INTERESTS */}
          <div>
            <h2 className="text-accentDark font-semibold text-[1.3rem] text-center font-poppins">
              USER INTERESTS
            </h2>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserProfileSetup;
