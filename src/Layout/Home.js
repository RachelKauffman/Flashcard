import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { deleteDeck, listDecks } from "../utils/api/index";

function Home() {
  // const mountedRef = useRef(false);
  const [decks, setDecks] = useState([]);
  const history = useHistory();

  /* useEffect(() => {
      mountedRef.current = true;
      return () => {
        mountedRef.current = false;
      };
    }, []);*/

  useEffect(() => {
    const abortController = new AbortController();
    async function loadDecks() {
      try {
        const decks = await listDecks(abortController.signal);
        setDecks(decks);
      } catch (error) {
        console.log(error);
      }
    }
    loadDecks();

    return () => {
      abortController.abort();
    };
  }, []);

  const deleteHandler = async (deckId) => {
    const confirmation = window.confirm(
      "Delete this deck? You will not be able to recover it."
    );
    if (confirmation) {
      await deleteDeck(deckId);
      history.go(0);
    }
  };
  const listAllDecks = decks.map((deck) => (
    <div key={deck.id} className="card w-100">
      <div className="card-body">
        <p className="d-flex float-right">{deck.cards.length} cards</p>
        <h4 className="card-title d-flex text-center">{deck.name}</h4>
        <p className="card-text">{deck.description}</p>
        <Link to={`/decks/${deck.id}`} className="btn btn-secondary mx-1">
          View
        </Link>
        <Link to={`/decks/${deck.id}/study`} className="btn btn-primary">
          Study
        </Link>
        <button
          className="btn btn-danger float-right"
          onClick={() => deleteHandler(deck.id)}
        >
          <i className="fa fa-trash"></i>
        </button>
      </div>
    </div>
  ));

  return decks ? <>{listAllDecks}</> : <p>Loading...</p>;
}

export default Home;
