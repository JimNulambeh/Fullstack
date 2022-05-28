import React, { useEffect, useStates } from 'react'
import axios from 'axios'
import Filter from './Components/Filter'
import Countries from './Components/Countries'


const App = () => {
  const [countries, setCountries] = useStates([])
  const [ newFilter, setNewFilter] = useStates('')

  useEffect(() => {
    console.log('effect')
    axios.get('https://restcountries.eu/rest/v2/all')
    .then(response => {
      console.log('promise fulfilled')
      setCountries(response.data)
    })
  }, [])
const handleClick = (event) => {
  console.log(event.target.value)
  setNewFilter(event.target.value)
}

const handleChangeFilter = (event) => {
  console.log(event.target.value)
  setNewFilter(event.target.value)
}

return(
  <div>
    <Filter value={newFilter} handleChangeFilter={handleChangeFilter} />
    <br />
    <Countries countries={countries} filter={newFilter} handleClick={handleClick} />
  </div>
)
}


export default App;
