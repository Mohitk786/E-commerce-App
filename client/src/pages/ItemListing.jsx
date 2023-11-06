import React, { useEffect, useState } from 'react';
import { API_BASE } from '../constants/data';
import axios from 'axios';
import Card from '../components/Card';
import accessory_top_image from '../assets/machines/topimage.webp';

export const ItemListing = () => {

  const [data, setData] = useState([]);
  const [param, setParam] = useState('');

  const getData = async (params) => {
    try {
      const response = await axios.get(`${API_BASE}/Items/${params}`, { withCredentials: true });
      console.log(response.data);
      setData(response.data.items);

    } catch (err) {
      console.log('Something went wrong', err.message);
    }
  };

  useEffect(() => {
    const url = window.location.href;
    const spiltted = url.split('=');
    const paramValue = spiltted[1];

    if (paramValue !== param) {
      setParam(paramValue);
    }

    if (paramValue) {
      getData(paramValue);
    }
  }, [param]);

  return (
    <div className='flex flex-col gap-20 items-center mt-9'>
      
      <div className='w-9/12 flex flex-col gap-20 items-center'>
          <div className='relative w-full'>
            <img src={accessory_top_image} alt='header' className='w-full' />
            <p className='absolute font-extrabold text-5xl text-white top-[78%] left-[25%]'>{param === "Accessory" ? "Accessories & Coffee" : "Machines or Grinders "}</p>
          </div>

          <div className='tracking-wider text-center'>
            <p className='text-lg'>
              {
                data && data.category === "Accessory" ? 
                "You did it. You joined the Ratio family. Now comes the fun part: accessorizing and ordering amazing coffee to brew at home. Bloom, brew, ready."
                :"If you’re trying to choose between the Ratio Six and the Ratio Eight, we empathize. They’re both beautiful machines that make smooth, rich coffee. But there are differences! And here they are."
              }
            </p>
        </div>
      </div>

      <div className="flex w-10/12 justify-center gap-4 flex-wrap">
        {data.map((product, index) => (
          <div key={index} className="">
            <Card key = {product.id}
             {...product}
            
             />
          </div>
        ))}
      </div>

    </div>
  );
};
