import React from 'react'
import ItemTable from './components/ItemTable'
import Notification from './components/Notification'
import personsService from './services/Persons'



class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNumber: '',
      search: '',
      notification: null
    }
  }
  componentWillMount() {
    personsService.getAll().then(persons => {
      this.setState({ persons })
    })
  }

  addItem = (event) => {
    event.preventDefault()
    const person = this.state.persons.find(p => p.name === this.state.newName);

    if (!person) {
      const itemObject = {
        name: this.state.newName,
        number: this.state.newNumber
      }
      personsService.create(itemObject).then(newObj => {
        this.setState({
          persons: this.state.persons.concat(newObj),
          newName: '',
          newNumber: '',
          search: '',
          notification: `Henkilö ${newObj.name} on lisätty`
        })
        setTimeout(() => {
          this.setState({ notification: null })
        }, 5000)
      })
    } else {
      if (this.state.newNumber !== person.number && this.state.newNumber.length > 0) {
        this.updateItem(person)
      } else {
        alert("Henkilön nimi on jo luettelossa")
      }

    }
  }


  removeItem = (id, one) => {
    return () => {
      if (window.confirm(`Poistetaanko ${one.name} luettelosta?`)) {
        const namelabel = one.name
        personsService.remove(one.id).then(one => {
          this.setState({
            persons: this.state.persons.filter(p => p.id !== id),
            notification: `Henkilö ${namelabel} on poistettu`
          })
          setTimeout(() => {
            this.setState({ notification: null })
          }, 5000)
        })
      }
    }

  }

  updateItem = (one) => {
    if (window.confirm(`${one.name} on jo luettelossa, korvaako uusi numero ${this.state.newNumber} vanhan numeron ${one.number}?`)) {
      const itemObject = {
        name: one.name,
        number: this.state.newNumber
      }
      personsService.update(one.id, itemObject).then(newObj => {
        this.setState({
          newName: '',
          newNumber: '',
          notification: `Henkilön ${newObj.name} numero on päivitetty`
        })
        setTimeout(() => {
          this.setState({ notification: null })
        }, 5000)
      }).catch(error => {
        alert(`Henkilö '${one.name}' on jo poistettu`)
        this.setState({ persons: this.state.persons.filter(n => n.id !== one.id) })
      })
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

  itemRow = () =>
    this.state.persons.filter(p => p.name.toLowerCase().includes(this.state.search.toLowerCase())).map(p =>
      <tr key={p.id}>
        <td>{p.name} </td>
        <td>{p.number}</td>
        <td><button onClick={this.removeItem(p.id, p)}>Poista</button>
        </td>
      </tr>
    )


  render() {

    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <Notification message={this.state.notification} />
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
        <ItemTable content={this.itemRow()} />
      </div>
    )
  }
}


export default App
