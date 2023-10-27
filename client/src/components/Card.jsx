import React from 'react'

const Card = ({name, image, des, btnText}) => {
  return (
    <div className='flex flex-col gap-2 items-center w-fit'>
        <img src={image} alt='grinder' width="400px"/>
        <p>{des}</p>
        <p className='font-bold text-lg'>{name}</p>
        <button className='border-2 border-slate-900 hover:bg-slate-900 hover:text-white px-10 text-slate-900 font-bold p-2'>{btnText}</button>
    </div>
  )
}

export default Card;