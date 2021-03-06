/**
 * use:
 * 1. Create the dice.
 *   const setback = buildDice('Setback');
 * 2. Roll the dice.
 *   setback.rollOnce();
 *   OR
 *   setback.roll().times(1);
 * 3. D10 will generate results from 0-9 on purpose
 * 4. Currently there is no option for range from 1.
 */

function buildDice(diceType) {
	return new classes[diceType](diceType);
}

class Dice {
	constructor(max = 6, diceType) {
		this._max = max;
		this.diceType = diceType;
		this._rollMap = null;
	}
	rollOnce() {
		const numberRolled = Math.floor((Math.random() * this._max));
		return {
			result: this._rollMap ? this._rollMap[numberRolled] : String(numberRolled),
			diceType: this.diceType
		};
	}
	roll() {
		return this;
	}
	times(xTimes) {
		const rolls = new Array(xTimes).fill(0).map(() => this.rollOnce());
		return rolls;
	}
}

// Setback
class Setback extends Dice {
	constructor(diceType) {
		super(6, diceType);
		this._rollMap = {
			0: 'blank',
			1: 'blank',
			2: 'failure',
			3: 'failure',
			4: 'threat',
			5: 'threat'
		};
	}
}

// Boost
class Boost extends Dice {
	constructor(diceType) {
		super(6, diceType);
		this._rollMap = {
			0: 'blank',
			1: 'blank',
			2: 'success',
			3: 'success,advantage',
			4: 'advantage,advantage',
			5: 'advantage'
		};
	}
}

// Ability
class Ab extends Dice {
	constructor(diceType) {
		super(8, diceType);
		this._rollMap = {
			0: 'blank',
			1: 'success',
			2: 'success',
			3: 'success,success',
			4: 'advantage',
			5: 'advantage',
			6: 'success,advantage',
			7: 'advantage,advantage'
		};
	}
}

// Dificulty
class Dif extends Dice {
	constructor(diceType) {
		super(8, diceType);
		this._rollMap = {
			0: 'blank',
			1: 'failure',
			2: 'failure,failure',
			3: 'threat',
			4: 'threat',
			5: 'threat',
			6: 'threat,threat',
			7: 'failure,threat'
		};
	}
}


// Proficiency
class Prof extends Dice {
	constructor(diceType) {
		super(12, diceType);
		this._rollMap = {
			0: 'blank',
			1: 'success',
			2: 'success',
			3: 'success,success',
			4: 'success,success',
			5: 'advantage',
			6: 'success,advantage',
			7: 'success,advantage',
			8: 'success,advantage',
			9: 'advantage,advantage',
			10: 'advantage,advantage',
			11: 'triumph'
		};
	}
}

// Challenge
class Ch extends Dice {
	constructor(diceType) {
		super(12, diceType);
		this._rollMap = {
			0: 'blank',
			1: 'failure',
			2: 'failure',
			3: 'failure,failure',
			4: 'failure,failure',
			5: 'threat',
			6: 'threat',
			7: 'failure,threat',
			8: 'failure,threat',
			9: 'threat,threat',
			10: 'threat,threat',
			11: 'despair'
		};
	}
}

// Force
class Force extends Dice {
	constructor(diceType) {
		super(12, diceType);
		this._rollMap = {
			0: 'dark',
			1: 'dark',
			2: 'dark',
			3: 'dark',
			4: 'dark',
			5: 'dark',
			6: 'dark,dark',
			7: 'light',
			8: 'light',
			9: 'light,light',
			10: 'light,light',
			11: 'light,light'
		};
	}
}

// d10
class D10 extends Dice {
	constructor(diceType) {
		super(10, diceType);
	}
}

const classes = {
	Dice,
	Setback,
	Boost,
	Ab,
	Dif,
	Prof,
	Ch,
	Force,
	D10
};


export default buildDice;
