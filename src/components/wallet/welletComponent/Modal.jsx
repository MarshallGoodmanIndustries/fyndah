// import React from 'react'

import { useState } from "react";
// import { ImSpinner9 } from "react-icons/im";
import { RiSecurePaymentLine } from "react-icons/ri";

function Modal({ addAmountWallet, setAddAmountWallet, isOpen, onClose, onRedirect, loading, }) {

    const [error, setError] = useState(true)
    const [amountError, setAmountError] = useState("")

    if (!isOpen) return null;

    // this handle the changes for the input field
    const handleChanges = (e) => {
        const value = e.target.value;
        setAddAmountWallet(value);

    }

    // this function submit the form input amount
    const handleSubmit = (e) => {
        e.preventDefault();
        if (addAmountWallet) {
            // this check if the amount is below 5k
            if (addAmountWallet === "" || parseInt(addAmountWallet) >= 5000) {
                // if true open the modal for continue payment
                onRedirect();
                setError(true)
                setAmountError("")
            } else {
                // else throw this error
                setAmountError("Amount must be at least 5000 and above.")

            }
        } else {
            setError(false)
        }
    }
    return (
        <div>

            <div className="relative">

                <div className="fixed animate-zoomIn inset-0 flex items-center p-4 justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg shadow-lg overflow-y-auto max-h-full">
                        <div className="flex mt-2 justify-center items-center">
                            <RiSecurePaymentLine size={50} className="text-blue-500" />
                        </div>
                        {/* <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                            X
                        </button> */}
                        <div className="flex justify-between items-center p-4 border-b">
                            <p className="flex justify-center text-center items-center mb-4 text-lg  font-medium">The amount you insert in the field will be added to your wallet. <br />
                                put the amount and click on continue to proceed.</p>
                        </div>
                        <div className="p-4">
                            <div className="mb-4">
                                <input
                                    type="number"
                                    id="amount"
                                    name="amount"
                                    value={addAmountWallet}
                                    onChange={(e) => {
                                        handleChanges(e);
                                        setError(true); // Reset validity on change
                                    }}
                                    className={`border p-2 rounded w-full ${error || amountError ? 'border-gray-300' : 'border-red-500'}`}
                                    placeholder="Enter Amount (min 5000)"
                                    min="5000"
                                    required
                                />
                                {/* this set the error message for empty field */}
                                {!error && (
                                    <p className="text-red-500 text-center text-sm mt-2">Please enter an amount</p>
                                )}
                                {/* this set an error message for the min of 5k */}
                                {amountError && (
                                    <p className="text-red-500 text-center text-sm mt-2">{amountError}</p>
                                )}
                            </div>
                            <button
                                className="bg-blue-500 mr-4 text-white px-4 py-2 rounded hover:bg-blue-700"
                                onClick={handleSubmit}
                            >
                                {loading ? "Processing..." : "Continue"}
                            </button>
                            <button
                                className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                                onClick={onClose}

                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>

            </div>


        </div>
    )
}

export default Modal