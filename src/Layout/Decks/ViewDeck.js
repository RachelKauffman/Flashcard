import {React, useEffect, useState} from "react"
import {Link, useHistory, useParams, Route} from "react-router-dom"
import { deleteDeck, readDeck } from "../../utils/api"
import ViewCard from "../Cards/ViewCard"


function ViewDeck() {
const {deckId, cards} = useParams()
const history = useHistory()
const [deck,setDeck] = useState([])

//get deck from api
useEffect(() => {
    const abortController = new AbortController()
    async function loadDeck() {
        const response = await readDeck (deckId, abortController.signal)
        setDeck(response)
    }
    loadDeck()
    return () => abortController.abort()
}, [deckId]) //renders when id changes


const handleDelete = async () => {
    const prompt = window.confirm("Delete this deck? You will not be able to recover it.")
    if (prompt) {
        await deleteDeck(deckId)
        history.go(0)
    }
}

return (
    <>
    <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
            <li className = "breadcrumb-item">
                <Link to="/">
                    Home
                </Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
                {deck.name}
            </li>
        </ol>
    </nav>
    <h3>{deck.name}</h3>
    <p>{deck.description}</p>
    <div>
        <Link to={`/decks/${deckId}/edit`}>
            <button className="btn btn-secondary">
                <i className="fa fa-pencil-square-o"></i>Edit
            </button>
        </Link>
        <Link to={`/decks/${deckId}/study`}>
            <button className="btn btn-primary">
                <i className="fa fa-book"></i>Study
            </button>
        </Link>
        <Link to={`/decks/${deckId}/cards/new`}>
            <button className="btn btn-primary">
                <i className="fa fa-plus"></i> Add Cards
            </button>
        </Link>
        </div>
        <div>
            <button className="btn btn-danger" onClick={handleDelete}>
                <i className="fa fa-trash"></i>
            </button>
        </div>
        <h2>Cards</h2>
        <Route>
            <ViewCard deck={deck}/>
        </Route>
    
</>
)

}




export default ViewDeck;