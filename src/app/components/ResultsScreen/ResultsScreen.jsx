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

const getTypeClass = (diceType) => {
	return `dice-type dice-type--${diceType.toLowerCase()}`;
}

const getClass = ({diceType, result}) => {
	const type = getTypeClass(diceType);
	const symbolsNumber = result.split(',').length > 1 ? 'symbols-double' : 'symbols-one';
	return `${type} ${symbolsNumber}`;
}

const DiceRolled = ({dicesRolledArray}) => {
	console.log('dicesRolledArray', dicesRolledArray)
	return (
		<>
		{
			dicesRolledArray.map((diceRolled, indexDice) => (
				<li
					key={indexDice}
					className={ `results-screen__dice-rolled ${getClass(diceRolled)}` } >
					{
						diceRolled.result.split(',').map((symbol, indexSymbol) => (
							<img
								className={`dice-type__symbol dice-type__symbol--${symbol}`}
								key={indexSymbol}
								src={symbolsImg[symbol]}
							/>
						))
					}
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

export default({rollResult, closeResultsScreen}) => (
	<div className="results-screen"
		onClick={closeResultsScreen}>
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

