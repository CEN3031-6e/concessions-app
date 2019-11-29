import React from 'react'
import '../../views/User/User.css'

export default (props) => {

    const selectVenue = event => props.selectVenue(event.currentTarget.getAttribute('id'));
    const deleteVenue = event => props.deleteVenue(event.currentTarget.getAttribute('id'));

    let venueList = !props.venues ? null : props.venues
    .sort((a, b) => a.name.localeCompare(b.name))
    .filter((venue) => {
        return venue.name.toLowerCase().indexOf(props.filter.toLowerCase()) >= 0;
    })
    .map((venue) => {
        return (
            <div className="list-item" key={venue._id}>
                <h2>{venue.name}</h2>
                <p>{venue.address}</p>
                <button onClick={selectVenue} id={venue._id}>Select Venue</button>
                {props.adminPriv ? <button onClick={deleteVenue} id={venue._id}>Delete Venue</button> : null}
            </div>
        );
    });
    
    //let addVenue = props.adminPriv ? <div className="list-item" onClick={props.openModal}><h1>Add Venue</h1></div> : null;
    let addVenue = props.adminPriv ? <button onClick={props.openModal}>Add New Venue</button> : null;

    return (
        <div>
            {venueList}
            {addVenue}
        </div>
    );
}
