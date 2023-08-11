import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const all = good + bad + neutral

  return (
    <div>
      <p className="title">Give feedback</p>
      <button onClick={() => setGood(good => good + 1)} className='btn green'>Good</button>
      <button onClick={() => setNeutral(neutral => neutral + 1)} className='btn gray'>Neutral</button>
      <button onClick={() => setBad(bad => bad + 1)} className='btn red'>Bad</button>
      <p className="title">Statistics</p>
      <p className='stat'>Good: {good}</p>
      <p className='stat'>Neutral: {neutral}</p>
      <p className='stat'>Bad: {bad}</p>
      <p className='stat'>All: {all}</p>
      <p className='stat'>Average: {((good - bad) / 3).toFixed(2)}</p>
      <p className='stat'>Positive: {(good / all * 100).toFixed(2)}%</p>
    </div>
  )
}

export default App