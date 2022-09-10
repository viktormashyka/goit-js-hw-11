// https://pixabay.com/api/?key=29782836-0cb6e5c5167e525a8102df66c&q=${
//       this.#searchQuery
//     }&image_type=photo&orientation=horizontal&safesearch=true

export class PixabayApi {
  #BASE_URL = 'https://pixabay.com/api/';
  #API_KEY = '29782836-0cb6e5c5167e525a8102df66c';
  #searchQuery = '';
  //   getTrandPhotos(searchQuery) {
  //     const url = `${this.#BASE_URL}?key=${tiis.#API_KEY}&q=${
  //       this.#searchQuery
  //     }&image_type=photo&orientation=horizontal&safesearch=true`;
  //     fetch(url).then(response => {
  //       if (!response.ok) {
  //         throw new Error(response.status);
  //       }
  //       return response.json();
  //     });
  //   }
  getSearchPhotos() {
    const url = `${this.#BASE_URL}?key=${tiis.#API_KEY}&q=${
      this.#searchQuery
    }&image_type=photo&orientation=horizontal&safesearch=true`;
    fetch(url).then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    });
  }
}

// set searchQuery(newSearchQuery) {
//     this.#searchQuery = newSearchQuery;
// }

// var API_KEY = '29782836-0cb6e5c5167e525a8102df66c';
// var URL =
//   'https://pixabay.com/api/?key=' +
//   API_KEY +
//   '&q=' +
//   encodeURIComponent('red roses');
// $.getJSON(URL, function (data) {
//   if (parseInt(data.totalHits) > 0)
//     $.each(data.hits, function (i, hit) {
//       console.log(hit.pageURL);
//     });
//   else console.log('No hits');
// });
