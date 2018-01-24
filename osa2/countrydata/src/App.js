import React from 'react'
import axios from 'axios'
import Items from './components/Items'


class App extends React.Component {
    constructor() {
        super()
        this.state = {
            countries: [],
            search: ''
        }
    }

    componentWillMount() {
        axios.get('https://restcountries.eu/rest/v2/all').then(all => {
            const countries = all.data.map(country => {
                return {
                    'name': country.name,
                    'nativeName': country.nativeName,
                    'capital': country.capital,
                    'population': country.population,
                    'flag': country.flag,
                    'currency': country.currencies[0].name
                }
            })
            this.setState({ countries })
        })
    }

    handleCountryClick = (country) => {
        this.setState({ search: country.name })
    }

    searchText = (event) => {
        this.setState({ search: event.target.value })
    }

    show = () => {
        let count = this.itemRow().length
        if (count > 10) {
            return (<div>Oops, too much to render</div>)
        } else if (count > 1 && count <= 10) {
            return (
                <Items.ItemRows content={this.itemRow()} />
            )
        } else if (count === 1) {
            return (
                <Items.Country country={this.singleRow()} />
            )
        } else {
            return (
                <div>
                    <p>There is no such country as <b>{this.state.search}</b></p>
                </div>
            )
        }
    }

    filtered = () =>
        this.state.countries.filter(p => p.name.toLowerCase().includes(this.state.search.toLowerCase()))


    itemRow = () =>
        this.filtered().map(p =>
            <div key={p.name} onClick={() => this.handleCountryClick(p)}>
                <li key={p.name}>{p.name}</li>
            </div>
        )

    singleRow = () =>
        this.filtered().map(country =>
            < div key={country.name}>
                <h1>{country.name} {country.nativeName}</h1>
                <div>capital: {country.capital}</div>
                <div>population: {country.population}</div>
                <div>currency: {country.currency}</div>
                <img src={country.flag} alt={country.name} />
            </div >
        )

    render() {
        return (
            <div>
                specify a country: <input value={this.state.search}
                    onChange={this.searchText} />

                <div>
                    {this.show()}
                </div>
            </div>
        )
    }
}


export default App
