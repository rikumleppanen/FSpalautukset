import React from 'react'

const Note = ({ note, toggleImportance }) => {
    const label = note.important ? 'Passivoi' : 'Aktivoi'
    return (
        <li className="note"><button onClick={toggleImportance}>{label}</button> {note.content}</li>
    )
}

export default Note