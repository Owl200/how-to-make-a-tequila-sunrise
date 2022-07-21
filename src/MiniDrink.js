import React from 'react'
import './mini-drink.css'

export default function MiniDrink(props){
    
    //console.log(props)
    const handleClick = e => props.setDrinkName(e.target.name) 
    

    return(
        <div className='main'>
            <div  className='wrapper-mini' key={props.drinkId} onClick={handleClick} name={props.drink.strDrink} >
                <div className='image-grid-mini'>
                    <div className='image'>
                        <img  src={props.drink.strDrinkThumb} alt="" />
                    </div>
                </div>
                <div className='drink-name-mini'>
                    <h2>{props.drink.strDrink}</h2>
                </div>
            </div>
        </div>
    )
}
