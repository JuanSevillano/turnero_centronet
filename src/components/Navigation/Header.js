import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom'
<<<<<<< HEAD
import settings from '../../assets/ajustes.svg'
=======

>>>>>>> 7c44cbce0d38351fda9f3ad2f5aed1781432bae5
import classes from './Header.module.css'

const remote = window.remoten
const Header = props => {

    const history = useHistory()
    const backHandler = event => history.push('/admin')
<<<<<<< HEAD
    const settingsHandler = event => history.push('/settings')
=======
>>>>>>> 7c44cbce0d38351fda9f3ad2f5aed1781432bae5

    const isTurner = history.location.pathname.includes('turner')
    const isVisible = props.unvisible ? '0' : '1'

    useEffect(() => {
        if (!isTurner) {
            document.getElementById('minimize-button').addEventListener('click', () => {
                remote.getCurrentWindow().minimize()
            })
            document.getElementById('close-button').addEventListener('click', () => {
                remote.app.quit()
            })
        }
        return () => {
            document.getElementById('minimize-button')
            document.getElementById('close-button')
        };
    }, []);


    return (
        <header style={{ opacity: isVisible }} className={classes.App_header}>
            {isTurner ? null : <span onClick={backHandler} className={classes.Back}> </span>}
<<<<<<< HEAD

            <span className={classes.Dragger}>  </span>
            {isTurner ? null : <section id="window_corner_buttons" className={classes.window_corner_buttons}>
                <span onClick={settingsHandler} className={classes.Ajustes}>
                    <img src={settings} alt="settings" />
                </span>
=======
            <span className={classes.Dragger}>  </span>
            {isTurner ? null : <section id="window_corner_buttons" className={classes.window_corner_buttons}>
>>>>>>> 7c44cbce0d38351fda9f3ad2f5aed1781432bae5
                <span id="minimize-button">-</span>
                <span id="close-button">x</span>
            </section>}
        </header>
    )
}

export default Header
