import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from '../../store/actions/actions'

import Header from '../Navigation/Header'
import classes from './Settings.module.css'

import sonido from '../../assets/speaker.svg'
import backup from '../../assets/recuperar.svg'
import speech from '../../assets/speech.svg'

const ipc = window.ipcRenderer

const Settings = props => {

    const history = useHistory()
    const [loadPrevious, setLoadPrevious] = useState(false)
    const [soundOn, setSoundOn] = useState(true)
    const [voiceOn, setVoiceOn] = useState(false)

    const misClases = [classes.slider, classes.round].join(' ')
    const isLoading = loadPrevious ? [classes.reloadSingle, classes.animate].join(' ') : classes.reloadSingle

    const getPreviousState = e => {
        setLoadPrevious(true)
        props.getBackup()
        setTimeout(() => history.push('/admin'), 500)
    }

    const toogle = e => {
        const val = !soundOn
        setSoundOn(val)
    }

    const toggleVoice = e => {
        ipc.send('voice_toggle', voiceOn)
        setVoiceOn(prev => !prev)
    }

    useEffect(() => {
        ipc.send('audio_toggle', soundOn)
        return () => {
            ipc.removeAllListeners('audio_toggle')
            ipc.removeAllListeners('voice_toggle')
        }
    }, [soundOn, voiceOn]);

    return (
        <>
            <Header />
            <div className={classes.Settings}>

                <section className={classes.Wrapper}>
                    <div className={classes.TextInfo}>
                        <p>Habilitar sonido </p>
                        <img src={sonido} alt="habilitar sonido" />
                    </div>
                    <label className={classes.switch}>
                        <input onChange={toogle} defaultChecked type="checkbox" />
                        <span className={misClases}></span>
                    </label>
                </section>
                <section className={classes.Wrapper}>
                    <div className={classes.TextInfo}>
                        <p>Activar voz </p>
                        <img className={classes.Recuperar} src={speech} alt="Activar voz al llamar turnos" />
                    </div>
                    <label className={classes.switch}>
                        <input onChange={toggleVoice} type="checkbox" />
                        <span className={misClases}></span>
                    </label>
                </section>
                <section className={classes.Wrapper}>
                    <div className={classes.TextInfo}>
                        <p>Backup turnos</p>
                        <img className={classes.Recuperar} src={backup} alt="Recuperar datos previos" />
                    </div>
                    <div onClick={getPreviousState} className={classes.SaveWrapper}>
                        <div className={isLoading}></div>
                    </div>
                </section>
                <section className={classes.Wrapper}>
                    <div className={classes.TexWarning}>
                        <p>Recuerda desactivar el sonido cada vez que entres a <strong>Configuracion</strong>
                        </p>
                    </div>
                </section>
            </div>
        </>
    );
}


const mapDispatchToProps = dispatch => ({
    getBackup: () => dispatch(actions.loadBackup())
})

export default connect(null, mapDispatchToProps)(Settings)
