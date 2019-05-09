import React from 'react';
import './JediDice.scss';
import Dice from './components/Dice/Dice';
import buildDice from '../utils/DiceBuilder';

class JediDice extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			rollResult: {},
			dicesSelected: []
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

	selectDice = (diceType) => {
		console.log('selectDice', this)
		const dicesSelectedCopy = [...this.state.dicesSelected];
		const indexOfType = dicesSelectedCopy.findIndex(el => el.diceType === diceType);
		if (indexOfType > -1) {
			dicesSelectedCopy[indexOfType].times += 1
		} else {
			dicesSelectedCopy.push({
				diceType,
				times: 1
			});
		}
		this.setState({
			dicesSelected: dicesSelectedCopy
		});
	}

	roll = () => {
		const rollResult = this.state.dicesSelected.reduce((total, diceObj )=> {
			const dice = buildDice(diceObj.diceType);
			const result =  dice.roll().times(diceObj.times);
			return total + result;
		}, '')

		console.log('rollResult', rollResult)
		this.setState({
			rollResult
		});
	}

	reset = () => {
		console.log('reset')
		this.setState({
			rollResult: {},
			dicesSelected: []
		});
	}

	render() {
		return (
			<div className="jedi-dice">
				<div className="dice-select-list">
					{
						this.diceTypes.map((diceType, index) => (
							<Dice
								key={index}
								diceType={diceType}
								selectDice={this.selectDice}
								dicesSelected={this.state.dicesSelected}>
							</Dice>
						))
					}
				</div>
				<div className="buttons-bar">
					<button
						className="button button--roll"
						onClick={this.roll}>Roll</button>

					<button
						className="button button--reset"
						onClick={this.reset}>Reset</button>
				</div>
			</div>
		);
	}

}

export default JediDice;
