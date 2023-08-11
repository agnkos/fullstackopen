const StatisticLine = ({ text, value }) => {
    return (
        <tr className='stat'>
            <td className="td">{text}</td>
            <td>{value}</td>
        </tr>
    )
}
export default StatisticLine