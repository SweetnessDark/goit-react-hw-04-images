import PropTypes from 'prop-types';
import sass from './Searchbar.module.scss';
import { toast } from 'react-toastify';
const { useState } = require('react');

export const Searchbar = ({ onSubmit }) => {
  const [value, setValue] = useState('');

  const handleSearchTextChange = e => {
    setValue(e.currentTarget.value.toLowerCase());
  };

  const handleOnSubmit = e => {
    e.preventDefault();

    if (value.trim() === '') {
      toast.error('Please enter a search value');
      return;
    }

    onSubmit(value);
  };

  return (
    <header className={sass.searchbar}>
      <form onSubmit={handleOnSubmit}>
        <input
          className={sass.inputSearch}
          onChange={handleSearchTextChange}
          value={value}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>

      <button type="submit" className={sass.btnSearchImg}>
        <span className="button-label">Search</span>
      </button>
    </header>
  );
};

Searchbar.propTypes = { onSubmit: PropTypes.func.isRequired };
