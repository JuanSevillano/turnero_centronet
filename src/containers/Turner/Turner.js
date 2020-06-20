import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import classes from './Turner.module.css'

import * as actionTypes from '../../store/actions/actionTypes'
import * as actions from '../../store/actions/actions'

import Header from '../../components/Navigation/Header'

const ipc = window.ipcRenderer
const Turner = props => {

    const waiting = props.turns.map((el, i) => {
        if (el.status === actionTypes.ORDER_WAITING) {

            return (
                <div key={i}>
                    {i}
                </div>
            )
        }
    })
    const delivering = props.turns.map((el, i) => {
        if (el.status === actionTypes.ORDER_DELIVERING) {

            return (
                <div key={i}>
                    {i}
                </div>
            )
        }
    })


    useEffect(() => {

        ipc.on('waiting', (event, message) => {
            props.updateTurn(message)
            return
        })

        ipc.on('call', (event, message) => {
            props.updateTurn(message)
            return
        })

        ipc.on('save', (event, message) => {
            props.updateTurn(message)
            return
        })

<<<<<<< HEAD
        ipc.on('all', (event, message) => {
            console.log('llegaron', message)
            props.updateTurns(message)
            return
        })

=======
>>>>>>> 7c44cbce0d38351fda9f3ad2f5aed1781432bae5
    }, [])

    return (
        <div className={classes.Turner}>
            <Header />
            <section className={classes.Column}>
                <h2>En preparación</h2>
                <ul className={classes.List}>
                    {waiting}
                </ul >
            </section>
            <section className={classes.Column} id={classes.Entrega}>
                <h2>Listo para reclamar</h2>
                <ul className={classes.List}>
                    {delivering}
                </ul >
            </section>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        turns: state.turns,
        turn: state.currentTurn
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateTurn: message => dispatch(actions.updateTurn(message)),
<<<<<<< HEAD
        updateTurns: turns => dispatch(actions.updateTurns(turns))
=======
>>>>>>> 7c44cbce0d38351fda9f3ad2f5aed1781432bae5
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Turner);
