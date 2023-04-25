import React, { Component } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Circle from './Circle';
import Modal from './Modal';

class App extends Component {
  state = {
    showModal: false,
    highlightedCircle: "",
    circles: [1, 2, 3, 4],
    // indexednumber: 0
    scorecount: 0,
    rounds: 0,
    targetCircle: "",
    lastCircle: ""
  }

  modalHandler = (e) => {
    e.preventDefault()
    this.setState({
      showModal: !this.state.showModal
    })
  };

  circleTrack = () => {
    // circles.forEach((circle) => {
    //   circle.addEventListener('click', clickCircle)
    // });
    circles.map((circle, indexednumber) => {

    })
  }

  clickCircle = (event) => {
    const clickedCircle = event.target.closest('.circle')
    if (clickedCircle.id !== targetCircle) {
      reset()
    }
  }

  highlighted = () {
    circles.forEach(circle => circle.classList.remove('highlightedBtn'))

    const pickedCircle = circles[Math.floor(Math.random() * circles.length)]
    pickedCircle.classList.add('highlightedBtn')
    targetCircle = pickedCircle.id
    highlightedIndex = Array.from(circles).indexOf(pickedCircle)

    const newCircle = pickedCircle
    if (newCircle === lastCircle) {
      return highlighted()
    }

    lastCircle = newCircle
    return newCircle
  }

  clickHandler = () => {


  }

  shownCircle = () => {
    this.setState(({ circles }) => ({
      circles: [
        ...circles.slice(0, 1),
        {
          ...circles[1],
          prickedCircle: 'random..'
        },
        ...circles.slice(2)
      ]
    }));
  }



  reset = () => {

    // window.location.reload()
    this.setState({
      showModal: !this.state.showModal
    })
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
          <button name="start"> Start </button>
          <button name="stop" onClick={this.modalHandler}> Stop </button>
          {this.state.showModal && <Modal reset={this.reset} />}
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
