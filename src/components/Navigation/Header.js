import React from 'react';
import { useHistory } from 'react-router-dom'

import classes from './Header.module.css'


const Header = props => {

    const history = useHistory()
    const backHandler = event => history.push('/admin')

    const isTurner = history.location.pathname.includes('turner')
    const isVisible = props.unvisible ? '0' : '1'

    return (
        <header style={{ opacity: isVisible }} className={classes.App_header}>
            {isTurner ? null : <span onClick={backHandler} className={classes.Back}> </span>}
            <span className={classes.Dragger}>  </span>
            {isTurner ? null : <section id="window_corner_buttons" className={classes.window_corner_buttons}>
                <span id="minimize-button">-</span>
                <span id="close-button">x</span>
            </section>}
        </header>
    )
}

export default Header
