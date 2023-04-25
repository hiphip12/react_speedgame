import React from 'react';

const Circle = (props) => {
    return (

        <div className='circle' onClick={props.clickHandler}>
            <p>{props.circles} {props.circle} {props.indexednumber}</p>
        </div>
    )
}

export default Circle;