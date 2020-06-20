import React from 'react';
import classes from './Card.module.css'

const context = require.context('../../../assets/images')

const Card = props => {

    const clickBinder = e => props.clicked(props.type)
    // const css = `url('../../../assets/images/${props.type}.png')`
    const img = context(`./${props.type}.png`)

    return (
        <div onClick={clickBinder} className={classes.Card}>
            <img src={img} alt={props.type} />

        </div>
    );
}

export default Card;
