import React from 'react';
import classes from './Keyboard.module.css'


import cero from '../../assets/images/keyboard/0.png'
import uno from '../../assets/images/keyboard/1.png'
import dos from '../../assets/images/keyboard/2.png'
import tres from '../../assets/images/keyboard/3.png'
import cuatro from '../../assets/images/keyboard/4.png'
import cinco from '../../assets/images/keyboard/5.png'
import seis from '../../assets/images/keyboard/6.png'
import siete from '../../assets/images/keyboard/7.png'
import ocho from '../../assets/images/keyboard/8.png'
import nueve from '../../assets/images/keyboard/9.png'

import deleting from '../../assets/images/keyboard/delete.png'
import enter from '../../assets/images/keyboard/enter.png'



const Keyboard = props => {


    return <div className={classes.gridContainer}>
        <button className={classes.Btn} onClick={e => props.push("1")}>
            <img src={uno} alt="numero" />        </button>
        <button className={classes.Btn} onClick={e => props.push("2")}>
            <img src={dos} alt="numero" />        </button>
        <button className={classes.Btn} onClick={e => props.push("3")}>
            <img src={tres} alt="numero" />        </button>
        <button className={classes.Btn} onClick={e => props.push("4")}>
            <img src={cuatro} alt="numero" />        </button>
        <button className={classes.Btn} onClick={e => props.push("5")}>
            <img src={cinco} alt="numero" />        </button>
        <button className={classes.Btn} onClick={e => props.push("6")}>
            <img src={seis} alt="numero" />        </button>
        <button className={classes.Btn} onClick={e => props.push("7")}>
            <img src={siete} alt="numero" />        </button>
        <button className={classes.Btn} onClick={e => props.push("8")}>
            <img src={ocho} alt="numero" />        </button>
        <button className={classes.Btn} onClick={e => props.push("9")}>
            <img src={nueve} alt="numero" />        </button>
        <button className={classes.Btn} onClick={e => props.push("delete")}>
            <img src={deleting} alt="numero" />        </button>
        <button className={classes.Btn} onClick={e => props.push("0")}>
            <img src={cero} alt="numero" />        </button>
        <button className={classes.Btn} onClick={e => props.push("enter")}>
            <img src={enter} alt="numero" />             </button>
    </div>

}

export default Keyboard;
