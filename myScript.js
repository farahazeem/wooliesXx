/**Dummy Data to be Displayed */
const recipeArray = [
    {
        id: 1,
        title: 'Eggplant',
        description: 'Plant-based diets are healthier, environment-friendly, and really yummy. Our collection has over 1,940 real-people-tested vegan recipes.',
        img: 'myImages/Eggplant.jpg',
        category: 'vegan',
        isFavourite: 'true'
    },
    {
        id: 2,
        title: 'Malabar Curry',
        description: 'Plant-based diets are healthier, environment-friendly, and really yummy. Our collection has over 1,940 real-people-tested vegan recipes.',
        img:'myImages/MalabarCurry.jpg',
        category: 'vegan',
        isFavourite: 'false'
    },
    {
        id: 3,
        title: 'Swedish Meatballs',
        description: 'Plant-based diets are healthier, environment-friendly, and really yummy. Our collection has over 1,940 real-people-tested vegan recipes.',
        img: 'myImages/SwedishMeatballs.jpg',
        category: 'vegan',
        isFavourite: 'false'
    },
    {
        id: 4,
        title: 'Quinoa Rice',
        description: 'A healthy vegetarian diet includes a variety of nutritious foods like fruits, vegetables, grains, healthy fats and plant-based proteins.',
        img: 'myImages/QuinoaRice.jpg',
        category: 'vegetarian',
        isFavourite: 'false'
    },
    {
        id: 5,
        title: 'Pasta Salad',
        description: 'A healthy vegetarian diet includes a variety of nutritious foods like fruits, vegetables, grains, healthy fats and plant-based proteins.',
        img: 'myImages/PastaSalad.jpg',
        category: 'vegetarian',
        isFavourite: 'false'
    },
    {
        id: 6,
        title: 'Jambalaya',
        description: 'A healthy vegetarian diet includes a variety of nutritious foods like fruits, vegetables, grains, healthy fats and plant-based proteins.',
        img: 'myImages/Jambalaya.jpg',
        category: 'vegetarian',
        isFavourite: 'false'
    },
    {
        id: 7,
        title: 'Fried Fish',
        description: 'Fish is healthy, easy to bake, grill, or fry and features a wide variety of nutrients that you can have in your everyday lunch and dinner.',
        img: 'myImages/FriedFish.jpg',
        category: 'pescatarian',
        isFavourite: 'false'
    },
    {
        id: 8,
        title: 'Roasted Fish',
        description: 'Fish is healthy, easy to bake, grill, or fry and features a wide variety of nutrients that you can have in your everyday lunch and dinner.',
        img: 'myImages/RoastedFish.jpg',
        category: 'pescatarian'
    },
    {
        id: 9,
        title: 'Moroccan Fish',
        description: 'Fish is healthy, easy to bake, grill, or fry and features a wide variety of nutrients that you can have in your everyday lunch and dinner.',
        img: 'myImages/MoroccanBakedFish.jpg',
        category: 'pescatarian',
        isFavourite: 'false'
    }
];

var myFavouriteRecipies = localStorage.getItem('favouriteRecipies') ? JSON.parse(localStorage.getItem('favouriteRecipies')) : [] ;

const myContent = document.querySelector('.myContent');

const showInHtml = recipeArray.map((recipe, index) => {
    return `
    <div class="column ${recipe.category}">   
        <div class="content">
          <img src="${recipe.img}" alt="${recipe.title}">
          <h4>${recipe.title}</h4>
          <input type="checkbox" id="${recipe.title}" onclick="toggleRecipe(${recipe.id})">
           <!--<button onclick="toggleRecipe(${recipe.id})"><i id="unfavourite" class="fa fa-star-o" aria-hidden="true"></i><i id="favourite" class="fa fa-star" aria-hidden="true"></i></buttton>-->
          <p>${recipe.description}</p>
        </div>
    </div>    
    `;
}).join('');

myContent.innerHTML = showInHtml;

function toggleRecipe(recipeId) {
     if(myFavouriteRecipies.find(item => item.id === recipeId)){
        var favRecipe = myFavouriteRecipies.findIndex(item => item.id === recipeId);
        myFavouriteRecipies.splice(favRecipe,1);
        localStorage.setItem('favouriteRecipies', JSON.stringify(myFavouriteRecipies));
    } else  {
        var favRecipe = recipeArray.find(item => item.id === recipeId);
        myFavouriteRecipies.push(favRecipe);
        localStorage.setItem('favouriteRecipies', JSON.stringify(myFavouriteRecipies));
    }
}

function checkboxesStatus(){
    for (let i = 0; i < recipeArray.length; i++){
        if (myFavouriteRecipies.find(item => item.id == recipeArray[i].id)) {
            document.getElementById(recipeArray[i].title).checked = true;
        }
    }
}

checkboxesStatus();

window.addEventListener( "pageshow", function ( event ) {
    var historyTraversal = event.persisted || 
                           ( typeof window.performance != "undefined" && 
                                window.performance.navigation.type === 2 );
    if ( historyTraversal ) {
      window.location.reload();
    }
  });

filterSelection("all");

function filterSelection(c) {
  var x, i;
  x = document.getElementsByClassName("column");
  if (c == "all") c = "";
  for (i = 0; i < x.length; i++) {
    removeClass(x[i], "show");
    if (x[i].className.indexOf(c) > -1) addClass(x[i], "show");
  }
}

function addClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) {element.className += " " + arr2[i];}
  }
}

function removeClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    while (arr1.indexOf(arr2[i]) > -1) {
      arr1.splice(arr1.indexOf(arr2[i]), 1);     
    }
  }
  element.className = arr1.join(" ");
}

var btnContainer = document.getElementById("filterOptions");
var btns = btnContainer.getElementsByClassName("btn");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function(){
    var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
}
