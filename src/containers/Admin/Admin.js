import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import classes from './Admin.module.css'
import { useHistory } from 'react-router-dom'

import Header from '../../components/Navigation/Header'
import Card from '../../components/UI/Card/Card'

import * as actionTypes from '../../store/actions/actionTypes'
import * as actions from '../../store/actions/actions'

const ipc = window.ipcRenderer

const Admin = props => {

    const history = useHistory()
    const path = history.location.pathname

    const cardClickHandler = type => {
        const goTo = path + '/' + type
        history.push(goTo)
    }

    useEffect(() => {
        ipc.on('backup_current', (e, data) => {
            console.log('llega ', data)
            props.updateCurrent(data)
        })
    }, [props]);

    return (
        <div className={classes.Admin}>
            <Header />
            <section className={classes.Cards}>
                <Card type="generate" clicked={cardClickHandler} title="Generar turno" />
                <Card type="call" clicked={cardClickHandler} title="Llamar turno" />
                <Card type="current" clicked={cardClickHandler} title="Turno Actual" />
                <Card type="save" clicked={cardClickHandler} title="Turno Entregado" />
            </section>
        </div >
    )
}

const mapStateToProps = state => ({
    current: state.currentTurn
})

const mapDispatchToProps = dispatch => ({
    updateCurrent: lastGenerated => dispatch(actions.updateCurrent(lastGenerated))
})

export default connect(mapStateToProps, mapDispatchToProps)(Admin)