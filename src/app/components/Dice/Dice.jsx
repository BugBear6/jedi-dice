import React from 'react';
import './Dice.scss';
import ab from 'ab.png';
import boost from 'boost.png';
import ch from 'ch.png';
import d10 from 'd10.png';
import dif from 'dif.png';
import force from 'force.png';
import prof from 'prof.png';
import setback from 'setback.png';

const dicesImg = {
	ab,
	boost,
	ch,
	d10,
	dif,
	force,
	prof,
	setback
};

export default ({diceType, selectDice, dicesSelected}) => {
	const indexOfType = dicesSelected.findIndex(el => el.diceType === diceType);
	const count = dicesSelected[indexOfType].times;

	return (
		<div>
		<div 
			onClick={selectDice(diceType)}
			className={diceType}>{diceType}
			<img
				className="dice-img"
				src={dicesImg[diceType]}
				alt={diceType} />;
		</div>
		{
			count && <diceCounter count={count} />
		}
	</div>
	);
};

diceCounter = count => (
	<div className="dice-counter">{count}</div>
);

