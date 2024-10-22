import { useState } from 'react';
import styles from './app.module.css';

export const App = () => {
	const [operator, setOperator] = useState('');
	const [operand1, setOperand1] = useState('');
	const [operand2, setOperand2] = useState('');
	const [result, setResult] = useState('');
	const [isClicked, setIsClicked] = useState(false);

	let inputValue = operand1 + operator + operand2;

	const NUMS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '-', '=', 'C'];

	const onClick = (value) => {
		let currentValue = value.target.value;

		if (result && !['+', '-'].includes(currentValue)) {
			setOperator('');
			setOperand1('');
			setOperand2('');
			setResult('');
			toggleStyle();
		}

		switch (currentValue) {
			case '-':
			case '+':
				setOperator(currentValue);
				if (result) {
					setOperand1(result);
					toggleStyle();
					setResult('');
				}
				break;
			case '=':
				setResult(eval(operand1 + operator + operand2));
				setOperator('');
				setOperand1('');
				setOperand2('');
				toggleStyle();
				break;
			case 'C':
				setOperator('');
				setOperand1('');
				setOperand2('');
				setResult('');
				if (isClicked) {
					toggleStyle();
				}
				break;
			default:
				if (operator) {
					if (operand2 === '0') {
						setOperand2(currentValue);
					} else {
						setOperand2(operand2 + currentValue);
					}
				} else {
					if (operand1 === '0') {
						setOperand1(currentValue);
					} else {
						setOperand1(operand1 + currentValue);
					}
				}
		}
	};

	const toggleStyle = () => {
		setIsClicked(!isClicked);
	};

	return (
		<div className={styles.app}>
			<h1 className={styles.header}>Калькулятор</h1>
			<div className={styles.calculator}>
				<div
					className={
						styles.display + ' ' + (isClicked ? styles.displayResult : '')
					}
				>
					<input type="text" value={result ? result : inputValue} />
				</div>
				<div className={styles.buttons}>
					{NUMS.map((value, index) => (
						<button
							className={
								styles.button +
								' ' +
								(index % 2 === 1 ? styles.orange : '')
							}
							key={Math.random()}
							value={value}
							onClick={onClick}
						>
							{value}
						</button>
					))}
				</div>
			</div>
		</div>
	);
};
