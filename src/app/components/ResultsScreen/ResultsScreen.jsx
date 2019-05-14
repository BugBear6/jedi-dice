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
	const symbolsNumber = result.split && result.split(',').length > 1
		? 'symbols-double'
		: 'symbols-one';
	return `${type} ${symbolsNumber}`;
}

const DiceImg = ({symbol, indexSymbol}) => (
	<>
		{
			symbol === 'blank'
				? <span></span>
				: <img
					alt="symbol"
					className={`dice-type__symbol dice-type__symbol--${symbol}`}
					key={indexSymbol}
					src={symbolsImg[symbol]} />
		}
	</>
);

const DiceRolled = ({dicesRolledArray}) => {
	return (
		<>
		{
			dicesRolledArray.map((diceRolled, indexDice) => (
				<li
					key={indexDice}
					className={ `results-screen__dice-rolled ${getClass(diceRolled)}` } >
					{
						diceRolled.result.split(',').map((symbol, indexSymbol) => (
							diceRolled.diceType === 'D10' && diceRolled.result !== ''
							? <span key={indexSymbol}>{symbol}</span>
							: <DiceImg 
								key={indexSymbol}
								symbol={symbol}
								indexSymbol={indexSymbol} />
						))
					}
				</li>
			))
		}
		</>
	);
};

const FinalSymbol = ({symbol, resultValue}) => {
	return (
		<li className={ `final-rolled final-rolled--${symbol} final-rolled--${resultValue}` }>
			<img
				className={`final-rolled__symbol dice-type__symbol--${symbol}`}
				alt={symbol}
				title={symbol}
				src={symbolsImg[symbol]} />
			<span className="final-rolled__counter">{resultValue}</span>
		</li>
	);
}

const FinalD10 = ({resultValue}) => {
	return (
		resultValue.split(',').map((value, index) => (
			<li
				key={index}
				className='final-rolled final-rolled--d10'>
				<span>{value}</span>
			</li>
		))
	);
}

const FinalRolled = ({symbol, resultValue}) => {
	if (symbol === 'd10') {
		if (resultValue !== '') {
			return <FinalD10
				resultValue={resultValue} />
		}
	} else {
		return <FinalSymbol
			symbol={symbol}
			resultValue={resultValue} />
	}
	return null;
};

export default({rollResult, closeResultsScreen}) => (
	<div className={
		`results-screen
		 results-screen--${rollResult.final.isSuccess ? 'success' : 'failure'}
		 results-screen--${rollResult.final.onlyD10 ? 'only-d10' : ''}
		 results-screen--${rollResult.final.onlyForce ? 'only-force' : ''}`
	}
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
			{
				(!rollResult.final.onlyD10 && !rollResult.final.onlyForce) && <div className="results-screen__msg">
				{
					rollResult.final.isSuccess
					? <span>Success</span>
					: <span>Failure</span>
				}
			</div>
			}

			<ul className="results-screen__final">
				{
					Object.keys(rollResult.final.dices).map((symbol, index) => (
						<FinalRolled
							key={index}
							symbol={symbol}
							resultValue={rollResult.final.dices[symbol] } />
					))
				}
			</ul>
		</div>
	</div>
);

