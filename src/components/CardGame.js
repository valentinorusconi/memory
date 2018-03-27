import React, { Component } from "react";
import Card from "./Card";
import "./CardGame.css";
import Navbar from "./Navbar";

const CardState = {
  HIDING: 0,
  SHOWING: 1,
  MATCHING: 2
};

class CardGame extends Component {
  constructor(props) {
    super(props);

    let cards = [
      { id: 0, cardState: CardState.HIDING, backgroundColor: "red" },
      { id: 1, cardState: CardState.HIDING, backgroundColor: "red" },
      { id: 2, cardState: CardState.HIDING, backgroundColor: "navy" },
      { id: 3, cardState: CardState.HIDING, backgroundColor: "navy" },
      { id: 4, cardState: CardState.HIDING, backgroundColor: "green" },
      { id: 5, cardState: CardState.HIDING, backgroundColor: "green" },
      { id: 6, cardState: CardState.HIDING, backgroundColor: "orange" },
      { id: 7, cardState: CardState.HIDING, backgroundColor: "orange" },
      { id: 8, cardState: CardState.HIDING, backgroundColor: "grey" },
      { id: 9, cardState: CardState.HIDING, backgroundColor: "grey" },
      { id: 10, cardState: CardState.HIDING, backgroundColor: "pink" },
      { id: 11, cardState: CardState.HIDING, backgroundColor: "pink" }
    ];
    cards = this.shuffleCards(cards);
    this.state = { cards, noClick: false };
    this.shuffleCards = this.shuffleCards.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleNewGame = this.handleNewGame.bind(this);
  }

  handleNewGame() {
    let cards = this.state.cards.map(c => ({
      ...c,
      cardState: CardState.HIDING
    }));
    cards = this.shuffleCards(cards);
    this.setState({ cards });
  }

  handleClick(id) {
    const mapCardState = (cards, idsToChange, newCardState) => {
      return cards.map(c => {
        if (idsToChange.includes(c.id)) {
          return {
            ...c,
            cardState: newCardState
          };
        }
        return c;
      });
    };

    const foundCard = this.state.cards.find(c => c.id === id);
    if (this.state.noClick || foundCard.cardState !== CardState.HIDING) {
      return;
    }

    let noClick = false;

    let cards = mapCardState(this.state.cards, [id], CardState.SHOWING);

    const showingCards = cards.filter(c => c.cardState === CardState.SHOWING);

    const ids = showingCards.map(c => c.id);

    if (
      showingCards.length === 2 &&
      showingCards[0].backgroundColor === showingCards[1].backgroundColor
    ) {
      cards = mapCardState(cards, ids, CardState.MATCHING);
    } else if (showingCards.length === 2) {
      let hidingCards = mapCardState(cards, ids, CardState.HIDING);

      noClick = true;
      this.setState({ cards, noClick }, () => {
        setTimeout(() => {
          this.setState({ cards: hidingCards, noClick: false });
        }, 1300);
      });
      return;
    }
    this.setState({ cards, noClick });
  }

  shuffleCards(array) {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

  render() {
    let cards = (
      <div className="game-board">
        {this.state.cards.map(card => (
          <Card
            key={card.id}
            showing={card.cardState !== CardState.HIDING}
            backgroundColor={card.backgroundColor}
            onClick={() => this.handleClick(card.id)}
          />
        ))}
      </div>
    );
    return (
      <div className="main">
        <Navbar onNewGame={this.handleNewGame} />
        {cards}
      </div>
    );
  }
}

export default CardGame;
