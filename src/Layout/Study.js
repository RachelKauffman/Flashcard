import React, { useEffect, useState, useRef } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { readDeck } from '../utils/api';

function Study() {
  const mountedRef = useRef(false);
  const initialState = {
    deck: { name: 'loading...', cards: [] },
    isCardFlipped: false,
    currentIndex: 0,
  };

  const [studyDeckState, setStudyDeckState] = useState(initialState);
  const { deck, isCardFlipped, currentIndex } = studyDeckState;
  const history = useHistory();
  const { deckId } = useParams();

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
          setStudyDeckState((currentState) => ({
            ...currentState,
            deck: loadedDeck,
          }));
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

  function flipCardHandler() {
    setStudyDeckState({
      ...studyDeckState,
      isCardFlipped: !studyDeckState['isCardFlipped'],
    });
  }

  function getNextCardHandler() {
    const { cards } = deck;
    if (studyDeckState.currentIndex < cards.length - 1) {
      setStudyDeckState({
          ...studyDeckState,
          currentIndex: studyDeckState.currentIndex + 1,
          isCardFlipped: false,
      })
    } else {
    const confirm = window.confirm("Restart cards? Click cancel to return to the home page.");
    if(confirm) {
        setStudyDeckState((currentState) => ({
          ...currentState,
          currentIndex: 0
        }));
    } else {
        history.push("/");
    }
}
}

  const breadcrumb = (
    <nav aria-label='breadcrumb'>
      <ol className='breadcrumb'>
        <li className='breadcrumb-item'>
          <Link to='/'>
            <i className='fas fa-home'></i> Home
          </Link>
        </li>
        <li className='breadcrumb-item'>
          <Link to={`/decks/${deckId}`}>{deck.name}</Link>
        </li>
        <li className='breadcrumb-item active' aria-current='page'>
          Study
        </li>
      </ol>
    </nav>
  );

  if (deck.cards.length <= 2) {
    return (
      <>
        {breadcrumb}
        <div className='card'>
          <div className='card-body'>
            <h1>{deck.name}: Study</h1>
            <h2 className='card-title'>Not enough cards.</h2>
            <p className='card-text'>
              You need at least 3 cards to study. Please add more cards to this
              deck.
            </p>
            <Link to={`/decks/${deckId}/cards/new`}>
              <button type='button' className='btn btn-primary'>
                <i className='fas fa-plus'></i> Add Card
              </button>
            </Link>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        {breadcrumb}
        <h1>Study: {deck.name}</h1>
        <div className='card'>
          <div className='card-body'>
            <h4 className='card-title'>
              Card {currentIndex + 1} of {deck.cards.length}
            </h4>
            <h5 className='card-text secondary-text'>
              {!isCardFlipped
                ? `${deck.cards[currentIndex].front}`
                : `${deck.cards[currentIndex].back}`}
            </h5>
          <button
            type='button'
            className='btn btn-secondary'
            onClick={() => flipCardHandler()}
          >
            Flip
          </button>
          {isCardFlipped && (
            <button
              className='btn btn-primary ml-2'
              onClick={getNextCardHandler}
            >
              Next
            </button>
          )}
        </div>
        </div>
      </>
    );
  }
}


export default Study;