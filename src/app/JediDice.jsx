import React from 'react';
import './JediDice.scss';
import Dice from './components/Dice/Dice';
import DiceBuilder from '../utils/DiceBuilder';

class JediDice extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			rollResult: {},
			dicesSelected: {
				Setback: 0,
				Boost: 0,
				Ab: 0,
				Dif: 0,
				Prof: 0,
				Ch: 0,
				Force: 0,
				D10: 0
			}
		};
	}

	diceTypes = [
		'Setback',
		'Boost',
		'Ab',
		'Dif',
		'Prof',
		'Ch',
		'Force',
		'D10'
	];

	selectDice(diceType) {
		console.log('selectDice')
		const dicesSelectedCopy = Object.assign({}, this.state);
		dicesSelectedCopy[diceType] = Number(dicesSelectedCopy[diceType]) + 1
		this.setState({
			dicesSelected: dicesSelectedCopy
		});
	}

	roll() {
		// map into array of objects
		const dicesArray = Object.keys(this.state.dicesSelected).map((key) => {
			return {
				diceType: key,
				times: dicesSelected[key]
			};
		});

		// filter non selected
		const dicesSelected = dicesArray.filter(diceObj => diceObj.times);

		// build dices and roll them
		const rollResult = dicesSelected.reduce((total, diceObj )=> {
			const dice = DiceBuilder.buildDice(diceObj.diceType);
			const result =  dice.roll().times(diceObj.times);
			return total + result;
		}, '')

		console.log('rollResult', rollResult)
		this.setState({
			rollResult
		});
	}

	reset() {
		console.log('reset')
		this.setState({
			rollResult: {},
			dicesSelected: {}
		})
	}

	render() {
		return (
			<div className="jedi-dice">
				<header className="App-header">
				</header>
				<div className="dice-select-list">
					(
						diceTypes.map((diceType, index) => (
							<Dice
								key={index}
								diceType={diceType}
								selectDice={this.selectDice}
								dicesSelected={this.state.dicesSelected}>
							</Dice>
						))
					)
				</div>
				<div>
					<button
						className="button roll-button"
						onClick={this.roll()}>Roll</button>
				</div>
			</div>
		);
	}

}

export default JediDice;
