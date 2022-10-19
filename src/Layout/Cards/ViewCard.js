import { React } from "react";
import { Link } from "react-router-dom";

function ViewCard({ cards, handleDelete, deck }) {

return(
  cards.map((card) => {
    return(
    <div className="card">
    <h2 className=" card-title text-center">Cards</h2>
        <div className="card-body">
          <div className="row d-flec justify-content-between">
          <div className="col-5">{card.front}</div>
          <div className="col-5">{card.back}</div>
      <div>
        <Link to={`/decks/${deck.id}/cards/${card.id}/edit`} className="btn btn-secondary">
            <i className="fa fa-pen"></i>Edit
        </Link>
        <button className="btn btn-danger" onClick={() => handleDelete(card.id)}>
          <i className="fa fa-trash"></i>Delete Card
        </button>
      </div>
      </div>
      </div>
      </div>
  )}
  ))
    }

export default ViewCard;
