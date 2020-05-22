import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import CharacterItem from './CharacterItem';

function CharacterData() {
    const [ episode, setEpisode ] = useState([])
    const [ characters, setCharacters ] = useState([])
    const { id } = useParams()
   
    async function fetchData() {
        const res = await fetch(`https://rickandmortyapi.com/api/episode/${id}`)
        res.json().then(res => {
            setEpisode(res);
            res.characters.map(chUrl => 
                fetch(chUrl).then(res => res.json())
                .then(character => setCharacters(prevCh => [...prevCh, character])))
        })
    }

    useEffect(() => {
        fetchData()
    }, [])
    
    return (
        <div>
            <div className="card text-white bg-dark mx-auto" style={{width: "18rem"}}>
                <div className="card-body">
                    <h5 className="card-title">{episode.name}</h5>
                    <p className="card-text">Air date: {episode.air_date} </p>
                    <p className="card-text">{episode.episode} </p>
                </div>
            </div>
            <h3>Characters in episode {episode.name}</h3>
            <div className="card-columns">
                {characters.map(item => <CharacterItem key={item.id} character={item} />)}
            </div>

        </div>
    );
}

export default CharacterData;