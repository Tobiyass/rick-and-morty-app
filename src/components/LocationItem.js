import React from 'react';
import { Link } from 'react-router-dom'

function LocationItem(props) {
    
    return (
        <div className="card text-white bg-dark mb-3" style={{width: "18rem"}}>
            <div className="card-body">
                <h5 className="card-title">{props.location.name}</h5>
                <p className="card-text">{props.location.type} {props.location.dimension}</p>
                <Link to={`/location/${props.location.id}`} />
                <a href={`/location/${props.location.id}`} className="btn btn-primary">Details</a>
            </div>
        </div>
    );

}

export default LocationItem;