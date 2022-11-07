import { React, useState, useEffect, useRef } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { readDeck, createCard } from "../../utils/api";
import CardForm from "./CardForm";

function AddCard() {
  const mountedRef = useRef(false);
  const history = useHistory();
  const { deckId } = useParams();
  const [deck, setDeck] = useState([]);

  const initialForm = {
    id: "",
    front: "",
    back: "",
    deckId: "",
  };

  const [card, setCard] = useState(initialForm); //will change state of card

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
        if (error.name !== "AbortError") {
          throw error;
        }
      }
    }
    loadDeck();
    return () => {
      abortController.abort();
    };
  }, [deckId]);

  //handler for changes made to card
  const changeHandler = ({ target }) => {
    setCard((currentState) => ({
      ...currentState,
      [target.name]: target.value,
    }));
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    await createCard(deckId, card); //gets data from api
    setCard(initialForm); //clears data
    history.push(`/decks/${deckId}/cards/new`);
  };

  return (
    //form
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">
              <i className="fas fa-home"></i> Home
            </Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>{deck.name}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Add Card
          </li>
        </ol>
      </nav>
      <div>
        <h1> {deck.name}: Add Card</h1>
        <CardForm
          changeHandler={changeHandler}
          submitHandler={submitHandler}
          card={card}
          deckId={deckId}
        />
      </div>
    </div>
  );
}

export default AddCard;
