import React from 'react';
import './ResultsScreen.scss';
import advantage from '../../../img/icons/advantage.png';
import dark from '../../../img/icons/dark.png';
import despair from '../../../img/icons/despair.png';
import failure from '../../../img/icons/failure.png';
import light from '../../../img/icons/light.png';
import success from '../../../img/icons/success.png';
import threat from '../../../img/icons/threat.png';
import triumph from '../../../img/icons/triumph.png';

const symbolsImg = {
	advantage,
	dark,
	despair,
	failure,
	light,
	success,
	threat,
	triumph
};

const getShapeClass = diceType => {
	let shape = 'shape shape--';
	const shapes = {
		boost: 'square',
		setback: 'square',
		ab: 'triangle-up',
		ch: 'triangle-up',
		d10: 'diamond-narrow',
		dif: 'pentagon',
		prof: 'pentagon',
		force: 'pentagon'
	};
	return shape + shapes[diceType.toLowerCase()];
};

const getTypeClass = (diceType) => {
	return `dice-type dice-type--${diceType.toLowerCase()}`;
}

const getClass = diceType => {
	console.log('getClass => diceType', diceType)
	const shape = getShapeClass(diceType);
	const type = getTypeClass(diceType);
	return `${shape} ${type}`;
}

const DiceRolled = ({dicesRolledArray}) => {
	return (
		<>
		{
			dicesRolledArray.map((diceRolled, index) => (
				<li
					key={index}
					className={ `results-screen__dice-rolled ${getClass(diceRolled.diceType)}` }
					>{diceRolled.diceType}
				</li>
			))
		}
		</>
	);
};

const FinalRolled = ({finalRolled}) => {
	return (
		<li className="final-rolled">{finalRolled}</li>
	);
};

export default({rollResult}) => (
	<div className="results-screen">
		<div className="results-screen__holder">
			<ul className="results-screen__rolled">
				{
					rollResult.roll.map((dicesRolledArray, index) => (
						<DiceRolled
							key={index}
							dicesRolledArray={dicesRolledArray} />
					))
				}
			</ul>
			<ul className="results-screen__final">
				{/* {
					rollResult.final.map((finalRolled, index) => (
						<FinalRolled
							key={index}
							finalRolled={finalRolled} />
					))
				} */}
			</ul>
		</div>
	</div>
);

