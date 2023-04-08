import React, { useState, useEffect } from 'react';
import './App.module.scss';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

import { getImages } from './../services/api';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Searchbar } from './Searchbar/Searchbar';
import { Button } from './Button/Button';

export const App = () => {
  const [value, setValue] = useState('');
  const [image, setImage] = useState([]);
  const [page, setPage] = useState(1);
  const [totalHits, setTotalHits] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!value) {
      return;
    }

    setIsLoading(true);

    const fetchData = async () => {
      const { totalHits, hits } = await getImages(value, page);

      if (totalHits === 0) {
        toast.error('Nothing was found for your request');
        setIsLoading(false);
        return;
      }

      setImage(prevImage => (page === 1 ? hits : [...prevImage, ...hits]));

      setTotalHits(prevPage =>
        page === 1 ? totalHits - hits.length : prevPage - hits.length
      );

      setIsLoading(false);
    };

    fetchData().catch(error => {
      toast.error(`Oops! Something went wrong! ${error}`);
      setIsLoading(false);
    });
  }, [value, page]);

  const handleSubmit = value => {
    setValue(value);
    setPage(1);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <>
      <Searchbar onSubmit={handleSubmit} />
      {image && <ImageGallery image={image} />}
      {!!totalHits && <Button onLoadMore={handleLoadMore} />}
      {isLoading && <Loader />}
      <ToastContainer autoClose={2000} />
    </>
  );
};
