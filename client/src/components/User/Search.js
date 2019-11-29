import React from 'react'
import '../../views/User/User.css'


export default (props) => {
  return (
    <input  
      className="search-input form-control"
      type="text"
      placeholder="Type to filter"
      value={props.filterValue}
      onChange={props.filterUpdate}
    />
  )
}