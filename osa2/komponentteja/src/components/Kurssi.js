import React from 'react'

const Kurssi = (props) => {
    return (
        <div>
            <Otsikko kurssi={props.kurssi.nimi} />
            <Sisalto osat={props.kurssi.osat} />
            <Yhteensa summa={props.kurssi.osat} />
        </div>
    )
}
const Yhteensa = (props) => {
    const result = props.summa
        .map(one => one.tehtavia)
        .reduce((sum, one) => sum + one)
    return (
        <div>
            <p>yhteensä {result} tehtävää</p>
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
            {props.osat.map(yksi => <Osa key={yksi.id} osa={yksi.nimi} tehtava={yksi.tehtavia} />)}
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

export default Kurssi