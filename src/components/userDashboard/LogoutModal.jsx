import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import Swal from 'sweetalert2';
import { TiWarning } from 'react-icons/ti';
import { ImSpinner9 } from 'react-icons/im';

function LogoutModalUser({ isOpen, onClose }) {

    const navigate = useNavigate();
    const { authToken, setAuthToken, setUserData, setBusinessId } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);

    const handleLogOut = async () => {

        try {
            setIsLoading(true)
            const response = await axios.post(
                "https://api.fyndah.com/api/v1/auth/logout",
                {},
                {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                        Accept: "application/json",
                    },
                }
            );

            if (response.status === 200) {
                setAuthToken(null);
                setUserData(null);
                setBusinessId(null);
                sessionStorage.removeItem("lastRoute")
                sessionStorage.removeItem("authToken");
                sessionStorage.removeItem("userData");
                sessionStorage.removeItem("businessId");
                console.log("Logged out successfully");

                Swal.fire({
                    icon: "success",
                    title: "Successful...",
                    text: "Successfully logged out",
                    timer: 2000,
                    timerProgressBar: true,
                });
                setIsLoading(false)
                navigate("/login"); // Redirect to login page
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Logout Failed!",
                footer: `<a href="#">Could not log out. Please try again later. ${error.response?.data?.message || error.message
                    }</a>`,
            });
            console.error("Logout error", error);
            setIsLoading(false);
        } finally {
            setIsLoading(false)
        }
    };


    if (!isOpen) return null;
    return (
        <div>
            <div className="relative">

                <div className="fixed animate-zoomIn inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm mx-auto">
                        <div className="flex justify-center mb-4">
                            <TiWarning size={50} color='orange' />
                        </div>
                        <div className="text-center mb-6">
                            <p className="text-lg font-semibold text-black">Are you sure you want to log out?</p>
                        </div>
                        <div className="flex justify-center space-x-4">
                            <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => handleLogOut()}>
                                {isLoading ? <ImSpinner9 size={22} color='white' className='animate-spin text-center' /> : "Yes"}
                            </button>
                            <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={onClose}>No</button>
                        </div>
                    </div>
                </div>

            </div>


        </div>

    )
}

export default LogoutModalUser