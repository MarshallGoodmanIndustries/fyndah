// import React from 'react'

import { FaRegChartBar, FaWallet } from "react-icons/fa"
import { MdPayment } from "react-icons/md"
import { useNavigate, useParams } from "react-router-dom";
import Modal from "./Modal";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import PayLeadsForm from "./PayLeadsForm";
import { AuthContext } from "../../context/AuthContext";

import Swal from "sweetalert2";
import { ImSpinner9 } from "react-icons/im";
import DateRangePicker from "./BalanceDateRangePicker";
import AllTransaction from "./AllTransaction";
import DateTransaction from "./DateTransaction";



function WalletIndex() {
    const navigate = useNavigate();
    const [lowBal, setLowBal] = useState(null);
    const [transactions, setTransactions] = useState([]);

    const { id } = useParams();
    const orgId = { id: id };

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
    const [isLoading, setIsLoading] = useState(false)
    const { authToken } = useContext(AuthContext)
    // for the first modal to flutterwave
    const redirectToFlutterwave = async () => {
        setIsModalOpen(true);
        navigate('');
        // for the payment
        try {
            const details = {
                amount: addAmountWallet,

            }
            const API = 'https://api.fyndah.com/api/v1/organization/flutterwave/pay'// still have error here
            const payment = await axios.post(API, details, {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${authToken}`,
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
    const redirectToPayLeadsForm = async () => { //purchase for lead function
        setIsModalOpen2(false);

        console.log(payLeadsForm, "from walletindex")
    };



    const fetchWalletBalance = async () => {
        try {
            setIsLoading(true)
            const body = { org_id: orgId };
            const url = 'https://api.fyndah.com/api/v1/organization/wallet/balance';
            const response = await axios.post(
                url, body,
                {
                    headers: {
                        Accept: 'application/json',
                        'Authorization': `Bearer ${authToken}`,
                    },
                }
            );
            if (!authToken) {
                Swal.fire({
                    icon: "error",
                    title: "Oops! Something went wrong",
                    text: "Seems you having network issues, please try again later.",
                    timer: 4000,
                    timerProgressBar: true,
                });
                navigate("/login")
            }
            setTransactions(response.data.balance);
            setLowBal(response.data.balance);
            console.log(response.data)// Assuming the balance is available under `response.data.balance`
        } catch (error) {
            console.error("Error fetching wallet balance:", error);
            if (error.response ? error.response.data : error.message) {
                Swal.fire({
                    icon: "error",
                    title: "Oops! Something went wrong",
                    text: "Seems you having network issues, please try again later.",
                    timer: 4000,
                    timerProgressBar: true,
                });
            }
            setIsLoading(false);
        } finally {
            setIsLoading(false);
        }
    };


    useEffect(() => {
        fetchWalletBalance();
        if (lowBal !== null && lowBal <= 4999) {
            Swal.fire({
                icon: "warning",
                title: "Warning Message!!!",
                text: "Your balance is below 5000 make a quick topup.",
                timer: 2000,
                timerProgressBar: true,
            });
        }
    }, [])

    // const handleStats = () => {
    //     navigate()
    // }


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
                        {isLoading ? (
                            <div className="flex justify-center items-center">
                                <p> <ImSpinner9 className="animate-spin text-white hover:text-gray-300" size={22} /> </p>
                            </div>
                        ) : (
                            <div>
                                <p className="text-2xl font-bold"><span className="text-sm md:text-base lg:text-lg">NGN</span> {transactions}</p>

                            </div>
                        )}
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
                        <div className="mt-4 flex sm:flex-row justify-between sm:space-y-0 ">
                            <div className=" mr-4">
                                <DateRangePicker />
                            </div>
                            <div className="mr-4">
                                <DateTransaction />
                            </div>
                        </div>
                        <AllTransaction />

                        <Modal isOpen={isModalOpen} addAmountWallet={addAmountWallet} setAddAmountWallet={setAddAmountWallet} onClose={closeModal} onRedirect={redirectToFlutterwave} />
                        <PayLeadsForm isOpened={isModalOpen2} payLeadsForm={payLeadsForm} setPayLeadsForm={setPayLeadsForm} onClosed={closeModal2} onRedirected={redirectToPayLeadsForm} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WalletIndex