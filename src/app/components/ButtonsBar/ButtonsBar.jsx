import React from 'react';
import './ButtonsBar.scss';
import '../../../../node_modules/@fortawesome/fontawesome-free/css/all.css';


export default ({ rollDice, reset, reroll }) => (
	<div className="buttons-bar">
		<button
			className="button button--reset"
			onClick={reset}>
			<i className="fas fa-trash-alt"></i>
		</button>
		<button
			className="button button--roll"
			onClick={rollDice}>Roll</button>

		<button
			className="button button--reroll"
			onClick={reroll}>
			<i className="fas fa-redo"></i>
		</button>
	</div>
);
