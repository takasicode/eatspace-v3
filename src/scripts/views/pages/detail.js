import UrlParser from '../../routes/url-parser';
import RestaurantDbSource from '../../data/restaurantdb-source';
import { createRestaurantDetailTemplate } from '../templates/template-creator';
import LikeButtonPresenter from '../../utils/like-button-presenter';
import ReviewInitiator from '../../utils/review-initiator';
import FavoriteRestaurantDB from '../../data/favoriteRestaurant-idb';

const detail = {
  async render() {
    return `
      <div class="loader-container" id="loader-container">
        <div id="loader"></div>
      </div> 

      <main class="content" id="content" tabindex="0">
        <div class="card">
          <h1 class="card-label">Restaurant Details</h1>
          <div class="detail" id="detail"></div>
          <div id="likeButtonContainer"></div>
          <div id="customerReviewFormContainer"></div>
        </div>
      </main>  
    `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const { restaurant } = await RestaurantDbSource.detailRestaurant(url.id);
    const restaurantContainer = document.querySelector('#detail');
    const mainContainer = document.querySelector('#hero');
    restaurantContainer.innerHTML = createRestaurantDetailTemplate(restaurant);
    mainContainer.style.display = 'none';

    const loaderContainer = document.querySelector('#loader-container');
    loaderContainer.style.display = 'none';

    LikeButtonPresenter.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      favoriteRestaurant: FavoriteRestaurantDB,
      restaurant,
    });

    ReviewInitiator.init({
      customerReviewContainer: document.querySelector('.detailRestaurant-review'),
      customerReviewFormContainer: document.querySelector('#customerReviewFormContainer'),
    });
  },
};

export default detail;
