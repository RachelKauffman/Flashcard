import {React, useState, useEffect, useRef} from "react";
import {Link, useParams, useHistory} from "react-router-dom";
import {readCard, readDeck, updateCard} from "../../utils/api";
import CardForm from "./CardForm";

function EditCard(){
    const {cardId, deckId} = useParams();
    const history = useHistory();
    const initialState = {
        id: "",
        front: "",
        back: "",
        deckId: ""
     }
     const mountedRef = useRef(false)
     const [card, setCard] = useState(initialState)
     const [deck, setDeck] = useState({name: "", description: "", id: ""})

     //track state
     useEffect(() => {
        mountedRef.current = true;
        return () => {
            mountedRef.current = false;
        }
     }, [])

     //get decks from api
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
      }, [deckId]);//renders each time card Id changes

     

     //get cards from api
     useEffect(() => {
        const abortController = new AbortController();
        async function loadCard() {
          try {
            const loadedCard = await readCard(cardId, abortController.signal);
            if (mountedRef.current) {
              setCard(() => loadedCard);
            }
          } catch (error) {
            if (error.name !== 'AbortError') {
              throw error;
            }
          }
        }
        loadCard();
        return () => {
          abortController.abort();
        };
      }, [cardId]);//renders each time card Id changes

     
     const changeHandler = ({target}) => {
        setCard((currentState) => ({
            ...currentState,
            [target.name] : target.value,
        }))
     }

     const submitHandler = async (event) => {
        event.preventDefault();
        await updateCard(card)
        setCard(initialState)
        history.push(`/decks/${deckId}`)
     }

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
            <CardForm changeHandler={changeHandler}
                      submitHandler={submitHandler}
                      card={card}
                      deckId={deckId}
                />
         </div>
        </div>
     )
}








export default EditCard;