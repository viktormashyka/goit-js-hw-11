import { Loading } from 'notiflix';

export { feachPhotos };

function feachPhotos(searchPhotos) {
  const BASE_URL = 'https://pixabay.com/api/';
  const API_KEY = '29782836-0cb6e5c5167e525a8102df66c';
  //   #searchQuery = '';
  const url = `${BASE_URL}?key=${API_KEY}&q=${searchPhotos}&image_type=photo&orientation=horizontal&safesearch=true`;
  return fetch(url).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}
