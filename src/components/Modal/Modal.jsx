import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import sass from './Modal.module.scss';

const modalRoot = document.getElementById('modal-root');

export const Modal = ({ closeModal, modalImg, tags }) => {
  useEffect(() => {
    const closeByEsc = e => {
      if (e.code !== 'Escape') {
        return;
      }
      closeModal();
    };

    window.addEventListener('keydown', closeByEsc);

    return () => {
      window.removeEventListener('keydown', closeByEsc);
    };
  }, [closeModal]);

  return createPortal(
    <div className={sass.overlay} onClick={closeModal}>
      <div className={sass.modal}>
        <img className={sass.modalImage} src={modalImg} alt={tags} />
      </div>
    </div>,
    modalRoot
  );
};

Modal.propTypes = {
  modalImg: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
  tags: PropTypes.string.isRequired,
};
