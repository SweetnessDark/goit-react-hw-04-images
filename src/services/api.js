import axios from 'axios';

const searchParams = new URLSearchParams({
  key: '33580589-b96324c4ffac855a3794c7035',
  image_type: 'photo',
  orientation: 'horizontal',
  per_page: 12,
});

axios.defaults.baseURL = 'https://pixabay.com/api/';

export const getImages = async (value, page) => {
  const response = await axios.get(`?q=${value}&page=${page}&${searchParams}`);
  const data = response.data;
  return data;
};
