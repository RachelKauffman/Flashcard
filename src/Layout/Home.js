import { React, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ListDecks from "./Decks/ListDecks";
import { deleteDeck, listDecks } from "../utils/api";

function Home() {
  const [decks, setDecks] = useState([]);
  const { deckId } = useParams();

  useEffect(() => {
    const abortController = new AbortController();
    async function loadDecks() {
      try {
        const response = await listDecks(abortController.signal);
        setDecks(response);
      } catch (error) {
        console.log(`Test ${error}`);
      }
    }
    loadDecks();
    return () => abortController.abort();
  }, []);

  console.log(decks)

  const deleteHandler = async () => {
    const prompt = window.confirm(
      "Delete this deck? You will not be able to recover it."
    );
    if (prompt) {
      await deleteDeck(deckId);
    }
  };

  return (
    <div key={decks}>
      <div>
        <Link to="/decks/new">
          <button className="btn btn-secondary">
            <i className="fa fa-plus"></i> Create Deck
          </button>
        </Link>
      </div>
      { <ListDecks key={decks} decks={decks} deleteHandler={deleteHandler} /> }
    </div>
  );
}

export default Home;
