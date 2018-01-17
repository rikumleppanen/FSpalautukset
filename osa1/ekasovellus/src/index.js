import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
    const kurssi = 'Half Stack -sovelluskehitys'
    const osa1 = {
        nimi: 'Reactin perusteet',
        tehtavia: 10
    }
    const osa2 = {
        nimi: 'Tiedonvälitys propseilla',
        tehtavia: 7
    }
    const osa3 = {
        nimi: 'Komponenttien tila',
        tehtavia: 14
    }


    return (
        <div>
            <Otsikko kurssi={kurssi} />
            <Sisalto osa1={osa1} osa2={osa2} osa3={osa3} />
            <Yhteensa summa={osa1.tehtavia + osa2.tehtavia + osa3.tehtavia} />
        </div>
    )
}
const Yhteensa = (props) => {
    return (
        <div>
            <p>yhteensä {props.summa} tehtävää</p>
        </div>
    )
}

const Osa = (props) => {
    return (
        <div>
            <p>{props.osa} {props.tehtava}</p>
        </div>
    )
}
const Sisalto = (props) => {
    return (
        <div>
            <Osa osa={props.osa1.nimi} tehtava={props.osa1.tehtavia} />
            <Osa osa={props.osa2.nimi} tehtava={props.osa2.tehtavia} />
            <Osa osa={props.osa3.nimi} tehtava={props.osa3.tehtavia} />
        </div>
    )
}

const Otsikko = (props) => {
    return (
        <div>
            <h1>{props.kurssi}</h1>
        </div>
    )
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
)
