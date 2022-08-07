$(document).ready(() => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const category = urlParams.get('category-name');

	if (!category) {
		window.location.href = './index.html';
	}
  
  document.title = `AppMeal | ${category}`;
  $('#category-bc').text(category);
  $('#category-hero').text(category);

  axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
		.then(data => {
			createCardByData(data.data.meals);
		})
		.catch(error => {
			alert('Failed to catch data')
		})
	
	axios.get('https://www.themealdb.com/api/json/v1/1/categories.php')
		.then(data => {
			$.each(data.data.categories, function(idx, item) {
				if (item.strCategory === category) {
					$('#category-details').text(item.strCategoryDescription);
				}
			});
		})
		.catch(error => {
			alert('Failed to catch data')
		})
	
	function createCardByData(data) {
		$.each(data, createCard);
	}
	
	function createCard(idx, data) {
		let cardList = $('<div class="col-12 col-sm-6 col-md-4 col-lg-3 card-list"></div>');
		let cardLink = $(`<a href="detail.html?category-name=${category}&meal-id=${data.idMeal}" class="card-link"></a>`);

		let img = $(`<img src="${data.strMealThumb}" alt="${data.strMeal}" class="img-fluid" />`);
		let h4 = $(`<h4>${data.strMeal}</h4>`);
		let small = $('<small>View Details &nbsp;<i class="fa-solid fa-arrow-right-long"></i></a>');
	
		cardLink.append(img, h4, small);
		cardList.append(cardLink);
		$('#list .row').append(cardList);
	}
});
