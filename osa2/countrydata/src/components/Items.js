import React from 'react'

const ItemRows = ({ content }) => {
    return (
        <div>
            {content}
        </div>
    )
}

const Country = ({ country }) => {
    return (
        <div>
            {country}
        </div>
    )
}


export default { ItemRows, Country }