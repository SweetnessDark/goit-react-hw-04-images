import PropTypes from 'prop-types';
import sass from './Button.module.scss';

export const Button = ({ onLoadMore }) => {
  return (
    <button type="button" className={sass.btnLoadMore} onClick={onLoadMore}>
      Load More
    </button>
  );
};

Button.propTypes = { onLoadMore: PropTypes.func.isRequired };
