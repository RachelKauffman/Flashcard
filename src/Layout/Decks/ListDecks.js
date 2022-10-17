import {React, useState, useEffect} from "react";
import {Link, useParams} from "react-router-dom";
import {deleteDeck, listDecks} from "../../utils/api"

function ListDecks() {

const [deck, setDeck] = useState([]);
const{deckId} = useParams();

//gets data from listDecks
useEffect(() => {
const abortController = new AbortController();
async function loadDecks() {
    const response = await listDecks (deckId, abortController.signal)
    setDeck(response)
}
loadDecks();
return () => abortController.abort()
},[deckId])

const deleteHandler = async (deckId) => {
   const prompt = window.confirm("Delete this deck? You will not be able to recover it.")
   if(prompt) {
    await deleteDeck(deckId)
   }
}
    return (
        <div>
     {deck.map((deck) => (
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
    ))}
    </div>
    )
}

export default ListDecks