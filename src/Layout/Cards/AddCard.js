import {React, useState, useEffect} from 'react';
import {Link, useHistory, useParams } from 'react-router-dom';
import {readDeck, createCard} from "../../utils/api";


function AddCard() {
    const initialForm = {
        "front": "",
        "back" : ""
    }

    const [card, setCard] = useState(initialForm); //will change state of card
    const history = useHistory();
    const {deckId} = useParams;
    const [deck, setDeck] = useState({})

    //effect to load deck
    useEffect(() => {
        const abortController = new AbortController()
        async function loadDeck() {
            const response = await fetch(readDeck, abortController)
     
            setDeck(response)
        }
        loadDeck();
        return () => abortController.abort()
    },[deckId]) //renders each time deckId changes 

    //handler for changes made to front and back of card
    const changeHandler = ({target}) => {
        setCard((currentCard) => ({
            ...currentCard,
            [target.name]:target.value
        }))
    }

    const submitHandler = ( async (event) => {
        event.preventDefault();
        await createCard(card)//gets data from api
        setCard(...initialForm) //clears data
     })

     return (
        //form
        <>
        <nav aria-label='breadcrumb'>
            <ol className='breadcrumb'>
                <li className='breadcrumb-item'>
                    <Link to="/">
                        Home
                    </Link>
                </li>
                <li className='breadcrumb-item'>
                    <Link to={`/decks/${deckId}`}>
                    {deck.name}
                    </Link>
                </li>
                <li className='breadcrumb-item active' aria-current='page'>
                    Add Card
                </li>
            </ol>
        </nav> 
        <div>
            <h1>`${deck.name}`: Add Card</h1>
            <form onSubmit={submitHandler}>
              <div>
                <label htmlFor="Front">Front</label>
                <textarea type="textarea"
                          name="front"
                          id="front"
                          onChange={changeHandler}
                          value={card.front}/>
                <label htmlFor="back">Back</label>
                <textarea type="textarea"
                          name="back"
                          id="back"
                          onChange={changeHandler}
                          value={card.back}/>
              </div>
              <div>
                <button type="submit" onClick={submitHandler}>Save</button>
                <button type="submit" onClick={() => history.push(`{/decks/${deckId}}`)}>Done</button>
              </div>
            </form>
         </div>
        </>
     )
}











export default AddCard;