let input = document.getElementById("input");
let displayArea = document.getElementById("displayArea");
let country = "";
let data = {};

async function fetchData() {
    try {
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${country}`);
        data = await response.json();
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

function displayData() {
    displayArea.innerHTML = "";

    if (data.meals) {
        data.meals.forEach(meal => {
            const mealCard = document.createElement("div");
            mealCard.className = "bg-white p-4 rounded shadow-md w-48";

            const mealImg = document.createElement("img");
            mealImg.src = meal.strMealThumb;
            mealImg.alt = meal.strMeal;
            mealImg.className = "w-full h-32 object-cover rounded";

            const mealName = document.createElement("h3");
            mealName.textContent = meal.strMeal;
            mealName.className = "mt-2 text-lg font-semibold text-center";

            mealCard.appendChild(mealImg);
            mealCard.appendChild(mealName);
            displayArea.appendChild(mealCard);
        });
    } else {
        displayArea.innerHTML = "<p>No meals found for the specified country.</p>";
    }
}

async function showfoodCard() {
    country = input.value.trim();

    if (country === "") {
        alert("Please enter a country name.");
        return;
    }

    await fetchData();
    displayData();
}
