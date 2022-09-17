import { Notify } from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { feachPhotos } from './feachPhotos';
// import { PixabayApi } from './pixabay-api';

var lightbox = new SimpleLightbox('.gallery a', {
  captionPosition: 'bottom',
  captionDelay: 250,
});

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
let photos;
let totalHits = 0;

// buttonBtnRef.disabled = true;

async function onSearch(event) {
  page = 1;
  buttonBtnRef.classList.remove('display-none');
  // buttonBtnRef.disabled = false;

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
  try {
    const result = await feachPhotos(searchPhotos, page, per_page);
    // const data = createPhotos(result);
    createPhotos(result);
  } catch (error) {
    console.error(error);
    Notify.failure(error);
  }
  return searchPhotos;
}

async function onPagination(event, data) {
  // buttonBtnRef.disabled = false;
  buttonBtnRef.classList.remove('display-none');
  event.preventDefault();
  page += 1;
  // console.log('totalHitsBefore=>', totalHits);
  // totalHits += 1;
  // console.log('totalHitsAfter=>', totalHits);

  console.log('page', page);
  console.log('per_page', per_page);
  try {
    const result = await feachPhotos(searchPhotos, page, per_page);
    // const data = createPhotos(result);
    createPhotos(result);
  } catch (error) {
    console.error(error);
    Notify.failure(error);
  }
}

function createPhotos(data) {
  photos = data.hits;
  totalHits = data.totalHits;
  if (photos.length < per_page) {
    buttonBtnRef.disabled = true;
    // buttonBtnRef.classList.remove('display-none');
    console.log("We're sorry, but you've reached the end of search results.");
    Notify.info("We're sorry, but you've reached the end of search results.");
  }
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
  lightbox.refresh();
  return data;
}

// galleryEl.addEventListener('click', openModalImg);

// function openModalImg(evt) {
//   evt.preventDefault();
//   var lightbox = new SimpleLightbox('.gallery a', {
//     captionPosition: 'bottom',
//     captionDelay: 250,
//   });

//   var gallery = $('.gallery a').simpleLightbox();

//   gallery.refresh();
// }

//**Прокручування сторінки */

// const { height: cardHeight } = document
//   .querySelector('.gallery')
//   .firstElementChild.getBoundingClientRect();

// window.scrollBy({
//   top: cardHeight * 2,
//   behavior: 'smooth',
// });
