import React from 'react';
import classes from './Home.module.css'

import Header from '../../components/Navigation/Header'

const ipcRenderer = window.ipcRenderer

const Home = props => {

    const initHandler = e => props.history.push("/admin")

    // When is secondScreen it receives the url to be loaded 
    ipcRenderer.on('onLocation', (event, { url }) => { props.history.push(url) })

    return (
        <div onClick={initHandler} className={classes.Home}>
            <Header unvisible />
            <h1> Iniciar <br /> Turnero</h1>
            <div className={classes.ldsripple}><div></div><div></div></div>
        </div>
    )
}

export default Home
