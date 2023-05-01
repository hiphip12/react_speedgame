import React from 'react';

const Circle = (props) => {
    return (

        <div
            className={props.active ? 'circle active' : 'circle'}
            onClick={props.selected} >
        </div>

    )
}

export default Circle;