import React from 'react'
import '../../views/User/User.css'


export default (props) => {

  const messIn = select =>{
   console.log('hello')
   this.setState({checkout:!this.state.checkout})
  }



    return (
      <div className='popup'>
      <div className='popup-inner'>
      <div className = 'showCart-button'>
      <button onClick={props.hideCart}>Close</button>
      </div>
      <h1>This is your cart</h1>
      <ul>
        {props.cart ? props.cart.map(item => {
          return <li>{item.name} {item.price}</li>;
        }):null}
      </ul>
      <p> SUBTOTAL: </p>
      <button onClick={messIn()}>Checkout</button>
      </div>
      </div>
    );


}
