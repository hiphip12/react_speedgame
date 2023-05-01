import React, { Component } from 'react';
// import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Circle from './Components/Circle';

import GameOver from './Components/GameOver';

const getRndInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

class App extends Component {
  state = {
    showGameOver: false,
    gameRun: false,
    highlightedCircle: 0,
    circles: [1, 2, 3, 4],
    scorecount: 0,
    rounds: 1,
    pace: 1000,
  };

  timer;


  clickHandler = (i) => {
    if (this.state.highlightedCircle !== i) {
      return this.stop();
    }

    this.setState({
      scorecount: this.state.scorecount + 10
    });
  };

  highlighted = () => {

    let targetCircle;

    do {
      targetCircle = getRndInteger(1, this.state.circles.length);
    } while (targetCircle === this.state.highlightedCircle)

    this.setState({
      highlightedCircle: targetCircle,
      pace: this.state.pace,
      rounds: this.state.rounds + 1
    })

    this.timer = setTimeout(this.highlighted, this.state.pace)

    if (this.state.rounds > 5) {
      return this.stop();
    }

  }


  start = () => {
    this.setState({
      gameRun: !this.state.gameRun
    })
    this.highlighted();
  }

  stop = () => {
    clearTimeout(this.timer)
    this.setState({
      showGameOver: !this.state.showGameOver
    });

  }

  reset = () => {
    // this.setState({
    //   gameRun: false
    // })
    window.location.reload(false);
  }

  render() {
    return (
      <div className='gamepane'>
        <h1>
          React Speedgame
        </h1>

        <h3>Your Score is: <span>{this.state.scorecount}</span></h3>
        <div className='circles_group'>
          {this.state.circles.map(circle => <Circle
            key={circle}
            selected={() => this.clickHandler(circle)}
            active={this.state.highlightedCircle === circle}
          />)}

        </div>


        {this.state.showGameOver && (<GameOver reset={this.reset}
          scorecount={this.state.scorecount} />)}

        <div className='buttons_wrapper'>
          {this.state.gameRun ? (<button name="stop" onClick={this.stop} > Stop </button>
          ) : (<button name="start" onClick={this.start}> Start </button>)}
        </div>
      </div>

    );
  }
}

export default App;
