
import './modal.css'; // Added custom CSS

const StatisticsModal = ({ isOpen, onClose }) => {
    // const [isLoading, setIsLoading] = useState(false);
    // if (!data) {
    //     return <div>Loading...</div>
    // }



    if (!isOpen) return null;
    return (
        <div className="relative">

            <div className="fixed animate-zoomIn inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div className="bg-white rounded-lg shadow-lg overflow-y-auto max-h-full w-11/12 md:w-2/3 lg:w-1/2">
                    <div className="flex justify-between items-center p-4 border-b">
                        <h2 className="text-lg text-center font-medium">Your balance Transactions</h2>
                        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                            X
                        </button>
                    </div>
                    <div className="p-4">
                        <table className="min-w-full bg-blue-500">
                            <thead>
                                <tr>
                                    <th className="px-6 py-3 bg-blue-500 text-left text-xs font-medium text-black-500 uppercase tracking-wider">
                                        Expenses
                                    </th>
                                    <th className="px-6 py-3 bg-blue-500 text-left text-xs font-medium text-black-500 uppercase tracking-wider">
                                        Income
                                    </th>

                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                <tr>
                                    <td colSpan={4} className="text-center p-10 text-black">No transactions record found.</td>

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

export default StatisticsModal;
