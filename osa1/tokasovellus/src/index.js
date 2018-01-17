import React from 'react';
import ReactDOM from 'react-dom';

const Button = (props) => {
    return (
        <button onClick={props.handleClick}>
            {props.teksti}
        </button>
    )
}
const Statistic = (props) => {
    return (
        <td>{props.teksti} {props.arvo}</td>
    )
}
const Statistics = (props) => {
    return (
        <table>
            <tbody>
                <tr><Statistic teksti={"Positiivinen:"} arvo={props.tilasto.pos} /></tr>
                <tr><Statistic teksti={"Neutraali:"} arvo={props.tilasto.neut} /></tr>
                <tr><Statistic teksti={"Negatiivinen:"} arvo={props.tilasto.neg} /></tr>
                <tr><Statistic teksti={"Keskiarvo:"} arvo={props.tilasto.keskiarvo} /></tr>
                <tr><Statistic teksti={"Positiivisten osuus:"} arvo={props.tilasto.positiiviset} /></tr>
            </tbody>
        </table>
    )
}
const Buttons = (props) => {
    return (
        <div>
            <h1>Anna palautetta palvelustamme</h1>
            <Button handleClick={props.kuuntelijat.pos} teksti="Hyvää työtä!" />
            <Button handleClick={props.kuuntelijat.neut} teksti="Neutraalia jälkeä" />
            <Button handleClick={props.kuuntelijat.neg} teksti="Parantamisen varaa on" />
            <h1>Dashboard</h1>
        </div>

    )
}


class App extends React.Component {
    constructor() {
        super()
        this.state = {
            hyva: 0,
            neutraali: 0,
            huono: 0,
        }

    }

    lisaaArvo = (laji, arvo) => {

        return () => {
            this.setState({ [laji]: arvo })
        }
    }

    render() {
        const arvot = {
            hyva: this.state.hyva * 1,
            neutraali: this.state.neutraali * 0,
            huono: this.state.huono * (-1),
            summa: this.state.hyva + this.state.neutraali + this.state.huono

        }
        const tilasto = {
            pos: this.state.hyva,
            neut: this.state.neutraali,
            neg: this.state.huono,
            keskiarvo: (arvot.hyva + arvot.neutraali + arvot.huono) / arvot.summa,
            positiiviset: arvot.hyva / (arvot.summa / 100) + " %"
        }

        const kuuntelijat = {
            pos: this.lisaaArvo("hyva", this.state.hyva + 1),
            neut: this.lisaaArvo("neutraali", this.state.neutraali + 1),
            neg: this.lisaaArvo("huono", this.state.huono + 1)
        }
        if (arvot.summa === 0) {
            return (
                <div>
                    <Buttons kuuntelijat={kuuntelijat} />
                    <p>Anna palautetta ensiksi</p>
                </div>
            )
        } else {
            return (
                <div>
                    <Buttons kuuntelijat={kuuntelijat} />
                    <Statistics arvot={arvot} tilasto={tilasto} />
                </div>
            )
        }

    }

}

ReactDOM.render(
    <App />,
    document.getElementById('root')
)

