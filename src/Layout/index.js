import {React, useEffect, useState} from "react";
import {Route,  Switch} from "react-router-dom"
import Header from "./Header";
import NotFound from "./NotFound";
import Study from "./Study";
import CreateDeck from "./Decks/CreateDeck";
import ViewDeck from "./Decks/ViewDeck";
import EditDeck from "./Decks/EditDeck"
import AddCard from "./Cards/AddCard";
import EditCard from "./Cards/EditCard";
import Home from "./Home";
import { listDecks } from "../utils/api/index";


function Layout() {

  const [decks, setDecks] = useState([]);

  //get decks
  useEffect(() => {
    const abortController = new AbortController()
    async function loadDecks() {
      const response = await listDecks (abortController.signal)
      setDecks(response)
    }
    loadDecks()
    return () => abortController.abort()
  },[])


  return (
    <div>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/">
            <Home decks={decks}/>
          </Route>

          <Route exact path="/decks/:deckId/study">
            <Study />
          </Route>

          <Route exact path="/decks/new">
            <CreateDeck />
          </Route>

          <Route exact path="/decks/:deckId">
            <ViewDeck />
          </Route>

          <Route exact path="/decks/:deckId/edit">
            <EditDeck />
          </Route>

          <Route exact path="/decks/:deckId/cards/new">
            <AddCard />
          </Route>

          <Route exact path="/decks/:deckId/cards/:cardId/edit">
            <EditCard />
          </Route>

          <Route>
            <NotFound />
          </Route>
        </Switch>

     
      </div>
    </div>
  );
}

export default Layout;
