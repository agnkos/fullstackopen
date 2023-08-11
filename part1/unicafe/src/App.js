import { useState } from 'react';
import { Statistics } from './components/Statistics';

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const all = good + bad + neutral;

  return (
    <div>
      <p className="title">Give feedback</p>
      <button onClick={() => setGood(good => good + 1)} className='btn green'>Good</button>
      <button onClick={() => setNeutral(neutral => neutral + 1)} className='btn gray'>Neutral</button>
      <button onClick={() => setBad(bad => bad + 1)} className='btn red'>Bad</button>
      {all > 0 ? <Statistics good={good} bad={bad} neutral={neutral} all={all} /> : <p className='title'>No feedback given</p>}
    </div>
  )
}

export default App