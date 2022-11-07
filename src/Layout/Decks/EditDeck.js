import { React, useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readDeck, updateDeck } from "../../utils/api/index";

function EditDeck() {
  const { deckId } = useParams();
  const history = useHistory();
  const initialState = {
    name: "",
    description: "",
  };

  const [deck, setDeck] = useState(initialState);

  useEffect(() => {
    const abortController = new AbortController();
    async function loadDeck() {
      try {
        const response = await readDeck(deckId, abortController.signal);
        setDeck(response);
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
  }, [deckId]); //renders each time deckId changes

  const changeHandler = ({ target }) => {
    setDeck((currentState) => ({
      ...currentState,
      [target.name]: target.value,
    }));
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    await updateDeck(deck);
    setDeck({ ...initialState });
    history.push(`/decks/${deck.id}`);
  };

  return (
    <>
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
            Edit Deck
          </li>
        </ol>
      </nav>
      <div>
        <h1>Edit Deck</h1>
        <form onSubmit={submitHandler}>
          <div>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              className="form-control form-control-md"
              placeholder={deck.name}
              onChange={changeHandler}
              value={deck.name}
            />
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <textarea
              type="textarea"
              name="description"
              id="description"
              className="form-control mb-2"
              rows="5"
              onChange={changeHandler}
              value={deck.description}
            />
          </div>
          <div>
            <Link to={`/decks/${deckId}`}>
              <button className="btn btn-secondary mr-2">Cancel</button>
            </Link>
            <button className="btn btn-primary">Submit</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default EditDeck;
