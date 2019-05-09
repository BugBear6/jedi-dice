import React from 'react';
import './Dice.scss';

export default ({diceType, selectDice, dicesSelected}) => (
	<div>
		<div 
			onClick={selectDice(diceType)}
			className={diceType}>{diceType}
		</div>
		<diceCounter count={dicesSelected[diceType]} />
	</div>
);

diceCounter = (count) => (
	{
		count 
		? (<div className="dice-counter">{count}</div>)
		: null
	}	
);
