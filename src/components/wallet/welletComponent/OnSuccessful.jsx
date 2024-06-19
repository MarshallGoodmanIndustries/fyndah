import { useEffect } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"

function OnSuccessful() {
    const navigate = useNavigate()
    const { id, name } = useParams()

    const handleNavigate = () => {
        setTimeout(() => {
            navigate(`/businessDashboard/${id}/${name}/wallet`)
        }, 6000);

    }

    const route = `/businessDashboard/${id}/${name}/wallet`;

    useEffect(() => {
        handleNavigate()
    }, [])


    return (
        <div>
            <div className="flex items-center justify-center min-h-screen p-3 bg-gray-200">
                <div className="bg-white shadow-md rounded-lg p-6 text-center max-w-sm">
                    <div className="bg-green-500 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="text-white h-10 w-10">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h2 className="text-lg font-semibold text-gray-800 mb-2">SUCCESS</h2>
                    <p className="text-gray-600 mb-6">Congratulations, your business account wallet has been successfully credited.</p>
                    <button className="bg-green-500 text-white py-2 px-4 rounded-full hover:bg-green-600">
                        <Link to={route}>Continue</Link>
                    </button>
                </div>
            </div>
        </div>
    )
}
export default OnSuccessful