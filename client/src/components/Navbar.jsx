import axios from "axios";
import {FaShoppingCart} from "react-icons/fa"
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { API_BASE } from "../constants/data";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Navbar = () => {

  const navigate = useNavigate();
  const {cart} = useSelector((state) => state);

  const LogoutHandler = async() => {
    try{
      const res = await axios.put(`${API_BASE}/logout`);
      toast.Promise(res.response.data.message);
      navigate('/login')
    }catch(err){
        toast.error(err.response.data.message);
    }
  }

  return (
    <div>
      <nav className="flex justify-around items-center h-20  mx-auto">

        <NavLink to="/">
          <div className="ml-5">
          <img src="../logo.png" alt="site-logo" className="h-14"/>
          </div>
        </NavLink>

        <div className="flex items-center font-medium text-slate-100 mr-5 space-x-6">
            <NavLink to="/">
              <p>Home</p>
            </NavLink>

            <NavLink to="/cart">
              <div className="relative">
                  <FaShoppingCart className="text-2xl"/>
                  {
                    cart.length > 0 &&
                    <span
                    className="absolute -top-1 -right-2 bg-green-600 text-xs w-5 h-5 flex 
                    justify-center items-center animate-bounce rounded-full text-white" 
                    >{cart.length}</span>
                  }
                  
              </div>
            </NavLink>
          </div>

          
          <div className=" flex justify-around text-slate-100 w-[10%] cursor-pointer">
            <div onClick={LogoutHandler}>Logout</div>
          </div>


      </nav>
    </div>
  )
};

export default Navbar;
