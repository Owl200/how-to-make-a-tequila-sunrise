import fetch from 'node-fetch'

fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list')
.then(res => res.json())
.then(srt => srt.sort((a, b) => {
    if (a.strIngredient1 < b.strIngredient1) {
        return -1;
    } else if (b.strIngredient1 < a.strIngredient1) {
        return 1;
    } else {
        return 0;
    }
}))
.then(data => console.log(data))