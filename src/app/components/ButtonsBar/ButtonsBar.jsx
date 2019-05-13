import React from 'react';
import './ButtonsBar.scss';
import '../../../../node_modules/@fortawesome/fontawesome-free/css/all.css';


export default ({ rollDice, reset, reroll, dicesSelected, prevRollDices }) => (
	<div className="buttons-bar">
		<button
			className="button button--reset"
			disabled={dicesSelected.length === 0}
			onClick={reset}>
			<i className="fas fa-trash-alt"></i>
		</button>
		<button
			className="button button--roll"
			disabled={dicesSelected.length === 0}
			onClick={rollDice}>Roll
		</button>
		<button
			className="button button--reroll"
			disabled={prevRollDices.length === 0}
			onClick={reroll}>
			<i className="fas fa-redo"></i>
		</button>
	</div>
);
