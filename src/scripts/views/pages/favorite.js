import FavoriteRestaurantDB from '../../data/favoriteRestaurant-idb';
import { createRestaurantListTemplate } from '../templates/template-creator';

const favorites = {
  async render() {
    return `
      <div class="loader-container" id="loader-container">
        <div id="loader"></div>
      </div>

      <main class="content" id="content" tabindex="0">
        <div class="card">
          <h1 class="card-label">Your Favorite Restaurants</h1>
          <div class="lists" id="lists"></div>
        </div>
      </main> 
    `;
  },

  async afterRender() {
    const list = await FavoriteRestaurantDB.getAllRestaurant();
    const restaurantContainer = document.querySelector('#lists');
    const mainContainer = document.querySelector('#hero');

    if (list.length === 0) {
      restaurantContainer.innerHTML = `
        Tidak ada restaurant untuk ditampilkan
      `;
    }

    list.forEach((restaurant) => {
      restaurantContainer.innerHTML += createRestaurantListTemplate(restaurant);
    });
    mainContainer.style.display = 'block';
    const loaderContainer = document.querySelector('#loader-container');
    loaderContainer.style.display = 'none';
  },
};

export default favorites;
