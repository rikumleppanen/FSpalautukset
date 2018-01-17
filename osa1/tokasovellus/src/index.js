import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
    constructor() {
        super()
        this.state = {
            hyva: 0,
            neutraali: 0,
            huono: 0
        }
    }

    kasvataHyva = () => {
        this.setState({ hyva: this.state.hyva + 1 })
    }

    kasvataNeutraali = () => {
        this.setState({ neutraali: this.state.neutraali + 1 })
    }

    kasvataHuono = () => {
        this.setState({ huono: this.state.huono + 1 })
    }

    render() {
        const hyva = this.state.hyva * 1
        const neutraali = this.state.neutraali * 0
        const huono = this.state.huono * (-1)
        const summa = this.state.hyva + this.state.neutraali + this.state.huono
        const keskiarvo = (hyva + neutraali + huono) / summa
        const positiiviset = hyva / (summa / 100)
        return (
            <div>
                <h1>Anna palautetta palvelustamme</h1>
                <button onClick={this.kasvataHyva}>Hyvää työtä!</button>
                <button onClick={this.kasvataNeutraali}>Neutraalia jälkeä</button>
                <button onClick={this.kasvataHuono}>Parantamisen varaa on</button>
                <h1>Dashboard</h1>
                <div>Positiivinen: {this.state.hyva}</div>
                <div>Neutraali: {this.state.neutraali}</div>
                <div>Negatiivinen: {this.state.huono}</div>
                <div>Keskiarvo: {keskiarvo}</div>
                <div>Positiivisten osuus: {positiiviset} %</div>
            </div>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
)

