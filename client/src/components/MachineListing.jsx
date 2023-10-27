import React from 'react'

const MachineListing = ({img, name, price}) => {
  return (
    <div>
        <div>
            <img src={img} alt='machine'/>
        </div>
        <div>
            <p>{name}</p>
            <p>{price}</p>
        </div>
    </div>
  )
}

export default MachineListing