import ListDecks from "./Decks/ListDecks";
import React, { useState, useEffect, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { deleteDeck, listDecks } from '../utils/api/index';


function Home() {
    const mountedRef = useRef(false);
    const [decks, setDecks] = useState([]);
    const history = useHistory();
  
    useEffect(() => {
      mountedRef.current = true;
      return () => {
        mountedRef.current = false;
      };
    }, []);
  
    useEffect(() => {
      const abortController = new AbortController();
      async function loadDecks() {
        try {
          const decks = await listDecks();
          if (mountedRef.current) {
            setDecks((_) => [...decks]);
          }
        } catch (error) {
          if (error.name !== 'AbortError') {
            throw error;
          }
        }
      }
      loadDecks();
  
      return () => abortController.abort();
    }, []);
  
    const deleteHandler = async (deckId) => {
      const confirmation = window.confirm(
        'Delete this deck? You will not be able to recover it.'
      );
      if (confirmation) {
        await deleteDeck(deckId);
        history.go(0);
      }
    };
  

  return (
    <div>
      <div>
        <Link to="/decks/new">
          <button className="btn btn-secondary mb-2">
            <i className="fa fa-plus"></i> Create Deck
          </button>
        </Link>
      </div>
      <div>
      <ListDecks decks={decks} deleteHandler={deleteHandler} /> 
    </div>
    </div>
  );
}

export default Home;
