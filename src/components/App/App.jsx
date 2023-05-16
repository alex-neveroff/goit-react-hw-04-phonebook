import React, { useState, useEffect } from 'react';
import { Container } from './App.styled';
import { Notify } from 'notiflix';
import ContactForm from 'components/ContactForm';
import ContactList from 'components/ContactList';
import SearchFilter from 'components/SearchFilter';
import Notification from 'components/Notification';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filtredContacts, setFiltredContacts] = useState([]);

  useEffect(() => {
    const storageContacts = localStorage.getItem('contacts');
    const parsedStorageContacts = JSON.parse(storageContacts);
    if (parsedStorageContacts) {
      setContacts(parsedStorageContacts);
    }
  }, []);

  useEffect(() => {
    if (contacts.length > 0) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    } else {
      localStorage.removeItem('contacts');
    }
  }, [contacts]);

  const addContact = newContact => {
    const loweredNewContact = newContact.name.toLowerCase();
    const isContactExists = contacts.some(
      contact => contact.name.toLowerCase() === loweredNewContact
    );
    if (isContactExists) {
      Notify.failure(`${newContact.name} is already in phonebook.`);
      return;
    }
    setContacts(prevContacts => [...prevContacts, newContact]);
    Notify.success(`${newContact.name} added to phonebook successfully!`);
  };

  const deleteContact = contactId => {
    const contactName = contacts.find(contact => contact.id === contactId);
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== contactId)
    );
    Notify.warning(`${contactName.name} delete from phonebook.`);
  };

  const handleFilter = sortedContacts => {
    setFiltredContacts(sortedContacts);
  };

  return (
    <Container>
      <h1 className="title main-title">Phonebook</h1>
      <ContactForm onSubmit={addContact} />
      <h2 className="title sub-title">Contacts</h2>
      {contacts ? (
        <>
          <SearchFilter contacts={contacts} onChange={handleFilter} />
          {filtredContacts ? (
            <ContactList contacts={filtredContacts} onDelete={deleteContact} />
          ) : (
            <Notification message="No matches found" />
          )}
        </>
      ) : (
        <Notification message="Your phonebook is empty" />
      )}
    </Container>
  );
};

export default App;
