import PropTypes from 'prop-types';
import { ImageGalleryList } from 'components/ImageGalleryList/ImageGalleryList';
import sass from './ImageGallery.module.scss';

export const ImageGallery = ({ image }) => {
  return (
    <ul className={sass.gallery}>
      {image.map(({ id, webformatURL, largeImageURL, tags }) => {
        return (
          <ImageGalleryList
            key={id}
            webformatURL={webformatURL}
            largeImageURL={largeImageURL}
            tags={tags}
          />
        );
      })}
    </ul>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ),
};
