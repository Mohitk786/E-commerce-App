import React, { useEffect, useState } from 'react'
import MachineListing from '../components/MachineListing'
import axios from 'axios';
import { API_BASE } from '../constants/data';
import { toast } from "react-hot-toast";
import {FcAddDatabase} from "react-icons/fc"
import {useNavigate} from "react-router-dom"

const SellerItems = () => {
    const navigate = useNavigate;
    const [machineItems, setMachineItems] = useState(null);
    const [accessories, setAccessories] = useState(null);

    const allItems = async () => {
        try{
            const response = await axios.get(`${API_BASE}/showItems`);
            const category = response.data.data.item.category;
            if(category === "Machine"){
                setMachineItems(response.data);
            }else{
                setAccessories(response.data);
            }
        }catch(err){
            toast.error(err.response.data.message)
        }
    }

    useEffect(()=>{
        allItems();
    },[setMachineItems,setAccessories]);

  return (
    <div>
        <p>Machines</p>
        <div>
            {   machineItems &&
                machineItems.map((machine)=>(
                    <MachineListing {...machine}/>
                ))
            }

            <div>
                <FcAddDatabase onClick={()=> navigate("/addProduct")}/>
            </div>
        </div>

        <p>Accessories</p>
        <div>
            {   accessories &&
                accessories.map((accessory)=>(
                    <MachineListing {...accessory}/>
                ))
            }
            <div>
                <FcAddDatabase onClick={()=> navigate("/addProduct")}/>
            </div>
        </div>

            
    </div>
  )
}

export default SellerItems