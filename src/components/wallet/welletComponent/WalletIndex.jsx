// import React from 'react'

import { FaRegChartBar, FaWallet } from "react-icons/fa"
import { MdPayment } from "react-icons/md"
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import PayLeadsForm from "./PayLeadsForm";
import { AuthContext } from "../../context/AuthContext";
// import Flutterwave from "./Flutterwave";
// import Flutterwave from "./Flutterwave";
// import Flutterwave from "./Flutterwave";


function WalletIndex() {
    const navigate = useNavigate();
    const [lowBal, setLowBal] = useState(false);
    // const [isLoading, setIsLoading] = useState(true)

    // for adding funds to wallet v
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    // for purchase leads modal
    const [isModalOpen2, setIsModalOpen2] = useState(false);
    const openModal2 = () => setIsModalOpen2(true);
    const closeModal2 = () => setIsModalOpen2(false);
    const [addAmountWallet, setAddAmountWallet] = useState('')
    const [payLeadsForm, setPayLeadsForm] = useState('')

    const { authToken } = useContext(AuthContext)
    // for the first modal to flutterwave
    const redirectToFlutterwave = async () => {
        setIsModalOpen(false);
        navigate('');



        // for the payment
        try {
            // const token = localStorage.getItem('authToken')

            const details = {
                organization_id: 'devin',
                amount: addAmountWallet,
                user_id: 1

            }
            const payment = await axios.post('https://api.fyndah.com/api/v1/organization/flutterwave/pay', details, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${authToken}`
                }
            })
            console.log(payment.data);
        } catch (error) {
            console.log(error.message);
        }
        // console.log(addAmountWallet, "from walletindex")
        // <Flutterwave />
    };
    // this for the second modal to pay for leads
    const redirectToPayLeadsForm = async () => {
        setIsModalOpen2(false);

        console.log(payLeadsForm, "from walletindex")
    };

    const lowBalance = () => {
        if (lowBal === true) {
            setLowBal(true);
        } else {
            setLowBal(false)
        }
    }

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [transactions, setTransactions] = useState([]);
    const orgId = "devin";
    useEffect(() => {
        const fetchWalletBalance = async () => {
            try {
                const response = await axios.post(
                    'https://api.fyndah.com/api/v1/organization/wallet/balance',
                    null,
                    {
                        headers: {
                            Accept: 'application/json',
                        },
                        params: {
                            org_id: orgId,
                        },
                    }
                );
                setTransactions(response.data.balance);
                console.log(response.data)// Assuming the balance is available under `response.data.balance`
            } catch (error) {
                console.error("Error fetching wallet balance:", error);
            }
        };

        fetchWalletBalance();
    }, [orgId]);


    const filterTransactions = () => {
        // Filter transactions based on selected date range
        const filteredTransactions = transactions.filter(transaction => {
            const transactionDate = new Date(transaction.date);
            const start = startDate ? new Date(startDate) : null;
            const end = endDate ? new Date(endDate) : null;

            return (!start || transactionDate >= start) && (!end || transactionDate <= end);
        });
        return filteredTransactions;
    };

    const handleChangeStartDate = (e) => {
        setStartDate(e.target.value);
    };

    const handleChangeEndDate = (e) => {
        setEndDate(e.target.value);
    };

    return (
        <div>
            <div className="flex-1 flex flex-col items-center p-4 sm:p-6 md:p-10">
                <div className="w-full max-w-md sm:max-w-lg md:max-w-2xl mt-5 p-4 bg-white rounded-lg shadow-md">
                    <div className="flex flex-col sm:flex-row items-center justify-between">
                        <h2 className="text-gray-600">Hello,</h2>
                        <h2 className="text-gray-600">Bemia Johnson</h2>
                    </div>
                    <div className="mt-4 p-4 bg-blue-500 hover:bg-blue-700 text-white rounded-lg text-center">
                        <h3 className="text-xl">Total Balance</h3>
                        <p className="text-2xl font-bold" onChange={lowBalance}>$8,458.00</p>
                    </div>
                    <div className="mt-4 flex sm:flex-row justify-center sm:space-y-0 ">
                        <button className="flex flex-col mr-3  items-center" onClick={openModal}>
                            <MdPayment className="p-2 bg-blue-200 hover:text-blue-800 text-blue-500 rounded-full text-4xl" />
                            <span className="text-sm mt-1">Add Funds</span>
                        </button>
                        <button className="flex flex-col items-center mr-5" onClick={openModal2}>
                            <FaWallet className="p-2 bg-red-200 hover:text-red-800 text-red-500 rounded-full text-4xl" />
                            <span className="text-sm mt-1">Purchase Leads</span>
                        </button>
                        <button className="flex flex-col items-center">
                            <FaRegChartBar className="p-2 bg-green-200 hover:text-green-800 text-green-500 rounded-full text-4xl" />
                            <span className="text-sm mt-1">Statistics</span>
                        </button>
                    </div>
                    <div className="mt-6">
                        <div className="flex sm:flex-row  sm:space-y-0">
                            <h3 className="text-lg font-bold">Transactions history </h3>
                        </div>
                        <hr className="p-2" />
                        <div className="flex sm:flex-row justify-center  sm:space-y-0">
                            <div className="flex items-center mr-3">
                                <label htmlFor="startDate" className="font-bold text-sm mr-1">Start Date:</label>
                                <input
                                    type="date"
                                    id="startDate"
                                    value={startDate}
                                    onChange={handleChangeStartDate}
                                    className="border w-32 w-custom rounded-md p-2" />
                            </div>
                            <div className="flex items-center">
                                <label htmlFor="endDate" className="font-bold text-sm mr-1">End Date:</label>
                                <input
                                    type="date"
                                    size={10}
                                    id="endDate"
                                    value={endDate}
                                    onChange={handleChangeEndDate}
                                    className="border w-32 w-custom rounded-md p-2" />
                            </div>

                        </div>
                        {/* <table className="  mt-9">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="p-4 font-bold">Transaction ID</th>
                                    <th className="p-4 font-bold">Amount</th>
                                    <th className="p-4 font-bold">Payment Type</th>
                                    <th className="p-4 font-bold">Payment Status</th>
                                    <th className="p-4 font-bold">Date</th>
                                    <th className="p-4 font-bold">Export</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filterTransactions().map((transaction, index) => (
                                    <tr key={index} className="hover:bg-gray-50">
                                        <td className="p-4">{transaction.id}</td>
                                        <td className="p-4">{transaction.amount}</td>
                                        <td className="p-4">{transaction.paymentType}</td>
                                        <td className="p-4">{transaction.status}</td>
                                        <td className="p-4">{transaction.date}</td>
                                        <td className="p-4"><button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Export</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table> */}

                        <ul className="h-64 overflow-y-auto mt-9">
                            <div className="flex justify-between">
                                <p className="font-bold">Transaction ID</p>
                                <p className="font-bold">Amount</p>
                                <p className="font-bold">Payment Type</p>
                                <p className="font-bold">Payment Status</p>
                                <p className="font-bold">Date</p>
                                <p className="font-bold">Export</p>
                            </div>
                            <li className="flex justify-between mt-7">
                                <span>sf</span>
                                <span></span>
                                <span></span>
                            </li>
                            {filterTransactions().map((transaction, index) => (
                                <li key={index} className="flex justify-between mt-7">
                                    <span>{transaction.description}</span>
                                    <span>{transaction.amount}</span>
                                    <span>{transaction.date}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            <Modal isOpen={isModalOpen} addAmountWallet={addAmountWallet} setAddAmountWallet={setAddAmountWallet} onClose={closeModal} onRedirect={redirectToFlutterwave} />
            <PayLeadsForm isOpened={isModalOpen2} payLeadsForm={payLeadsForm} setPayLeadsForm={setPayLeadsForm} onClosed={closeModal2} onRedirected={redirectToPayLeadsForm} />






            {/* <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-6">
                <form className="w-full max-w-md p-8 space-y-4 bg-white rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold text-gray-700">Payment Details</h2>
                    <input type="text" placeholder="Card Number" className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                    <input type="text" placeholder="Expiration Date" className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                    <input type="text" placeholder="CVV" className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                    <button type="submit" className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                        Pay Now
                    </button>
                </form>
            </div> */}
        </div>
    )
}

export default WalletIndex