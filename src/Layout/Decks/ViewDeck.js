import { React, useEffect, useState } from "react";
import { Link, useHistory, useParams, Route } from "react-router-dom";
import { deleteDeck, readDeck} from "../../utils/api";
import ViewCard from "../Cards/ViewCard";

function ViewDeck() {

  const { deckId } = useParams();
  const history = useHistory();
  const [deck, setDeck] = useState({name:'loading...', cards:[]});

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
  
  return (
    
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/"><i className="fas fa-home"></i>Home</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {deck.name}
          </li>
        </ol>
      </nav>
        <div>
          <h4>{deck.name}</h4>
        </div>
        <div>
          <p>{deck.description}</p>
          <div>
            <Link to={`/decks/${deck.id}/edit`} className="btn btn-secondary mr-2">
                <i className="fa fa-pen"></i> Edit
            </Link>
            <Link to={`/decks/${deck.id}/study`} className="btn btn-primary mr-2">
                <i className="fa fa-book"></i> Study
            </Link>
            <Link to={`/decks/${deck.id}/cards/new`} className="btn btn-primary">
                <i className="fa fa-plus"></i> Add Cards
            </Link>
            <button
              className="btn btn-danger float-right"
              onClick={() => handleDelete(deckId)}
            >
              <i className="fa fa-trash"></i>
            </button>
        </div>
      </div>
      <Route>
    <ViewCard cards={deck.cards} />
    </Route>
    </div>
  );
}


export default ViewDeck;
