// import React from 'react'

import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../context/AuthContext"
import { useParams } from "react-router-dom"
import Swal from "sweetalert2"
import { TbCurrencyNaira, } from "react-icons/tb"
// import { FaDownload } from "react-icons/fa"

// function to show all transation history
function AllTransaction() {
    const { authToken } = useContext(AuthContext)
    const { id } = useParams();
    const [allTransaction, setAllTransaction] = useState([])

    const url = "https://test-api.fyndah.com/api/v1/organization/wallet/all_transactions"
    const body = { org_id: id }
    const handleAllTransaction = async () => {
        try {
            const response = await axios.post(url, body, {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            });
            // console.log(response.data)
            setAllTransaction(response.data)
            console.log(response.data)
        } catch (error) {
            console.log(error.response ? error.response.data : error.message)
            if (error.response ? error.response.data : error.message) {

                Swal.fire({
                    icon: "error",
                    title: "Oops! Something went wrong",
                    text: "Seems your token has expired or network issues, try to login again.",
                    timer: 4000,
                    timerProgressBar: true,
                });
            }
        }
    }

    useEffect(() => {
        handleAllTransaction()
    }, [])

    return (
        <div>
            <div className="h-64 overflow-x-auto overflow-y-auto mt-9">
                <div className="">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead>
                            <tr>
                                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-black-500 uppercase tracking-wider">
                                    Transaction ID
                                </th>
                                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-black-500 uppercase tracking-wider">
                                    Payment Type
                                </th>
                                <th className="px-6 py-3 bg-gray-50 text-left flex justify-center text-xs font-medium text-black-500 uppercase tracking-wider">
                                    Amount
                                </th>
                                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-black-500 uppercase tracking-wider">
                                    Date
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {allTransaction?.length > 0 ? (
                                allTransaction.map(transaction => {
                                    const formattedDate = new Date(transaction.created_at).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                        hour: 'numeric',
                                        minute: 'numeric',
                                        second: 'numeric'
                                    });
                                    return (
                                        <tr key={transaction.uuid || 'default-key'}>
                                            <td className="px-6 py-4 break-words max-w-xs">{transaction.uuid || 'N/A'}</td>
                                            <td className="px-6 py-4 break-words max-w-xs">{transaction.type || 'Unknown Type'}</td>
                                            <td className="px-6 py-4 break-words max-w-xs">
                                                <p className="flex justify-center">
                                                    <TbCurrencyNaira className="mr-1" size={22} />
                                                    {/* <TbCurrencyDollar className="mr-1 text-sm" size={22} /> */}
                                                    {transaction.amount || '0'}
                                                </p>
                                            </td>
                                            <td className="px-6 py-4 break-words max-w-xs">{formattedDate || 'Not Available'}</td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan={4} className="text-center p-10 text-black">No transactions found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    )
}

export default AllTransaction