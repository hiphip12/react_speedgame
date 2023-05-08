import React, { Component } from 'react';
import Circle from './Components/Circle';

import GameOver from './Components/GameOver';
import song from './assets/sounds/carnivalrides.ogg';
import start from './assets/sounds/beep.wav';
import spot from './assets/sounds/interface4.wav';
import end from './assets/sounds/retro_sound_1_0.wav';

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
    rounds: 0,
    pace: 1000,
    gameOverText: "",
    startBeep: new Audio(start),
    clickedBeep: new Audio(spot),
    endBeep: new Audio(end),
    musicPlaying: false,
  };

  timer;

  // click handler to match clicks with highlighted and not highlighted circles
  clickHandler = (i) => {
    if (this.state.highlightedCircle === i) {
      if (!this.state.isClicked) {
        this.setState({
          scorecount: this.state.scorecount + 10,
          isClicked: true
        });
        this.state.clickedBeep.play();
      }
    } else {
      this.stop();
    }
  };

  // randomizing the highlighted circle
  highlighted = () => {

    let targetCircle;

    do {
      targetCircle = getRndInteger(1, this.state.circles.length);
    } while (targetCircle === this.state.highlightedCircle)

    this.setState({
      highlightedCircle: targetCircle,
      pace: this.state.pace * 0.95,
      rounds: this.state.rounds + 1,
      isClicked: false
    })

    this.timer = setTimeout(this.highlighted, this.state.pace)

    if (this.state.rounds >= 5) {
      return (
        this.stop(),
        this.state.endBeep.play()
      );
    }

  }

  // start handler, triggered by start button and to enable the highlighted circle to start showing (starting the game)
  start = () => {
    this.state.startBeep.play();
    this.setState({
      gameRun: !this.state.gameRun
    });
    this.highlighted();
  }

  // stop handler, tiggered by the stop button and ending the game display
  stop = () => {
    this.state.endBeep.play();
    clearTimeout(this.timer)
    this.setState({
      showGameOver: !this.state.showGameOver
    });
    this.feedback(this.state.scorecount);
  }

  // enabling reset by getting the game funtionality back to default
  reset = () => {
    this.setState({
      gameRun: !this.state.gameRun,
      showGameOver: !this.state.showGameOver,
      scorecount: 0,
      highlightedCircle: 0,
      pace: 1000,
      rounds: 0,
    })
  }

  // conditional game over messaging depending on how good is the score
  feedback = () => {
    if (this.state.scorecount <= 20) {
      this.setState({
        gameOverText: <div><span>😅</span><br /><p>That's low, better luck next time!</p></div>
      })
    }
    else if (this.state.scorecount <= 40) {
      this.setState({
        gameOverText: <div><span>🤔</span><br /><p>Not so bad, you can still improve!</p></div>
      })
    }
    else {
      this.setState({
        gameOverText: <div><span>😄</span><br /><p>Excellent! You did great!</p></div>
      })
    }
  }

  // capability to enable and disabling background music
  toggleMusicPlaying = () => {
    const { musicPlaying } = this.state;
    this.setState({ musicPlaying: !musicPlaying });
  };

  render() {

    const { musicPlaying } = this.state;
    return (

      <div className='gamepane'>
        <div className='musicPlayer'>
          <button onClick={this.toggleMusicPlaying}>
            {musicPlaying ? '♪ 🔇' : '♪ 🔈'}
          </button>
          {this.state.musicPlaying && <audio src={song} autoPlay loop />
          }
        </div>

        <h1>REACT SPEEDGAME</h1>
        <h2>Catch the goofy face!</h2>
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
      </div>

    );
  }
}

export default App;
