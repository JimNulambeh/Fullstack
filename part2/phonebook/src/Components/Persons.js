import React from 'react'

const Persons =({persons, newFilter, deletePerson}) => {
    const Personfilter = persons
    .filter(persons =>
    persons.name.toLowerCase().includes(newFilter.toLowerCase()))
    return (
        <div>{Personfilter.map(persons => <li key= {persons.name}>{persons.name} {persons.number}
            <button onClick={() => deletePerson(persons.id)}>delete</button></li>)} </div>    
    )
}
export default Persons