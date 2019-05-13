import React from 'react';
import './JediDice.scss';
import Dice from './components/Dice/Dice';
import buildDice from '../utils/DiceBuilder';
import ResultsScreen from './components/ResultsScreen/ResultsScreen';
import ButtonsBar from './components/ButtonsBar/ButtonsBar';

class JediDice extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			rollResult: {
				roll: [],
				final: {}
			},
			dicesSelected: [],
			prevRollDices: []
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

	selectDice = diceType => {
		const dicesSelectedCopy = [...this.state.dicesSelected];
		const indexOfType = dicesSelectedCopy.findIndex(el => el.diceType === diceType);
		const maxTimes = 9;

		if (indexOfType > -1) {
			const currentTimes = dicesSelectedCopy[indexOfType].times;
			dicesSelectedCopy[indexOfType].times = currentTimes >= maxTimes 
				? maxTimes
				: currentTimes + 1;
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
		const dicesSelected = [...this.state.dicesSelected];
		const roll = this.getRoll(dicesSelected);
		const final = this.getFinal(roll);
		this.setState({
			rollResult: {
				roll,
				final,
			}, 
			prevRollDices: [...this.state.dicesSelected]
		});
	}

	reroll = () => {
		console.log('reroll')
		const dicesSelected = [...this.state.prevRollDices];
		const roll = this.getRoll(dicesSelected);
		const final = this.getFinal(roll);
		this.setState({
			rollResult: {
				roll,
				final,
			}
		});
	}

	/**
	 * @returns Array
	 */
	getRoll = dicesSelected => {
		return dicesSelected.map((diceObj) => {
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
		const advantageArr = rollNoBlank.filter(el => el === 'advantage');
		const threatArr = rollNoBlank.filter(el => el === 'threat');
		const triumphArr = rollNoBlank.filter(el => el === 'triumph');
		const despairArr = rollNoBlank.filter(el => el === 'despair');
		const lightArr = rollNoBlank.filter(el => el === 'light');
		const darkArr = rollNoBlank.filter(el => el === 'dark');
		const d10Arr = rollNoBlank.filter(el => !isNaN(Number(el)) );
		const totalSuccess = successArr.length + triumphArr.length - failureArr.length - despairArr.length;
		const totalFailure = failureArr.length + despairArr.length - successArr.length - triumphArr.length;
		const success = successArr.length - failureArr.length;
		const failure = failureArr.length - successArr.length;
		const symbolsOnlyArr = rollArray.filter(dice => dice[0].diceType !== 'D10');
		const forceOnlyArr = rollArray.filter(dice => dice[0].diceType === 'Force');

		const finalResults = {
			success: success >= 0 ? success : 0,
			failure: failure >= 0 ? failure : 0,
			totalSuccess: totalSuccess >= 0 ? totalSuccess : 0,
			totalFailure: totalFailure >= 0 ? totalFailure : 0,
			isSuccess: totalSuccess > totalFailure,
			onlyD10: symbolsOnlyArr.length === 0,
			onlyForce: forceOnlyArr.length > 0 && symbolsOnlyArr.length === 1,
			dices: {
				advantage:  advantageArr.length,
				threat:  threatArr.length,
				triumph: triumphArr.length,
				despair: despairArr.length,
				light: lightArr.length,
				dark: darkArr.length,
				d10: d10Arr.join(','),
			},
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

	closeResultsScreen = () => {
		this.reset();
	}

	render() {
		return (
			<div className="jedi-dice">
				{
					(!!this.state.rollResult.roll.length) && <ResultsScreen
						closeResultsScreen={this.closeResultsScreen}
						rollResult={this.state.rollResult} />
				}
				<div className="dice-select-list">
					{
						this.diceTypes.map((diceType, index) => (
							<Dice
								key={index}
								diceType={diceType}
								selectDice={this.selectDice}
								dicesSelected={this.state.dicesSelected} />
						))
					}
				</div>
				<ButtonsBar
					rollDice={this.rollDice}
					reroll={this.reroll}
					reset={this.reset}
					dicesSelected={this.state.dicesSelected}
					prevRollDices={this.state.prevRollDices} />
			</div>
		);
	}

}

export default JediDice;
