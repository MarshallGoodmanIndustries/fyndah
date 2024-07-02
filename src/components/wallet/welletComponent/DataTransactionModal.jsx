// AnimatedModal.js
// import { useState } from 'react';

// import { FaDollarSign } from 'react-icons/fa';
import { TbCurrencyNaira, } from 'react-icons/tb';
import './modal.css'; // Added custom CSS
// import { ImSpinner9 } from 'react-icons/im';

const DateTransactionModal = ({ isOpenModal, handleCloseModal, isLoading, startDate, endDate, data }) => {
    // const [isLoading, setIsLoading] = useState(false);
    // if (!data) {
    //     return <div>Loading...</div>
    // }

    // convert the start date into user readable format
    const startConvert = startDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
    // convert the end date format inot readable format
    const endConvert = endDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });


    if (!isOpenModal) return null;
    return (
        <div className="relative">

            <div className="fixed animate-zoomIn inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div className="bg-white rounded-lg shadow-lg overflow-y-auto max-h-full w-11/12 md:w-2/3 lg:w-1/2">
                    <div className="flex justify-between items-center p-4 border-b">
                        <h2 className="text-lg text-center font-medium">{`Your transactions from ${startConvert} to ${endConvert}`}</h2>
                        <button onClick={handleCloseModal} className="text-gray-400 hover:text-gray-600">
                            X
                        </button>
                    </div>
                    <div className="p-4">
                        <table className="min-w-full bg-blue-500">
                            <thead>
                                <tr>
                                    <th className="px-6 py-3 bg-blue-500 text-left text-xs font-medium text-black-500 uppercase tracking-wider">
                                        Transaction ID
                                    </th>
                                    <th className="px-6 py-3 bg-blue-500 text-left text-xs font-medium text-black-500 uppercase tracking-wider">
                                        Payment Type
                                    </th>
                                    <th className="px-6 py-3 bg-blue-500 text-left text-xs font-medium text-black-500 uppercase tracking-wider">
                                        Amount
                                    </th>
                                    <th className="px-6 py-3 bg-blue-500 text-left text-xs font-medium text-black-500 uppercase tracking-wider">
                                        Date
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="bg-white divide-y divide-gray-200">
                                {isLoading ? (
                                    <tr>
                                        <td colSpan={4} className="text-center p-10 text-black">
                                            <div className="flex justify-center items-center">
                                                Loading...
                                            </div>
                                        </td>
                                    </tr>
                                ) : data?.length > 0 ? (
                                    data.map((transactions) => {
                                        const formattedDate = new Date(transactions.created_at).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                            hour: 'numeric',
                                            minute: 'numeric',
                                            second: 'numeric'
                                        });
                                        return (
                                            <tr key={transactions.uuid || 'default-key'}>
                                                <td className="px-6 py-4 break-words max-w-xs">{transactions.uuid || 'N/A'}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">{transactions.type || 'Unknown Type'}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <p className="text-1 font-bold flex items-center justify-center">
                                                        <TbCurrencyNaira className="mr-1 text-sm" size={22} />
                                                        {/* <TbCurrencyDollar className="mr-1 text-sm" size={22} /> */}
                                                        {transactions.amount || '0'}
                                                    </p>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">{formattedDate || 'Not Available'}</td>
                                            </tr>
                                        );
                                    })
                                ) : (
                                    <tr>
                                        <td colSpan={4} className="text-center p-10 text-black">No transaction records found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>

        </div>
    );
};

export default DateTransactionModal;
