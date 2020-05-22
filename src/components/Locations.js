import React, { Component } from 'react';
import LocationItem from './LocationItem';
import Pagination from './Pagination'


class Locations extends Component {
    constructor() {
        super()
        this.state = {
            url: "https://rickandmortyapi.com/api/location/",
            info: [],
            currentPage: 1,
            locations: [],
            name: "",
            type: "",
            dimension: "",
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
                locations: data.results
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
            "&type=",this.state.type,
            "&dimension=",this.state.dimension)

        fetch(`${this.state.url}?${query}`).then(response => response.json())
        .then(data => {
            if (data.error){
                alert("There is no such location!")
            } else {
            this.setState({
                info: data.info,
                locations: data.results
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
                locations: data.results
            })
        } )
        this.setState({
            currentPage: number 
        })
    }

    render() {
        const locationItems = this.state.locations.map(item => <LocationItem key={item.id} location={item} />)
        
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
                        name="type" 
                        value={this.state.type} 
                        onChange={this.handleChange} 
                        placeholder="Type e.g. Planet"
                    />
                    <br />
                    <input 
                        name="dimension" 
                        value={this.state.dimension} 
                        onChange={this.handleChange} 
                        placeholder="Dimension e.g. C-137" 
                    />
                    <br />
                    <button>Search</button>
                </form>
                <p></p>
                <div className="card-columns">
                    {locationItems}
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

export default Locations;