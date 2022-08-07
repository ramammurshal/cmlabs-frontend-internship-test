$(document).ready(() => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const category = urlParams.get('category-name');
  const mealId = urlParams.get('meal-id');

  axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
		.then(data => {
			const mealData = data.data.meals[0];

      document.title = `AppMeal | ${mealData.strMeal}`;
      $('#category-bc-middle').html(`<a href="category.html?category-name=${category}">${category}</a>`);
      $('#category-bc').text(mealData.strMeal);
      $('#category-hero').text(mealData.strMeal);
			$('.instructions-thumb').attr('src', mealData.strMealThumb);
			$('.instructions-details').text(mealData.strInstructions);

			const colDivRecipes1 = $('<div class="col-12 col-md-6 col-lg-3"></div>');
			const colDivRecipes2 = $('<div class="col-12 col-md-6 col-lg-3"></div>');
			const colDivRecipes3 = $('<div class="col-12 col-md-6 col-lg-3"></div>');
			const colDivRecipes4 = $('<div class="col-12 col-md-6 col-lg-3"></div>');

			const ulDivRecipes1 = $('<ul></ul>');
			const ulDivRecipes2 = $('<ul></ul>');
			const ulDivRecipes3 = $('<ul></ul>');
			const ulDivRecipes4 = $('<ul></ul>');
			
			for(let i = 1; i <= 20; i++) {
				if (mealData[`strIngredient${i}`]) {
					const li = $(`<li>${mealData[`strIngredient${i}`]} ${mealData[`strMeasure${i}`]}</li>`);

					if (i >= 1 && i <= 5) {
						ulDivRecipes1.append(li);
					} else if (i > 5 && i <= 10) {
						ulDivRecipes2.append(li);
					} else if (i > 10 && i <= 15) {
						ulDivRecipes3.append(li);
					} else if (i > 15 && i <= 20) {
						ulDivRecipes4.append(li);
					}
				}
			}

			colDivRecipes1.append(ulDivRecipes1);
			colDivRecipes2.append(ulDivRecipes2);
			colDivRecipes3.append(ulDivRecipes3);
			colDivRecipes4.append(ulDivRecipes4);

			$('.row-recipes').append(colDivRecipes1, colDivRecipes2, colDivRecipes3, colDivRecipes4);

			if (mealData.strYoutube) {
				$('.box-iframe-tutorials').html(`
					<iframe src="${mealData.strYoutube.replace('watch?v=', 'embed/')}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen class="iframe-tutorials"></iframe>
				`);
			} else {
				$('.box-iframe-tutorials').text('No tutorials for this meal...');
			}
		})
		.catch(error => {
			alert('Failed to catch data')
		})
});
