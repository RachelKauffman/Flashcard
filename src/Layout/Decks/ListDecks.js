import {React} from "react";
import {Link} from "react-router-dom";


function ListDecks({decks, deleteHandler}) {


    return (
        <div>
     {decks.map((deck) => (
        <div key={deck.id}>
      <div className="card">
        <div className="card-body">
            <h4 className="card-title">{deck.name}</h4>
            <p>{deck.cards.length} cards</p>
        </div>
        <p className="card-text">{deck.description}</p>
        <div>
            <Link to={`/decks/${deck.id}`}>
            <button className="btn btn-secondary">
                <i className="fa fa-eye"></i>View</button>
            </Link>
            <Link to={`/decks/${deck.id}/study`}>
            <button className="btn btn-primary">
                <i className="fa fa-book"></i>Study</button>
            </Link>
            <button className="btn btn-danger" onClick={deleteHandler}>
                <i className="fa fa-trash"></i> </button>
        </div>
       </div>
       </div>
    ))}
    </div>
    )
}

export default ListDecks