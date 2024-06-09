// AnimatedModal.js
// import { useState } from 'react';

// import { FaDollarSign } from 'react-icons/fa';
import { ImSpinner9 } from 'react-icons/im';
import './modal.css'; // Added custom CSS

const BalanceToDateModal = ({ isOpenModal, handleCloseModal, isLoading, data, startDate }) => {
    // const [isLoading, setIsLoading] = useState(false);
    // if (!data) {
    //     return <div>Loading...</div>
    // }

    const dateConvert = startDate.toLocaleDateString('en-US', {
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
                        <h2 className="text-lg text-center font-medium">Your balance on {dateConvert}</h2>
                        <button onClick={handleCloseModal} className="text-gray-400 hover:text-gray-600">
                            X
                        </button>
                    </div>
                    <div className="p-4">
                        <table className="min-w-full bg-blue-500">
                            <thead>
                                <tr>
                                    <th className="px-6 py-3 bg-blue-500 text-left text-xs font-medium text-black-500 uppercase tracking-wider">
                                        S/N
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

                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        1
                                    </td>
                                    {isLoading ? (<div className="flex justify-center items-center">
                                        <p className='p-5 text-sm text-gray-500'> Loading... </p>
                                    </div>
                                    ) : (

                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="text-xs">USD</span> {data}
                                        </td>
                                    )}
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {dateConvert}
                                    </td>
                                </tr>

                                {/* More rows... */}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default BalanceToDateModal;
