import React from 'react'

const Button = ({text}) => {
  return (
    <button className='bg-slate-800  hover:bg-slate-900 w-full py-2  text-white rounded-lg'
    >{text}</button>
  )
}

export default Button