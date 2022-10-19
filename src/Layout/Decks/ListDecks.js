import { React } from "react";
import { Link, useHistory } from "react-router-dom";

function ListDecks({ decks, deleteHandler }) {
  const history = useHistory();
  return (/*
    <div>
      {decks.map((deck) => (
            <div className="card w-50">
              <div className="card-body">
                <p className="d-flex float-right">{deck.cards.length} cards</p>
                <h4 className="card-title d-flex text-center">{deck.name}</h4>
                <div>
                  <p className="card-text">{deck.description}</p>
                  <Link to={`/decks/${deck.id}`}>
                    <button
                      className="btn btn-secondary mr-2"
                      onClick={() => history.push(`/decks/${deck.id}`)} >
                      <i className="fa fa-eye"></i> View
                    </button>
                  </Link>
                  <Link to={`/decks/${deck.id}/study`}>
                    <button
                      className="btn btn-primary mr-2"
                      onClick={() => history.push(`/decks/${deck.id}/study`)}>
                      <i className="fa fa-book"></i> Study
                    </button>
                  </Link>
                  <button
                    className="btn btn-danger float-right"
                    onClick={deleteHandler} >
                    <i className="fa fa-trash"></i>
                  </button>
                </div>
              </div>
            </div>

      ))}
    </div>
  );
}*/

    <div>
    {decks.map((deck) => (
          <div className="card w-50">
            <div className="card-body">
              <p className="d-flex float-right">{deck.cards.length} cards</p>
              <h4 className="card-title d-flex text-center">{deck.name}</h4>
              <p className="card-text">{deck.description}</p>
              <Link to={`/decks/${deck.id}`} className="btn btn-secondary mx-1">
                      View
               
                  </Link>
              </div>
              </div>
    )    
    )}
    </div>
  )}
    
  


export default ListDecks;
