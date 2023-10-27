import React,{useState, useEffect} from 'react';
import {useNavigate} from "react-router-dom"
import { API_BASE } from '../constants/data';
import axios from "axios";
import {toast} from "react-hot-toast"

const AddProduct = () => {


const navigate = useNavigate();
  const [formData, setFormData] = useState({
    itemDescription: '',
    itemName: '',
    price: '',
    category: 'Machine',
    thumbnail:'',
  });
  

  const changeHandler = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const getData = async () => {
    try{
        const response = await axios.post(`${API_BASE}/addProduct`,{formData});
        toast.success(response.response.data.message);
    }catch(err){
        toast.error(err.response.data.message);
    }
  }

  const submitHandler = async (event) => {
    event.preventDefault();
    await getData();
  };



  return (
    <div className="min-h-screen flex items-center justify-center">
   
      <form onSubmit={submitHandler} className="max-w-md mx-auto p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Product Details</h2>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Item Name"
            onChange={changeHandler}
            name="itemName"
            value={formData.itemName}
            className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="About Product"
            onChange={changeHandler}
            name="itemDescription"
            value={formData.itemDescription}
            className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <input
            type="number"
            placeholder="Price"
            onChange={changeHandler}
            name="price"
            value={formData.price}
            className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="category" className="block text-gray-600">
            Product Category:
          </label>
          <select
            onChange={changeHandler}
            name="category"
            id="category"
            value={formData.category}
            className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
          >
            <option value="Machine">Machine</option>
            <option value="Accessory">Accessory</option>
          </select>
        </div>
  
        <label htmlFor="image">Please upload an Product image:</label>
        <input type="file" id="image" name="thumbnail" accept="image/jpg, image/jpeg, image/webp" onChange={changeHandler} />

        <button
            type="submit"
            className="bg-slate-800 font-bold hover:bg-slate-900 w-full py-2  text-white rounded-lg"
          >
            Add Product
          </button>


      </form>
      
     
    </div>
  )
}

export default AddProduct;