import axios from 'axios';
// import { Notify } from 'notiflix';
// export { getPhotos };

// async function getPhotos() {
//   try {
//     const response = await axios.get('url');
//     console.log(response);
//     return response;
//   } catch (error) {
//     console.error(error);
//     Notify.failure('error');
//   }
// }

// import axios from 'axios';

// const instance = axios.create({
//   BASE_URL: 'https://pixabay.com/api/',
// });

// export default instance;

import axios from 'axios';

async function feachPhotos() {
  const response = await axios.get(
    `https://pixabay.com/api/?key=29782836-0cb6e5c5167e525a8102df66c&q=cat`
  );
  return response.json();
}
