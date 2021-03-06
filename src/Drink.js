import React from 'react'
import './drink.css'

export default function Drink(props){

    // used to populate the ingredient list on the drink card
    const ingredients = _ => {
        const ing = [];
        let j = 0;
        for (let i in props.drink){
            if (i.includes('strIngredient') && props.drink[i] ) { //searches for a strIngredient property and checks that the property is not null 
                ing.length < 9 ?
                ing.push({[i.slice(0, -1)]: props.drink[i]}) :
                ing.push({[i.slice(0, -2)]: props.drink[i]})
            } else if (i.includes('strMeasure') && props.drink[i]) {
                if (j < 9) {
                    ing[j] = {...ing[j], [i.slice(0, -1)]: props.drink[i]}
                    j++;
                } else if (j >= 9) {
                    ing[j] = {...ing[j], [i.slice(0, -2)]: props.drink[i]}
                    j++
                }
            }
        }
        return ing.map( (item, i) => <li key={i}>{item[`strMeasure`]} {item[`strIngredient`]}</li>);
    }

    return(
        <div className='main'>
            <div className='wrapper'>
                <div className='image-grid'>
                    <div className='image'>
                        <img src={props.drink.strDrinkThumb} alt="" />
                    </div>
                </div>
                <div className='info'>
                    <p>({props.drink.strAlcoholic})</p>
                    <p>Recommended glass: {props.drink.strGlass}</p>
                </div>
                <div className='drink-name'>
                    <h2>{props.drink.strDrink}</h2>
                </div>
                <div className='drink-instructions'>
                    <h3>Ingredients:</h3>
                    <ul>
                        {ingredients()}
                    </ul>
                    <h3>Instructions:</h3>
                    <p id='instructions'>{props.drink.strInstructions}</p>
                </div>
            </div>
        </div>
    )
}