export const Statistics = ({ good, neutral, bad }) => {

    const all = good + bad + neutral;

    return (
        <>
            <p className="title">Statistics</p>
            <p className='stat'>Good: {good}</p>
            <p className='stat'>Neutral: {neutral}</p>
            <p className='stat'>Bad: {bad}</p>
            <p className='stat'>All: {all}</p>
            <p className='stat'>Average: {all === 0 ? 0 : ((good - bad) / all).toFixed(2)}</p>
            <p className='stat'>Positive: {all === 0 ? 0 : (good / all * 100).toFixed(2)}%</p>
        </>
    )
}