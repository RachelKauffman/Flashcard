import {React} from "react"
import {Link, useHistory, useParams } from "react-router-dom"
import {deleteCard} from "../../utils/api" 

function ViewCard({cards}) {
const history = useHistory();
const {deckId, cardId} = useParams();

//delete card
const deleteHandler = async (cardId) => {
    const prompt = window.confirm("Delete this card? You will not be able to recover it")
    if (prompt){
        await deleteCard(cardId)
        history.push("/")
    }
}
const listCards = cards.map((card) => (
    <>
    <div className="card">
        <div className="card-body">
            <div>{card.front}</div>
            <div>{card.back}</div>
        </div>
    </div>
<div>
        <Link to={`/decks/${deckId}/cards/${cardId}/edit`}>
            <button className="btn btn-secondary">
                <i class="fa fa-pencil-square-o"></i>Edit
            </button>
        </Link>
        <button className="btn btn-danger" onClick={deleteHandler}>
            <i class="fa fa-trash"></i>
        </button>
    </div>
</>
))
return(
    {listCards}
)
}

export default ViewCard