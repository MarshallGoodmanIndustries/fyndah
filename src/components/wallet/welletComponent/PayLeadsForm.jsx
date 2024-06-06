// import React from 'react'

import { useState } from "react";

function PayLeadsForm({ payLeadsForm, setPayLeadsForm, isOpened, onClosed, onRedirected, }) {

    const [error, setError] = useState(true)
    if (!isOpened) return null;
    const handleSubmit = (e) => {
        e.preventDefault();
        if (payLeadsForm) {
            onRedirected();
            console.log(payLeadsForm, "from modal")
            setError(true)
        } else {
            console.log('please enter amount')
            setError(false)
        }
    }
    return (
        <div>
            <div className="fixed inset-0 bg-gray-600 p-6 bg-opacity-50 flex justify-center items-center">
                <div className="bg-white p-8 rounded shadow-md text-center animate-zoomIn">
                    <h2 className="text-xl mb-4">Enter Amount</h2>
                    <p className="mb-4">The amount you insert in the field will be added to your wallet. Insert your amount and click on continue to proceed.</p>
                    <div className="mb-4">
                        <input
                            type="number"
                            id="amount"
                            name="amount"
                            value={payLeadsForm}
                            onChange={(e) => {
                                setPayLeadsForm(e.target.value);
                                setError(true); // Reset validity on change
                            }}
                            className={`border p-2 rounded w-full ${error ? 'border-gray-300' : 'border-red-500'}`}
                            placeholder="Enter amount"
                            required
                        />
                        {!error && (
                            <p className="text-red-500 text-sm mt-2">Please enter an amount</p>
                        )}
                    </div>
                    <button
                        className="bg-blue-500 mr-4 text-white px-4 py-2 rounded hover:bg-blue-700"
                        onClick={handleSubmit}

                    >
                        Continue
                    </button>
                    <button
                        className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                        onClick={onClosed}

                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    )
}

export default PayLeadsForm