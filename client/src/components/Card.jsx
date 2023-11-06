import React, { useState } from 'react';
import { API_BASE } from '../constants/data';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Card = ({ thumbnail, itemName, price, itemDescription, btnText, _id }) => {

  const navigate = useNavigate();
  const [added, setAdded] = useState(false);
  const [totalItems, setTotalItems] = useState(0);

  const AddToCart = async () => {
    try {
      const response = await axios.put(`${API_BASE}/cart/addToCart/${_id}`, null, { withCredentials: true });
      setTotalItems(response.data.totalItems);
      toast.success('Item added to the cart.');
      setAdded(true);
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  const RemoveFromCart = async () => {
    try {
      const response = await axios.put(`${API_BASE}/cart/removeFromCart/${_id}`,null, { withCredentials: true });
      setTotalItems(response.data.totalItems);
      setAdded(false);
      toast.success('Item removed from the cart.');
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  if (thumbnail && thumbnail.includes('upload/')) {
    const split = thumbnail.split('upload/');
    thumbnail = split[0] + 'upload/w_400,h_260/' + split[1];
  }

  return (
    <div className='flex flex-col gap-2 cursor-pointer items-center w-200px'
        onClick={() =>
          navigate({
            pathname: '/productDetails',
            search: `?category=${_id}`, 
          })
        }
    >
      <img src={thumbnail} alt='grinder' width="300px" height="195" />
      <p className='font-bold text-lg'>{itemName}</p>
      <p className='text-center font-light w-[260px]'>{itemDescription.split(" ").slice(0,10).join(" ") + "..."}</p>

      {price ? <p className="text-green-600 font-semibold">Rs.  {price} </p> : null }

      {btnText ? (
        <button className='bg-slate-800 hover:bg-slate-900 py-2 px-4 text-white rounded-lg'>
          {btnText}
        </button>
      ) : null}
    </div>
  );
};

export default Card;
