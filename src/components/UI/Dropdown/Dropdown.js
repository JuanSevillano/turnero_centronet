import React from 'react';

import classes from './Dropdown.module.css'

const Dropdown = (props) => {

	const options = props.options.map((d, index) => (
		<p key={d.id} onClick={e => props.selected(d.id, index)}>{index}</p>
	))

	return (
		<div className={classes.Dropdown}>
			<span>{props.value}</span>
			<div className={classes.DropdownContent}>
				{options}
			</div>
		</div>
	)
}

export default Dropdown
