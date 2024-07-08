// DateRangePicker.js
import axios from "axios";
import { useContext, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaAngleDown } from "react-icons/fa";
import { AuthContext } from "../../context/AuthContext";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
// import { ImSpinner9 } from 'react-icons/im';
import DateTransactionModal from "./DataTransactionModal";

const DateTransaction = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { authToken } = useContext(AuthContext);
  const { id } = useParams();
  const [isOpenModal, setIsOpenModal] = useState(false);

  // this open the modal for the filter transaction
  const handleOpenModal = () => {
    setIsOpenModal(true);
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };

  // this closes it
  const handleClose = () => {
    setIsOpen(false);
  };

  const handleClickOPen = () => {
    setIsOpen(true);
  };

  //  Make this  to be the Search Request History link
  const url = "https://test-api.fyndah.com/api/v1/organization/wallet/transactions";
  const body = {
    org_id: id,
    start_date: startDate,
    end_date: endDate,
  };
  // all the fetching of data is handled here and the data is sent as a props to the dataTransationModal component
  const handleTransactionToDate = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post(url, body, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      console.log(response.data);
      if (response.data.message == "succcess") {
        setData(response.data.txns);
        sessionStorage.removeItem("lastRoute");
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops! 404 ",
          text: "Something went wrong..!!",
          timer: 4000,
          timerProgressBar: true,
        });
        throw new Error("Failed to fetch transactions");
      }
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        // Handle AxiosError
        console.error("Error message:", error.message);
        if (error.response) {
          console.error("Status code:", error.response.status);
          console.error("Response data:", error.response.data);
          console.error("Response msg:", error.response.data.message);
          if (error.response.data.status === "error") {
            Swal.fire({
              icon: "error",
              title: "Oops! Something went wrong",
              text: "Seems your token has expired or network issues, try to login again.",
              timer: 4000,
              timerProgressBar: true,
            });
          }
        } else if (error.request) {
          console.error("No response received:", error.request);
        } else {
          console.error("Request setup error:", error.message);
        }
      } else {
        // Handle non-AxiosError
        console.error("Unexpected error:", error);
      }

      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  // the submit handke function that submit the opi login and opens the modal
  const handleConfirm = () => {
    handleTransactionToDate();
    handleOpenModal();
  };

  return (
    <div className="relative">
      <div className="mt-4 flex flex-col sm:flex-row justify-left sm:space-y-0 ">
        <span className="text-sm mt-1  mb-1">Request History</span>

        <button
          onClick={handleClickOPen}
          className="flex flex-col mr-3  items-center"
        >
          <FaAngleDown className="p-2 bg-blue-500 hover:text-blue-800 text-white rounded text-4xl" />
          {/* <span className="text-sm mt-1">Filter Request History</span> */}
        </button>
      </div>
      {isOpen && (
        <div className=" absolute right-0 top-full bg-white p-4 shadow-lg rounded mt-2 w-56">
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-medium">Select Date</span>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600"
            >
              X
            </button>
          </div>
          <div className="flex flex-col space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Select start date
              </label>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                dateFormat="YYYY-MM-d"
                maxDate={new Date()}
                className="w-48 mt-1 p-1 rounded-md bg-slate-100 shadow-sm sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Select end date
              </label>
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                dateFormat="YYYY-MM-d"
                maxDate={new Date()}
                className="mt-1 p-1 w-48 rounded-md border bg-slate-100 shadow-sm sm:text-sm"
                // className=" w-48 bg-red-200"
              />
            </div>
            <button
              onClick={handleConfirm}
              className="bg-blue-500 hover:bg-blue-700 text-white px-2 py-2 rounded"
            >
              {/* {isLoading ? (
                                <div className="flex justify-center items-center">
                                    <p> <ImSpinner9 className="animate-spin text-white hover:text-gray-300" size={15} /> </p>
                                </div>
                            ) : (
                                <div>
                                    {null}
                                </div>
                            )} */}
              Confirm
            </button>
          </div>
        </div>
      )}
      <div className=" flex items-center justify-center ">
        <DateTransactionModal
          isOpenModal={isOpenModal}
          isLoading={isLoading}
          startDate={startDate}
          endDate={endDate}
          data={data}
          handleCloseModal={handleCloseModal}
        />
      </div>
    </div>
  );
};

export default DateTransaction;
