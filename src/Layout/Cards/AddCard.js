import {React, useState, useEffect, useRef} from 'react';
import {Link, useHistory, useParams } from 'react-router-dom';
import {readDeck, createCard} from "../../utils/api";


function AddCard() {
    const initialForm = {
        id: "",
        front: "",
        back : "",
        deckId: "",
    }
    const mountedRef = useRef(false);
    const [card, setCard] = useState(initialForm); //will change state of card
    const history = useHistory();
    const {deckId} = useParams;
    const [deck, setDeck] = useState([])
    
    useEffect(() => {
        mountedRef.current = true;
        return () => {
          mountedRef.current = false;
        };
      }, []);

      useEffect(() => {
        const abortController = new AbortController();
        async function loadDeck() {
          try {
            const loadedDeck = await readDeck(deckId, abortController.signal);
            if (mountedRef.current) {
              setDeck(() => loadedDeck);
            }
          } catch (error) {
            if (error.name !== 'AbortError') {
              throw error;
            }
          }
        }
        loadDeck();
        return () => {
          abortController.abort();
        };
      }, [deckId]);

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
        history.push(`/decks/${deckId}/cards/new`)
     })

     return (
        //form
        <div>
        <nav aria-label='breadcrumb'>
            <ol className='breadcrumb'>
                <li className='breadcrumb-item'>
                    <Link to="/">
                      <i className="fas fa-home"></i>  Home
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
            <h1>{deck.name} Add Card</h1>
            <form onSubmit={submitHandler}>
              <div>
                <label htmlFor="Front">Front</label>
                <textarea type="textarea"
                          name="front"
                          id="front"
                          className="form-control"
                          rows="2"
                          onChange={changeHandler}
                          value={card.front}/>
                <label htmlFor="back">Back</label>
                <textarea type="textarea"
                          name="back"
                          id="back"
                          className="form-control mb-2"
                          rows="2"
                          onChange={changeHandler}
                          value={card.back}/>
              </div>
              <div>
                <button className="btn btn-secondary mr-2" onClick={() => history.push(`{/decks/${deckId}}`)}>Done</button>
                <button className="btn btn-primary" onClick={submitHandler}>Save</button>
              </div>
            </form>
         </div>
        </div>
     )
}











export default AddCard;