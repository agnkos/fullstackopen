const PersonForm = ({ addPerson, handleNameChange, handleNumberChange, newName, newNumber }) => {
    return (
        <form onSubmit={addPerson} className="form">
            <div className="flex">
                name: <input
                    value={newName}
                    onChange={handleNameChange}
                />
            </div>
            <div className="flex">
                number: <input
                    value={newNumber}
                    onChange={handleNumberChange}
                />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}
export default PersonForm