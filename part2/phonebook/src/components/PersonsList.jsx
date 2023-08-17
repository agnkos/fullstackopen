import PersonItem from "./PersonItem"

const PersonsList = ({ personsToShow }) => {
    return (
        <div>{personsToShow.map(person => (
            <PersonItem person={person} key={person.id} />))}</div>
    )
}
export default PersonsList