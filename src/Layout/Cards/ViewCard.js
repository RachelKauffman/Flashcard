import { React } from "react";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import { deleteCard } from "../../utils/api"

function ViewCard({ cards = [] }) {
  const history = useHistory();
  const {url} = useRouteMatch();
   
  //delete card
    const deleteHandler = async (cardId) => {
      const prompt = window.confirm(
        "Delete this card? You will not be able to recover it"
      );
      if (prompt) {
        await deleteCard(cardId);
        history.push("/");
      }
    };

    const cardsList = 
      cards.map((card) => (
            <div className="card" key ={card.id}>
              <div className="card-body">
                <div className="row d-flex justify-content-between">
                  <div className="col-5">{card.front}</div>
                  <div className="col-5">{card.back}</div>
                  <div>
                    <Link
                      to={`${url}/cards/${card.id}/edit`}
                      className="btn btn-secondary m-3 justify-content-right">
                      <i className="fa fa-pen"></i> Edit
                    </Link>
                    <button
                      className="btn btn-danger m-3"
                      onClick={() => deleteHandler(card.id)}>
                      <i className="fa fa-trash"></i> Delete Card
                    </button>
                  </div>
                </div>
              </div>
            </div>
      ));
      return (
        <div>
          <h2 className="m-3">Cards</h2>
          <div className="card">
            <div className="card-title">
            {cardsList}
            </div>
          </div>
        
        </div>
      )
}

export default ViewCard;
