import React from 'react'
import '../../views/Vendor/Vendor.css'

export default (props) => {
  return (
    <button
      className="return-button"
      onClick={props.returnPage}
    >Return</button>
  );
}
