const PersonItem = ({ person, removePerson }) => {
    return (
        <div className="item-container">
            <p>{person.name} {person.number}</p>
            <button className="delete-btn" onClick={() => removePerson(person.id)}>Delete</button>
        </div>
    )
}
export default PersonItem