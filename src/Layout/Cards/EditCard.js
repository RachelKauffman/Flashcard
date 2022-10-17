import {React, useState, useEffect} from "react";
import {Link, useParams, useHistory} from "react-router-dom";
import {readCard, readDeck, updateCard} from "../../utils/api";


function EditCard(){
    const {cardId, deckId} = useParams();
    const history = useHistory();
    const initialState = {
        id: "",
        front: "",
        back: "",
        deckId: ""
     }

     const [card, setCard] = useState(initialState)
     const [deck, setDeck] = useState({name: "", description: "", id: ""})

     //get decks from api
     useEffect(() => {
        const abortController = new AbortController();
        async function loadDeck() {
            const response = await readDeck (deckId,abortController.signal)
             setDeck(response)
           }  
           loadDeck();
           return () => abortController.abort()
       },[deckId]) //renders each time deckId changes
     

     //get cards from api
     useEffect(() => {
        const abortController = new AbortController();
        async function loadCards() {
            const response = await readCard (cardId, abortController.signal)
            setCard(response)
        }
        loadCards();
        return () => abortController.abort()
     }, [cardId])//renders each time card Id changes

     //handles front of card change
     const changeFront = (event) => {
        setCard({
            ...card,
            front: event.target.value
        })
     }

     //handles back of card change
     const changeBack = (event) => {
        setCard({
            ...card,
            back: event.target.value
        })
     }

     const submitHandler = ( async (event) => {
        event.preventDefault();
        await updateCard(card)
        history.push(`/decks/${deckId}`)
     })

     return(
        <div>
         <nav aria-label='breadcrumb'>
            <ol className='breadcrumb'>
                <li className='breadcrumb-item'>
                    <Link to="/">
                        Home
                    </Link>
                </li>
                <li className='breadcrumb-item'>
                    <Link to={`decks/${deckId}`}>
                        {deck.name}
                    </Link>
                </li>
                <li className='breadcrumb-item active' aria-current='page'>
                    Edit Card {card.id}
                </li>
            </ol>
         </nav>
         <div>
            <h1>Edit Card</h1>
            <form onSubmit={submitHandler}>
                <div>
                    <label htmlFor="Front">
                        <textarea type="textarea"
                                  name="front"
                                  id="front"
                                  placeholder="Front side of card"
                                  onChange={changeFront}
                                  value={card.front} />
                    </label>
                </div>
                <div>
                    <label htmlFor="Back">
                        <textarea type="textarea"
                                  name="back"
                                  id="back"
                                  placeholder="Back side of card"
                                  onChange={changeBack}
                                  value={card.back} />
                    </label>
                </div>
                <div>
                    <Link to={`/decks/${deckId}`}>
                    <button class="btn btn-secondary" onClick={() => history.push(`/decks/${deckId}`)}>
                        Cancel</button>
                    <button class="btn btn-primary" onClick={() => history.push(`/decks/${deckId}`)}>
                        Submit
                    </button>
                    </Link>
                </div>
            </form>
         </div>
        </div>
     )
}








export default EditCard;