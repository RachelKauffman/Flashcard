import { React, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { createDeck } from "../../utils/api";

function CreateDeck() {
  const initialForm = {
    name: "",
    description: "",
  };
  const [formData, setFormData] = useState(initialForm);
  const history = useHistory();

  //updates form when changed
  const changeHandler = ({ target }) => {
    setFormData((currentData) => ({
      ...currentData,
      [target.name]: target.value,
    }));
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    await createDeck(formData); //calls data from api
    setFormData({ ...initialForm }); //clears form
    history.push("/");
  };

  //form
  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Create Deck
          </li>
        </ol>
      </nav>
      <div>
        <form onSubmit={submitHandler}>
          <h1 className="my-4">Create Deck</h1>
          <div className="form-group">
            <label htmlFor="name">Name</label>

            <input
              type="text"
              name="name"
              id="name"
              className="form-control form-control-md"
              placeholder="Deck Name"
              onChange={changeHandler}
              value={formData.name}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              type="textarea"
              name="description"
              id="description"
              className="form-control"
              rows="5"
              placeholder="Breif description of the deck"
              onChange={changeHandler}
              value={formData.description}
            />
          </div>
          <Link to="/" className="mr-2">
            <button
              className="btn btn-secondary"
              onClick={() => history.push("/")}
            >
              Cancel
            </button>
          </Link>
          <button className="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default CreateDeck;
