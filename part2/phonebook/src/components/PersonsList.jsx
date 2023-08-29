import PersonItem from "./PersonItem"

const PersonsList = ({ personsToShow, removePerson }) => {
    return (
        <div>{personsToShow.map(person => (
            <PersonItem person={person} key={person.id} removePerson={removePerson} />
        ))}
        </div>
    )
}
export default PersonsList