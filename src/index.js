import './styles.css';
import cartImg from './tmp_cart-img.hbs'
import fetch from './apiService.js'
import spinner from './spinner.js'
import * as basicLightbox from 'basiclightbox'

const _ = require('lodash')


const refs = {
  searchForm:document.querySelector('#search-form'),
  btnLoad:document.querySelector('button[data-action="load-more"]'),
  link:document.querySelector('.link_to_img')
}
const box = document.querySelector('.gallery'); 

refs.searchForm.addEventListener('submit', searchCat)
refs.btnLoad.addEventListener('click', loadMoreImages)
//1.to do ligthBox
//2. search hw-8 gallery  
// refs.searchForm.addEventListener('click', loadBoxLight)

// refs.link.addEventListener('click',loadBoxLight)

// refs.searchForm.addEventListener('submit', _.debounce(searchCat,1000))




// const instance = basicLightbox.create(`
//     <img src="assets/images/image.png" width="800" height="600">
// `)

// instance.show()


function loadBoxLight(e){
  e.preventDefault();
  console.log(e.currentTarget);
  
  
}




function searchCat(el){
    el.preventDefault();
    const input = el.currentTarget.elements.query.value;
    console.log(input);

    cleareListItem();

    fetch.searchQuery = input;

    fetch.resetPage();
    spinner.show();

    fetch.fetchArticles()
    .then(item => {
      spinner.hide();
      restSearchItem(item)
    })
    .catch(error => console.warn(error))
}

function restSearchItem(element){
    const html = element.map(el => createCartPhoto(el)).join('')
    box.insertAdjacentHTML('beforeend', html);
}

function createCartPhoto({tags,webformatURL,largeImageURL,likes,views,comments,downloads}){
    return `<div class="photo-card post">
    <a href="#" class="link_to_img">
    <img src="${webformatURL}" alt="${tags}" />
    </a>
  
    <div class="stats">
      <p class="stats-item">
        <i class="material-icons">thumb_up</i>
        ${likes}
      </p>
      <p class="stats-item">
        <i class="material-icons">visibility</i>
        ${views}
      </p>
      <p class="stats-item">
        <i class="material-icons">comments</i>
        ${comments}
      </p>
      <p class="stats-item">
        <i class="material-icons">cloud_download</i>
        ${downloads}
      </p>
    </div>
  </div>`
}

function loadMoreImages(){
  spinner.show();
  window.scrollTo(0, 1000);
  fetch.fetchArticles()
  .then(item => {
    spinner.hide();
    restSearchItem(item)
  })
  .catch(error => console.warn(error))
  
}


function cleareListItem(){
   box.innerHTML = null;
}





