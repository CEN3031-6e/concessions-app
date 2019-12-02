import React from 'react'
import {Button} from 'react-bootstrap'
import '../../views/User/User.css'

export default (props) => {

    const selectGood = event => props.selectGood(event.currentTarget.getAttribute('id'));

    return props.selectedVendor.goods
    //.sort()
    .filter((good) => {
        return good.name.toLowerCase().indexOf(props.filter.toLowerCase()) >= 0;
    })
    .map((good) => {
        return (
            <div className="list-item" key={good._id}>
                <h1>{good.name}</h1>
                <p>${good.price.toFixed(2)}</p>
                <Button className="select-button" onClick={selectGood} id={good._id}>View Good</Button>
            </div>
        )
    });
}