import React, { Component } from 'react';
import CharacterItem from './CharacterItem'


class Home extends Component {
    constructor() {
        super ()
        this.state = {
			characters: []
        }
	}
	
	componentDidMount() {
        const a = []
        for(let i=0; i<=5; i++){
            a.push(Math.floor(Math.random() * 591 + 1))
        }
		fetch(`https://rickandmortyapi.com/api/character/${a}`).then(response => response.json())
        .then(charactersData => {
            this.setState({
                characters: charactersData
            })
        })
	}

    render() {
		const defData = this.state.characters.map(item => <CharacterItem key={item.id} character={item} />)
        
        return (
            <div>
                <p></p>
                <h2>The Rick and Morty Data</h2>
				<div className="card-columns">
					{defData}
				</div>
            </div>
        );
    }
}

export default Home;