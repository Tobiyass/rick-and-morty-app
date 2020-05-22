import React from 'react';
import { Link } from 'react-router-dom'

function CharacterItem(props) {

    return (
        <div className="card text-white bg-dark mb-3" style={{width: "18rem"}}>
            <img src={props.character.image} className="card-img-top" alt="..." /> 
            <div className="card-body">
                <h5 className="card-title">{props.character.name}</h5>
                <p className="card-text">{props.character.status} - {props.character.species}</p>
                <Link to={`/character/${props.character.id}`} />
                    <a href={`/character/${props.character.id}`} className="btn btn-primary">Details</a>
            </div>
        </div>
    );

}

export default CharacterItem;