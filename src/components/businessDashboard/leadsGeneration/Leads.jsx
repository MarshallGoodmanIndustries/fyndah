import { useContext, useEffect, useState } from "react";
import LinkButton from "./LinkButton";
import LeadsItem from "./LeadsItem";
import EmptyLeads from "./EmptyLeads";
import SpinnerFullPage from "./SpinnerFullPage";
import { useParams } from "react-router-dom";
import Button from "./Button";
import { AuthContext } from "../../context/AuthContext";

// const fakeCart = [
//   {
//     pizzaId: 12,
//     name: "Peter Bobo ",
//     quantity: 2,
//     unitPrice: 16,
//     totalPrice: 32,
//   },
//   {
//     pizzaId: 6,
//     name: "Victoria Naters",
//     quantity: 1,
//     unitPrice: 13,
//     totalPrice: 13,
//   },
//   {
//     pizzaId: 11,
//     name: "Stev  Mushroom",
//     quantity: 1,
//     unitPrice: 15,
//     totalPrice: 15,
//   },
// ];

function Leads() {
  const [leads, setLeads] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { authToken } = useContext(AuthContext);

  const { id } = useParams();

  const BASE_URL =
    // "https://api.fyndah.com/api/v1/search?query=yahoo&fields=lastname,firstname,country_of_citizenship,email";
    `https://api.fyndah.com/api/v1/bids/won`;
  useEffect(function () {
    async function fetchLeads() {
      try {
        setIsLoading(true);
        const res = await fetch(BASE_URL, {
          method: "GET",
          // body: JSON.stringify(newCity), // Used in post requests.
          headers: {
            "Content-Type": "application/json",
            Authorization: ` ${authToken}`,
          },
        });

        const data = await res.json();
        setLeads(data);
        console.log(leads);
      } catch {
        // alert("There was an Error loading data");
      } finally {
        setIsLoading(false);
      }
    }
    fetchLeads();
  }, []);

  const username = "LEwin Jones";
  // const cart = fakeCart;
  const po = `/businessDashboard/${id}/posts`;

  const walletEndPoint = `/businessDashboard/${id}/wallet`;

  if (!leads?.length)
    return (
      <EmptyLeads
        data="There are currently no leads available. When they are you would see them here"
        posts={po}
      />
    );

  if (isLoading) return <SpinnerFullPage />;

  return (
    //  <div className="text-sm text-blue-500 hover:text-blue-600 hover:underline">
    <div className="px-4 py-3">
      <h1 className=" mt-3 italic text-5xl text-center font-bold mb-10">
        Current Leads
      </h1>
      <LinkButton to="/menu">
        &larr; Back To The Active Search Request Tab{" "}
      </LinkButton>

      <h2 className="mt-7 text-xl font-semibold"> Your cart, {username} </h2>

      <ul className=" px-[10rem] mt-3 divide-red-400 divide-y  border-b">
        {leads?.map((item) => (
          <LeadsItem item={item} key={item.id} ho="korrr" />
        ))}
      </ul>

      <div className="mt-6 space-x-2">
        <Button to={walletEndPoint} type="primary">
          Fund wallet
        </Button>
      </div>
    </div>
  );
}

export default Leads;
