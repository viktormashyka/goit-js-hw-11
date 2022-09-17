import axios from 'axios';
import { Notify } from 'notiflix';

export { feachPhotos };

async function feachPhotos(searchPhotos, page, per_page) {
  const BASE_URL = 'https://pixabay.com/api/';
  const API_KEY = '29782836-0cb6e5c5167e525a8102df66c';
  const url = `${BASE_URL}?key=${API_KEY}&q=${searchPhotos}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${per_page}`;
  // const response = await fetch(url);
  const response = await axios.get(
    `${BASE_URL}?key=${API_KEY}&q=${searchPhotos}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${per_page}`
  );
  // {
  //   params: {
  //     // q: 'searchPhotos',
  //     image_type: 'photo',
  //     orientation: 'horizontal',
  //     safesearch: 'true',
  //     page: 1,
  //     per_page: 40,
  //   },
  //   header: {
  //     'Content-Type': 'aplication/json',
  //     Authorization: '29782836-0cb6e5c5167e525a8102df66c',
  //   },
  // }
  // );
  if (response.status !== 200) {
    throw new Error(response.status);
    Notify.failure(error);
  }
  console.log(response.data);
  // return response.json();
  return response.data;
}

// async function feachPhotos(searchPhotos) {
//   const BASE_URL = 'https://pixabay.com/api/';
//   const API_KEY = '29782836-0cb6e5c5167e525a8102df66c';
//   //   #searchQuery = '';
//   const url = `${BASE_URL}?key=${API_KEY}&q=${searchPhotos}&image_type=photo&orientation=horizontal&safesearch=true`;
//   const response = await fetch(url);
//   if (!response.ok) {
//     throw new Error(response.status);
//     Notify.failure(error);
//   }
//   return response.json();
// }

// function feachPhotos(searchPhotos) {
//   const BASE_URL = 'https://pixabay.com/api/';
//   const API_KEY = '29782836-0cb6e5c5167e525a8102df66c';
//   //   #searchQuery = '';
//   const url = `${BASE_URL}?key=${API_KEY}&q=${searchPhotos}&image_type=photo&orientation=horizontal&safesearch=true`;
//   return fetch(url).then(response => {
//     if (!response.ok) {
//       throw new Error(response.status);
//     }
//     return response.json();
//   });
// }
