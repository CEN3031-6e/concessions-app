import React from 'react'
import '../../views/User/User.css'

export default (props) => {
    return props.selectedVenue.vendors
    //.sort()
    .filter((vendor) => {
        return vendor.name.toLowerCase().indexOf(props.filter.toLowerCase()) >= 0;
    })
    .map((vendor) => {
        return (
            <div className="list-item" key={vendor.id} id={vendor.id} onClick={props.selectVendor}>
                <h1>{vendor.name}</h1>
            </div>
        );
    });
}
