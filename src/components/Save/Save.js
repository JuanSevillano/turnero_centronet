import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import classes from './Save.module.css'
import Keyboard from '../Keyboard/Keyboard'

const Save = (props) => {

	const [number, setNumber] = useState('')
	const history = useHistory()



	let contador = 0
	if (number) {
		const couting = setInterval(() => {
			contador++
			if (contador > 2) {
				props.save(number)
				history.push('/admin')
				clearInterval(couting)
			}
		}, 1000)
	}

	const numberClickHandler = value => {

		if (value === "enter") {
			props.save(number)
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
