import PropTypes from "prop-types";

export default function SearchRequestDescriptionHistory({
  settOpen,
  dal,
}) {

  const d = new Date(dal.createdAt);
  
  const date = d.toDateString() + ' at ' + d.getUTCHours() + ':' + d.getUTCMinutes();


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
                <p> Search Description: <span className="font-black capitalize"> {dal.term}</span> </p>
                <p>
                  Search filters used by the user who made the  request: {
                    <span className="font-black capitalize">  {dal.filter}</span>
                  }
                </p>
                <p>
                  Time when this Lead was obtained request: {
                    <span className="font-black capitalize">  {date}</span>
                  }
                </p>

              </p>
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
              <button
                className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => {
                  settOpen(false);
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}

SearchRequestDescriptionHistory.propTypes = {
  infoOfSearch: PropTypes.string,
  settOpen: PropTypes.func,
};
