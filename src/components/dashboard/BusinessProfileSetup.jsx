import { useState, useEffect, useContext } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const BusinessProfileSetup = () => {
  // const [businessId, setBusinessId] = useState("")
  const [inputValues, setInputValues] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    country: "",
    zipCode: "",
    bio: "",
    subDomain: "",
    website: "",
    size: "",
    industry: "",
    business_category_id: [],
    business_unit_id: [],
  });
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [subCategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    city: "",
    state: "",
    country: "",
    bio: "",
    industry: "",
    phone: "",
    business_category_id: [],
    business_unit_id: [],
  });
  const { authToken, setBusinessId } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://api.fyndah.com/api/v1/organization/categories", {
        headers: {
          Accept: "application/json",
        },
      })
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleCategoryChange = (e) => {
    const categoryId = e.target.value;
    setSelectedCategory(categoryId);
    const category = categories.find((cat) => cat.id === parseInt(categoryId));
    setSubCategories(category ? category.sub_units : []);
    setInputValues((prevValues) => ({
      ...prevValues,
      business_category_id: [categoryId],
      business_unit_id: [],
    }));
  };

  const handleSubCategoryChange = (e) => {
    const subCategoryId = e.target.value;
    setInputValues((prevValues) => ({
      ...prevValues,
      business_unit_id: [subCategoryId],
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setInputValues({
      ...inputValues,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (inputValues.business_category_id.length === 0) {
      newErrors.getSelectCategory = "Please choose an organization category!";
    }
    if (inputValues.business_unit_id.length === 0) {
      newErrors.getSelectSubCategory =
        "Please choose an organization specified area!";
    }
    if (inputValues.name.trim() === "") {
      newErrors.name = "Please enter your business name!";
    }
    if (inputValues.email.trim() === "") {
      newErrors.email = "Please enter your business email!";
    }
    if (inputValues.city.trim() === "") {
      newErrors.city = "Please enter your business city!";
    }
    if (inputValues.state.trim() === "") {
      newErrors.state = "Please enter your business state!";
    }
    if (inputValues.country.trim() === "") {
      newErrors.country = "Please enter your business country!";
    }
    if (inputValues.bio.trim() === "") {
      newErrors.bio = "Please enter your business bio!";
    }
    if (inputValues.industry.trim() === "") {
      newErrors.industry = "Please enter your business industry!";
    }
    if (inputValues.phone.trim() === "") {
      newErrors.phone = "Please enter your business phone number!";
    }

    if (Object.values(newErrors).some((error) => error !== "")) {
      setErrors(newErrors);
      window.scrollTo(0, 0);
    } else {
      try {
        setLoading(true); // Set loading state to prevent multiple submissions
        const response = await axios.post(
          "https://api.fyndah.com/api/v1/organization/create",
          {
            org_name: inputValues.name,
            org_bio: inputValues.bio,
            subdomain: inputValues.subDomain,
            address: inputValues.address,
            city: inputValues.city,
            state: inputValues.state,
            zip_code: inputValues.zipCode,
            country: inputValues.country,
            phone: inputValues.phone,
            email: inputValues.email,
            website: inputValues.website,
            size: inputValues.size,
            industry: inputValues.industry,
            business_category_ids: inputValues.business_category_id,
            business_unit_ids: inputValues.business_unit_id,
            lat: "-36.2182",
            long: "5.0630",
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        console.log("Response:", response.data);

        console.log("Form data submitted: ", inputValues);

        if (response.status == 201) {
          const businesssId = response.data.data.organization.id;
          console.log("Business Id", businesssId);
          setBusinessId(businesssId);
          Swal.fire({
            icon: "success",
            title: "Successful...",
            text: "Business profile setup was successful.",
            timer: 2000,
            timerProgressBar: true,
          });
          navigate('/dashboard/mybusiness');
        } else {
          throw new Error("Unable to submit your business profile");
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Business profile setup failed!",
          footer: `<a href="#">Could not set up your business profile. ${error.response?.data.message}. Please try again.</a>`,
        });
        console.error("Error response:", error.response?.data); // Log the full error response
      } finally {
        setLoading(false); // Reset loading state
      }
    }
  };

  return (
    <div className="md:grid items-center bg-secondary p-0 xl:p-10">
      <div className="grid items-center justify-center xl:px-20 bg-gradient-to-r">
        <div className="p-5 rounded-lg shadow-lg border">
          <h1 className="text-center text-red-500 text-sm mb-4">
            Set up your business profile input marked with asterisks* are
            mandatory
          </h1>
          <form
            className="z-30 py-4 rounded shadow-md bg-white grid p-5 gap-10 border md:grid-cols-2 lg:grid-cols-3 items-center"
            method="post"
            onSubmit={handleSubmit}
          >
            {/* NAME */}
            <div>
              <label htmlFor="name">
                Business Name <span className="text-red-500 ml-2">*</span>{" "}
              </label>{" "}
              <br />
              <input
                name="name"
                type="text"
                onChange={handleChange}
                className="border h-10 p-2 rounded-sm w-full mt-1"
                value={inputValues.name}
                placeholder="Enter Business Name"
              />
              <br />
              {errors.name && (
                <p className="text-red-600 text-[0.75rem] lg:text-[1rem]">
                  {" "}
                  {errors.name}{" "}
                </p>
              )}
            </div>

            {/* CATEGORY */}
            <div>
              <label htmlFor="category">
                Organization Category{" "}
                <span className="text-red-500 ml-2">*</span>{" "}
              </label>{" "}
              <br />
              <select
                className="border h-10 p-2 rounded-sm w-full mt-1"
                name="business_category_id"
                value={inputValues.business_category_id[0] || ""}
                onChange={handleCategoryChange}
              >
                <option value="">Select a business category</option>
                {categories.map((category) => (
                  <option
                    key={category.id}
                    value={category.id}
                    className="p-10"
                  >
                    {category.name}
                  </option>
                ))}
              </select>
              <br />
              {errors.business_category_id && (
                <small className="text-red-600 text-[0.75rem] lg:text-[1rem]">
                  {errors.business_category_id}
                </small>
              )}
            </div>

            {/* EMAIL */}
            <div>
              <label htmlFor="email">
                Business Email <span className="text-red-500 ml-2">*</span>{" "}
              </label>{" "}
              <br />
              <input
                name="email"
                type="email"
                onChange={handleChange}
                className="border h-10 p-2 rounded-sm w-full mt-1"
                value={inputValues.email}
                placeholder="Enter Business Email"
              />
              <br />
              {errors.email && (
                <p className="text-red-600 text-[0.75rem] lg:text-[1rem]">
                  {" "}
                  {errors.email}{" "}
                </p>
              )}
            </div>

            {/* SUBCATEGORY */}
            <div>
              <label htmlFor="subcategory">
                Specified Area <span className="text-red-500 ml-2">*</span>{" "}
              </label>{" "}
              <br />
              <select
                name="business_unit_id"
                value={inputValues.business_unit_id[0] || ""}
                onChange={handleSubCategoryChange}
                className="border h-10 p-2 rounded-sm w-full mt-1"
              >
                <option value="">Select a subcategory</option>
                {subCategories.map((subCategory) => (
                  <option
                    key={subCategory.id}
                    value={subCategory.id}
                    className="p-10"
                  >
                    {subCategory.name}
                  </option>
                ))}
              </select>
              <br />
              {errors.business_unit_id && (
                <small className="text-red-600 text-[0.75rem] lg:text-[1rem]">
                  {errors.business_unit_id}
                </small>
              )}
            </div>

            {/* CITY */}
            <div>
              <label htmlFor="city">
                City <span className="text-red-500 ml-2">*</span>{" "}
              </label>{" "}
              <br />
              <input
                name="city"
                type="text"
                onChange={handleChange}
                className="border h-10 p-2 rounded-sm w-full mt-1"
                value={inputValues.city}
                placeholder="Enter Business City"
              />
              <br />
              {errors.city && (
                <p className="text-red-600 text-[0.75rem] lg:text-[1rem]">
                  {" "}
                  {errors.city}{" "}
                </p>
              )}
            </div>

            {/* STATE */}
            <div>
              <label htmlFor="state">
                State <span className="text-red-500 ml-2">*</span>{" "}
              </label>{" "}
              <br />
              <input
                name="state"
                type="text"
                onChange={handleChange}
                className="border h-10 p-2 rounded-sm w-full mt-1"
                value={inputValues.state}
                placeholder="Enter Business State"
              />
              <br />
              {errors.state && (
                <p className="text-red-600 text-[0.75rem] lg:text-[1rem]">
                  {" "}
                  {errors.state}{" "}
                </p>
              )}
            </div>

            {/* COUNTRY */}
            <div>
              <label htmlFor="country">
                Country <span className="text-red-500 ml-2">*</span>{" "}
              </label>{" "}
              <br />
              <input
                name="country"
                type="text"
                onChange={handleChange}
                className="border h-10 p-2 rounded-sm w-full mt-1"
                value={inputValues.country}
                placeholder="Enter Business Country"
              />
              <br />
              {errors.country && (
                <p className="text-red-600 text-[0.75rem] lg:text-[1rem]">
                  {" "}
                  {errors.country}{" "}
                </p>
              )}
            </div>

            {/* POSTAL CODE */}
            <div>
              <label htmlFor="zipCode">
                Postal Code <span className="text-red-500 ml-2">*</span>{" "}
              </label>{" "}
              <br />
              <input
                name="zipCode"
                type="text"
                onChange={handleChange}
                className="border h-10 p-2 rounded-sm w-full mt-1"
                value={inputValues.zipCode}
                placeholder="Enter Business Postal Code"
              />
              <br />
              {errors.zipCode && (
                <p className="text-red-600 text-[0.75rem] lg:text-[1rem]">
                  {" "}
                  {errors.zipCode}{" "}
                </p>
              )}
            </div>

            {/* BIO */}
            <div>
              <label htmlFor="bio">
                Bio <span className="text-red-500 ml-2">*</span>{" "}
              </label>{" "}
              <br />
              <textarea
                name="bio"
                type="text"
                onChange={handleChange}
                className="border h-10 p-2 rounded-sm w-full mt-1"
                value={inputValues.bio}
                placeholder="Enter Business Bio"
              />
              <br />
              {errors.bio && (
                <p className="text-red-600 text-[0.75rem] lg:text-[1rem]">
                  {" "}
                  {errors.bio}{" "}
                </p>
              )}
            </div>

            {/* INDUSTRY */}
            <div>
              <label htmlFor="industry">
                Industry <span className="text-red-500 ml-2">*</span>{" "}
              </label>{" "}
              <br />
              <input
                name="industry"
                type="text"
                onChange={handleChange}
                className="border h-10 p-2 rounded-sm w-full mt-1"
                value={inputValues.industry}
                placeholder="Enter Business Industry"
              />
              <br />
              {errors.industry && (
                <p className="text-red-600 text-[0.75rem] lg:text-[1rem]">
                  {" "}
                  {errors.industry}{" "}
                </p>
              )}
            </div>

            {/* SIZE */}
            <div>
              <label htmlFor="size">
                Size <span className="text-red-500 ml-2">*</span>{" "}
              </label>{" "}
              <br />
              <input
                name="size"
                type="text"
                onChange={handleChange}
                className="border h-10 p-2 rounded-sm w-full mt-1"
                value={inputValues.size}
                placeholder="Enter Business Size"
              />
            </div>

            {/* PHONE */}
            <div>
              <label htmlFor="phone">
                Phone Number <span className="text-red-500 ml-2">*</span>{" "}
              </label>{" "}
              <br />
              <input
                name="phone"
                type="tel"
                onChange={handleChange}
                className="border h-10 p-2 rounded-sm w-full mt-1"
                value={inputValues.phone}
                placeholder="Enter Business Phone Number"
              />
              <br />
              {errors.phone && (
                <p className="text-red-600 text-[0.75rem] lg:text-[1rem]">
                  {" "}
                  {errors.phone}{" "}
                </p>
              )}
            </div>

            {/* WEBSITE */}
            <div>
              <label htmlFor="website">
                Website
              </label>{" "}
              <br />
              <input
                name="website"
                type="text"
                onChange={handleChange}
                className="border h-10 p-2 rounded-sm w-full mt-1"
                value={inputValues.website}
                placeholder="Business Website e.g (www.example.com)"
              />
            </div>

            {/* SUBDOMAIN */}
            <div>
              <label htmlFor="subDomain">Subdomain </label> <br />
              <input
                name="subDomain"
                type="text"
                onChange={handleChange}
                className="border h-10 p-2 rounded-sm w-full mt-1"
                value={inputValues.subDomain}
                placeholder="Enter Business Subdomain"
              />
            </div>

            {/* ADDRESS */}
            <div className="md:col-span-2 lg:col-span-3">
              <label htmlFor="address">Business Address </label> <br />
              <input
                name="address"
                type="text"
                onChange={handleChange}
                className="border h-10 p-2 rounded-sm w-full mt-1"
                value={inputValues.address}
                placeholder="Enter Business Address"
              />
            </div>

            <div className="md:col-span-2 lg:col-span-3">
              <button
                className={`h-12 bg-accent text-white rounded-md w-full ${loading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                type="submit"
                disabled={loading}
              >
                {loading ? "Submitting..." : "Save Profile"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BusinessProfileSetup;
