import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import Keyboard from '../Keyboard/Keyboard'
import classes from './Current.module.css'

const Current = (props) => {

	const history = useHistory()

	const [number, setNumber] = useState('')
	const [show, setShow] = useState(false)

	const myClass = show ? [classes.Number, classes.Changing].join(' ') : classes.Number


	const keyHandler = value => {

		if (value === "enter") {
			props.setInitial(number)
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
		<div className={classes.Current}>
			<section className={myClass}>
				{props.turn || number ? null : <p>Sin turno</p>}
				{number ? <p> {number} </p> : <p> {props.turn} </p>}
			</section>

			{show ? <Keyboard push={keyHandler} /> : null}
			{!show ? <button onClick={e => setShow(true)}>Cambiar numero actual</button> : null}

		</div>
	)
}

export default Current
