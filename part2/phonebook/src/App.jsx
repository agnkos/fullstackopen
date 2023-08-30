import { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import PersonsList from './components/PersonsList';
import personService from './services/persons';
import Notification from './components/Notification';

// changed id setting method! because of deleting the id cannot be set up as persons.length + 1 (it makes some id double if some contacts have been deleted)

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [notificationMsg, setNotificationMsg] = useState(null)

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
      id: persons[persons.length - 1].id + 1
    }
    if (persons.some(person => person.name === personObject.name)) {
      if (window.confirm(`${personObject.name} is already added to the phonebook, replace the old number?`)) {

        const person = persons.find(p => p.name === personObject.name)
        const changedPerson = { ...person, number: personObject.number }

        personService
          .update(person.id, changedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(p => p.id !== person.id ? p : returnedPerson))
          })
        setNotificationMsg(`Updated ${person.name} number`)
        setTimeout(() => {
          setNotificationMsg(null)
        }, 5000)
        setNewName('')
        setNewNumber('')
      }
    } else {
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNotificationMsg(`Added ${personObject.name}`)
          setTimeout(() => {
            setNotificationMsg(null)
          }, 5000)
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const removePerson = id => {
    if (window.confirm('Do you really want to delete the contact?')) {
      personService
        .remove(id)
        .then(setPersons(persons.filter(person => person.id !== id))
        )
      setNotificationMsg('Contact deleted')
      setTimeout(() => {
        setNotificationMsg(null)
      }, 5000)
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

  // useEffect(() => {
  //   console.log(persons)
  // }, [persons])

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={notificationMsg} />

      <Filter handleFilter={handleFilter} />

      <PersonForm
        addPerson={addPerson}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        newName={newName}
        newNumber={newNumber}
      />

      <h2>Numbers</h2>
      <PersonsList personsToShow={personsToShow} removePerson={removePerson} />

    </div>
  )
}

export default App