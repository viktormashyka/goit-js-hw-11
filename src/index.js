import { Notify } from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { feachPhotos } from './feachPhotos';
// import axios from 'axios';
// import { PixabayApi } from './pixabay-api';
// import { getPhotos } from './axios';
// import debounce from 'lodash.debounce';

const formRef = document.querySelector('form#search-form');
const divGalleryRef = document.querySelector('.gallery');
// const divPhotoRef = document.querySelector('.photo-card');
const submitBtnRef = document.querySelector('form button[type="submit"]');
const galleryEl = document.querySelector('.gallery');
const buttonBtnRef = document.querySelector('.load-more');
// console.log(submitBtnRef);
formRef.addEventListener('submit', onSearch);

async function onSearch(event) {
  event.preventDefault();
  const {
    elements: { searchQuery },
  } = event.currentTarget;
  const searchPhotos = searchQuery.value;
  console.log('input =>', searchPhotos);
  if (!searchQuery.value) {
    console.log('Enter data');
    Notify.failure('Enter data');
    return;
  }
  event.currentTarget.reset();
  // feachPhotos(searchPhotos)
  //   .then(data => {
  //     createPhotos(data);
  //   })
  //   .catch(error => {
  //     console.log(error);
  //     Notify.failure(error);
  //   });
  try {
    const result = await feachPhotos(searchPhotos);
    const data = await createPhotos(result);
  } catch (error) {
    console.error(error);
    Notify.failure(error);
  }
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
  console.log('data =>', data);
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
    divGalleryRef.innerHTML = photos
      .map(
        ({
          largeImageURL,
          webformatURL,
          tags,
          likes,
          views,
          comments,
          downloads,
        }) => {
          return `<div class="photo-card">
          <a class="gallery__item" href="${largeImageURL}">
          <img class="gallery__image"
        src="${webformatURL}"
        alt="${tags}"
        title="${tags}"
        loading="lazy"
      /></a>
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
      </div>
    </div>`;
        }
      )
      .join('');
  }
}

galleryEl.addEventListener('click', openModalImg);

function openModalImg(evt) {
  evt.preventDefault();
  var lightbox = new SimpleLightbox('.gallery a', {
    captionPosition: 'bottom',
    captionDelay: 250,
  });

  var gallery = $('.gallery a').simpleLightbox();

  gallery.refresh();
}

buttonBtnRef.addEventListener('click', onPagination);

function onPagination(evt) {
  console.log('onPagination=>');
}

//**Прокручування сторінки */

const { height: cardHeight } = document
  .querySelector('.gallery')
  .firstElementChild.getBoundingClientRect();

window.scrollBy({
  top: cardHeight * 2,
  behavior: 'smooth',
});
//** */
