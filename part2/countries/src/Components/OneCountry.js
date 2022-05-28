import React from 'react'

const iconStyle = {
    width: '100px'
}
const OneCountry = ({country}) => {
    return (
     <div>
          <h1> {country.name}</h1>
          <p>Capital {country.capital}
          <br/>
           Population {country.population}</p>
          <h2>Languages</h2>
          <ul>
              {country.languages.map(l => <li key={l.iso639_1}>{l.name}</li>)}
         </ul>
          <img src={country.flag} style={iconStyle} alt={country.name} />
          
     </div> 
    
    )}   
export default OneCountry