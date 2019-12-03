import React from 'react'
import {Button} from 'react-bootstrap'
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
                <Button className="select-button" onClick={selectVenue} id={venue._id}>Select Venue</Button>
                {props.adminPriv ? <Button className="select-button" onClick={deleteVenue} id={venue._id}>Delete Venue</Button> : null}
            </div>
        );
    });
    
    let addVenue = props.adminPriv ? <Button className="select-button" onClick={props.openModal}>Add New Venue</Button> : null;

    return (
        <div>
            {venueList}
            {addVenue}
        </div>
    );
}
