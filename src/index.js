import { Notify } from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { feachPhotos } from './feachPhotos';
import Pagination from 'tui-pagination';
// import axios from 'axios';
// import { PixabayApi } from './pixabay-api';
// import { getPhotos } from './axios';
// import debounce from 'lodash.debounce';

const formRef = document.querySelector('form#search-form');
const divGalleryRef = document.querySelector('.gallery');
const submitBtnRef = document.querySelector('form button[type="submit"]');
const galleryEl = document.querySelector('.gallery');
const buttonBtnRef = document.querySelector('.load-more');

formRef.addEventListener('submit', onSearch);
buttonBtnRef.addEventListener('click', onPagination);

let page = 1;
let per_page = 40;
let images;
let searchPhotos;

buttonBtnRef.disabled = true;

async function onSearch(event) {
  buttonBtnRef.disabled = false;

  event.preventDefault();
  const {
    elements: { searchQuery },
  } = event.currentTarget;
  searchPhotos = searchQuery.value;
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
    const result = await feachPhotos(searchPhotos, page, per_page);
    const data = await createPhotos(result);
  } catch (error) {
    console.error(error);
    Notify.failure(error);
  }
  return searchPhotos;
}

async function onPagination(event, data) {
  console.log('onPagination=>');
  buttonBtnRef.disabled = false;
  event.preventDefault();
  page += 1;
  // images = data.totalHits - per_page;
  // if (images < per_page) {
  //   buttonBtnRef.disabled = true;
  // }
  console.log('page', page);
  // console.log('img', img);
  console.log('per_page', per_page);
  try {
    const result = await feachPhotos(searchPhotos, page, per_page);
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
  // img = data.totalHits;
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

//**Прокручування сторінки */

// const { height: cardHeight } = document
//   .querySelector('.gallery')
//   .firstElementChild.getBoundingClientRect();

// window.scrollBy({
//   top: cardHeight * 2,
//   behavior: 'smooth',
// });
