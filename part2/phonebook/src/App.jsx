import { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import PersonsList from './components/PersonsList';
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    personService
      .getAll()
      .then(personData => setPersons(personData))
  }, [])

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }
    if (persons.some(person => person.name === personObject.name)) {
      alert(`${personObject.name} is already added to the phonebook`)
      setNewName('')
      setNewNumber('')
    } else {
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const handleNameChange = (e) => {
    setNewName(e.target.value)
  }
  const handleNumberChange = (e) => {
    setNewNumber(e.target.value)
  }

  const handleFilter = (e) => {
    setFilter(e.target.value);
  }

  const personsToShow = filter.length > 0 ? persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase())) : persons

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter handleFilter={handleFilter} />

      <PersonForm
        addPerson={addPerson}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        newName={newName}
        newNumber={newNumber}
      />

      <h2>Numbers</h2>
      <PersonsList personsToShow={personsToShow} />

    </div>
  )
}

export default App