import { Input } from "@chakra-ui/react";
import { businessImg, businessImg2 } from "../../assets/images/index";
import { useState, useEffect, useContext } from "react";
import Test from "./Test";
// const axios = require('axios')
import axios from "axios";
import Swal from "sweetalert2";
import { AuthContext } from "../context/AuthContext";
import { Country, State, City } from "country-state-city";

const BusinessProfileSetup = () => {
  const [categoryValue, setCategoryValue] = useState("");
  const [subCategoryValue, setSubCategoryValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [description, setDescription] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  //   const [logo, setLogo] = useState("");
  //   const [coverPhoto, setCoverPhoto] = useState("");
  //   const [instagram, setInstagram] = useState("");
  //   const [facebook, setFacebook] = useState("");
  //   const [twitter, setTwitter] = useState("");
  //   const [whatsapp, setWhatsapp] = useState("");
  //   const [linkedin, setLinkedin] = useState("");
  //   const [minimum, setMinimum] = useState("");
  //   const [maximum, setMaximum] = useState("");
  const [address, setAddress] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [subdomain, SetSubdomain] = useState("");
  const [orgBio, setOrgBio] = useState("");
  const [getSelectCategory, setGetCategory] = useState([]);
  const [getSelectSubCategory, setSelectedCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [category, setCategory] = useState([]);
  const [size, setSize] = useState("");
  // console.log(get);
  const handleCategory = (event) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      category: [],
    }));
    setCategoryValue(event.target.value);
    if (event.target.value == "") {
      setSubCategory([]);
      return;
    }
    const foundItem = category.find((item) => item.name == event.target.value);
    setGetCategory(foundItem);
    setSubCategory(foundItem.sub_units);
  };
  const handleSubCategory = (event) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      subCategory: [],
    }));
    console.log(event.target.value);
    const foundItem = subCategory.find(
      (item) => item.name == event.target.value
    );
    setSelectedCategory(foundItem);
    setSubCategoryValue(event.target.value);
  };
  const handleEmail = (event) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      emailValue: "",
    }));
    setEmailValue(event.target.value);
  };

  const handleWebsiteUrl = (event) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      websiteUrl: "",
    }));
    setWebsiteUrl(event.target.value);
  };

  const handleDescription = (event) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      description: "",
    }));
    setDescription(event.target.value);
    SetSubdomain(event.target.value);
  };
  //   const handleFileChange = (event) => {
  //     const file2 = event.target.files[0];
  //     setLogo(file2);
  //     // setErrors((prevErrors) => ({
  //     //   ...prevErrors,
  //     //   logo: "",
  //     // }));
  //   };
  //   const handleCoverPhoto = (event) => {
  //     const file = event.target.files[0];
  //     setCoverPhoto(file);
  //     // setErrors((prevErrors) => ({
  //     //   ...prevErrors,
  //     //   coverPhoto: "",
  //     // }));
  //   };

  //   const handleInstagram = (event) => {
  //     setInstagram(event.target.value);
  //   };
  //   const handleFacebook = (event) => {
  //     setFacebook(event.target.value);
  //   };
  //   const handleWhatsApp = (event) => {
  //     setWhatsapp(event.target.value);
  //   };
  //   const handleLinkedin = (event) => {
  //     setLinkedin(event.target.value);
  //   };
  //   const handleTwitter = (event) => {
  //     setTwitter(event.target.value);
  //   };

  const handleContact = (event) => {
    setContactPhone(event.target.value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      contactPhone: "",
    }));
  };

  const handleZipCode = (event) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      zipCode: "",
    }));
    setZipCode(event.target.value);
  };
  const handleAddress = (event) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      address: "",
    }));
    setAddress(event.target.value);
  };
  const handleOrgBio = (event) => {
    setOrgBio(event.target.value);
  };
  const handleOrgSize = (event) => {
    setSize(event.target.value);
  };
  //   const handleMinimum = (event) => {
  //     setMinimum(event.target.value);
  //   };
  //   const handleMaximum = (event) => {
  //     setMaximum(event.target.value);
  //   };
let token1="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FwaS5meW5kYWguY29tL2FwaS92MS9hdXRoL2xvZ2luIiwiaWF0IjoxNzE3NjE3NTc4LCJleHAiOjE3MTc2MjExNzgsIm5iZiI6MTcxNzYxNzU3OCwianRpIjoiNEtQRG84TzhQVVkzQU1ETSIsInN1YiI6IjU0IiwicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3MDFjNDAwODcyZGI3YTU5NzZmNyJ9.I-UyPXmKyhVLLYi5dtzwCEX94Ft6SFU5_JEWOhBOzsA"
  const sendProfile = {
    business_category_ids: getSelectCategory,
    business_unit_ids: getSelectSubCategory,
    email: emailValue,
    website: websiteUrl,
    org_name: description,
    address: address,
    phone: contactPhone,
    zip_code: zipCode,
    subdomain: subdomain,
    org_bio: orgBio,
    industry: "industry",
    size: size,
    country: "nigeria",
    state: "lagos",
    city: "ikeja",
    long:"20.1",
    lat:"40.55"
  };
  // console.log(sendProfile);
  const log = () => {
    console.log(sendProfile);
  };
  const { authToken } = useContext(AuthContext);
  console.log(authToken);
  const [errors, setErrors] = useState({
    getSelectCategory: "",
    getSelectSubCategory: "",
    subCategoryValue: "",
    emailValue: "",
    description: "",
    websiteUrl: "",
    subdomain: "",
    // logo: "",
    // coverPhoto: "",
    // instagram: "",
    // facebook: "",
    // twitter: "",
    // whatsapp: "",
    // linkedin: "",
    // minimum: "",
    // maximum: "",
    address: "",
    contactPhone: "",
    ZIpCode: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    // if (!Array.isArray(sendProfile.business_category_ids)) {
    //     sendProfile.business_category_ids = [];
    //   }
    //   if (!Array.isArray(sendProfile.business_unit_ids)) {
    //     sendProfile.business_unit_ids = [];
    //   }
    if (sendProfile.business_category_ids == []) {
      newErrors.getSelectCategory = "Please choose an organization category!";
    }
    if (sendProfile.business_unit_ids == []) {
      newErrors.getSelectSubCategory =
        "Please choose an organization  specified area!";
    }
    if (sendProfile.email.trim() === "") {
      newErrors.emailValue = "Please input an email!";
    }
    if (sendProfile.org_name.trim() === "") {
      newErrors.description = "Please input organization name";
      newErrors.subdomain =
        "Please input organization name to update subdomain";
    }
    if (sendProfile.phone.trim() === "") {
      newErrors.contactPhone = "Please input contact number";
    }
    // if (sendProfile.websiteUrl.trim() === "") {
    //     newErrors.websiteUrl = "website url is required";
    //   }
    //   if (sendProfile.logo.trim() === "") {
    //     newErrors.logo = "choose a logo";
    //   }
    //   if (sendProfile.coverPhoto.trim() === "") {
    //     newErrors.coverPhoto= "choose a cover photo";
    //   }
    // if (sendProfile.contactPhone.trim() === "") {
    //   newErrors.contactPhone = "please input your contact phone number";
    // }
    //   if (sendProfile.zipCode.trim() === "") {
    //     newErrors.ZIpCode= "please input location Zipcode";
    //   }
    //   if (sendProfile.address.trim() === "") {
    //     newErrors.address= "address is required";
    //   }
    if (Object.values(newErrors).some((error) => error !== "")) {
      setErrors(newErrors);
      window.scrollTo(0, 0);
    } else {
      try {
        const response = await axios.post(
          "https://api.fyndah.com/api/v1/organization/create",
          {
            // businessCategory: sendProfile.categoryValue,
            // businessUbCategory: sendProfile.subCategoryValue,
            // contactPhone: sendProfile.contactPhone,
            // emailValue: sendProfile.emailValue,
            business_category_ids: getSelectCategory,
            business_unit_ids: getSelectSubCategory,
            email: emailValue,
            website: websiteUrl,
            org_name: description,
            address: address,
            phone: contactPhone,
            zip_code: zipCode,
            subdomain: subdomain,
            org_bio: orgBio,
            // industry: "industry",
            country: "nigeria",
            state: "lagos",
            city: "ikeja",
            size: size,
            // state_name
          },
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token1}`,
            },
          }
        );
        console.log("success");

        if (response.data.status == "success") {
          Swal.fire({
            icon: "success",
            title: "Successful...",
            text: "Business profile setup was successful.",
            timer: 2000,
            timerProgressBar: true,
          });
          console.log("Form submitted", sendProfile);
          //   navigate("/dashboard");
        } else {
          throw new Error("unable to submit your business profile");
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Business profile setup failed !",
          footer: `<a href="#">Could not set up your business profile. Please try again later. ${error.message}</a>`,
        });
        console.error(error);
      }
    }
  };

  useEffect(() => {
    axios
      .get("https://api.fyndah.com/api/v1/organization/categories", {
        headers: {
          Accept: "application/json",
        },
      })
      .then(function (response) {
        setCategory(response.data);
        console.log(response.data);
      })
      .catch(function (error) {
        console.error("Error fetching data:", error);
      });
  }, []);
  //
  const [country, setCountry] = useState(Country.getAllCountries());
  //   console.log(State.getAllStates())
  const [s, setS] = useState([]);

  //   const find=()=>{
  //     let newState=country.find((item)=>item.isoCode)
  //   }

  const [countryValue, setCountryValue] = useState("");
  console.log(countryValue);

  //   console.log(country_name);
  //   const [state, setState] = useState([]);
  //   console.log(state);

  //  console.log(state_name);
  const handleCountryChange = (event) => {
    console.log(event.target.value);
    setCountryValue(event.target.value);

    let newC = country.find((item) => item.name == event.target.value);
    console.log(newC);
  };
  //   useEffect(() => {
  //     axios
  //       .get("https://api.fyndah.com/api/v1/locations/countries", {
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${authToken}`,
  //         },
  //       })
  //       .then(function (response) {
  //         // console.log(response.data);
  //         setCountry(response.data);
  //       })
  //       .catch(function (error) {
  //         console.error("Error fetching data:", error);
  //       });
  //   }, []);
  //   useEffect(() => {
  //     axios
  //       .get("https://api.fyndah.com/api/v1/locations/states/"+country_name, {
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${authToken}`,
  //         },
  //       })
  //       .then(function (response) {
  //         console.log(response.data);
  //         // setCountry(response.data)
  //         setState(response.data);
  //       })
  //       .catch(function (error) {
  //         console.error("Error fetching data:", error);
  //       });
  //   }, []);

  //   console.log(Country.getAllCountries())
  //   const [allCountries,]

  return (
    <div className="md:grid  items-center bg-secondary p-10">


        <Test />
      <div className="px-5 py-5 grid items-center justify-center md:px-20 bg-gradient-to-r ">
        <div className="p-5 rounded-lg shadow-lg border">
          <h1 className="text-2xl text-accent mb-4">
            Set up your business profile input marked with asteriks* are
            mandatory
          </h1>
          <form
            className="z-30 py-4 rounded shadow-md bg-white grid p-5 gap-10 border md:grid-cols-2 lg:grid-cols-3 items-center p-10"
            method="post"
            onSubmit={handleSubmit}>
            {/* <select name="" id="" onChange={handleCountryChange}>
                <option value="">choose a country</option>
                {country.map((item)=>{

                    return <option value={item.name}>  {item.name} </option> 
                })}
              
               </select> */}
            <div>
              <label htmlFor="category">organization category* </label> <br />
              <select
                id="category"
                className="border h-10 p-2 rounded-sm w-full mt-1"
                onChange={handleCategory}>
                <option value="">select a business category</option>
                {category.map((item) => {
                  return (
                    <option className="p-10" value={item.name}>
                      {item.name}
                    </option>
                  );
                })}
              </select>{" "}
              <br />
              {errors.getSelectCategory && (
                <small className="text-red-600 text-[0.75rem] lg:text-[1rem]">
                  {" "}
                  {errors.getSelectCategory}{" "}
                </small>
              )}
            </div>

            <div>
              <label htmlFor="sub_category">organization focused area* </label>{" "}
              <br />
              <select
                id="sub_category"
                className="border h-10 p-2 rounded-sm w-full mt-1"
                onChange={handleSubCategory}>
                <option value="">select business specified area</option>
                {subCategory.map((item) => {
                  return (
                    <option className="p-10" value={item.name}>
                      {item.name}
                    </option>
                  );
                })}
              </select>{" "}
              <br />
              {errors.getSelectSubCategory && (
                <small className="text-red-600 text-[0.75rem] lg:text-[1rem]">
                  {" "}
                  {errors.getSelectSubCategory}{" "}
                </small>
              )}
            </div>

            <div>
              <label htmlFor="email">organization email* </label> <br />
              <input
                type="email"
                id="email"
                onChange={handleEmail}
                className="border h-10 p-2 rounded-sm w-full mt-1"
                value={emailValue}
                placeholder="email address"
              />
              <br />
              {errors.emailValue && (
                <small className="text-red-600 text-[0.75rem] lg:text-[1rem]">
                  {" "}
                  {errors.emailValue}{" "}
                </small>
              )}
            </div>
            <div>
              <label htmlFor="description">organization name* </label> <br />
              <input
                type="text"
                id="description"
                onChange={handleDescription}
                className="border h-10 p-2 rounded-sm w-full mt-1"
                value={description}
                placeholder="organization name"
              />
              <br />
              {errors.description && (
                <small className="text-red-600 text-[0.75rem] lg:text-[1rem]">
                  {" "}
                  {errors.description}{" "}
                </small>
              )}
            </div>

            <div>
              <label htmlFor="size">organization size </label> <br />
              <input
                type="number"
                id="size"
                onChange={handleOrgSize}
                className="border h-10 p-2 rounded-sm w-full mt-1"
                value={size}
                placeholder="organization size eg:10,20"
              />
            </div>

            <div>
              <label htmlFor="subdomain">subdomain* </label> <br />
              <input
                type="text"
                id="subdomain"
                onChange={handleDescription}
                className="border h-10 p-2 rounded-sm w-full mt-1"
                value={subdomain}
                placeholder="subdomain"
              />
              <br />
              {errors.description && (
                <small className="text-red-600 text-[0.75rem] lg:text-[1rem]">
                  {" "}
                  {errors.subdomain}{" "}
                </small>
              )}
            </div>

            {/* <div>
              <label htmlFor="minimum">Business service minimum price </label>{" "}
              <br />
              <input
                type="number"
                id="minimum"
                onChange={handleMinimum}
                className="border h-10 p-2 rounded-sm w-full mt-1"
                value={minimum}
                placeholder="business minimum charge"
              />
              <br />
            </div>
            <div>
              <label htmlFor="maximum">Business service maximum price </label>{" "}
              <br />
              <input
                type="number"
                id="maximum"
                onChange={handleMaximum}
                className="border h-10 p-2 rounded-sm w-full mt-1"
                value={maximum}
                placeholder="business maximum charge"
              />
              <br />
            </div> */}
            <div>
              <label htmlFor="websiteUrl">organization website url </label>{" "}
              <br />
              <input
                type="url"
                id="websiteUrl"
                placeholder="website url"
                value={websiteUrl}
                onChange={handleWebsiteUrl}
                className="border h-10 p-2 rounded-sm w-full mt-1"
              />{" "}
              <br />
              {/* {errors.websiteUrl && (
                <small className="text-red-600 text-[0.75rem] lg:text-[1rem]">
                  {" "}
                  {errors.websiteUrl}{" "}
                </small>
              )} */}
            </div>

            <div>
              <label htmlFor="bio">organization Bio </label> <br />
              <input
                type="text"
                id="bio"
                placeholder="org bio"
                value={orgBio}
                onChange={handleOrgBio}
                className="border h-10 p-2 rounded-sm w-full mt-1"
              />{" "}
              <br />
              {/* {errors.websiteUrl && (
                <small className="text-red-600 text-[0.75rem] lg:text-[1rem]">
                  {" "}
                  {errors.websiteUrl}{" "}
                </small>
              )} */}
            </div>

            {/* <div>
              <label htmlFor="logo">Business logo </label>
              <input
                type="file"
                id="logo"
                // name="websiteUrl"
                placeholder="choose a file"
                // value={logo}
                onChange={handleFileChange}
                className="border h-10 p-2 rounded-sm w-full mt-1"
              />{" "}
              <br />
            </div>

            <div>
              <label htmlFor="cover">Choose a cover photo</label>
              <input
                type="file"
                id="cover"
                // name="websiteUrl"
                placeholder="choose a file"
                // value={coverPhoto}
                onChange={handleCoverPhoto}
                className="border h-10 p-2 rounded-sm w-full mt-1"
              />{" "}
              <br />
            </div> */}

            <div>
              <label htmlFor="number">contact number*</label>
              <input
                type="number"
                id="number"
                value={contactPhone}
                // name="websiteUrl"
                placeholder="input your contact number"
                // value={contactPhone}
                onChange={handleContact}
                className="border h-10 p-2 rounded-sm w-full mt-1"
              />{" "}
              <br />
              {errors.contactPhone && (
                <small className="text-red-600 text-[0.75rem] lg:text-[1rem]">
                  {" "}
                  {errors.contactPhone}{" "}
                </small>
              )}
            </div>

            <div>
              <label htmlFor="zipcode">Zip code</label>
              <input
                type="number"
                id="zipcode"
                placeholder="input your zipCode"
                value={zipCode}
                onChange={handleZipCode}
                className="border h-10 p-2 rounded-sm w-full mt-1"
              />{" "}
              <br />
            </div>
            <div>
              <label htmlFor="address">Address</label>
              <input
                type="text"
                id="address"
                placeholder="input your address"
                value={address}
                onChange={handleAddress}
                className="border h-10 p-2 rounded-sm w-full mt-1"
              />{" "}
              <br />
            </div>

            {/* <div>
              <label htmlFor="facebook">Facebook url</label>
              <input
                type="url"
                id="facebook"
                placeholder="input your facebook url"
                value={facebook}
                onChange={handleFacebook}
                className="border h-10 p-2 rounded-sm w-full mt-1"
              />
            </div> */}

            {/* <div>
              <label htmlFor="twitter">Twitter url</label>

              <input
                type="url"
                id="twitter"
                placeholder="input your twitter url"
                value={twitter}
                onChange={handleTwitter}
                className="border h-10 p-2 rounded-sm w-full mt-1"
              />
            </div>
            <div>
              <label htmlFor="whatsapp">WhatsApp url</label>

              <input
                id="whatsapp"
                type="url"
                placeholder="input your whatsApp url"
                value={whatsapp}
                onChange={handleWhatsApp}
                className="border h-10 p-2 rounded-sm w-full mt-1"
              />
            </div>
            <div>
              <label htmlFor="instagram">Instagram url</label>

              <input
                type="url"
                id="instagram"
                placeholder="input your instagram url "
                value={instagram}
                onChange={handleInstagram}
                className="border h-10 p-2 rounded-sm w-full mt-1"
              />
            </div>
            <div>
              <label htmlFor="linkedin">Linkedin url</label>

              <input
                type="url"
                id="linkedin"
                placeholder="input your linkedin url"
                value={linkedin}
                onChange={handleLinkedin}
                className="border h-10 p-2 rounded-sm w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-200 ease-in-out
                "
              />
            </div> */}
            <div>
              <label htmlFor="#" className="hidden"></label> <br />
              <button
                onClick={log}
                type="submit"
                className="border text-accent bg-black font-bold rounded-sm h-10 p-2 rounded-sm w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-200 ease-in-out">
                submit
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* <div className="col-span-2">
    <img src={businessImg} alt="" className="w-full h-auto" />
    </div> */}
      {/* <img src={businessImg2} alt="" /> */}
    </div>
  );
};

export default BusinessProfileSetup;
