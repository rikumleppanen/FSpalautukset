import React, { Component } from 'react';
import logo from './logo.svg';
import Item from './components/Item'
import axios from 'axios'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNumber: '',
      search: ''
    }
  }
  componentWillMount() {
    axios.get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        this.setState({ persons: response.data })
      })
  }

  addItem = (event) => {
    event.preventDefault()
    const result = this.state.persons.map(p => p.name).indexOf(this.state.newName)

    if (result === -1) {
      const itemObject = {
        name: this.state.newName,
        number: this.state.newNumber
      }
      axios.post('http://localhost:3001/persons', itemObject)
        .then(response => {
          this.setState({
            persons: this.state.persons.concat(response.data),
            newName: '',
            newNumber: ''
          })
        })
    } else {
      alert("Nimi on jo olemassa")
    }
  }

  handleNameChange = (event) => {
    this.setState({ newName: event.target.value })
  }

  handleNumberChange = (event) => {
    this.setState({ newNumber: event.target.value })
  }
  searchItem = (event) => {
    this.setState({ search: event.target.value })
  }


  render() {
    let filteredNames = this.state.persons.filter(
      (item) => {
        return item.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
      }
    )
    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <div>
          rajaa näytettäviä: <input value={this.state.search} onChange={this.searchItem} />
        </div>
        <form onSubmit={this.addItem}>
          <div>
            nimi: <input value={this.state.newName}
              onChange={this.handleNameChange}
            />
          </div>
          <div>
            numero: <input value={this.state.newNumber}
              onChange={this.handleNumberChange}
            />
          </div>
          <div>
            <button type="submit">lisää</button>
          </div>
        </form>
        <h2>Numerot</h2>
        <table>
          <tbody>
            {filteredNames.map(p => <Item key={p.name} name={p.name} number={p.number} />)}
          </tbody>
        </table>

      </div>
    )
  }
}

export default App
