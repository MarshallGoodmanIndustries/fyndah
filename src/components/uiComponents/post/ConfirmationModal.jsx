import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";



const ConfirmationModal = ({setConfirmationModal, org_id}) => {
    const {authToken} = useContext(AuthContext);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const handleCreateConversation = async ()=> {
        setIsLoading(true);
        try {
            const response = await axios.post(`https://axelonepostfeature.onrender.com/api/conversations/newconversation/${org_id}`, {}, {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            });
            if(response.status === 200){
                setIsLoading(false);
                setConfirmationModal(false);
                // navigate("/dashboard/messages");
            }
            console.log(response.data);
        } catch (error) {
            setIsLoading(false);
            console.log(error.message)
        }
    };
  return (
    <section className="flex flex-col gap-4 absolute w-full h-auto top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 text-primary rounded-lg z-20 bg-textDark bg-opacity-95">
        <h3 className="text-center font-poppins font-medium text-base">Connect & Message</h3>
        <p className="text-center font-poppins font-light text-sm">Are you sure you want to send a connection request to this business/organization?</p>
        <div className="flex items-center justify-evenly">
            <button onClick={()=> setConfirmationModal(false)} className="font-poppins text-sm hover:underline">Cancel</button>
            <button onClick={handleCreateConversation} className="bg-gray-600 py-1 px-4 rounded-lg font-poppins text-sm flex items-center justify-center">
                {isLoading ? <span className="animate-pulse">Confirm..</span> : <span>Confirm</span>}
            </button>
        </div>
    </section>
  )
}

export default ConfirmationModal;