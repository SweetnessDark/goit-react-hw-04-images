import PropTypes from 'prop-types';
import { Component } from 'react';
import { createPortal } from 'react-dom';
import sass from './Modal.module.scss';

const modalRoot = document.getElementById('modal-root');

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.closeByEsc);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.closeByEsc);
  }

  closeByEsc = e => {
    if (e.code !== 'Escape') {
      return;
    }
    this.props.closeModal();
  };

  render() {
    const { closeModal, tags, modalImg } = this.props;
    return createPortal(
      <div className={sass.overlay} onClick={closeModal}>
        <div className={sass.modal}>
          <img className={sass.modalImage} src={modalImg} alt={tags} />
        </div>
      </div>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  modalImg: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
  tags: PropTypes.string.isRequired,
};
