import React, {useState} from 'react'

export default function ItemArray(){
    const [thing, setThing] = useState([])

    const addThing = () => {
        setThing( prevThing => [...prevThing, `thing ${thing.length + 1}`])
        /*added item like this since .push() returns the length and modifies directly 
        the thing variable */
    }

    const deleteThings = () => {
        setThing([])
    }
    
    const deleteThing = () => {
        setThing( prevThing => prevThing.slice(0, -1))
    }
    
    const thingArr = thing.map( element => <p>{element}</p>)
    
    return (
        <div>
            <button onClick={addThing}>Add an Item</button>
            <button onClick={deleteThing}>Delete Last Item</button>
            <button onClick={deleteThings}>Delete All Items</button>
            {thingArr}
        </div>
    )
}