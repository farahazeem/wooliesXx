var myFavouriteRecipies = JSON.parse(localStorage.getItem('favouriteRecipies'));

if(myFavouriteRecipies.length == 0){
(document.getElementById("emptyView")).removeAttribute('hidden');
}

const myContent = document.querySelector('.myContent');
const showInHtml = myFavouriteRecipies.map((recipe, index) => {
    return `
    <div class="column ${recipe.category}">
        <div class="content">
        <img src="${recipe.img}" alt="${recipe.title}">
        <h4>${recipe.title}</h4>
        <!--<i class="fa fa-star-o" aria-hidden="true"></i><i class="fa fa-star" aria-hidden="true"></i></buttton>-->
        <input type="checkbox" onclick="toggleRecipe(${recipe.id})" checked>
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
    window.location.reload();
} else  {
    var favRecipe = recipeArray.find(item => item.id === recipeId);
    myFavouriteRecipies.push(favRecipe);
    localStorage.setItem('favouriteRecipies', JSON.stringify(myFavouriteRecipies));
}
}


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
