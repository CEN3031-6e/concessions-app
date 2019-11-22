import React from 'react'
import '../../views/User/User.css'

export default (props) => {
  //render() {
    return (
      <div className='popup'>
      <div className='popup\_inner'>
      <h1>This is your cart</h1>
      <button onClick={props.hideCart}>X</button>
      </div>
      </div>
    );
//  }

}
