import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import classes from './Save.module.css'
import Keyboard from '../Keyboard/Keyboard'

const Save = (props) => {

	const [number, setNumber] = useState('')
	const history = useHistory()

	const numberClickHandler = value => {

		if (value === "enter") {
			props.save(number)
			// ipcRenderer.send('call', number)
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
		<div className={classes.Save}>
			<section className={classes.Number}>
				<span>{number}</span>
			</section>
			<Keyboard type="save" push={numberClickHandler} />
		</div>
	)
}

export default Save
