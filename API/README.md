# DrinkMe API
## Postman Collection
In the json file you can find Postman Collection to test and see how API endpoints are working.
## Documentation of endpoints used in Web Application
### 🍷Create drink
POST : http://localhost:8080/api/drinks/
<br> example of body:
{
    "id": null,
    "cocktailId":"3333",
    "rating": null
}

where cocktailId is id of cocktail from [TheCocktailDB](https://www.thecocktaildb.com/)

### 🍷Delete drink
DELETE : http://localhost:8080/api/drinks/{drinkId}

### 🍷Get drinks
GET : http://localhost:8080/api/drinks/

### 🍷Get drink by drinkId
GET : http://localhost:8080/api/drinks/{drinkId}

### 🍷Get drink by cocktailId
GET : http://localhost:8080/api/drinks/cocktailId={cocktailId}

### 🗞Get newest article's data (sprapped from [Food and wine](https://www.foodandwine.com/drinks))
GET : http://localhost:8080/api/articles/data
