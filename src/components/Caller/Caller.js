import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import classes from './Caller.module.css'

import Keyboard from '../Keyboard/Keyboard'

const Caller = props => {

    const [number, setNumber] = useState('')
    const history = useHistory()

    const numberClickHandler = value => {

        if (value === "enter") {
            props.call(number)
            setNumber('')
            history.push('/admin')

        } else if (value === "delete") {
            if (number) {
                const newone = number.slice(0, -1)
                setNumber(newone)
            }
        } else {
            let updatedNumber
            if (number) {
                updatedNumber = number + value
                setNumber(updatedNumber)
            } else {
                updatedNumber = value
                setNumber(updatedNumber)
            }
        }
    }

    return (
        <div className={classes.Caller}>
            <section className={classes.Number}>
                <span>{number}</span>
            </section>
            <Keyboard type="call" push={numberClickHandler} />
        </div>
    );
}

export default Caller
