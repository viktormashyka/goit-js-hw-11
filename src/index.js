import Notiflix from 'notiflix';
// import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import axios from 'axios';

// axios
//   .post(
//     'https://httpbin.org/post',
//     { x: 1 },
//     {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//       },
//     }
//   )
//   .then(({ data }) => console.log(data));

const { height: cardHeight } = document
  .querySelector('.gallery')
  .firstElementChild.getBoundingClientRect();

window.scrollBy({
  top: cardHeight * 2,
  behavior: 'smooth',
});
