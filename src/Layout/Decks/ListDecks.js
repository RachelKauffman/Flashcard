import { React } from "react";
import { Link } from "react-router-dom";

function ListDecks({ decks, deleteHandler }) {
  return (
 <div key={decks}>
    {decks.map((deck) => (
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
              <button className="btn btn-danger float-right" onClick={deleteHandler}>
                <i className="fa fa-trash"></i>
              </button>
              </div>
              </div>
    )    
    )}
    </div>
  )}
    
  


export default ListDecks;
