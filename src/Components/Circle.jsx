import React from 'react';

const Circle = (props) => {
    return (

        <div
            className={props.current ? 'circle active' : 'circle'}
            onClick={props.selected}
            style={{ pointerEvents: props.active ? 'all' : 'none' }}>
        </div>

    )
}

export default Circle;