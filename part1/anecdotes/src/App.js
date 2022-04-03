import { useState } from 'react'


const Button= ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const App = () => 
{
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
  const [selected, setSelected] = useState(0)

  const displayAnecdote = () => setSelected([Math.floor(Math.random() * 6)])
  const [points, addPoints] = useState(new Array(7).join('0').split('').map(parseFloat))

   /*adds the votes when "vote button" is clicked */
   const addVotes = () => 
   { 
     const copy = [...points]
     
     copy[selected] += 1
     addPoints(copy)
   }
  
   /* detects the anecdote with the highest votes */
  const maximumVotes = () => {
    let maxPoint = 0
    let maxNumber = 0
    let i = 0
    while(i <= anecdotes.length)
    {
      if(points[i] >= maxNumber)
        {
          maxPoint = i
          maxNumber = points[i]
        }
        i++
    }
    return maxPoint
  }
  

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <p>has {points[selected]} votes</p>
      <Button handleClick={addVotes} text='vote'/>
      <Button handleClick={displayAnecdote} text= 'next anecdote'/>
      <h1>Anecdote with most votes</h1>
      {anecdotes[maximumVotes()]}
      <p>has {points[maximumVotes()]} votes</p>
      
          
    </div>
  )
}

export default App

