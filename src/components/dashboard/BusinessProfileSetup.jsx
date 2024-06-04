import { Input } from "@chakra-ui/react";
import { businessImg, businessImg2 } from "../../assets/images/index";
import { useState, useEffect, useContext } from "react";
// const axios = require('axios')
import axios from "axios";
import Swal from "sweetalert2";
import { AuthContext } from "../context/AuthContext";

const BusinessProfileSetup = () => {
  const [categoryValue, setCategoryValue] = useState("");
  const [subCategoryValue, setSubCategoryValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [description, setDescription] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [logo, setLogo] = useState("");
  const [coverPhoto, setCoverPhoto] = useState("");
  const [instagram, setInstagram] = useState("");
  const [facebook, setFacebook] = useState("");
  const [twitter, setTwitter] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [minimum, setMinimum] = useState("");
  const [maximum, setMaximum] = useState("");
  const [address, setAddress] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [zipCode, setZipCode] = useState("");
  const handleSubCategory = (event) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      subCategoryValue: "",
    }));
    console.log(event.target.value);
    setSubCategoryValue(event.target.value);
  };

  const handleCategory = (event) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      categoryValue: "",
    }));
    setCategoryValue(event.target.value);
    if (event.target.value == "") {
      setSubCategory([]);
      return;
    }
    const foundItem = category.find((item) => item.name === event.target.value);
    setSubCategory(foundItem.sub_units);
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
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setLogo(file);
    setErrors((prevErrors) => ({
      ...prevErrors,
      logo: "",
    }));
  };

  const handleInstagram = (event) => {
    setInstagram(event.target.value);
  };
  const handleFacebook = (event) => {
    setFacebook(event.target.value);
  };
  const handleWhatsApp = (event) => {
    setWhatsapp(event.target.value);
  };
  const handleLinkedin = (event) => {
    setLinkedin(event.target.value);
  };
  const handleTwitter = (event) => {
    setTwitter(event.target.value);
  };
  const handleCoverPhoto = (event) => {
    const file = event.target.files[0];
    setCoverPhoto(file);
    // setErrors((prevErrors) => ({
    //   ...prevErrors,
    //   coverPhoto: "",
    // }));
  };
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
  const handleMinimum = (event) => {
    setMinimum(event.target.value);
  };
  const handleMaximum = (event) => {
    setMaximum(event.target.value);
  };
  const sendProfile = {
    categoryValue: categoryValue,
    subCategoryValue: subCategoryValue,
    emailValue: emailValue,
    description: description,
    websiteUrl: websiteUrl,
    logo: logo,
    coverPhoto: coverPhoto,
    instagram: instagram,
    facebook: facebook,
    twitter: twitter,
    whatsapp: whatsapp,
    linkedin: linkedin,
    minimum: minimum,
    maximum: maximum,
    address: address,
    contactPhone: contactPhone,
    zipCode: zipCode,
  };
  const { authToken } = useContext(AuthContext);
let token ="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FwaS5meW5kYWguY29tL2FwaS92MS9hdXRoL2xvZ2luIiwiaWF0IjoxNzE3NTA2NTA1LCJleHAiOjE3MTc1MTAxMDUsIm5iZiI6MTcxNzUwNjUwNSwianRpIjoidG5zOVlwM2NSRnhmdlBwRSIsInN1YiI6IjU0IiwicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3MDFjNDAwODcyZGI3YTU5NzZmNyJ9.KffxqnXCmw2LuPVFzXoda7uRXpCWBa2oO5gYujZbvVM"
  const [errors, setErrors] = useState({
    categoryValue: "",
    subCategoryValue: "",
    emailValue: "",
    description: "",
    websiteUrl: "",
    logo: "",
    coverPhoto: "",
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
    if (sendProfile.categoryValue.trim() === "") {
      newErrors.categoryValue = "Please choose a Business category!";
    }
    if (sendProfile.subCategoryValue.trim() === "") {
      newErrors.subCategoryValue = "Please choose a Business specified area!";
    }
    if (sendProfile.emailValue.trim() === "") {
      newErrors.emailValue = "Please input an email!";
    }
    if (sendProfile.description.trim() === "") {
      newErrors.description = "Please input a description";
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
    if (sendProfile.contactPhone.trim() === "") {
      newErrors.contactPhone = "please input your contact phone number";
    }
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
            businessCategory: sendProfile.categoryValue,
            businessUbCategory: sendProfile.subCategoryValue,
            contactPhone:sendProfile.contactPhone,
            emailValue:sendProfile.emailValue
          },
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
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
  const [subCategory, setSubCategory] = useState([]);
  const [category, setCategory] = useState([]);
  useEffect(() => {
    axios
      .get("https://api.fyndah.com/api/v1/organization/categories", {
        headers: {
          Accept: "application/json",
        },
      })
      .then(function (response) {
        setCategory(response.data);
      })
      .catch(function (error) {
        console.error("Error fetching data:", error);
      });
  }, []);


  useEffect(() => {
    axios
      .get("https://api.fyndah.com/api/v1/locations/countries", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.error("Error fetching data:", error);
      });
  }, []);
  return (
    <div className="md:grid  items-center">
      {/* <select name="" id="" className="border m-10" onChange={handleSubCategory}>
        <option value="">select subcategory</option>
        {subCategory.map((item) => {
          return (
            <option className="p-10" value={item.name}>
              {item.name}
            </option>
          );
        })}
      </select> */}

      <div className="px-5 py-20 grid items-center justify-center md:px-20">
        <h1>
          Set up your business profile input marked with asteriks are mandatory
        </h1>
        <div className="">
          <form
            className="grid p-5 gap-10 border md:grid-cols-2 lg:grid-cols-3 p-10"
            method="post"
            onSubmit={handleSubmit}>
            <div>
              <label htmlFor="category">Business category* </label> <br />
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
              {errors.categoryValue && (
                <small className="text-red-600 text-[0.75rem] lg:text-[1rem]">
                  {" "}
                  {errors.categoryValue}{" "}
                </small>
              )}
            </div>

            <div>
              <label htmlFor="sub_category">Business focused area* </label>{" "}
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
              {errors.subCategoryValue && (
                <small className="text-red-600 text-[0.75rem] lg:text-[1rem]">
                  {" "}
                  {errors.subCategoryValue}{" "}
                </small>
              )}
            </div>

            <div>
              <label htmlFor="email">Business email* </label> <br />
              <input
                type="email"
                id="email"
                onChange={handleEmail}
                className="border h-10 p-2 rounded-sm w-full mt-1"
                value={emailValue}
                placeholder="email address"
              />
              <br />
              {errors.subCategoryValue && (
                <small className="text-red-600 text-[0.75rem] lg:text-[1rem]">
                  {" "}
                  {errors.emailValue}{" "}
                </small>
              )}
            </div>
            <div>
              <label htmlFor="description">Business description </label> <br />
              <input
                type="text"
                id="description"
                onChange={handleDescription}
                className="border h-10 p-2 rounded-sm w-full mt-1"
                value={description}
                placeholder="business description"
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
            </div>
            <div>
              <label htmlFor="websiteUrl">Business website url </label> <br />
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
              <label htmlFor="logo">Business logo </label>
              <input
                type="file"
                id="logo"
                // name="websiteUrl"
                placeholder="choose a file"
                value={logo}
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
                value={logo}
                onChange={handleCoverPhoto}
                className="border h-10 p-2 rounded-sm w-full mt-1"
              />{" "}
              <br />
            </div>

            <div>
              <label htmlFor="number">Contact number*</label>
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

            <div>
              <label htmlFor="facebook">Facebook url</label>
              <input
                type="url"
                id="facebook"
                placeholder="input your facebook url"
                value={facebook}
                onChange={handleFacebook}
                className="border h-10 p-2 rounded-sm w-full mt-1"
              />
            </div>

            <div>
              <label htmlFor="twitter">Twitter url</label>

              <input
                type="url"
                id="twitter"
                placeholder="input your twitter url"
                value={twitter}
                onChange={handleTwitter}
                className="border h-10 p-2 rounded-sm w-full"
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
            </div>
            <button type="submit">submit</button>
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
