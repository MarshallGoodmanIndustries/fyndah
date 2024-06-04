import { useNavigate } from "react-router-dom";
import { TbPointFilled } from "react-icons/tb";

function MyBusiness () {
    const navigate = useNavigate()

    const myBusinesses = [
        {
            id: 1,
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
                        < TbPointFilled className="text-accentDark"/> 
                        </span>
                        <li onClick={() => handlePathChange(business.id)} className="cursor-pointer hover:text-accentDark" > {business.name} </li>
                    </div>
                    
                ))}
            </ul>
        </div>
    )
}

export default MyBusiness;