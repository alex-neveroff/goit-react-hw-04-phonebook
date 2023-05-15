import PropTypes from 'prop-types';
import { ReactComponent as CrossIcon } from '../../icons/cross.svg';
import { ContactData } from './ContactListItem.styled';

const ContactListItem = ({ id, name, number, onDelete }) => {
  return (
    <ContactData key={id}>
      <p className="contact-name">{name}:</p>{' '}
      <p className="contact-number">{number}</p>
      <button className="delete-button" onClick={() => onDelete(id)}>
        <CrossIcon className="cross" width="24" height="24" />
      </button>
    </ContactData>
  );
};

ContactListItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ContactListItem;
