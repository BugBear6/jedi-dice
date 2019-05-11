import React from 'react';
import './Dice.scss';
import ab from '../../../img/dices/ab.png';
import boost from '../../../img/dices/boost.png';
import ch from '../../../img/dices/ch.png';
import d10 from '../../../img/dices/d10.png';
import dif from '../../../img/dices/dif.png';
import force from '../../../img/dices/force.png';
import prof from '../../../img/dices/prof.png';
import setback from '../../../img/dices/setback.png';

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

const DiceCounter = ({count}) => (
	<div className="dice__counter">{count}</div>
);

export default ({diceType, selectDice, dicesSelected}) => {
	const imgTypeName = diceType.toLowerCase();
	const indexOfType = dicesSelected.findIndex(el => el.diceType === diceType);
	var count
	if (indexOfType > -1) {
		count = dicesSelected[indexOfType].times;
	} else {
		count = null;
	}

	return (
		<div className="dice__holder">
			<div 
				onClick={() => selectDice(diceType)}>
				<img
					className="dice__img"
					src={dicesImg[imgTypeName]}
					alt={diceType} />
			</div>
			{
				count && <DiceCounter count={count} />
			}
		</div>
	);
};



