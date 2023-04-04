import PropTypes from 'prop-types';
import sass from './Searchbar.module.scss';
const { Component } = require('react');

export class Searchbar extends Component {
  state = {
    value: '',
    page: 1,
  };

  handleSearchTextChange = e => {
    this.setState({ value: e.currentTarget.value.toLowerCase() });
  };

  handleOnSubmit = e => {
    e.preventDefault();

    const { value } = this.state;
    const { onSubmit } = this.props;

    if (value.trim() === '') {
      console.error(
        'Please enter a search value :>> ',
        'Please enter a search value'
      );
      return;
    }

    onSubmit(value);
  };

  render() {
    const { handleOnSubmit, handleSearchTextChange } = this;
    const { value } = this.state;

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
  }
}

Searchbar.propTypes = { onSubmit: PropTypes.func.isRequired };
