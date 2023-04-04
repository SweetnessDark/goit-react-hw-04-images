import { Component } from 'react';
import './App.module.scss';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

import { getImages } from './../services/api';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Searchbar } from './Searchbar/Searchbar';
import { Button } from './Button/Button';

export class App extends Component {
  state = {
    value: '',
    image: [],
    page: 1,
    totalHits: 0,
    isLoading: false,
  };

  async componentDidUpdate(_, prevState) {
    const { value, page } = this.state;
    if (prevState.value !== value || prevState.page !== page) {
      try {
        this.setState({ isLoading: true });
        const { totalHits, hits } = await getImages(value, page);

        if (totalHits === 0) {
          toast.error('Nothing was found for your request');
          this.setState({ isLoading: false });
          return;
        }

        this.setState(prevState => ({
          image: page === 1 ? hits : [...prevState.image, ...hits],

          totalHits:
            page === 1
              ? totalHits - hits.length
              : totalHits - [...prevState.image, ...hits].length,
        }));

        this.setState({ isLoading: false });
      } catch (error) {
        toast.error(`Oops! Something went wrong! ${error}`);
      }
    }
  }

  handleSubmit = value => {
    this.setState({ value, page: 1 });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { image, totalHits, isLoading } = this.state;
    const { handleSubmit, handleLoadMore } = this;

    return (
      <>
        <Searchbar onSubmit={handleSubmit} />
        {image && <ImageGallery image={image} />}
        {!!totalHits && <Button onLoadMore={handleLoadMore} />}
        {isLoading && <Loader />}
        <ToastContainer autoClose={2000} />
      </>
    );
  }
}
