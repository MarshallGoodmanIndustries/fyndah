import { useState } from "react";
import PropTypes from "prop-types";
import image from "./man.png";
import { Button } from "@chakra-ui/react";
import SearchRequestDescriptionLeads from "./SearchRequestDescriptionLeads";


function LeadsItem({item, ho}) {
  const {name} = item;
  const von = false; // Condition to tell if the business account owner has paid for the product of not
  const paid = !von && "blur-lg";

  const [open, setOpen] = useState(false);



  return (
    <li className="ml-48 pl-5 mr-48 py-3 sm:flex sm:items-center sm:justify-around">
      <p>{ho}</p>
      {open && (
    <SearchRequestDescriptionLeads
      settOpen={setOpen}
      infoOfSearch="Send search datta to the modal"
      item={item}
    />
  )}
      <p className="mb-1 sm:mb-0 ">
        <img
          className={`pl-0 rounded-full size-20 ${paid}`}
          src={image}
          alt="User's Avatar"
        />
      </p>
      <div className="flex items-center justify-between sm:gap-6">
        {/* <p className="text-sm font-bold">{name}</p> */}
        <p className="text-sm font-bold">{name}</p>

        <Button to={von ? "/potential-customer-data" : `/payment`} type="small">
          View Potential Customer Details
        </Button>
      </div>
    </li>
  );
}

LeadsItem.propTypes = {
  item: PropTypes.object
}

export default LeadsItem;
