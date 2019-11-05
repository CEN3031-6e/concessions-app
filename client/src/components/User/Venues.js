import React from 'react'
import '../../views/User/User.css'

export default (props) => {
    return props.venues
    //.sort()
    .filter((venue) => {
        return venue.name.toLowerCase().indexOf(props.filter.toLowerCase()) >= 0;
    })
    .map((venue) => {
        return (
            <div className="list-item" key={venue.id} id={venue.id} onClick={props.selectVenue}>
                <h1>{venue.name}</h1>
                <p>{venue.address}</p>
            </div>
        );
    });
}
