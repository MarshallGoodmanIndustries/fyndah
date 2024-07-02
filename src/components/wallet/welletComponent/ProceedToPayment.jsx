


import { GiGlobe } from 'react-icons/gi';
import Swal from 'sweetalert2';

function ProceedToPayment({ isOpen, onClose, paystack }) {



    const handleRedirectToPaystack = () => {
        try {
            if (paystack) {
                window.open(paystack, '_blank');
            }
        } catch (error) {
            console.log(error.message)
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Could not initiate connection",
                footer: `<a href="#">Please try again later. ${error.response?.data?.message || error.message
                    }</a>`,
            });
        }
    }


    if (!isOpen) return null;
    return (
        <div>
            <div className="relative">

                <div className="fixed animate-zoomIn p-3 inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm mx-auto">
                        <div className="flex justify-center mb-4">
                            <GiGlobe size={50} color='orange' />
                        </div>
                        <div className="text-center mb-6">
                            <p className="text-lg font-semibold text-black">Please know you will be ridirected to another page, do you want to still continue with the payment?</p>
                        </div>
                        <div className="flex justify-center space-x-4">
                            <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => handleRedirectToPaystack()}>
                                Yes
                            </button>
                            <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={onClose}>No</button>
                        </div>
                    </div>
                </div>

            </div>


        </div>

    )
}

export default ProceedToPayment