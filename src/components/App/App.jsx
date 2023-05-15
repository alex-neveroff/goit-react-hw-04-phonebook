import React, { Component } from 'react';
import { Container } from './App.styled';
import { Notify } from 'notiflix';
import ContactForm from 'components/ContactForm';
import ContactList from 'components/ContactList';
import SearchFilter from 'components/SearchFilter';
import Notification from 'components/Notification';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const storageContacts = localStorage.getItem('contacts');
    const parsedStorageContacts = JSON.parse(storageContacts);
    if (parsedStorageContacts) {
      this.setState({ contacts: parsedStorageContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { contacts } = this.state;
    if (prevState.contacts !== contacts) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }

  isContactExists = newContact => {
    const { contacts } = this.state;
    const loweredNewContact = newContact.name.toLowerCase();
    return contacts.some(
      contact => contact.name.toLowerCase() === loweredNewContact
    );
  };

  addContact = newContact => {
    if (this.isContactExists(newContact)) {
      Notify.failure(`${newContact.name} is already in phonebook.`);
      return;
    }

    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
    }));
    Notify.success(`${newContact.name} added to phonebook successfully!`);
  };

  deleteContact = contactId => {
    const { contacts } = this.state;
    const contactName = contacts.find(contact => contact.id === contactId);
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
    Notify.warning(`${contactName.name} delete from phonebook.`);
  };

  handleFilter = event => {
    this.setState({ filter: event.currentTarget.value });
  };

  showContacts = () => {
    const { contacts, filter } = this.state;
    const loweredFilter = filter.toLowerCase();
    return contacts
      .filter(contact => {
        return contact.name.toLowerCase().includes(loweredFilter);
      })
      .sort((firstContact, secondContact) =>
        firstContact.name.localeCompare(secondContact.name)
      );
  };

  render() {
    const { contacts, filter } = this.state;
    const visibleContacts = this.showContacts();
    return (
      <Container>
        <h1 className="title main-title">Phonebook</h1>
        <ContactForm onSubmit={this.addContact} />
        <h2 className="title sub-title">Contacts</h2>
        {contacts.length > 0 ? (
          <>
            <SearchFilter filter={filter} onChange={this.handleFilter} />
            {visibleContacts.length > 0 ? (
              <ContactList
                contacts={visibleContacts}
                onDelete={this.deleteContact}
              />
            ) : (
              <Notification message="No matches found" />
            )}
          </>
        ) : (
          <Notification message="Your phonebook is empty" />
        )}
      </Container>
    );
  }
}

export default App;
