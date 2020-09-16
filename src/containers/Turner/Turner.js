import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux'
import classes from './Turner.module.css'

import * as actionTypes from '../../store/actions/actionTypes'
import * as actions from '../../store/actions/actions'

import Header from '../../components/Navigation/Header'

import useAudio from '../../components/Player/useAudio'
import sound from '../../assets/sound/call.mp3'

const ipc = window.ipcRenderer
const Turner = props => {


    const [playing, toggle] = useAudio(sound)
    const [voiceOn, setVoiceOn] = useState(props.voiceOn)
    let isOn
    let ultimito = 0
    const delivering = props.turns.map((el, i) => {
        if (el.status === actionTypes.ORDER_DELIVERING) {
            ultimito = ultimito < i ? i : ultimito
            return <div key={i}> {i}</div>
        }
    })

    const deliveringButLastOne = delivering.filter((el, i) => i !== ultimito)
    const lastOne = delivering.filter((el, i) => i === delivering.length)

    const checkSound = ({ number }) => {


        if (isOn && voiceOn) {
            toggle()
            setTimeout(() => {
                callNumber(number)
            }, 1000)
        }

        if (!isOn && voiceOn) {
            callNumber(number)
        }

        if (isOn && !voiceOn) {
            toggle()
        }
    }

    const callNumber = number => {
        const synth = window.speechSynthesis
        const msg = new SpeechSynthesisUtterance(`Turno número, ${number}`)
        msg.volume = 2;
        msg.lang = 'es-ES'
        synth.speak(msg);
    }

    useEffect(() => {

        isOn = props.soundOn


        const updateTurn = (event, message) => {
            props.updateTurn(message)
            return
        }


        const saveTurn = (event, { number }) => {
            props.saveTurn(number)
            return
        }

        const toggleAudio = (event, message) => {
            props.toggleAudio(message)
            return
        }

        const toggleVoice = (e, message) => {
            setVoiceOn(prev => !prev)
            props.toggleVoice(message)
            return
        }

        const updateTurns = (event, message) => {
            props.updateTurns(message)
            return
        }

        const callTurn = (event, message) => {
            props.updateTurn(message)
            checkSound(message)
            return
        }

        ipc.on('waiting', updateTurn)
        ipc.on('call', callTurn)
        ipc.on('save', saveTurn)
        ipc.on('audio_toggle', toggleAudio)
        ipc.on('voice_toggle', toggleVoice)
        ipc.on('backup_delivering', updateTurns)


        return () => {
            ipc.removeAllListeners('waiting', updateTurn)
            ipc.removeAllListeners('call', callTurn)
            ipc.removeAllListeners('save', updateTurn)
            ipc.removeAllListeners('audio_toggle', toggleAudio)
            ipc.removeAllListeners('voice_toggle', toggleVoice)
            ipc.removeAllListeners('backup_delivering', updateTurns)
            clearTimeout()
        }

    }, [props])

    return (
        <div className={classes.Turner}>
            <Header />
            {/* <section className={classes.Column}>
                <h2>En preparación</h2>
                <ul className={classes.List}>
                    {waiting}
                </ul >
            </section> */}
            <section className={classes.Column} id={classes.Entrega}>
                <ul className={classes.List}>
                    {deliveringButLastOne}
                </ul >
            </section>
            <section>
                <span className={classes.LastOne}>{ultimito !== 0 ? ultimito : null}</span>
            </section>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        turns: state.turns,
        turn: state.currentTurn,
        soundOn: state.soundOn,
        voiceOn: state.voiceOn
    }
}

const mapDispatchToProps = dispatch => {
    return {
        toggleAudio: bool => dispatch(actions.toggleAudio(bool)),
        toggleVoice: bool => dispatch(actions.toggleVoice(bool)),
        saveTurn: number => dispatch(actions.saveTurn(number)),
        updateTurn: message => dispatch(actions.updateTurn(message)),
        updateTurns: turns => dispatch(actions.updateTurns(turns))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Turner);
