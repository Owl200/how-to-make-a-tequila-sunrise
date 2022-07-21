import React, {useState, useEffect, useRef} from 'react'
import Drink from './Drink.js'
import MiniDrink from './MiniDrink.js'
import vivid from './vivid.png'

export default function DrinkFilter(){
    const [firstDdValue, setFirstDdValue] = useState('random') // will decide the case for the first drop-down
    const [ingredientsArr, setIngredientArr] = useState([]) // value that will be populate the second drop-down
    const [ingredientDd, setIngredientDd] = useState('7-up')  // value gotten from the second drop-down
    const [drink, setDrink] = useState({}) // object including all the info for a drink
    const [drinkName, setDrinkName] = useState('Tequila sunrise') // value used to search for a drink by name
    const [drinkMini, setDrinkMini] = useState([{strDrink: 'Tequila SunRise', strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/quqyqp1480879103.jpg'}])
    const [indexStart, setIndexStart] = useState(0) // sets the index where the drinkMiniArr will start at
    const [drinkMiniArr, setDrinkMiniArr] = useState([]) 
    const [drinkArrButtons, setDrinkArrButtons] = useState([])


    // used to sort the ingredient list on the second dropdown
    useEffect( _ =>  {
        firstDdValue === 'ingredient' && fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list')
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
    }, [firstDdValue])
    
    // used to get a Drink info by name after drinkName changes
    useEffect( _ => {
        fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drinkName}`)
        .then(res => res.json())
        .then(data => setDrink(data.drinks[0])) 
        .catch(err => console.log(err))
    }, [drinkName] )


    // sends request to get drink name after selecting ingredient on second drop-down
    useEffect( _ => {
        firstDdValue === 'ingredient' && fetch(ingredientDd === '7-up' ?
        `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredientDd.replaceAll(' ', '-')}` :
        `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredientDd.replaceAll('-', ' ')}`)
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
        .then(data => setDrinkMini(data))
        .catch(e => console.log(e));
        setIndexStart(0)
    }, [ingredientDd, firstDdValue])
    
    useEffect( _ => {
        if(drinkMini.length <= 10) {
            setDrinkMiniArr( drinkMini.map( (element, i) => {
            if(drinkName.toLowerCase() === element.strDrink.toLowerCase()) {
                return <Drink drink={drink}/>
            } else {
                return <MiniDrink setDrinkName={setDrinkName} drink={element} drinkId={i}/>
            }}))
            setDrinkArrButtons([])
        } else {
            setDrinkMiniArr([])
            setDrinkArrButtons([])
            for(let i = 0; i < Math.ceil(drinkMini.length/10); i++){
                setDrinkArrButtons(prev => [...prev, <button onClick={arrayButton} className='array-button'>{i + 1}</button>])
            }
            if(drinkMini.slice(indexStart).length < 10) {
                setDrinkMiniArr(drinkMini.slice(indexStart).map( (element, i) => {
                    if(drinkName.toLowerCase() === element.strDrink.toLowerCase()) {
                        return <Drink drink={drink}/>
                    } else {
                        return <MiniDrink setDrinkName={setDrinkName} drink={element} drinkId={i}/>
                    }
                }) )
            } else {
                for(let i = indexStart; i <= indexStart + 9; i++) {
                    if(drinkMini[i].strDrink.toLowerCase() === drinkName.toLowerCase()){
                        setDrinkMiniArr(prev => [...prev, <Drink drink={drink} />])
                    } else{ 
                    setDrinkMiniArr(prev => [...prev, <MiniDrink setDrinkName={setDrinkName} drink={drinkMini[i]} drinkId={i}/>])
                    }
                }
            }
        }
    }, [drinkMini, indexStart, drinkName, drink])


    //event handler for the buttons that appear on the drinks list 
    const arrayButton = e => setIndexStart((+e.target.innerHTML - 1) * 10)


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

    // sets the value of the input when searching by name 
    const handleChangeName = e => {
        setDrinkName(e.target.value);
    }

    // used to select the all the text inside the input when clicking on it 
    const handleFocus = e => e.target.select()

    return(
        <>
            <header>
                <img id='header-logo' src={vivid} alt='Vivid Las Vegas'/>
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
                {firstDdValue === 'name' && <input onClick={handleFocus} value={drinkName} className='filter' onChange={handleChangeName}></input>}
            </div>

            {firstDdValue === 'ingredient' || <Drink drink={drink}/>}
            {firstDdValue === 'ingredient' && <p style={{textAlign: 'center'}}>{drinkMini.length} results found</p>}
            {firstDdValue === 'ingredient' && drinkMiniArr}
            {firstDdValue === 'ingredient' && (
                <div className='drink-arr-buttons'>
                    {drinkArrButtons}
                </div>)
                }
        </>
    )
}