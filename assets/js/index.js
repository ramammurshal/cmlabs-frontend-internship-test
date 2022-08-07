$(document).ready(() => {
	axios.get('https://www.themealdb.com/api/json/v1/1/categories.php')
		.then(data => {
			createCardByData(data.data.categories);
		})
		.catch(error => {
			alert('Failed to catch data')
		})
	
	function createCardByData(data) {
		$.each(data, createCard);
	}
	
	function createCard(idx, data) {
		let cardList = $('<div class="col-12 col-sm-6 col-md-4 col-lg-3 card-list"></div>');
		let cardLink = $(`<a href="category.html?category-name=${data.strCategory}" class="card-link"></a>`);

		let img = $(`<img src="${data.strCategoryThumb}" alt="${data.strCategory}" class="img-fluid" />`);
		let h3 = $(`<h3>${data.strCategory}</h3>`);
		let p = $(`<p>${data.strCategoryDescription.substring(0, 80) + '...'}</p>`);
		let small = $('<small>View Details &nbsp;<i class="fa-solid fa-arrow-right-long"></i></a>');
	
		cardLink.append(img, h3, p, small);
		cardList.append(cardLink);
		$('#list .row').append(cardList);
	}
})
