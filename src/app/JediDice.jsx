import React from 'react';
import './JediDice.scss';
import Dice from './components/Dice/Dice';
import buildDice from '../utils/DiceBuilder';
import ResultsScreen from './components/ResultsScreen/ResultsScreen';

class JediDice extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			rollResult: {
				roll: [],
				final: {}
			},
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

	rollDice = () => {
		const roll = this.getRoll();
		const final = this.getFinal(roll);

		console.log('roll', roll)
		console.log('final', final)
		this.setState({
			rollResult : {
				roll,
				final
			}
		});
	}

	/**
	 * @returns Array
	 */
	getRoll = () => {
		return this.state.dicesSelected.map((diceObj) => {
			const dice = buildDice(diceObj.diceType);
			return dice.roll().times(diceObj.times);
		});
	}
	/**
	 * @returns Object
	 */
	getFinal = rollArray => {
		const rollFlat = rollArray
			.flat()
			.map(el => el.result)
			.join(',')
			.split(',');
		const rollNoBlank = rollFlat.filter(el => el !== 'blank');
		const successArr = rollNoBlank.filter(el => el === 'success');
		const failureArr = rollNoBlank.filter(el => el === 'failure');
		const threatArr = rollNoBlank.filter(el => el === 'threat');
		const triumphArr = rollNoBlank.filter(el => el === 'triumph');
		const despairArr = rollNoBlank.filter(el => el === 'despair');
		const lightArr = rollNoBlank.filter(el => el === 'light');
		const darkArr = rollNoBlank.filter(el => el === 'dark');
		const d10Arr = rollNoBlank.filter(el => Number(el));

		const totalSuccess = successArr.length + triumphArr.length - failureArr.length - despairArr.length;
		const totalFailure = failureArr.length + despairArr.length - successArr.length - triumphArr.length;
		const success = successArr.length - failureArr.length;
		const failure = failureArr.length - successArr.length;

		const finalResults = {
			success: success >= 0 ? success : 0,
			failure: failure >= 0 ? failure : 0,
			threat:  threatArr.length,
			triumph: triumphArr.length,
			despair: despairArr.length,
			light: lightArr.length,
			dark: darkArr.length,
			d10: d10Arr,
			totalSuccess: totalSuccess >= 0 ? totalSuccess : 0,
			totalFailure: totalFailure >= 0 ? totalFailure : 0,
			isSuccess: totalSuccess > totalFailure
		};
		return finalResults;
	}

	reset = () => {
		this.setState({
			rollResult: {
				roll: [],
				final: {}
			},
			dicesSelected: []
		});
	}

	render() {
		return (
			<div className="jedi-dice">
				{
					this.state.rollResult.roll.length && <ResultsScreen rollResult={this.state.rollResult} />
				}
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
						onClick={this.rollDice}>Roll</button>

					<button
						className="button button--reset"
						onClick={this.reset}>Reset</button>
				</div>
			</div>
		);
	}

}

export default JediDice;
