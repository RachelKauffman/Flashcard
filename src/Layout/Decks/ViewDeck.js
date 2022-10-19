import { React, useEffect, useState } from "react";
import { Link, useHistory, useParams, Route } from "react-router-dom";
import { deleteDeck, readDeck, deleteCard } from "../../utils/api";
import ViewCard from "../Cards/ViewCard";

function ViewDeck({card}) {

  const { deckId } = useParams();
  const history = useHistory();
  const [deck, setDeck] = useState([]);

  //get deck from api
  useEffect(() => {
    const abortController = new AbortController();
    async function loadDeck() {
      const response = await readDeck(deckId, abortController.signal);
      setDeck(response);
    }
    loadDeck();
    return () => abortController.abort();
  }, [deckId]); //renders when id changes

  const handleDelete = async () => {
    const prompt = window.confirm(
      "Delete this deck? You will not be able to recover it."
    );
    if (prompt) {
      history.push("/");
      await deleteDeck(deckId);
    }
  }
  
  //delete card
  const deleteHandler = async () => {
    const prompt = window.confirm(
      "Delete this card? You will not be able to recover it"
    );
    if (prompt) {
      await deleteCard(card.id);
      history.push("/");
    }
  };


  return (
    
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {deck.name}
          </li>
        </ol>
      </nav>
      <div>
        <div>
          <h4>{deck.name}</h4>
        </div>
        <div>
          <p>{deck.description}</p>
          <div>
            <Link to={`/decks/${deckId}/edit`} className="btn btn-secondary mr-2">
                <i className="fa fa-pen"></i> Edit
            </Link>
            <Link to={`/decks/${deckId}/study`} className="btn btn-primary mr-2">
                <i className="fa fa-book"></i> Study
            </Link>
            <Link to={`/decks/${deckId}/cards/new`} className="btn btn-primary">
                <i className="fa fa-plus"></i> Add Cards
            </Link>
            <button
              className="btn btn-danger float-right"
              onClick={() => handleDelete(deck)}
            >
              <i className="fa fa-trash"></i>
            </button>
            
          </div>
        </div>
      </div>
      <h2 className="mt-3">Cards</h2>

    <ViewCard deleteCard={handleDelete} deck={deck} />

    </div>
  );
}


export default ViewDeck;
