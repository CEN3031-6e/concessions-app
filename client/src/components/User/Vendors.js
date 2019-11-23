import React from 'react'
import '../../views/User/User.css'



export default (props) => {

    const selectVendor = event => props.selectVendor(event.currentTarget.getAttribute('id'));

    let vendorList = !props.vendors ? null : props.vendors
    .sort((a, b) => a.name.localeCompare(b.name))
    .filter((vendor) => {
        return vendor.name.toLowerCase().indexOf(props.filter.toLowerCase()) >= 0;
    })
    .map((vendor) => {
        return (
            <div className="list-item" key={vendor._id}>
                <h2>{vendor.name}</h2>
                <button onClick={selectVendor} id={vendor._id}>Select Vendor</button>
            </div>
        );
    });
    let addVendor = props.adminPriv ? <button onClick={props.openModal}>Register New Vendor</button> : null;

    return (
        <div>
            {vendorList}
            {addVendor}
        </div>
    );
}
