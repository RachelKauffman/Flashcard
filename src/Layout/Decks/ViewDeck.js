import {React, useEffect, useState} from "react"
import {Link, useHistory, useParams, Route} from "react-router-dom"
import { deleteDeck, readDeck } from "../../utils/api"
import ViewCard from "../Cards/ViewCard"


function ViewDeck() {
const {deckId} = useParams()
const history = useHistory()
const [deck,setDeck] = useState({})

//get deck from api
useEffect(() => {
    const abortController = AbortController()
    async function loadDeck() {
        const response = await readDeck (deckId, abortController.signal)
        setDeck(response)
    }
    loadDeck()
    return () => abortController.abort()
}, [deckId]) //renders when id changes


const handleDelete = async (deckId) => {
    const prompt = window.confirm("Delete this deck? You will not be able to recover it.")
    if (prompt) {
        await deleteDeck(deckId)
        history.push("/")
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
                <i class="fa fa-pencil-square-o"></i>Edit
            </button>
        </Link>
        <Link to={`/decks/${deckId}/study`}>
            <button className="btn btn-primary">
                <i class="fa fa-book"></i>Study
            </button>
        </Link>
        <Link to={`/decks/${deckId}/cards/new`}>
            <button className="btn btn-primary">
                <i class="fa fa-plus"></i> Add Cards
            </button>
        </Link>
        </div>
        <div>
            <button className="btn btn-danger" onClick={handleDelete}>
                <i class="fa fa-trash"></i>
            </button>
        </div>
        <h2>Cards</h2>
        <Route>
            <ViewCard />
        </Route>
    
</>
)

}




export default ViewDeck;