import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from '../../store/actions/actions'

import Header from '../Navigation/Header'
import classes from './Settings.module.css'

import sonido from '../../assets/speaker.svg'
import backup from '../../assets/recuperar.svg'

const ipc = window.ipcRenderer

const Settings = props => {

    const history = useHistory()
    const [loadPrevious, setLoadPrevious] = useState(false)

    const misClases = [classes.slider, classes.round].join(' ')
    const isLoading = loadPrevious ? [classes.reloadSingle, classes.animate].join(' ') : classes.reloadSingle

    const getPreviousState = e => {
        setLoadPrevious(true)
        props.getBackup()
        setTimeout(() => history.push('/admin'), 500)
    }

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
                        <input type="checkbox" />
                        <span className={misClases}></span>
                    </label>
                </section>
                <section className={classes.Wrapper}>
                    <div className={classes.TextInfo}>
                        <p>Recupera datos</p>
                        <img className={classes.Recuperar} src={backup} alt="Recuperar datos previos" />
                    </div>
                    <div onClick={getPreviousState} className={classes.SaveWrapper}>
                        <div className={isLoading}></div>
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
