import PropTypes from 'prop-types';
import { SearchForm } from 'components/SearchFilter/SearchFilter.styled';
import { useState, useEffect } from 'react';

const SearchFilter = ({ contacts, onChange }) => {
  const [filter, setFilter] = useState('');
  const [filtredContacts, setFiltredContacts] = useState([]);

  const handleFilter = event => {
    setFilter(event.currentTarget.value);
  };

  useEffect(() => {
    const filterContacts = () => {
      const loweredFilter = filter.toLowerCase();
      setFiltredContacts(
        contacts.filter(contact => {
          return contact.name.toLowerCase().includes(loweredFilter);
        })
      );
    };

    filterContacts();
  }, [filter, contacts]);

  useEffect(() => {
    onChange(filtredContacts);
  }, [filtredContacts, onChange]);

  return (
    <SearchForm htmlFor="filter-field">
      Find contacts by name
      <input
        className="search-input"
        id="filter-field"
        type="text"
        value={filter}
        onChange={handleFilter}
      />
    </SearchForm>
  );
};

SearchFilter.propTypes = {
  contacts: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default SearchFilter;
