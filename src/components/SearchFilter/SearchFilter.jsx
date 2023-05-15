import PropTypes from 'prop-types';
import { SearchForm } from 'components/SearchFilter/SearchFilter.styled';

const SearchFilter = ({ filter, onChange }) => {
  return (
    <SearchForm htmlFor="filter-field">
      Find contacts by name
      <input
        className="search-input"
        id="filter-field"
        type="text"
        value={filter}
        onChange={onChange}
      />
    </SearchForm>
  );
};

SearchFilter.propTypes = {
  filter: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default SearchFilter;
