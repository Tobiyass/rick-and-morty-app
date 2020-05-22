import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import CharacterItem from './CharacterItem';

function LocationData() {
    const [ location, setLocation ] = useState([])
    const [ residents, setResidents ] = useState([])
    const { id } = useParams()
   
    async function fetchData() {
        const res = await fetch(`https://rickandmortyapi.com/api/location/${id}`)
        res.json().then(res => {
            setLocation(res);
            res.residents.map(resident => 
                fetch(resident).then(res => res.json()
                .then(r => setResidents(prevR => [...prevR, r]))))
        })
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div>
            <div className="card text-white bg-dark mx-auto" style={{width: "18rem"}}>
            <div className="card-body">
                <h5 className="card-title">{location.name}</h5>
                <p className="card-text">Type: {location.type} </p>
                <p className="card-text">Dimension: {location.dimension} </p>
                <p className="card-text">Population: {residents.length} </p>
                
            </div>
            </div>
            <h3>Residents: </h3>
            <div className="card-columns">
                {residents.map(item => <CharacterItem key={item.id} character={item} />)}
            </div>
        </div>
    );
}

export default LocationData;