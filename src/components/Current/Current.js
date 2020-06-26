import React from 'react'

import classes from './Current.module.css'

const Current = (props) => {
	return (
		<div className={classes.Current}>
			<section>
				{props.turn ? null : <p>Sin turno</p>}
				{props.turn ? <p className={classes.Number}> {props.turn} </p> : null}
			</section>
			<section className={classes.Controllers}>
				<button></button>

			</section>
		</div>
	)
}

export default Current
