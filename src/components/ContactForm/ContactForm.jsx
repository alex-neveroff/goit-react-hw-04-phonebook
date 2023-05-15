import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';
import { PhonebookForm } from './ContactForm.styled';

const ContactForm = ({ onSubmit }) => {
  const [inputName, setInputName] = useState('');
  const [inputNumber, setInputNumber] = useState('');
  const inputNameId = nanoid();
  const inputPhoneId = nanoid();

  const handleChange = event => {
    const { name, value } = event.currentTarget;
    if (name === 'name') {
      setInputName(value);
    } else if (name === 'number') {
      setInputNumber(value);
    }
  };

  const handleSubmit = event => {
    event.preventDefault();
    const newContact = {
      id: nanoid(),
      name: inputName,
      number: inputNumber,
    };

    onSubmit(newContact);
    reset();
  };

  const reset = () => {
    setInputName('');
    setInputNumber('');
  };

  return (
    <PhonebookForm onSubmit={handleSubmit}>
      <label className="form-label" htmlFor={inputNameId}>
        Name:
        <input
          className="form-input"
          type="text"
          name="name"
          id={inputNameId}
          pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          onChange={handleChange}
          value={inputName}
          required
        />
      </label>
      <label className="form-label" htmlFor={inputPhoneId}>
        Phone number:
        <input
          className="form-input"
          type="tel"
          name="number"
          id={inputPhoneId}
          pattern="\+?\d{1,4}?[\-.\s]?\(?\d{1,3}?\)?[\-.\s]?\d{1,4}[\-.\s]?\d{1,4}[\-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          onChange={handleChange}
          value={inputNumber}
          required
        />
      </label>
      <button className="form-submit" type="submit">
        Add contact
      </button>
    </PhonebookForm>
  );
};

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default ContactForm;
