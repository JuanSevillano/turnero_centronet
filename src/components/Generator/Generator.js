<<<<<<< HEAD
import React, { useEffect } from 'react'
=======
import React from 'react'
>>>>>>> 7c44cbce0d38351fda9f3ad2f5aed1781432bae5
import { useHistory } from 'react-router-dom'
import classes from './Generator.module.css'

const Generator = props => {
    const history = useHistory()
<<<<<<< HEAD

    let number = props.turn + 1
    useEffect(() => {
        setTimeout(() => history.goBack(), 2000)
    }, [props.turn]);

=======
    setTimeout(() => history.goBack(), 2000)
    const number = props.turn + 1;
>>>>>>> 7c44cbce0d38351fda9f3ad2f5aed1781432bae5
    return (
        <div className={classes.Generator}>
            <h1 className={classes.Number}>{number}</h1>
            <div className={classes.lds_dual_ring}></div>
        </div>
    )
}

export default Generator
