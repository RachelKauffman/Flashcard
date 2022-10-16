import {React, useState, useEffect} from "react"
import {Link, useHistory, useParams} from "react-router-dom"
import {readDeck} from "../utils/api"

function Study({cards}){

const initialState = {
    flipped: false,
    currentIndex: 0
}
const {deckId} = useParams();
const [studyDeck, setStudyDeck] = useState(initialState)
const history = useHistory();
const {deck, currentIndex} = studyDeck

//get deck data
useEffect(() => {
    const abortController = new AbortController();
    async function loadDecks() {
        const response = await readDeck (deckId, abortController.signal)
        setStudyDeck(response)
    }
    loadDecks();
    return () => abortController.abort()
    },[deckId])

const handleFlip = () => {
    if(studyDeck.flipped) {
        setStudyDeck({
            ...studyDeck,
            flipped: false
        })
    } else {
        setStudyDeck({
            ...studyDeck,
            flipped: true
        })
    }
}

const handleNext = () => {
    if (studyDeck.currentIndex < cards.length - 1){
        setStudyDeck({
            ...studyDeck,
            currentIndex: studyDeck.currentIndex + 1,
            flipped: false
        })
    } else {
        const prompt = window.confirm("Restart cards? Click 'cancel' to return to home page")
        if (prompt) {
            setStudyDeck(initialState)
        } else {
            history.push("/")
        }
    }
}
     


const nav = (
    <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
            <li className="breadcrumb-item">
                <Link to="/">
                    Home
                </Link>
            </li>
            <li className="breadcrumb-item">
                <Link to={`/decks/${deckId}`}>
                    {studyDeck.name}
                </Link>
            </li>
            <li classname="breadcrumb-item active" aria-current="page">
                Study
            </li>
        </ol>
    </nav>
)

 if (studyDeck.cards.length <= 2) {
        return(
        <>
        <div>
            {nav}
        </div>
        <div className="card">
          <div className="card-body">
            <h1>{studyDeck.name}: Study</h1>
            <h2 className="card-title">Not enough cards.</h2>
            <p className="card-text">
                You need at least 3 cards to study. 
            </p>
            <Link to={`decks/${deckId}/cards/new`}>
                <button className="btn btn-secondary" onClick={() => history.push(`decks/${deckId}/cards/new`)}>
                    <i className="fa fa-plus"></i>Add Cards</button>
            </Link>
          </div>
        </div>
        </>
        )
    } else {
        return(
            <>
            <div>
                {nav}
            </div>
            <h1>{studyDeck.name}: Study</h1>
            <div className="card">
                <div className="card-body">
                    <h4 className="card-title">Card {studyDeck.currentIndex + 1} of {deck.cards.length}</h4>
                    <p className="card-text">
                        {studyDeck.flipped ? `${studyDeck.cards[currentIndex].front}` : `${deck.cards[currentIndex].back}`}
                    </p>
           </div>
           <button className="btn btn-secondary" onClick={handleFlip}>Flip</button>
           <button className="btn btn-primary" onClick={handleNext}>Next</button>
           </div>
         </>
        )
    }
}


export default Study