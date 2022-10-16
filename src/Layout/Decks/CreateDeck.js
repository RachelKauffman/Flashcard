import {React, useState} from "react";
import {Link, useHistory, useParams} from "react-router-dom"
import {createDeck} from "../../utils/api"

function CreateDeck() {
    
    const initialForm = {
        "name": "",
        "description": ""
    }
    const [formData, setFormData] = useState(initialForm)
    const history = useHistory()
    const {deckId} = useParams;


    //updates form when changed 
    const changeHandler = ({target}) => {
        setFormData((currentData) => ({
            ...currentData,
            [target.name] : target.value
        }))
    }

    const submitHandler = ( async (event) => {
        event.preventDefault();
        await createDeck(formData);//calls data from api
        setFormData({...initialForm})//clears form
        history.push("/")//returns to home screen

    })

    //form
    return(
        <>
        <nav aria-label='breadcrumb'>
            <ol className='breadcrumb'>
                <li className='breadcrumb-item'>
                    <Link to="/">
                        Home
                    </Link>
                </li>
                <li className='breadcrumb-item active' aria-current='page'>
                    Create Deck
                </li>
            </ol>
        </nav> 
        <div>
            <h1>Create Deck</h1>
            <form onSubmit={submitHandler}>
              <div>
                <label htmlFor="name">Name</label>
                <input type="text" 
                       name="name" 
                       id="name"
                       placeholder="Deck Name"
                       onChange={changeHandler}
                       value={formData.name} />
              </div>
              <div>
                <label htmlFor="description">Description</label>
                <textarea type="textarea"
                       name="description"
                       id="description"
                       placeholder="Breif description of the deck"
                       onChange={changeHandler}
                       value={formData.description} />
              </div>
              <div>
                <button type="submit" onClick={() => history.push("/")}>Cancel</button>
                <button type="submit" onClick={() => history.push(`{/decks/${deckId}}`)}>Submit</button>
              </div>
             </form>
        </div>
        </>
    )
       
    
}









export default CreateDeck