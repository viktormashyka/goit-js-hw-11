import Notiflix, { Notify } from 'notiflix';
// import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { feachPhotos } from './feachPhotos';
// import axios from 'axios';
// import { PixabayApi } from './pixabay-api';
// import { getPhotos } from './axios';
// import debounce from 'lodash.debounce';

const formRef = document.querySelector('form#search-form');
const divGalleryRef = document.querySelector('.gallery');
const divPhotoRef = document.querySelector('.photo-card');
const submitBtnRef = document.querySelector('form button[type="submit"]');
// console.log(submitBtnRef);
formRef.addEventListener('submit', onSearch);

function onSearch(event) {
  event.preventDefault();
  const {
    elements: { searchQuery },
  } = event.currentTarget;
  const searchPhotos = searchQuery.value;
  console.log(searchPhotos);
  if (!searchQuery.value) {
    console.log('Enter data');
    return;
  }

  feachPhotos(searchPhotos)
    .then(data => {
      createPhotos(data);
    })
    .catch(error => {
      console.log(error);
      Notify.failure(error);
    });
  event.currentTarget.reset();
}

// pixabayApi.searchQuery = searchQuery.value;
// pixabayApi
//   .getSearchPhotos(searchQuery.value)
//   .then(data => createPhotos(data))
//   .catch(error => {
//     console.error(error);
//     Notify.failure(error);
//   });

function createPhotos(data) {
  console.log(data);
  const photos = data.hits;
  if (photos.length === 0) {
    console.log(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    return data;
  }
  if (photos.length > 0) {
    // const photos = data.hits;
    //   divGalleryRef.innerHTML = photos
    //     .map(({ webformatURL, tags }) => {
    //       return `<ul>
    //   <li class="gallery__item">
    //     <img src="${webformatURL}" alt="${tags}" class="gallery-img">
    // </li>
    //   </ul>`;
    //     })
    //     .join('');
    divPhotoRef.innerHTML = photos
      .map(({ webformatURL, tags, likes, views, comments, downloads }) => {
        return `<img
        src="${webformatURL}"
        alt="${tags}"
        loading="lazy"
      />
      <div class="info">
        <p class="info-item">
          <b>Likes: ${likes}</b>
        </p>
        <p class="info-item">
          <b>Views: ${views}</b>
        </p>
        <p class="info-item">
          <b>Comments: ${comments}</b>
        </p>
        <p class="info-item">
          <b>Downloads: ${downloads}</b>
        </p>
      </div>`;
      })
      .join('');
  }
}

// function renderPhotos(data) {
//   if (data.length === 0) {
//     console.log(
//       'Sorry, there are no images matching your search query. Please try again.'
//     );
//     Notify.failure(
//       'Sorry, there are no images matching your search query. Please try again.'
//     );
//     return data;
//   }

//   if (data.length > 0) {
//     divGalleryRef.innerHTML =
//   }
// }

//**Прокручування сторінки */

// const { height: cardHeight } = document
//   .querySelector('.gallery')
//   .firstElementChild.getBoundingClientRect();

// window.scrollBy({
//   top: cardHeight * 2,
//   behavior: 'smooth',
// });
//** */
