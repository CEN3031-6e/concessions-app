import React from 'react'
import '../../views/User/User.css'

export default (props) => {
  return (
    <button 
      className="return-button" 
      onClick={props.returnPage}
    >Return</button>
  );
}