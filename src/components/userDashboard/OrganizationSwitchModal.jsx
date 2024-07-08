// import React from 'react'
import axios from 'axios';
import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import Swal from 'sweetalert2';

function OrganizationSwitchModal({ isOpen, onClose, orgList }) {
    const [isLoading, setIsLoading] = useState(false);
    const { authToken } = useContext(AuthContext)
    const url = "https://api.fyndah.com/api/v1/users/organizations/1/switch";
    const body = {};


    const switchedOrganizations = async () => {
        try {
            setIsLoading(true)
            const response = await axios.post(url, body, {
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                }
            })
            // console.log(response.data)


        } catch (error) {
            console.log('There was an error:', error.response ? error.response.data : error.message)
            if (error.response) {
                Swal.fire({
                    icon: "error",
                    title: "Oops! Error changing account",
                    text: "Something went wrong you could try login in again.",
                    timer: 4000,
                    timerProgressBar: true,
                });
            }
            setIsLoading(false)
        } finally {
            setIsLoading(false)
        }
    }



    const handleSubmit = (e) => {
        e.preventDefault();
        switchedOrganizations();
        // Handle form submission logic here
        // console.log(orgList);

    };

    const handleClose = () => {
        onClose(); // Close the modal upon successful submission
    }



    if (!isOpen) return null;

    return (
        <div>
            <div className="fixed p-7 inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md md:max-w-lg lg:max-w-xl">
                    {isLoading ? (<div className='text-center'>Loading...</div>) : (null)}
                    <h2 className='text-center'>Switch account</h2>
                    <p className='text-center'>Are you sure you want to switch account?</p>
                    <div className="flex items-center justify-center mt-5">
                        <button onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-700 mr-3 text-white font-bold py-2 px-4 rounded">
                            Yes
                        </button>
                        <button onClick={handleClose} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            No
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrganizationSwitchModal