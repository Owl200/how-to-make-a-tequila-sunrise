import React, {useState, useEffect, useRef} from 'react'
import Drink from './Drink.js'

export default function DrinkFilter(){
    const [firstDdValue, setFirstDdValue] = useState('random') // will decide the case for the first drop-down
    const [ingredientsArr, setIngredientArr] = useState([]) // value that will be populate the second drop-down
    const [ingredientDd, setIngredientDd] = useState('')  // value gotten from the second drop-down
    const [drink, setDrink] = useState({}) // object including all the info for a drink
    const [drinkName, setDrinkName] = useState('Tequila sunrise') // value used to search for a drink by name

    // used for the first drop-down
    useEffect( _ =>  {
        switch (firstDdValue) {
            case 'ingredient':
                fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list')
                .then(res => res.json())
                .then(srt => srt.drinks.sort((a, b) => {
                    if (a.strIngredient1 < b.strIngredient1) {
                        return -1;
                    } else if (b.strIngredient1 < a.strIngredient1) {
                        return 1;
                    } else {
                        return 0;
                    }
                }))
                .then(data => setIngredientArr(data.map( (item, i) => (
                <option value={item.strIngredient1.toLowerCase().replaceAll(' ', '-')} key={i}>{item.strIngredient1}</option>))));
                break;
            case 'random':
                break;
            default:
                break;
        }
    }, [firstDdValue])
    
    // used to get a Drink info by name after drinkName changes
    useEffect( _ => {
        firstDdValue === 'ingredient' && fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drinkName}`)
        .then(res => res.json())
        .then(data => setDrink(data.drinks[0])) 
        .catch(err => console.log(err))
    }, [drinkName, firstDdValue] )

    useEffect( _ => {
        fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drinkName}`)
        .then(res => res.json())
        .then(data => setDrink(data.drinks[0])) 
        .catch(err => console.log(err))
    }, [] )

    // sends request to get drink name after selecting ingredient on second drop-down
    useEffect( _ => {
        firstDdValue === 'ingredient' && fetch(ingredientDd === '7-up' ?
        `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredientDd.replaceAll(' ', '-')}` :
        `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredientDd.replaceAll('-', ' ')}`)
        .then(res => res.json())
        .then(data => setDrinkName(data.drinks[0].strDrink))
        .catch(e => console.log(e))
    }, [ingredientDd, firstDdValue])

    // used to get the value from the first drop-down 
    const handleChangeSearch = e => setFirstDdValue(e.target.value);  

    // used to get the value for the ingredient selected on the second drop-down AND fetch the drinks info
    const handleChangeIngredient = e => {
        setIngredientDd(e.target.value);
    }

    // ref used to get the value of the selected ingredient on the second dd to send the fetch request
    const ingredientDrop = useRef()

    // used to get info from a random drink 
    const getRandom = _ => {
        fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
        .then(res => res.json())
        .then(data => setDrink(data.drinks[0]))
        .catch(err => console.log(err));
    }

    // onClick for button that appears when searching by name
    const getDrinkByName = _ => {
        fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drinkName}`)
        .then(res => res.json())
        .then(data => setDrink(data.drinks[0]))
        .catch(err => console.log(err));
    }

    // sets the value of the input when searching by name 
    const handleChangeName = e => {
        setDrinkName(e.target.value);
    }

    return(
        <>
            <header>
                <h1>How to Make a</h1>
            </header>
            <div id='filter-container'>
                <label htmlFor='search'>Search for a drink by: </label>
                <select value={firstDdValue} name='search' id='search' className='filter' onChange={handleChangeSearch}>
                    <option value='name'>name</option>
                    <option value='ingredient'>ingredient</option>
                    <option value='random'>random</option>
                </select>

                {firstDdValue === 'ingredient' &&
                <select value={ingredientDd} name='ingredient-drop' id='ingredient-drop' className='filter' ref={ingredientDrop} onChange={handleChangeIngredient}>
                    {ingredientsArr}
                </select>}

                {firstDdValue === 'random' && <button onClick={getRandom}>Get a random drink</button>}
                {firstDdValue === 'name' && 
                <>
                    <input value={drinkName} className='filter' onChange={handleChangeName}></input>
                    <button onClick={getDrinkByName}>Search</button>
                </>}
            </div>

            <Drink drink={drink}/>
        </>
    )
}