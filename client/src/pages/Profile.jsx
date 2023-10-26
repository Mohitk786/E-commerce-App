import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { API_BASE } from '../constants/data';
import { toast } from "react-hot-toast";

export const Profile = () => {

    const [formData, setFormData] = useState({
        DOB: '',
        about: '',
        gender: '',
        MoNumber: '',
    });


    const changeHandler = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: value,
        }));
      };

      const updateProfile = async () => {
        try{
            const res = await axios.post(`${API_BASE}/profile`, formData);
            toast.success(res.response.data.message);
        }catch(err){
            toast.error(err.response.data.message);
        }
      }

    
      const submitHandler = async (event) => {
        event.preventDefault();
        await updateProfile();
      };

      const deleteHandler = async() => {

      }


  return (
    <div className='flex flex-col items-center gap-16'>
        <form onSubmit={submitHandler} className="max-w-md mx-auto p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Your profile</h2>
        <div className="mb-4">
          <input
            type="number"
            placeholder="mobile number"
            onChange={changeHandler}
            name="MoNumber"
            value={formData.MoNumber}
            className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="About"
            onChange={changeHandler}
            name="about"
            value={formData.about}
            className="w-full p-2 rounded-lg border text-black border-gray-300 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <input
            type="Date"
            placeholder="Date-of-Birth"
            onChange={changeHandler}
            name="DOB"
            value={formData.DOB}
            className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="gender" className="block text-gray-600">
            Gender:
          </label>
          <select
            onChange={changeHandler}
            name="gender"
            id="gender"
            value={formData.gender}
            className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <button
            type="submit"
            className="bg-slate-800  hover:bg-slate-900 w-full py-2  text-white rounded-lg"
          >
            Update Profile
          </button>
        </form>

        <button
            type="submit"
            className="bg-red-600 hover:bg-red-800 hover:font-bold p-2  text-white rounded-lg"
            onClick={deleteHandler}
          >
            Delete Your Account
          </button>
    </div>
  )
}
