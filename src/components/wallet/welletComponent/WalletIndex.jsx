// import React from 'react'

import { FaRegChartBar, } from "react-icons/fa"
import { MdPayment } from "react-icons/md"
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Modal from "./Modal";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
// import PayLeadsForm from "./PayLeadsForm";
import { AuthContext } from "../../context/AuthContext";

import Swal from "sweetalert2";
import { ImSpinner9 } from "react-icons/im";
import DateRangePicker from "./BalanceDateRangePicker";
import AllTransaction from "./AllTransaction";
import DateTransaction from "./DateTransaction";
import StatisticsModal from "./StatisticsModal";
import ProceedToPayment from "./ProceedToPayment";
import { TbCurrencyNaira } from "react-icons/tb";



function WalletIndex() {
    const navigate = useNavigate();
    const [lowBal, setLowBal] = useState(null);
    const [transactions, setTransactions] = useState([]);

    const { id, name } = useParams();
    const orgId = { id: id };
    const organization_name = { name: name }
    const location = useLocation();

    // const [isLoading, setIsLoading] = useState(true)

    // for adding funds to wallet v
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const [StatsIsModalOpen, setStatsIsModalOpen] = useState(false);
    const StatsOpenModal = () => setStatsIsModalOpen(true);
    const StatsCloseModal = () => setStatsIsModalOpen(false);

    // for purchase leads modal
    // const [isModalOpen2, setIsModalOpen2] = useState(false);
    // const openModal2 = () => setIsModalOpen2(true);
    // const closeModal2 = () => setIsModalOpen2(false);
    const [addAmountWallet, setAddAmountWallet] = useState('')
    const [paystack, setPaystack] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    // const [payLeadsForm, setPayLeadsForm] = useState('')
    const [isPaystackLoading, setIsPaystackLoading] = useState(false)
    const { authToken } = useContext(AuthContext)


    // for the modal to paystack
    const [isProceedOpen, setIsProceedOpen] = useState(false);
    const isProceedOpenModal = () => setIsProceedOpen(true);
    const isProceedCloseModal = () => setIsProceedOpen(false);
    const redirectToPayStack = async () => {
        setIsModalOpen(true);
        navigate('');
        // for the payment
        try {
            setIsPaystackLoading(true)
            const details = { amount: addAmountWallet }
            const API = 'https://api.fyndah.com/api/v1/organization/paystack/pay'// still have error here
            const payment = await axios.post(API, details, {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${authToken}`,
                }
            })
            if (payment.data.status === 'success') {
                setPaystack(payment.data.data.payment_url.url)
                isProceedOpenModal()//na here i dey.....
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops! Something went wrong",
                    text: "Payment is currently not available, try again later",
                    timerProgressBar: false,
                });
            }
        } catch (error) {
            setIsPaystackLoading(false)
            console.error("Error fetching wallet balance:", error);
            if (error.response ? error.response.data : error.message) {
                Swal.fire({
                    icon: "error",
                    title: "Oops! An error has occurred",
                    text: "Payment gateway can't initialize right now, try again later.",
                    timerProgressBar: false,
                    footer: `<a href="#">You currently can't access the payment gateway rightaway. Please try again later. ${error.message}</a>`,

                });
            }
        } finally {
            setIsPaystackLoading(false)
        }
    };







    // this for the second modal to pay for leads
    // const redirectToPayLeadsForm = async () => { //purchase for lead function
    //     setIsModalOpen2(false);

    //     console.log(payLeadsForm, "from walletindex")
    // };



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
            if (response.data.balance) {
                sessionStorage.removeItem("lastRoute")
                // navigate("/login")
            }

            setTransactions(response.data.balance);
            setLowBal(response.data.balance);
            console.log(response.data)
        } catch (error) {
            console.error("Error fetching wallet balance:", error);
            if (error.response ? error.response.data : error.message) {
                sessionStorage.setItem("lastRoute", location.pathname)
                Swal.fire({
                    icon: "error",
                    title: "Oops! Something went wrong",
                    text: "Having troubles? please try again.",
                    timer: 4000,
                    timerProgressBar: true,
                    footer: `<a href="#"> ${error.response ? error.response.data : error.message} . Please try again later.</a>`,

                });
                navigate("/login")
            }
            setIsLoading(false);
        } finally {
            setIsLoading(false);
        }
    };


    useEffect(() => {
        fetchWalletBalance();
        if (lowBal !== null && lowBal <= 50) {
            Swal.fire({
                icon: "warning",
                title: "Warning message!!",
                text: "Your balance is low make a quick topup to stay active.",
                timerProgressBar: false
            });
        }
    }, [])

    // const handleStats = () => {
    //     navigate()
    // }


    return (
        <div>
            <div className="flex-1 flex flex-col items-center p-4 sm:p-6 md:p-10">
                <div className="w-full max-w-5xl mt-5 p-4 bg-white rounded-xl shadow-lg">
                    <div className="flex flex-col sm:flex-row items-center justify-between">
                        <h2 className="text-gray-600">Hello,</h2>

                        <h2 className="text-gray-600">{organization_name.name}</h2>
                    </div>
                    <div className="mt-4 p-4 bg-blue-500 hover:bg-blue-700 text-white rounded-lg text-center">
                        <h3 className="text-xl">Total Balance</h3>
                        {isLoading ? (
                            <div className="flex justify-center items-center">
                                <p> <ImSpinner9 className="animate-spin text-white hover:text-gray-300" size={22} /> </p>
                            </div>
                        ) : (
                            <p className="text-2xl font-bold flex items-center justify-center">
                                <TbCurrencyNaira className="mr-1 text-sm" size={22} />
                                {transactions}
                            </p>
                        )}
                    </div>
                    <div className="mt-4 flex sm:flex-row justify-center sm:space-y-0 ">
                        <button className="flex flex-col mr-3  items-center" onClick={openModal}>
                            <MdPayment className="p-2 bg-blue-200 hover:text-blue-800 text-blue-500 rounded-full text-4xl" />
                            <span className="text-sm mt-1">Add Funds</span>
                        </button>
                        {/* <button className="flex flex-col items-center mr-5" onClick={openModal2}>
                            <FaWallet className="p-2 bg-red-200 hover:text-red-800 text-red-500 rounded-full text-4xl" />
                            <span className="text-sm mt-1">Purchase Leads</span>
                        </button> */}
                        <button className="flex flex-col items-center" onClick={StatsOpenModal}>
                            <FaRegChartBar className="p-2 bg-green-200 hover:text-green-800 text-green-500 rounded-full text-4xl" />
                            <span className="text-sm mt-1">Statistics</span>
                        </button>
                    </div>
                    <div className="mt-6">
                        <hr className="p-2" />
                        <div className="mt-4 flex sm:flex-row justify-between sm:space-y-0 ">
                            <div className=" mr-4">
                                <DateRangePicker />
                            </div>
                            <div className="mr-4">
                                <DateTransaction />
                            </div>
                        </div>
                        <div className="flex sm:flex-row  sm:space-y-0 mt-11">
                            <h3 className="text-lg font-bold">Transactions history </h3>
                        </div>
                        <AllTransaction />

                        <Modal isOpen={isModalOpen} addAmountWallet={addAmountWallet} setAddAmountWallet={setAddAmountWallet} onClose={closeModal} onRedirect={redirectToPayStack} loading={isPaystackLoading} />
                        {/* <PayLeadsForm isOpened={isModalOpen2} payLeadsForm={payLeadsForm} setPayLeadsForm={setPayLeadsForm} onClosed={closeModal2} onRedirected={redirectToPayLeadsForm} /> */}
                        <StatisticsModal isOpen={StatsIsModalOpen} onClose={StatsCloseModal} />
                        <ProceedToPayment isOpen={isProceedOpen} onClose={isProceedCloseModal} paystack={paystack} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WalletIndex