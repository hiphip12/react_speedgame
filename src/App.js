import React, { Component } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Circle from './Circle';
import Modal from './Modal';

class App extends Component {
  state = {
    showModal: false,
    gameRun: false,
    highlightedCircle: "",
    circles: [1, 2, 3, 4],
    // indexednumber: 0
    scorecount: 0,
    rounds: 0,
    targetCircle: "",
    lastCircle: "",
    highlighted: false,
    RndTime: ""
  }

  // circleTrack = () => {
  //   this.state.circles.forEach((circle) => {
  //     circle.addEventListener('click', clickCircle)
  //   });
  // circles.map((circle, indexednumber) => {

  // })
  // }


  // clickCircle = (event) => {
  //   const clickedCircle = event.target.closest('.circle')
  //   if (clickedCircle.id !== targetCircle) {
  //     reset()
  //   }
  // }


  highlighted = () => {
    this.state.circles.forEach(circle => circle.classList.remove('highlightedBtn'))

    const pickedCircle = this.state.circles[Math.floor(Math.random() * this.state.circles.length)]
    pickedCircle.classList.add('highlightedBtn')

    this.setState({
      targetCircle: pickedCircle.id
    })

    this.setState({
      highlightedIndex: Array.from(this.state.circles).indexOf(pickedCircle)
    })

    const newCircle = pickedCircle
    if (newCircle === this.state.lastCircle) {
      return this.highlighted()
    }

    this.setState({
      lastCircle: newCircle
    })

    return newCircle
  }

  clickHandler = () => {
    this.setState({ scorecount: this.state.scorecount + 1 });
  }

  // shownCircle = () => {
  //   this.setState(({ circles }) => ({
  //     circles: [
  //       ...circles.slice(0, 1),
  //       {
  //         ...circles[1],
  //         prickedCircle: 'random..'
  //       },
  //       ...circles.slice(2)
  //     ]
  //   }));
  // }


  gameRun = () => {
    // if (this.state.rounds >= 10) {
    //   return this.stop()
    // }

    this.setState({
      highlighted: true
    });


    // circleTrack()
    // result()

    this.setState({
      RndTime: setTimeout(this.gameRun, this.state.pace)
    })

    // startButton.classList.add('offButton')
    // startButton.textContent = "Stop the game"
    // startButton.removeEventListener('click', startGame)
    // startButton.addEventListener('click', stop)

    this.setState(
      {
        pace: -50,
        rounds: +1
      }
    )


  }


  modalHandler = (e) => {
    e.preventDefault()
    this.setState({
      showModal: !this.state.showModal
    })
  };

  start = () => {
    this.setState({
      gameRun: true
    });
  }

  stop = () => {
    this.setState({
      gameRun: !this.state.gameRun, showModal: !this.state.showModal
    });

  }


  reset = () => {
    // this.setState({
    //   showModal: !this.state.showModal
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
          {this.state.circles.map((circle, indexednumber) => (<Circle
            key={circle} indexednumber={this.state.circles}> {circle.indexednumber} {indexednumber} <span></span></Circle>))}

          {/* {this.state.circles.map((circle, indexednumber) => <Circle key={circle}>{circle} {indexednumber}</Circle>)} */}

        </div>



        <div className='buttons_wrapper'>
          <button name="start" onClick={this.start}> Start </button>
          <button name="stop" onClick={this.stop} > Stop </button>
          {this.state.showModal && <Modal reset={this.reset}
            scorecount={this.state.scorecount} />}
        </div>
      </div>

    );
  }
}

export default App;




// function App() {
//   return (
//     <div className="App">
//       <header>
//         Speedgame
//       </header>
//     </div>
//   );
// }

// export default App;
