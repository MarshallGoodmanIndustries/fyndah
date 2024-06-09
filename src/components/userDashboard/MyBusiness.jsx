import { Link, useNavigate } from "react-router-dom";
import { TbPointFilled } from "react-icons/tb";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";
import { ImSpinner9 } from "react-icons/im"


function MyBusiness() {
    const navigate = useNavigate()
    const { authToken } = useContext(AuthContext)
    const [orgList, setOrgList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [loading, setLoading] = useState(false);
    const [createdBusiness, setCreatedBusiness] = useState("")


    async function ConnectedBusinesses() {

        setIsLoading(true);

        if (!authToken) {
            // console.log("Token not provided");
        } else {
            // console.log("token provided"); // Logging the token to verify it's present
        }

        const API = 'https://api.fyndah.com/api/v1/users/organizations/connected';

        try {
            const response = await axios.get(API, {
                headers: {
                    'Authorization': `Bearer ${authToken}`, // Correctly placing the headers inside the config object
                },
            });
            if (response.data.length > 0) {
                setOrgList(response.data)
                console.log(response.data);
                setCreatedBusiness("") // Assuming response.data contains the expected data
            } else {
                setIsLoading(false)
                setCreatedBusiness("No business has been created yet...")
            }
            // setCreatedBusiness(response.data);

        } catch (error) {
            console.error('There was an error:', error.response ? error.response.data : error.message);
            if (error.response ? error.response.data : error.message) {
                Swal.fire({
                    icon: "error",
                    title: "Oops! Something went wrong",
                    text: "Seems your token has expired or network issues, try to login again.",
                    timer: 4000,
                    timerProgressBar: true,
                });

                setIsLoading(false);
            }
        } finally {
            setIsLoading(false)
        }

    }



    useEffect(() => {
        ConnectedBusinesses();
    }, []);




    const handlePathChange = async (id, org_name) => {
        const url = `https://api.fyndah.com/api/v1/users/organizations/${id}/switch`
        const body = { id: id }

        try {
            setLoading(true)
            const response = await axios.post(url, body, {
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                }
            })

            if (response.data.message === "Switched to business successfully") {
                Swal.fire({
                    icon: "success",
                    title: "Congratulation",
                    text: "You have switched to business account successfully.",
                    timer: 4000,
                    timerProgressBar: true,
                });
            }
            navigate(`/businessDashboard/${id}/${org_name}/business-profile`)
        } catch (error) {

            if (error.response ? error.response.data : error.message) {
                Swal.fire({
                    icon: "error",
                    title: "Oops! Something went wrong",
                    text: "Seems your token has expired or network issues, try to login again.",
                    timer: 4000,
                    timerProgressBar: true,
                });

                setIsLoading(false);

            }
        } finally {
            setLoading(false)
            setCreatedBusiness(false)
        }

    }

    if (isLoading) {
        return <div className="flex items-center justify-center h-screen">
            <p> <ImSpinner9 className="animate-spin text-red-500 hover:text-red-800" size={50} /> </p>

        </div>
    } else if (loading) {
        return <div className="flex items-center justify-center h-screen">
            <p> <ImSpinner9 className="animate-spin text-red-500 hover:text-red-800" size={50} /> </p>

        </div>
    }

    return (
        <>

            {!createdBusiness ? (
                <div className="flex m-[2rem] flex-col gap-3">
                    <h2 className="mb-[2rem]">My Buisness</h2>
                    <ul className="font-roboto flex flex-col gap-5">
                        {orgList.map((business) => (
                            <div className="flex gap-1 items-center" key={business.id}>
                                <span>
                                    < TbPointFilled className="text-accentDark" />
                                </span>
                                <li onClick={() => handlePathChange(business.id, business.org_name)} className="cursor-pointer hover:text-accentDark" > {business.org_name} </li>

                            </div>
                        ))}
                    </ul>

                </div>
            ) : (

                <div className="flex flex-col items-center justify-center h-screen bg-gray-200">
                    <p className="mb-4 text-lg font-bold">{createdBusiness}</p>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        <Link to='/dashboard/createbuisness'> Create A Business Now</Link>
                    </button>
                </div>
            )}
        </>
    )
}

export default MyBusiness;