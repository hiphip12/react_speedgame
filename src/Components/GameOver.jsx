import React from 'react';

const GameOver = (props) => {
    return (
        <div className='modal'>
            <div className='modal_box'>
                <h2> Game Over</h2>
                <p>Your score is: <span >{props.scorecount}</span></p>
                <p> <span>{props.gameOverText}</span></p>
                <button className='close' onClick={props.reset}> Close</button>
            </div>
        </div>
    );
}

export default GameOver;