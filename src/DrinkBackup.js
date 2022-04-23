import React, {useState, useEffect, useRef} from 'react'
import './drink.css'

export default function Drink(){
    const [search, setSearch] = useState('random')  // will decide the case for the first drop-down
    const [drink, setDrink] = useState('')  // displays the info for a single drink
    const [ingredientsRes, setIngredientsRes] = useState([]) // info got form the case 'ingredient' used to populate the second dropdown
    const [ingredient, setIngredient] = useState('')    // value gotten from the second drop-down


    // used for the first drop-down
    useEffect( () =>  {
        switch (search) {
            case 'ingredient':
                fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list')
                .then(res => res.json())
                .then(data => setIngredientsRes(data.drinks.map( (item, i) => (
                <option value={item.strIngredient1.toLowerCase().replaceAll(' ', '-')} key={i}>{item.strIngredient1}</option>))));
                break;
            case 'random':
                fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
                .then(res => res.json())
                .then(data => setDrink(data.drinks[0]))
                .catch(err => console.log(err));
                break;
        }
    }, [search])

    // used to get the value from the first drop-down 
    const handleChangeSearch = e => setSearch(e.target.value)   

    //used to populate the second drop-down where all ingredients are displayed
    useEffect( () => (
        fetch(`www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredientDrop.current.value}`)
        .then(res => res.json())
        .then(data => setDrink(data.drinks[0]))
        .catch(err => console.log(err))), [ingredient])

    // used to get the value for the ingredient selected on the second drop-down
    const handleChangeIngredient = e => setIngredient(e.target.value)

    // ref used to get the value of the selected ingredient on the second dd to send the fetch request
    const ingredientDrop = useRef()

    console.log(search)

    // used to populate the ingredient list on the drink card
    const ingredients = _ => {
        const ing = [];
        for (let i in drink){
            if (i.includes('strIngredient') && drink[i] ) {
                ing.push(drink[i])
            }
        }
        return ing.map( (item, i) => <li key={i}>{item}</li>);
    }

    return(
        <div className='main'>

            <label htmlFor='search'>Search for a drink by:</label>
            <select value={search} name='search' id='search' onChange={handleChangeSearch}>
                <option value='name'>name</option>
                <option value='ingredient'>ingredient</option>
                <option value='first'>first letter</option>
                <option value='random'>random</option>
            </select>

            <select value={ingredient} name='ingredient-drop' id='ingredient-drop' ref={ingredientDrop} onChange={handleChangeIngredient}>
                {ingredientsRes}
            </select>

            {search === 'random' && <button></button>}
            
            <div className='wrapper'>
                <div className='image-grid'>
                    <div className='image'>
                        <img src={drink.strDrinkThumb} alt="" />
                    </div>
                </div>
                <div className='info'>
                    <p>({drink.strAlcoholic})</p>
                    <p>Recommended glass: {drink.strGlass}</p>
                </div>
                <div className='drink-name'>
                    <h2>{drink.strDrink}</h2>
                </div>
                <div className='drink-instructions'>
                    <h3>Ingredients:</h3>
                    <ul>
                        {ingredients()}
                    </ul>
                    <h3>Instructions:</h3>
                    <p>{drink.strInstructions}</p>
                </div>
            </div>
        </div>
    )
}