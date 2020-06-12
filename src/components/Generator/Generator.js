import React from 'react'
import { useHistory } from 'react-router-dom'
import classes from './Generator.module.css'

const Generator = props => {
    const history = useHistory()
    setTimeout(() => history.goBack(), 2000)
    const number = props.turn + 1;
    return (
        <div className={classes.Generator}>
            <h1 className={classes.Number}>{number}</h1>
            <div className={classes.lds_dual_ring}></div>
        </div>
    )
}

export default Generator
