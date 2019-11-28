import React from 'react'
import '../../views/User/User.css'
import {Button} from 'react-bootstrap'

export default (props) => {
  return (
    <Button 
      className="return-button" 
      onClick={props.returnPage}
    >Return</Button>
  );
}