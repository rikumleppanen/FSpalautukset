import React from 'react'

const Item = ({ name, number }) => {
    return (
        <tr>
            <th>{name}</th>
            <th>{number}</th>
        </tr>
    )
}

export default Item