import { useContext, useEffect, useState } from "react";
import SearchRequestDescriptionHistory from "./SearchRequestDescriptionHistory";
import { AuthContext } from "../../context/AuthContext";
import EmptyLeads from "./EmptyLeads";
import SpinnerFullPage from "./SpinnerFullPage";
import { useParams } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

// const people = [
//   {
//     name: "Leslie Alexander",
//     email: "leslie.alexander@example.com",
//     role: "Co-Founder / CEO",
//     imageUrl:
//       "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
//     lastSeen: "3h ago",
//     lastSeenDateTime: "2023-01-23T13:23Z",
//   },
//   {
//     name: "Michael Foster",
//     email: "michael.foster@example.com",
//     role: "Co-Founder / CTO",
//     imageUrl:
//       "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
//     lastSeen: "3h ago",
//     lastSeenDateTime: "2023-01-23T13:23Z",
//   },
//   {
//     name: "Dries Vincent",
//     email: "dries.vincent@example.com",
//     role: "Business Relations",
//     imageUrl:
//       "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
//     lastSeen: null,
//   },
//   {
//     name: "Lindsay Walton",
//     email: "lindsay.walton@example.com",
//     role: "Front-end Developer",
//     imageUrl:
//       "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
//     lastSeen: "3h ago",
//     lastSeenDateTime: "2023-01-23T13:23Z",
//   },
//   {
//     name: "Courtney Henry",
//     email: "courtney.henry@example.com",
//     role: "Designer",
//     imageUrl:
//       "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
//     lastSeen: "3h ago",
//     lastSeenDateTime: "2023-01-23T13:23Z",
//   },
//   {
//     name: "Tom Cook",
//     email: "tom.cook@example.com",
//     role: "Director of Product",
//     imageUrl:
//       "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
//     lastSeen: null,
//   },
// ];

// const datar = [
//   {
//     id: 4,
//     search_term: "Slovenia",
//     search_filters: "country,state,org_name",
//   },
//   {
//     id: 3,
//     search_term: "North America",
//     search_filters: "country,state,org_name",
//   },
// ];

function HistorySearchRequest() {
  const [open, setOpen] = useState(false);
  const [request, setRequest] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [dal, setDal] = useState({});
  const { id, name } = useParams();

  const { authToken } = useContext(AuthContext);

  const BASE_URL = "https://api.fyndah.com/api/v1/search/requests/history";
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
          console.log(data);
          setRequest(data);
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

  const po = `/businessDashboard/${id}/${name}/posts`;

  if (!request?.length)
    return (
      <EmptyLeads
        data="To get access to search requests, fund your wallet."
        // data="There are Currently no Search Request Related to your Business. When they are, you would see them here."
        posts={po}
      />
    );

  // if (!request?.length) return <EmptyLeads posts={po} />;
  // return (
  //   <div className="flex flex-col items-center justify-center mt-5">
  //     <h1 className="mb-10 text-xl font-black">
  //       Current Available Search Request Related to your Business
  //     </h1>
  //     {/* Modal to show the Search request description */}
  //     {/* {open && (
  //       <SearchRequestDescription
  //         settOpen={setOpen}
  //         infoOfSearch="Send search datta to the modal"
  //         requestValue={request.id}
  //       />
  //     )} */}

  //     {/* {isLoading ? (
  //       <SpinnerFullPage />
  //     ) : ( */}
  //       <ul role="list" className="divide-y divide-gray-100">
  //         {/* {people.map((person) => ( */}
  //         {datar.map((request) => (
  //           // open && (
  //           //   <SearchRequestDescription
  //           //     settOpen={setOpen}
  //           //     infoOfSearch="Send search datta to the modal"
  //           //     requestValue={request.id}
  //           //   />
  //           // )

  //           <li key={request.id} className="flex justify-between gap-x-6 py-5">
  //             {open && (
  //               <SearchRequestDescriptionHistory
  //                 settOpen={setOpen}
  //                 infoOfSearch="Send search datta to the modal"
  //                 requestData={request}
  //                 key={request.id}
  //               />
  //             )}
  //             <div className="flex min-w-0 gap-x-4">

  //               <div key={request.id} className="min-w-0 flex-auto">
  //                 <p className="blur text-sm font-semibold leading-6 text-gray-900">
  //                   {request.search_term}
  //                   {/* Kusner Tstero */}
  //                 </p>

  //               </div>
  //             </div>
  //             <div
  //               key={request.id}
  //               className="hidden shrink-0 sm:flex sm:flex-col sm:items-end"
  //             >
  //               <p className="text-sm leading-6 text-gray-900">person.role</p>
  //               {/* {person.lastSeen ? ( */}
  //               <>
  //                 <p className="mt-1 text-xs leading-5 text-gray-500">
  //                   Time of search:{" "}
  //                   {/* <time dateTime={person.lastSeenDateTime}>
  //                       {person.lastSeen}
  //                     </time> */}
  //                 </p>
  //                 {/* <p className="mt-1 text-xs leading-5 text-gray-500">
  //                     Time left till search bid expire{" "}
  //                     <time dateTime={person.lastSeenDateTime}>
  //                       {person.lastSeen}
  //                     </time>
  //                   </p> */}
  //               </>
  //               {/* // ) : ( */}
  //               <div
  //                 key={request.id}
  //                 className="mt-1 flex items-center gap-x-1.5"
  //               >
  //                 <div className="flex-none rounded-full bg-emerald-500/20 p-1">
  //                   <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
  //                 </div>
  //                 <p className="text-xs leading-5 text-gray-500">Online</p>
  //               </div>
  //               {/* // )} */}
  //             </div>
  //             {/* <button onClick={openModal(true)} className="bg-indigo-500 rounded-md px-1 py-0">View Description</button> */}
  //             <button
  //               onClick={() => setOpen(true)}
  //               className="bg-indigo-500 rounded-full px-2 py-0"
  //               key={request.id}
  //             >
  //               View Description
  //             </button>
  //           </li>
  //         ))}
  //       </ul>
  //     {/* )} */}
  //   </div>
  // );

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
       Search Request History Related to your Business
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
                    term: person.search_term,
                    filter: person.search_filters,
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

export default HistorySearchRequest;
