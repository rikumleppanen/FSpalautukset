import React from 'react'
import ReactDOM from 'react-dom'


class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: 0,
            votes: this.props.anecdotes.map(p => 0)
        }

    }

    luoSatunnainen = () => {
        return Math.floor(Math.random() * (anecdotes.length));
    }

    seuraavaAnekdootti = () => {
        return () => {
            this.setState({ selected: this.luoSatunnainen() })
        }
    }

    aanesta = (nro) => {
        return () => {
            let saalis = this.state.votes.slice()
            saalis[nro] = saalis[nro] + 1
            this.setState({ votes: saalis })
        }
    }

    render() {
        const suurin = this.state.votes.indexOf(Math.max(...this.state.votes))

        return (
            <div>
                <p>{this.props.anecdotes[this.state.selected]}</p>
                <p>Äänestystulos: {this.state.votes[this.state.selected]}</p>
                <button onClick={this.aanesta(this.state.selected)}>Äänestä</button>
                <button onClick={this.seuraavaAnekdootti()}>Seuraava</button>
                <h1>Eniten ääniä kerännyt anekdootti:</h1>
                <p>{this.props.anecdotes[suurin]}</p>
                <p>Ääniä: {this.state.votes[suurin]}</p>
            </div>
        )
    }
}

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]


ReactDOM.render(
    <App anecdotes={anecdotes} />,
    document.getElementById('root')
)
