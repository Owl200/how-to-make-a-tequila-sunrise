import React from 'react'
import './mini-drink.css'

export default function MiniDrink(props){
    
    const handleClick = e => props.setDrinkName(e.target.innerText) 
    

    return(
        <div className='main'>
            <div  className='wrapper-mini' key={props.drinkId}>
                <div className='image-grid-mini'>
                    <div className='image'>
                        <img  src={props.drink.strDrinkThumb} alt="" />
                    </div>
                </div>
                <div className='drink-name-mini'>
                    <h2 onClick={handleClick}>{props.drink.strDrink}</h2>
                </div>
            </div>
        </div>
    )
}
