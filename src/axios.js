import axios from 'axios';
import { Notify } from 'notiflix';
export { getPhotos };

async function getPhotos() {
  try {
    const response = await axios.get('url');
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
    Notify.failure('error');
  }
}
