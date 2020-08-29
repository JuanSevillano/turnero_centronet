import React from 'react';

import { connect } from 'react-redux'
import * as actions from '../../store/actions/actions'

import classes from './Home.module.css'
import Header from '../../components/Navigation/Header'

const ipcRenderer = window.ipcRenderer
const Home = props => {

    const initHandler = e => props.history.push("/admin")

    // When is secondScreen it receives the url to be loaded 
    ipcRenderer.on('onLocation', (event, { url }) => { props.history.push(url) })

    ipcRenderer.on('onDisplaysLoaded', (e, data) => {
        console.log('llegan los datos a home', data)
        props.saveDisplays(data)
    })


    ipcRenderer.on('update', (e, data) => {
        console.log('Update... ', data)
    })

    return (
        <div onClick={initHandler} className={classes.Home}>
            <Header unvisible />
            <h1> Iniciar <br /> Turnero</h1>
            <div className={classes.ldsripple}><div></div><div></div></div>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    saveDisplays: displays => dispatch(actions.saveDisplays(displays))
})

export default connect(null, mapDispatchToProps)(Home)
