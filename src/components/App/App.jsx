import React, { useState, useEffect, useRef } from 'react';
import { Container } from './App.styled';
import { Notify } from 'notiflix';
import ContactForm from 'components/ContactForm';
import ContactList from 'components/ContactList';
import SearchFilter from 'components/SearchFilter';
import Notification from 'components/Notification';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filtredContacts, setFiltredContacts] = useState([]);
  const isFiltred = useRef(false);

  useEffect(() => {
    const storageContacts = localStorage.getItem('contacts');
    const parsedStorageContacts = JSON.parse(storageContacts);
    if (parsedStorageContacts) {
      setContacts(parsedStorageContacts);
    }
  }, []);

  useEffect(() => {
    if (contacts.length === 0) {
      localStorage.removeItem('contacts');
      return;
    }
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleFilter = filtredContacts => {
    setFiltredContacts(filtredContacts);
    isFiltred.current = true;
  };

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

  const sortContacts = unsortedContacts => {
    const sortedContacts = unsortedContacts.sort(
      (firstContact, secondContact) =>
        firstContact.name.localeCompare(secondContact.name)
    );
    return sortedContacts;
  };

  return (
    <Container>
      <h1 className="title main-title">Phonebook</h1>
      <ContactForm onSubmit={addContact} />
      <h2 className="title sub-title">Contacts</h2>
      {contacts.length > 0 ? (
        <>
          <SearchFilter contacts={contacts} onChange={handleFilter} />
          {isFiltred.current ? (
            filtredContacts.length > 0 ? (
              <ContactList
                contacts={sortContacts(filtredContacts)}
                onDelete={deleteContact}
              />
            ) : (
              <Notification message="No matches found" />
            )
          ) : (
            <ContactList
              contacts={sortContacts(contacts)}
              onDelete={deleteContact}
            />
          )}
        </>
      ) : (
        <Notification message="Your phonebook is empty" />
      )}
    </Container>
  );
};

export default App;
