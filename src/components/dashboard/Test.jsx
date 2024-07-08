import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import Swal from "sweetalert2";
const Test = () => {
  var formdata = new FormData();
  formdata.append("org_name", "roscoe");
  formdata.append("org_bio", "Industrial circuit");
  formdata.append("subdomain", "celia");
  formdata.append("address", "32962 Telly Well");
  formdata.append("city", "Hyattland");
  formdata.append("state", "Port Felipa");
  formdata.append("zip_code", "SJ");
  formdata.append("country", "Yemen");
  formdata.append("phone", "643-967-1338");
  formdata.append("email", "Maximillia.Watsica78@hotmail.com");
  formdata.append("website", "brannon.info");
  formdata.append("size", "505");
  formdata.append("business_category_ids[]", "1");
  formdata.append("business_category_ids[]", "2");
  formdata.append("business_unit_ids[]", "4");
  formdata.append("business_unit_ids[]", "9");
  formdata.append("lat", "88.1376");
  formdata.append("long", "-171.7418");

  var requestOptions = {
    method: "POST",
    body: formdata,
    // redirect: "follow",
  };
  const { authToken } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://api.fyndah.com/api/v1/organization/create",
        requestOptions,

        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      // console.log("success");

      if (response.data.status == "success") {
        Swal.fire({
          icon: "success",
          title: "Successful...",
          text: "Business profile setup was successful.",
          timer: 2000,
          timerProgressBar: true,
        });
        // console.log("Form submitted", sendProfile);
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
  };

  return (
    <div>
        <form action="" onSubmit={handleSubmit}>


        <button type="submit">send</button>
        </form>
    
    </div>
  );
};

export default Test;
