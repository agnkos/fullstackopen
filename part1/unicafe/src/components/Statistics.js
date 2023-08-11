import StatisticLine from "./StatisticLine"

export const Statistics = ({ good, neutral, bad, all }) => {

    const average = ((good - bad) / all).toFixed(2);
    const positive = (good / all * 100).toFixed(2);

    return (
        <>
            <p className="title">Statistics</p>
            <table>
                <tbody>
                    <StatisticLine text="Good" value={good} />
                    <StatisticLine text="Neutral" value={neutral} />
                    <StatisticLine text="Bad" value={bad} />
                    <StatisticLine text="All" value={all} />
                    <StatisticLine text="Average" value={`${average}%`} />
                    <StatisticLine text="Positive" value={positive} />
                </tbody>
            </table>
        </>
    )
}