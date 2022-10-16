import {React, useState, useEffect} from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import {readDeck, updateDeck} from "../../utils/api/index"

function EditDeck() {
    const {deckId} = useParams();
    const history = useHistory();
    const initialState = {
        name: "",
        description: ""
    }

    const [deck, setDeck] = useState(initialState)

    useEffect(() => {
        const abortController = new AbortController();
        async function loadDeck() {
          const response = await fetch(readDeck, abortController.signal)
           setDeck(response)
         }  
         loadDeck();
         return () => abortController.abort()
     },[deckId]) //renders each time deckId changes

   const changeHandler = ({target}) => {
    setDeck({
        ...deck,
        [target.name]: target.description
    })
   }

   const submitHandler = ( async (event) => {
    event.preventDefault();
    await updateDeck(deck)
    history.push(`/decks/${deckId}`)
   })

   return(
    <>
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
                    Edit Deck
                </li>
            </ol>
        </nav> 
        <div>
            <h1>Edit Deck</h1>
            <form onSubmit={submitHandler}>
              <div>
                <label htmlFor="name">Name</label>
                <input type="text" 
                       name="name" 
                       id="name"
                       placeholder={deck.name}
                       onChange={changeHandler}
                       value={deck.name} />
              </div>
              <div>
                <label htmlFor="description">Description</label>
                <textarea type="textarea"
                       name="description"
                       id="description"
                       placeholder={deck.description}
                       onChange={changeHandler}
                       value={deck.description} />
              </div>
              <div>
                <button type="submit" onClick={() => history.push(`{/decks/${deckId}}`)}>Cancel</button>
                <button type="submit">Submit</button>
              </div>
             </form>
        </div>
    </>
   )
}










export default EditDeck;