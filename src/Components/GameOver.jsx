import React from 'react';

const GameOver = (props) => {
    return (
        <div className='modal'>
            <div className='modal_box'>
                <h2> Game Over</h2>
                <p>your score is: <span >{props.scorecount}</span></p>
                <button name='close' onClick={props.reset}> Close</button>
            </div>
        </div>
    );
}

export default GameOver;