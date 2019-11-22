import React from 'react'
import '../../views/User/User.css'

export default (props) => {

    return (
      <div className='popup'>
      <div className='popup-inner'>
      <div className = 'showCart-button'>
      <button onClick={props.hideCart}>Close</button>
      </div>
      <h1>This is your cart</h1>

      </div>
      </div>
    );


}
