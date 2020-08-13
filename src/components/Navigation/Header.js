import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import settings from '../../assets/ajustes.svg'
import classes from './Header.module.css'

const remote = window.remoten
const Header = props => {

    const history = useHistory()
    const backHandler = event => history.push('/admin')
    const settingsHandler = event => history.push('/settings')

    const isTurner = history.location.pathname.includes('turner')
    const isVisible = props.unvisible ? '0' : '1'

    const minimize = () => remote.getCurrentWindow().minimize()
    const quit = () => remote.app.quit()



    useEffect(() => {
        if (!isTurner) {
            document.getElementById('minimize-button').addEventListener('click', minimize)
            document.getElementById('close-button').addEventListener('click', quit)
        }
        return () => {
            document.getElementById('minimize-button').removeEventListener('click', minimize)
            document.getElementById('close-button').removeEventListener('clicks', quit)
        };
    }, []);


    return (
        <header style={{ opacity: isVisible }} className={classes.App_header}>
            {isTurner ? null : <span onClick={backHandler} className={classes.Back}> </span>}

            <span className={classes.Dragger}>  </span>
            {isTurner ? null : <section id="window_corner_buttons" className={classes.window_corner_buttons}>
                <span onClick={settingsHandler} className={classes.Ajustes}>
                    <img src={settings} alt="settings" />
                </span>
                <span id="minimize-button">-</span>
                <span id="close-button">x</span>
            </section>}
        </header>
    )
}

export default Header
