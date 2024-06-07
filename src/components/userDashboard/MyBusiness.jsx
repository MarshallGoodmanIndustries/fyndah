import { useNavigate } from "react-router-dom";
import { TbPointFilled } from "react-icons/tb";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";


function MyBusiness() {
    const navigate = useNavigate()
    const { authToken } = useContext(AuthContext)
    const [orgList, setOrgList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [loading, setLoading] = useState(false);


    async function ConnectedBusinesses() {

        setIsLoading(true);

        if (!authToken) {
            console.log("Token not provided");
        } else {
            console.log(authToken); // Logging the token to verify it's present
        }

        const API = 'https://api.fyndah.com/api/v1/users/organizations/connected';

        try {
            const response = await axios.get(API, {
                headers: {
                    'Authorization': `Bearer ${authToken}`, // Correctly placing the headers inside the config object
                },
            });
            setOrgList(response.data)
            console.log(response.data); // Assuming response.data contains the expected data

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




    const handlePathChange = async (id) => {
        const url = `https://api.fyndah.com/api/v1/users/organizations/${id}/switch`
        const body = { id: id }
        console.log(body)
        try {
            setLoading(true)
            const response = await axios.post(url, body, {
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                }
            })
            console.log(response.data)
            if (response.data.message === "Switched to business successfully") {
                Swal.fire({
                    icon: "success",
                    title: "Congratulation",
                    text: "You have switched to business account successfully.",
                    timer: 4000,
                    timerProgressBar: true,
                });
            }
            navigate(`/businessDashboard/${id}/posts`)
        } catch (error) {
            console.log(error.massage)
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
        }

    }

    if (isLoading) {
        return <div className="flex items-center justify-center h-screen">
            <p>Loading...</p>
        </div>
    } else if (loading) {
        return <div className="flex items-center justify-center h-screen">
            <p>Loading...</p>
        </div>
    }

    return (
        <div className="flex m-[2rem] flex-col gap-3">
            <h2 className="mb-[2rem]">My Buisness</h2>
            <ul className="font-roboto flex flex-col gap-5">
                {orgList.map((business) => (
                    <div className="flex gap-1 items-center" key={business.id}>
                        <span>
                            < TbPointFilled className="text-accentDark" />
                        </span>
                        <p>ID: {business.id}</p>
                        <li onClick={() => handlePathChange(business.id)} className="cursor-pointer hover:text-accentDark" > {business.org_name} </li>

                    </div>
                ))}
            </ul>

        </div>
    )
}

export default MyBusiness;