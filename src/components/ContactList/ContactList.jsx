import ContactListItem from 'components/ContactListItem';
import PropTypes from 'prop-types';
import { Contacts } from './ContactList.styled';

const ContactList = ({ contacts, onDelete }) => {
  return (
    <Contacts>
      {contacts.map(({ id, name, number }) => (
        <ContactListItem
          key={id}
          id={id}
          name={name}
          number={number}
          onDelete={onDelete}
        />
      ))}
    </Contacts>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.object).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ContactList;
