document.getElementById('generate-meal').addEventListener('click', function() {
    const keyword = document.getElementById('keyword').value;
    generateMeal(keyword);
});

async function generateMeal(keyword) {
    const apiURL = `https://www.themealdb.com/api/json/v1/1/search.php?s=${keyword}`;
    const response = await fetch(apiURL);
    const data = await response.json();

    const mealResultDiv = document.getElementById('meal-result');
    mealResultDiv.innerHTML = '';

    if (data.meals) {
        data.meals.forEach(meal => {
            const mealElement = document.createElement('div');
            mealElement.classList.add('meal');
            mealElement.innerHTML = `
                <h2>${highlightText(meal.strMeal, keyword)}</h2>
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}" style="width: 100px; height: 100px;">
                <p>Ingredients: ${getHighlightedIngredients(meal, keyword).join(', ')}</p>
            `;
            mealResultDiv.appendChild(mealElement);
        });
    } else {
        mealResultDiv.innerHTML = '<p>No meals found matching your criteria.</p>';
    }
}

function getHighlightedIngredients(meal, keyword) {
    let ingredients = [];
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];
        if (ingredient) {
            let highlightedIngredient = highlightText(`${measure} ${ingredient}`, keyword);
            ingredients.push(highlightedIngredient);
        }
    }
    return ingredients;
}

function highlightText(text, keyword) {
    const regex = new RegExp(`(${keyword})`, 'gi');
    return text.replace(regex, '<span class="highlight">$1</span>');
}
