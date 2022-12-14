import { React } from "react";
import { Route, Switch, Link } from "react-router-dom";
import Header from "./Header";
import NotFound from "./NotFound";
import Study from "./Study";
import CreateDeck from "./Decks/CreateDeck";
import ViewDeck from "./Decks/ViewDeck";
import EditDeck from "./Decks/EditDeck";
import AddCard from "./Cards/AddCard";
import EditCard from "./Cards/EditCard";
import Home from "./Home";

function Layout() {
  return (
    <div>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/">
            <Link to="/decks/new">
              <button className="btn btn-secondary mb-2">
                <i className="fas fa-plus"></i> Create Deck
              </button>
            </Link>
            <Home />
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
