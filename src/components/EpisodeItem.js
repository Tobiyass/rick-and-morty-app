import React from 'react';
import {
    Link
  } from "react-router-dom";


function EpisodeItem(props) {
    
    return (
        <div className="card text-white bg-dark mb-3" style={{width: "18rem"}}>
            <div className="card-body">
                <h5 className="card-title">{props.episode.episode} {props.episode.name}</h5>
                <p className="card-text">{props.episode.air_date}</p>
                <Link to={`/episode/${props.episode.id}`} />
                    <a href={`/episode/${props.episode.id}`} className="btn btn-primary">Details</a>
            </div>
        </div>
    );

}

export default EpisodeItem;