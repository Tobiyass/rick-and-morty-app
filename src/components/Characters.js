import React, { Component } from 'react'
import CharacterItem from "./CharacterItem"
import Pagination from "./Pagination"

class Characters extends Component {
    constructor () {
        super()
        this.state = {
            url: "https://rickandmortyapi.com/api/character/",
            info: [],
            currentPage: 1,
            characters: [],
            name: "",
            status: "",
            species: "",
            type: "",
            gender: "",
            query: ""
        }
        this.handleChange = this.handleChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.paginate = this.paginate.bind(this)
    }

    componentDidMount() {
        fetch(this.state.url).then(response => response.json())
        .then(data => {
            this.setState({
                info: data.info,
                characters: data.results
            })
        })
    }

    handleChange(event) {
        const { name, value } = event.target
        this.setState({
          [name]: value
        })
    }

    onSubmit(event) {
        event.preventDefault()
        const { name } = event.target
        const query = "name=".concat(
            this.state.name,
            "&status=",this.state.status,
            "&species=",this.state.species,
            "&tpye=",this.state.type,
            "&gender=",this.state.gender)

        fetch(`${this.state.url}?${query}`).then(response => response.json())
        .then(data => {
            if (data.error){
                alert("There is no such character!")
            } else {
            this.setState({
                info: data.info,
                characters: data.results
            })
            }
        })
        this.setState({
            [name]: "",
            query: query
        })
    }
    
    paginate(number) {
        const { url, query } = this.state
        fetch(`${url}?page=${number}&${query}`).then(response => response.json())
        .then(data => {
            this.setState({
                info: data.info,
                characters: data.results
            })
        } )

        this.setState({
            currentPage: number 
        })
    }

    render() {      
        const characterItems = this.state.characters.map(item =>
             <CharacterItem key={item.id} character={item} />)
        return (
            <div>
                <p></p>
                <form onSubmit={this.onSubmit}>
                 <input 
                        name="name" 
                        value={this.state.name} 
                        onChange={this.handleChange} 
                        placeholder="Name" 
                    />
                    <br />
                    <select 
                        value={this.state.status}
                        name="status"
                        onChange={this.handleChange}>
                        <option value=""> Choose status </option>
                        <option value="Alive"> Alive </option>
                        <option value="Dead"> Dead </option>
                        <option value="Unknown"> Unknown </option>
                    </select>
                    <br />
                    <input 
                        name="species" 
                        value={this.state.species} 
                        onChange={this.handleChange} 
                        placeholder="Species" 
                    />
                    <br />
                    <input 
                        name="type" 
                        value={this.state.type} 
                        onChange={this.handleChange} 
                        placeholder="Type" 
                    />
                    <br />
                    <input
                        type="radio"
                        name="gender"
                        value="male"
                        checked={this.state.gender === "male"}
                        onChange={this.handleChange}
                    /> {"Male "} 
                    <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={this.state.gender === "female"}
                    onChange={this.handleChange}
                    /> Female 
                    <br />
                    <input
                        type="radio"
                        name="gender"
                        value="genderless"
                        checked={this.state.gender === "genderless"}
                        onChange={this.handleChange}
                    /> {"Genderless "}
                    <input
                    type="radio"
                    name="gender"
                    value="unknown"
                    checked={this.state.gender === "unknown"}
                    onChange={this.handleChange}
                    /> Unknown 
                    <br />

                    <button>Search</button>
                </form>
                
                <p></p>
                <div className="card-columns">
                        {characterItems}
                </div>
                
                <Pagination
                    currentPage={this.state.currentPage}
                    pages={this.state.info.pages}
                    paginate={this.paginate}
                />

            </div>
        )
    }
}
export default Characters;