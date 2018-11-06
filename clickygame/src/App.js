import React, { Component } from "react";
import GamepieceCard from "./components/GamepieceCard"; 
import Nav from "./components/Nav";
import Wrapper from "./components/Wrapper";
import Title from "./components/Title";
import Container from "./Container";
import Row from "./Row";
import Column from "./Column";
import gamepieces from "./gamepieces.json";
import "./App.css";

// Random shuffle
function randomPieces(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

class App extends Component {
  // this.state
  state = {
    gamepieces,
    currentScore: 0,
    topScore: 0,
    guessresult: "",
    clicked: [],
  };

  handleClick = id => {
    if (this.state.clicked.indexOf(id) === -1) {
      this.handleIncrement();
      this.setState({ clicked: this.state.clicked.concat(id) });
    } else {
      this.handleReset();
    }
  };

  handleIncrement = () => {
    const newScore = this.state.currentScore + 1;
    this.setState({
      currentScore: newScore,
      guessresult: "Nice Work!"
    });

    if (newScore >= this.state.topScore) {
      this.setState({ topScore: newScore });
    }
    else if (newScore === 12) {
      this.setState({ guessresult: "You win!" });
    }
    this.handleShuffle();
  };

  handleReset = () => {
    this.setState({
      currentScore: 0,
      topScore: this.state.topScore,
      guessresult: "Sorry, Try again!",
      clicked: []
    });
    this.handleShuffle();
  };

  handleShuffle = () => {
    let shuffledPieces = randomPieces(gamepieces);
    this.setState({ 
      gamepieces: shuffledPieces 
    });
  };

  render() {
    return (
      <Wrapper>
        <Nav
          title="React Clicky Game"
          score={this.state.currentScore}
          topScore={this.state.topScore}
          guessresult={this.state.guessresult}
        />

      <Title>
          Click on an image to earn points, but don't click on the same one more than once!
      </Title>
        <Container>
          <Row>
            {this.state.gamepieces.map(gamepieces => (
              <Column size="md-3 sm-6">
                <GamepieceCard
                  key={gamepieces.id}
                  handleClick={this.handleClick}
                  handleIncrement={this.handleIncrement}
                  handleReset={this.handleReset}
                  handleShuffle={this.handleShuffle}
                  id={gamepieces.id}
                  image={gamepieces.image}
                />
              </Column>
            ))}
          </Row>
        </Container>
      </Wrapper>
    );
  }
}
export default App;

