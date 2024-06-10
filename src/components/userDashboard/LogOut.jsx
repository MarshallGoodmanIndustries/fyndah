
import { useContext } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LogOut() {
  

  return <button onClick={handleLogOut}>Logout</button>;
}

export default LogOut;

