import PropTypes from "prop-types";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useParams } from "react-router-dom";
export default function SearchRequestDescription({
  // infoOfSearch,
  settOpen,
  // requestData,
  dal,
  bidRequest,
}) {
  // const navigate = useNavigate();
  const [show, setShow] = useState("");
  const { authToken } = useContext(AuthContext);
  const { id } = useParams();
  const [disabled, setDisabled] = useState(false);
  // const BASE_URL = `https://api.fyndah.com/api/v1/search/requests/${id}/bid`;
  // async function bidRequest() {
  //   const res = await fetch(`${BASE_URL}`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       body: JSON.stringify({ bid_amount: 200 }),
  //       Authorization: `Bearer ${authToken}`,
  //     },
  //   });
  //   const data = res.json();
  //   console.log(data + "Has come back");

  //   if (
  //     data.status === "error" &&
  //     data.message === "You have already placed a bid on this search request."
  //   ) {
  //     setShow("You already placed a bid");
  //   } else if (
  //     data.status === "error" &&
  //     data.message === "Insufficient funds in the wallet"
  //   ) {
  //     setShow(
  //       "You have insufficient Funds and Therefore cannot place this bid"
  //     );
  //   }
  // }

  // return (
  //   <>
  //     <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
  //       <div className="relative w-auto my-6 mx-auto max-w-3xl">
  //         {/*content*/}
  //         <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
  //           {/*header*/}
  //           <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
  //             <h3 className="text-3xl font-semibold">
  //               {/* {infoOfSearch} */}
  //               Search Description: {requestData.search_term}
  //             </h3>
  //             <h6 className="text-3xl font-semibold">
  //               {/* {infoOfSearch} */}
  //               An Error Occured: {show}
  //             </h6>

  //             <button
  //               className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
  //               onClick={() => settOpen(false)}
  //             >
  //               <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
  //                 ×
  //               </span>
  //             </button>
  //           </div>
  //           {/*body*/}
  //           <div className="relative p-6 flex-auto">
  //             <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
  //               <p> Search Description: {requestData.search_term} </p>
  //               <p>
  //                 {" "}
  //                 Search Flters used by the user: {
  //                   requestData.search_filters
  //                 }{" "}
  //               </p>

  //               {/* I always
  //               felt like I could do anything. That’s the main thing people are
  //               controlled by! Thoughts- their perception of themselves! Theyre
  //               slowed down by their perception of themselves. If youre taught
  //               you can’t do anything, you won’t do anything. I was taught I
  //               could do everything. */}

  //               {/* <p className="mt-5">
  //                 Another Search Description: {infoOfSearch}
  //               </p> */}
  //             </p>
  //           </div>
  //           {/*footer*/}
  //           <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
  //             <button
  //               className=" hover:bg-slate-500text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
  //               type="button"
  //               onClick={() => settOpen(false)}
  //             >
  //               Close
  //             </button>
  //             <button
  //               className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
  //               type="button"
  //               onClick={() => {
  //                 settOpen(false);
  //                 // navigate(`/businessDashboard/${requestData.id}/bid-page`);
  //                 bidRequest();
  //               }}
  //             >
  //               Bid to get individual detail searching for this service
  //             </button>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //     <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
  //   </>
  // );

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
              <h3 className="text-3xl font-semibold">
                {/* {infoOfSearch} */}
                Search Description: {dal.term}
              </h3>
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => settOpen(false)}
              >
                <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                  ×
                </span>
              </button>
            </div>
            {/*body*/}
            <div className="relative p-6 flex-auto">
              <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                <p>
                  {" "}
                  Search Description:{" "}
                  <span className="font-black capitalize">
                    {" "}
                    {dal.term}
                  </span>{" "}
                </p>
                <p>
                  Search filters used by the user who made the request:{" "}
                  {<span className="font-black capitalize"> {dal.filter}</span>}
                </p>
              </p>
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
              <button
                className=" hover:bg-slate-500text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                disabled={disabled}
                onClick={() => settOpen(false)}
              >
                Close
              </button>
              <button
                className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => {
                  bidRequest();
                  // settOpen(false);
                  setDisabled(true);
                }}
              >
                {disabled
                  ? "Your bid is currently being placed"
                  : "Place a Bid on this Search Request"}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}

SearchRequestDescription.propTypes = {
  infoOfSearch: PropTypes.string,
  settOpen: PropTypes.func,
};
