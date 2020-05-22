import React, { Component } from 'react';
import EpisodeItem from './EpisodeItem'
import Pagination from './Pagination'


class Episodes extends Component {
    constructor() {
        super()
        this.state = {
            url: "https://rickandmortyapi.com/api/episode/",
            info: [],
            currentPage: 1,
            episodes: [],
            name: "",
            episode: "",
            query: ""
        }
        this.handleChange = this.handleChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.onClick = this.onClick.bind(this)
        
        this.paginate = this.paginate.bind(this)
    }

    componentDidMount() {
        fetch(this.state.url).then(response => response.json())
        .then(data => {
            this.setState({
                info: data.info,
                episodes: data.results
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
            "&episode=",this.state.episode)

        fetch(`${this.state.url}?${query}`).then(response => response.json())
        .then(data => {
            if (data.error){
                alert("There is no such episode!")
            } else {
            this.setState({
                info: data.info,
                episodes: data.results
            })
            }
        })
        this.setState({
            [name]: "",
            query: query
        })
    }

    onClick(event) {
        event.preventDefault()
        const { value } = event.target
        
        fetch(`${this.state.url}?episode=${value}`).then(response => response.json())
        .then(data => {
            this.setState({
                info: data.info,
                episodes: data.results
            })
        })
    }

    paginate(number) {
        const { url, query } = this.state
        fetch(`${url}?page=${number}&${query}`).then(response => response.json())
        .then(data => {
            this.setState({
                info: data.info,
                episodes: data.results
            })
        } )
        this.setState({
            currentPage: number 
        })
    }

    render() {
        const episodeItems = this.state.episodes.map(item => <EpisodeItem key={item.id} episode={item} />)
        
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
                    <input 
                        name="episode" 
                        value={this.state.episode} 
                        onChange={this.handleChange} 
                        placeholder="Episode e.g. S01E01"
                    />
                    <br />
                    <button>Search</button>
                </form>
                <p></p>
                <p>Season: 
                    <button onClick={this.onClick} value="S01">1</button>
                    <button onClick={this.onClick} value="S02">2</button>
                    <button onClick={this.onClick} value="S03">3</button>
                    <button onClick={this.onClick} value="S04">4</button>
                </p>
                

                <div className="card-columns">
                    {episodeItems}
                </div>
                <Pagination
                    currentPage={this.state.currentPage}
                    pages={this.state.info.pages}
                    paginate={this.paginate}
                />
            </div>

            
        );
    }
}

export default Episodes;