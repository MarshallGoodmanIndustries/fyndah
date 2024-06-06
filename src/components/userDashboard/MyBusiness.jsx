import { useNavigate } from "react-router-dom";
import { TbPointFilled } from "react-icons/tb";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";


function MyBusiness() {
    const navigate = useNavigate()
    const { authToken } = useContext(AuthContext)
    const [orgId, setOrgId] = useState(null)
    // const [orgName, setOrgName] = useState('')

    async function SwitchedOrganisation() {
        try {
            const API = 'https://api.fyndah.com/api/v1/users/organizations/1/switch';
            const data = {};
            const response = await axios.post(API, data, {
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                },
            });
            console.log(response.data)
            if (response.data.status == "success") {

                const org_id = response.data.data.org.id;
                const org_name = response.data.data.org.org_name
                // setOrgName(org_name)
                setOrgId(org_id)
                console.log(org_id, org_name)

                Swal.fire({
                    icon: "success",
                    title: "Successful...",
                    text: "You have successfully switched to business account.",
                    timer: 2000,
                    timerProgressBar: true,
                });


            }

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
                navigate('/login');
            }
        }
    }


    useEffect(() => {
        SwitchedOrganisation();
    }, []);



    const myBusinesses = [
        {
            id: orgId,
            name: "Marshall Associates",
        },
        {
            id: 2,
            name: "London brewery",
        },
    ]

    const handlePathChange = (id) => {
        navigate(`/businessDashboard/${id}/posts`)
    }

    return (
        <div className="flex m-[2rem] flex-col gap-3">
            <h2 className="mb-[2rem]">My Buisness</h2>
            <ul className="font-roboto flex flex-col gap-5">
                {myBusinesses.map((business) => (
                    <div className="flex gap-1 items-center" key={business.id}>
                        <span>
                            < TbPointFilled className="text-accentDark" />
                        </span>
                        <li onClick={() => handlePathChange(business.id)} className="cursor-pointer hover:text-accentDark" > {business.name} </li>
                    </div>

                ))}
            </ul>
        </div>
    )
}

export default MyBusiness;