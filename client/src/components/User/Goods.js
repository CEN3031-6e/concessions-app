import React from 'react'
import '../../views/User/User.css'

export default (props) => {
    return props.selectedVendor.goods
    //.sort()
    .filter((good) => {
        return good.name.toLowerCase().indexOf(props.filter.toLowerCase()) >= 0;
    })
    .map((good) => {
        return (
            <div className="list-item" key={good.id} id={good.id} onClick={props.selectGood}>
                <h1>{good.name}</h1>
                <p>${good.price}</p>
            </div>
        )
    });
}