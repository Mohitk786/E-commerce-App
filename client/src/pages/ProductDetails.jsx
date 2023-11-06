import React from 'react'
import { useState, useEffect } from 'react';
import { API_BASE } from '../constants/data';
import axios from 'axios';

const ProductDetails = () => {
    
    const [data, setData] = useState([]);
    const [param, setParam] = useState('');

    const getData = async (params) => {
        try {
          const response = await axios.get(`${API_BASE}/productDetails/${params}`, { withCredentials: true });
          setData(response.data.product);
    
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

      let thumbnail = data.thumbnail; 
      console.log(thumbnail);
      console.log(data.thumbnail);
      if (thumbnail && thumbnail.includes('upload/')) {
        const split =  thumbnail.split('upload/');
        thumbnail = split[0]+'/upload/'+split[1];
      }

  return (
    <div className='w-full flex  justify-center'>
        <div className='w-[80%] mt-[5%] flex '>
            <div className='flex flex-col w-[50%] gap-10'>
                <div className='flex flex-col w-full gap-2'>
                    <div>
                        <h2 className='font-bold text-3xl'>{data.itemName}</h2>
                    </div>
                    <div className='flex flex-col item'>
                        <p>Rs. {data.price}</p>
                        <p className='text-sm italic font-mono'>This item ships for free. </p>
                    </div>
                    
                    <div className='border-slate-200 border-[0.3px]  '></div>
                    <p className='text-left text-md'>{data.itemDescription} The Ratio Eight coffee maker combines precision brewing, top-quality construction, and a design that will elevate any environment. Designed for perfect brewing from 16 to 40 ounces, the Eight uses a smart brewing algorithm to mimic hand-made pour over coffee. 8 delicious cups of coffee in 8 minutes.</p>
                    <div className='flex flex-col font-mono mt-5 gap-3'>
                        <div> BPA-free water tank </div>
                        <div> Handblown glass carafe</div>
                        <div>Designed & Assembled in Portland, OR</div>
                    </div>

                </div>

                <div>
                <button className='bg-slate-800 hover:bg-slate-900 py-2 px-4 text-white rounded-lg'>
                    Add To Cart
                </button>
                </div>
            </div>
            <div className='w-[50%] flex items-center justify-center'>
                <div className='w-full'>
                    <img src={data.thumbnail} alt='product' className='w-full' />
                </div>
            </div>
        </div>
    </div>
  )
}

export default ProductDetails