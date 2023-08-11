import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <p class="title">Give feedback</p>
      <button onClick={() => setGood(good => good + 1)} className='btn green'>Good</button>
      <button onClick={() => setNeutral(neutral => neutral + 1)} className='btn gray'>Neutral</button>
      <button onClick={() => setBad(bad => bad + 1)} className='btn red'>Bad</button>
      <p class="title">Statistics</p>
      <p class='stat'>Good: {good}</p>
      <p class='stat'>Neutral: {neutral}</p>
      <p class='stat'>Bad: {bad}</p>
    </div>
  )
}

export default App