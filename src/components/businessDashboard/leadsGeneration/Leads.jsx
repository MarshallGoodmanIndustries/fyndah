import { useContext, useEffect, useState } from "react";
import SearchRequestDescriptionHistory from "./SearchRequestDescriptionHistory";
import { AuthContext } from "../../context/AuthContext";
import EmptyLeads from "./EmptyLeads";
import { useParams } from "react-router-dom";

function Leads() {
  const [open, setOpen] = useState(false);
  const [request, setRequest] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [dal, setDal] = useState({});
  const [empty, setEmpty] = useState("");
  const { id, name } = useParams();

  const { authToken } = useContext(AuthContext);

  // const navigate = useNavigate();

  const BASE_URL = "https://api.fyndah.com/api/v1/leads";
  useEffect(
    function () {
      async function retrieveSearchRequest() {
        try {
          setIsLoading(true);
          const res = await fetch(`${BASE_URL}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authToken}`,
            },
          });
          const data = await res.json();
          console.log(data.data);
          console.log(data);

          if (data.status === "success" && !data.length) {
            setEmpty("Search in our system was sucessful, no leads yet");
            console.log("Request was sucessful no leads yet");
          }
          setRequest(data.data);
          console.log(request);
          setIsLoading(false);
        } catch {
          console.log("An error occured");
        }
      }
      retrieveSearchRequest();
    },
    [authToken]
  );

  // const po = `/businessDashboard/${id}/${name}/posts`;
  // const mes = empty
  //   ? empty
  //   : "There are Currently no Available Leads to your Business. When they are, you would see them here.";

  if (!request?.length)
    return (
      <p className="mt-7 font-semibold px-3">
        <span className="text-2xl font-black pr-2">
          Purchasing a search request unlocks your lead list!
        </span>
        Come back to this page to view your leads and start converting them into
        customers.
      </p>
    );
  return (
    <>
      {open && (
        <SearchRequestDescriptionHistory
          settOpen={setOpen}
          infoOfSearch="Send search datta to the modal"
          requestData={request}
          dal={dal}
          key={request.id}
        />
      )}
      <h1 className="flex flex-col items-center justify-center mt-5 mb-10 text-4xl font-black">
        Leads for your Business
      </h1>
      <ul
        role="list"
        className="flex flex-col items-center justify-center mt-5 divide-y divide-gray-100"
      >
        {request?.map((person) => (
          <li key={person.id} className="flex justify-between gap-x-6 py-5">
            <div className="flex min-w-0 gap-x-4">
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-900">
                  {person.search_term}
                </p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                  {person.search_filters}
                </p>
              </div>
            </div>
            <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
              <p className="text-sm leading-6 text-gray-900">{person.role}</p>
              {/* {person.lastSeen ? (
              <p className="mt-1 text-xs leading-5 text-gray-500">
                Time of Search <time dateTime={person.lastSeenDateTime}>{person.lastSeen}</time>
              </p>
            ) : (
              <div className="mt-1 flex items-center gap-x-1.5">
                <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                </div>
                <p className="text-xs leading-5 text-gray-500">Online</p>
              </div>
            )} */}
              <button
                onClick={() => {
                  setOpen(true);
                  setDal({
                    term: person.search_request.search_term,
                    filter: person.search_request.search_filters,
                    createdAt: person.created_at,
                  });
                }}
                className="bg-indigo-500 rounded-full px-2 py-0"
                key={person.id}
              >
                View Search Description in depth
              </button>
            </div>
          </li>
        ))}
      </ul>{" "}
    </>
  );
}

export default Leads;
