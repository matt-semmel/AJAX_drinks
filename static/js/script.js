window.addEventListener('load', setup);

function setup() {
    newDrinkButtonReference = document.getElementById("newDrinkButton");
    newDrinkButtonReference.addEventListener("click", fetchListOfDrinks);
    fetchListOfDrinks();
}

function fetchListOfDrinks() {
    fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php")
        .then(res => res.json())
        .then(data => {
            console.log(data.drinks[0]);
            updateDisplay(data.drinks[0]);
        })
}

const updateDisplay = (drink) => {
    let drinkPicture = document.getElementById("drink-image");
    drinkPicture.src = drink.strDrinkThumb;
    drinkPicture.alt = drink.strDrink;

    let drinkName = document.getElementById("drinkName");
    drinkName.innerText = drink.strDrink;

    let isAlcoholic = document.getElementById("alcoholic");
    isAlcoholic.innerText = (drink.strAlcoholic === "Alcoholic" ? "yes" : "no");

    let drinkCategory = document.getElementById("drinkCategory");
    drinkCategory.innerText = drink.strCategory;

    let listOfIngredients = document.getElementById("listOfIngredients");
    listOfIngredients.innerHTML = "";
    let unorderedList = document.createElement("ul");
    let list = "";
    for (let i=1; i<16; i++) {
        let drinkIngredient = drink[`strIngredient${i}`];
        let ingredientMeasurement = drink[`strMeasure${i}`];

        if (drinkIngredient == "" || drinkIngredient == null) {
            break;
        } else {
            list += `<li>${drinkIngredient} - ${ingredientMeasurement} </li>`;
        }
    }
    unorderedList.innerHTML = list;
    listOfIngredients.append(unorderedList);

    let instructions = document.getElementById("instructions");
    instructions.innerText = drink.strInstructions;
}