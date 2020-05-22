import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import EpisodeItem from './EpisodeItem'

function CharacterData() {
    const [ character, setCharacter ] = useState([])
    const [ origin, setOrigin ] = useState([])
    const [ location, setLocation ] = useState([])
    const [ episodes, setEpisodes ] = useState([])
    const [ originId, setOriginId ] = useState("")
    const [ locationId, setLocationId ] = useState("")
    const { id } = useParams()

    async function fetchData() {
        const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`)
        res.json().then(res => {
            setCharacter(res);
            setOrigin(res.origin);
            setOriginId(res.origin.url ? res.origin.url.split('/')[5] : "")
            setLocation(res.location)
            setLocationId(res.location.url ? res.location.url.split('/')[5] : "")
            res.episode.map(ep => fetchEpisodes(ep))
            
        })
    }

    function fetchEpisodes(url) {
        fetch(url).then(res => res.json()).then(ep => setEpisodes(prevEp => [...prevEp, ep]))
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div>
            <div className="card text-white bg-dark mx-auto" style={{width: "18rem"}}>
                <img src={character.image} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{character.name}</h5>
                    <p className="card-text">Status: {character.status} </p>
                    <p className="card-text">Species: {character.species} </p>
                    <p className="card-text">Type: {character.type} </p>
                    <p className="card-text">Gender: {character.gender} </p>
                    <p className="card-text">Born on:</p>
                    {originId === "" ? <p>{origin.name}</p> : <a href={`/location/${originId}`} >{origin.name}</a>}
                    <p></p>
                    <p className="card-text">Current location:</p>
                    {locationId === "" ? <p>{location.name}</p> : <a href={`/location/${locationId}`} >{location.name}</a>}
                    <p></p>
                    <p className="card-text">No. of episodes: {episodes.length}</p>
                </div>
            </div>
            <h3>Episodes featuring {character.name}</h3>
            <div  className="card-columns">
                {episodes.map(item => <EpisodeItem key={item.id} episode={item} />)}
            </div>
        </div>
    );
}

export default CharacterData;