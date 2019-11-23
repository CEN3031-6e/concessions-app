import React from 'react'
import '../../views/User/User.css'

export default (props) => {
    //console.log (props.goods[0].price )
    return (
      <div className='popup'>
      <div className='popup-inner'>
      <div className = 'showCart-button'>
      <button onClick={props.hideCart}>Close</button>
      </div>
      <h1>This is your cart</h1>
      <ul>
        {props.goods ? props.goods.map(item => {
          return <li>{item[0]}</li>;
        }):null}
      </ul>
      </div>
      </div>
    );


}
