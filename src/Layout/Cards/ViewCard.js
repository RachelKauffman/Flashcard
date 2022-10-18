import { React } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { deleteCard } from "../../utils/api";

function ViewCard({ deck }) {
  const history = useHistory();
  const { deckId, cardId } = useParams();

  //delete card
  const deleteHandler = async () => {
    const prompt = window.confirm(
      "Delete this card? You will not be able to recover it"
    );
    if (prompt) {
      await deleteCard(cardId);
      history.push("/");
    }
  };
  const listCards = deck.cards.map((card, index) => (
    <>
      <div key={index} className="card">
        <div className="card-body">
          <div>{card.front}</div>
          <div>{card.back}</div>
      <div>
        <Link to={`/decks/${deckId}/cards/${card.id}/edit`}>
          <button className="btn btn-secondary">
            <i className="fa fa-pencil-square-o"></i>Edit
          </button>
        </Link>
        <button className="btn btn-danger" onClick={() => deleteHandler(card.id)}>
          <i className="fa fa-trash"></i>Delete Card
        </button>
      </div>
      </div>
      </div>
    </>
  ));
  return (
    <div>
    <h2 className="texxt-center">Cards</h2>
    { listCards };
    </div>
  )
}

export default ViewCard;
