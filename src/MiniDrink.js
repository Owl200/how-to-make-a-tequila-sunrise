import React from 'react'
import './drink.css'

export default function MiniDrink(props){
    
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
                </div>
                <div className='drink-name'>
                    <h2>{props.drink.strDrink}</h2>
                </div>
                <div className='drink-instructions'>
                    <h3>Ingredients:</h3>
                    <ul>
                        {ingredients()}
                    </ul>
                </div>
            </div>
        </div>
    )
}