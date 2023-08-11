import { useState } from 'react';
import { Statistics } from './components/Statistics';
import Button from './components/Button';

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const all = good + bad + neutral;

  const addGood = () => setGood(good => good + 1);
  const addNeutral = () => setNeutral(neutral => neutral + 1);
  const addBad = () => setBad(bad => bad + 1);

  return (
    <div>
      <p className="title">Give feedback</p>
      <Button onClick={addGood} text="Good" color="green" />
      <Button onClick={addNeutral} text="Neutral" color="gray" />
      <Button onClick={addBad} text="Bad" color="red" />
      {all > 0 ? <Statistics good={good} bad={bad} neutral={neutral} all={all} /> : <p className='title'>No feedback given</p>}
    </div>
  )
}

export default App