import React, {useRef} from 'react'
import './mini-drink.css'

export default function MiniDrink(props){
    
    const handleClick = e => props.setDrinkName(drinkValue.current.name) 
    const drinkValue = useRef(null)

    return(
        <div className='main'>
            <button ref={drinkValue} className='wrapper-mini' key={props.drinkId} onClick={handleClick} name={props.drink.strDrink}>
                <div className='image-grid-mini'>
                    <div className='image'>
                        <img  src={props.drink.strDrinkThumb} alt="" />
                    </div>
                </div>
                <div className='drink-name-mini'>
                    <h2 >{props.drink.strDrink}</h2>
                </div>
            </button>
        </div>
    )
}
