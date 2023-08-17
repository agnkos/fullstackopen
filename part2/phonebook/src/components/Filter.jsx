const Filter = ({ handleFilter }) => {
    return (
        <div className="flex form"> Filter shown with: <input
            onChange={handleFilter}
        /></div>
    )
}
export default Filter