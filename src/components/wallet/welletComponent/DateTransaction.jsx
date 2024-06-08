// DateRangePicker.js
import axios from 'axios';
import { useContext, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaAngleDown } from "react-icons/fa";
import { AuthContext } from '../../context/AuthContext';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { ImSpinner9 } from 'react-icons/im';
import DateTransactionModal from './DataTransactionModal';

const DateTransaction = () => {

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [isOpen, setIsOpen] = useState(false);
    const [data, setData] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { authToken } = useContext(AuthContext);
    const { id } = useParams()
    const [isOpenModal, setIsOpenModal] = useState(false);

    const handleOpenModal = () => {
        setIsOpenModal(true);
    };

    const handleCloseModal = () => {
        setIsOpenModal(false);
    };


    const handleClose = () => {
        setIsOpen(false)
    }

    const url = "https://api.fyndah.com/api/v1/organization/wallet/transactions"
    const body = {
        org_id: id,
        start_date: startDate,
        end_date: endDate,
    };
    const handleTransactionToDate = async () => {
        try {
            setIsLoading(true);
            const response = await axios.post(url, body, {
                headers: {
                    'Authorization': `Bearer ${authToken}`
                }
            })
            console.log(response.data.message);
            if (response.data.message == "success") {
                setData(response.data.txns)
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops! Something went wrong",
                    text: "Seems your token has expired or network issues, try to login again.",
                    timer: 4000,
                    timerProgressBar: true,
                });
                throw new Error('Failed to fetch transactions');
            }
        } catch (error) {
            console.log(error);
            if (error.response ? error.response.data : error.message) {
                Swal.fire({
                    icon: "error",
                    title: "Oops! Something went wrong",
                    text: "Seems your token has expired or network issues, try to login again.",
                    timer: 4000,
                    timerProgressBar: true,
                });

                setIsLoading(false);

            }
        } finally {
            setIsLoading(false);
        }
    }
    const handleConfirm = () => {

        setIsOpen(true);

        // Handle date range confirmation (e.g., send data to backend)
        console.log(`Start Date: ${startDate} end Date: ${endDate}`);
        handleTransactionToDate();
        if (handleTransactionToDate()) {
            setTimeout(() => {
                handleOpenModal()
                setIsOpen(false)
            }, 2000);
        }
    };



    return (
        <div className="relative">
            <div className="mt-4 flex sm:flex-row justify-left sm:space-y-0 ">
                <button
                    onClick={() => setIsOpen(true)}
                    className="flex flex-col mr-3  items-center">
                    <FaAngleDown className="p-2 bg-blue-500 hover:text-blue-800 text-white rounded text-4xl" />
                    <span className="text-sm mt-1">Filter Transactions</span>
                </button>
            </div>
            {isOpen && (
                <div className="absolute bg-white p-4 shadow-lg rounded mt-2 w-64">
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-lg font-medium">Select Date</span>
                        <button onClick={handleClose} className="text-gray-400 hover:text-gray-600">
                            X
                        </button>
                    </div>
                    <div className="flex flex-col space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Start Date
                            </label>
                            <DatePicker
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
                                dateFormat="YYYY-MM-d"
                                maxDate={new Date()}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                End Date
                            </label>
                            <DatePicker
                                selected={endDate}
                                onChange={(date) => setEndDate(date)}
                                dateFormat="YYYY-MM-d"
                                maxDate={new Date()}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                        </div>
                        <button
                            onClick={handleConfirm}
                            className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded"
                        >
                            {isLoading ? (
                                <div className="flex justify-center items-center">
                                    <p> <ImSpinner9 className="animate-spin text-white hover:text-gray-300" size={15} /> </p>
                                </div>
                            ) : (
                                <div>
                                    {null}
                                </div>
                            )}
                            Confirm
                        </button>
                    </div>
                </div>
            )}
            <div className=" flex items-center justify-center ">
                <DateTransactionModal isOpenModal={isOpenModal} startDate={startDate} endDate={endDate} data={data} handleCloseModal={handleCloseModal} />
            </div>
        </div>
    );
};

export default DateTransaction;
