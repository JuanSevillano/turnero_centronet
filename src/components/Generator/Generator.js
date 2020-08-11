import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import classes from './Generator.module.css'

const Generator = props => {
    const history = useHistory()

    let number = +props.turn + 1
    useEffect(() => {
        setTimeout(() => history.goBack(), 2000)
    }, []);

    return (
        <div className={classes.Generator}>
            <h1 className={classes.Number}>{number}</h1>
            <div className={classes.lds_dual_ring}></div>
        </div>
    )
}

export default Generator
