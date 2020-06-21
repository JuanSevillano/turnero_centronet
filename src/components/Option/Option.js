import React, { useState, useEffect } from 'react'
import classes from './Option.module.css'

import { connect } from 'react-redux'
import * as actions from '../../store/actions/actions'

import Header from '../Navigation/Header'

import Generator from '../Generator/Generator'
import Current from '../Current/Current'
import Caller from '../Caller/Caller'
import Save from '../Save/Save'


// const ipc = window.ipcRenderer


const Option = props => {

    const { type } = props.match.params

    const [currentOption, setCurrentOption] = useState()

    const checkOption = () => {
        switch (type) {
            case 'generate':
                props.generateTurn()
                setCurrentOption(<Generator turn={props.turn} />)
                break
            case 'call':
                setCurrentOption(<Caller call={props.callTurn} />)
                break
            case 'current':
                setCurrentOption(<Current turn={props.turn} />)
                break
            case 'save':
                setCurrentOption(<Save save={props.saveTurn} />)
                break
            default:
                setCurrentOption(<Generator />)
                break
        }
    }

    useEffect(() => { checkOption() }, [props.loaded])


    return (
        <div className={classes.Option}>
            <Header />
            {currentOption}
        </div>
    );
}

const mapStateToProps = state => {
    return {
        orders: state.turns,
        turn: state.currentTurn,
        loaded: state.backup
    }
}

const mapDispatchToProps = dispatch => {
    return {
        generateTurn: () => dispatch(actions.generateTurn()),
        callTurn: number => dispatch(actions.callTurn(number)),
        saveTurn: number => dispatch(actions.saveTurn(number))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Option);
