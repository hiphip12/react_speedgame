import React, { Component } from 'react';
// import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Circle from './Components/Circle';

import GameOver from './Components/GameOver';
import song from './carnivalrides.ogg';

const getRndInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// let audio = new Audio(song);

class App extends Component {
  state = {
    showGameOver: false,
    gameRun: false,
    highlightedCircle: 0,
    circles: [1, 2, 3, 4],
    scorecount: 0,
    rounds: 0,
    pace: 1000,
    gameOverText: "",
    audio: new Audio(song),
    isPlaying: false
  };

  timer;
  // isPlaying = false;

  // componentDidMount() {
  //   this.state.audio.play();
  //   this.setState({ isPlaying: true });
  // }

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
      pace: this.state.pace * 0.95,
      rounds: this.state.rounds + 1
    })

    this.timer = setTimeout(this.highlighted, this.state.pace)

    if (this.state.rounds >= 5) {
      return this.stop();
    }

  }


  start = () => {
    // this.state.startSound.play();
    this.setState({
      gameRun: !this.state.gameRun
    });
    this.highlighted();
  }

  stop = () => {
    clearTimeout(this.timer)
    this.setState({
      showGameOver: !this.state.showGameOver
    });
    this.feedback(this.state.scorecount);
  }

  reset = () => {
    // this.setState({
    //   gameRun: false
    // })
    window.location.reload(false);
  }

  feedback = () => {
    if (this.state.scorecount < 20) {
      this.setState({
        gameOverText: 'Your score is low, better luck next time!'
      })
    }
    else if (this.state.scorecount < 40) {
      this.setState({
        gameOverText: 'Not so bad, you can still improve!'
      })
    }
    else {
      this.setState({
        gameOverText: 'Excellent! You did great!'
      })
    }
  }

  playPause = () => {

    // Get state of song
    let isPlaying = this.state.isPlaying;

    if (isPlaying) {
      // Pause the song if it is playing
      this.state.audio.pause();
    } else {

      // Play the song if it is paused
      this.state.audio.play();
    }

    // Change the state of song
    this.setState({ isPlaying: !isPlaying });
  };

  render() {
    return (
      <div className='gamepane'>
        <div className='musicPlayer_wrapper'>
          <div className='musicPlayer'>
            {this.state.isPlaying ? (<button name="pause" onClick={this.playPause} > Pause Music </button>
            ) : (<button name="play" onClick={this.playPause}> Play Music</button>)}
          </div>
        </div>
        <h1>
          SPEEDGAME 2.0
        </h1>

        <h3>Your Score is: <span>{this.state.scorecount}</span></h3>
        <div className='circles_group'>
          {this.state.circles.map(circle => <Circle
            key={circle}
            selected={() => this.clickHandler(circle)}
            current={this.state.highlightedCircle === circle}
            active={this.state.gameRun}
          />)}

        </div>


        {this.state.showGameOver && (<GameOver reset={this.reset}
          scorecount={this.state.scorecount} gameOverText={this.state.gameOverText} />)}

        <div className='buttons_wrapper'>
          {this.state.gameRun ? (<button name="stop" onClick={this.stop} > Stop </button>
          ) : (<button name="start" onClick={this.start}> Start </button>)}
        </div>
        {/* <audio src="./carnivalrides.ogg" autoPlay loop /> */}


      </div>

    );
  }
}

export default App;
