import { useState } from 'react';
import '../css/mvp.css';
import formelrad from '../image/formelradelektronik.gif';
import InputField from '../formular/InputField';

export default function Formelrad() {
	const [values, setValues] = useState({
		u: 10,
		i: 2,
		r: '',
		p: '',
	});

	const [colors, setColors] = useState({
		u: 'black',
		i: 'black',
		r: 'black',
		p: 'black',
	});

	const calculate = (event) => {
		event.preventDefault();

		const u = parseFloat(values.u);
		const i = parseFloat(values.i);
		const r = parseFloat(values.r);
		const p = parseFloat(values.p);

		if (isNaN(u)) {
			console.warn('Spannung (u) muss gesetzt sein');
			return;
		}

		if (values.i === '' && values.r === '') {
			// calculate i and r
			if (isNaN(p)) {
				console.warn('Leistung (p) muss gesetzt sein für diese Berechnung');
				return;
			}
			const newI = p / u;
			const newR = (u * u) / p;
			setValues((v) => ({
				...v,
				i: newI.toFixed(2),
				r: newR.toFixed(2),
			}));
			setColors((c) => ({
				...c,
				i: 'black',
				r: 'black',
			}));
		} else if (values.i === '' && values.p === '') {
			// calculate i and p
			if (isNaN(r)) {
				console.warn('Widerstand (r) muss gesetzt sein für diese Berechnung');
				return;
			}
			const newI = u / r;
			const newP = (u * u) / r;
			setValues((v) => ({
				...v,
				i: newI.toFixed(2),
				p: newP.toFixed(2),
			}));
			setColors((c) => ({
				...c,
				i: 'red',
				p: 'red',
			}));
		} else {
			// calculate r and p
			if (isNaN(i)) {
				console.warn('Stromstärke (i) muss gesetzt sein für diese Berechnung');
				return;
			}
			const newR = u / i;
			const newP = u * i;
			setValues((v) => ({
				...v,
				r: newR.toFixed(2),
				p: newP.toFixed(2),
			}));
			setColors((c) => ({
				...c,
				r: 'blue',
				p: 'blue',
			}));
		}
	};

	return (
		<>
			<section>
				<header>
					<h2>Formelrad</h2>
					<img src={formelrad} width="200" alt="Formelrad" />
				</header>
				<form onSubmit={calculate}>
					<InputField
						color={colors.u}
						value={values.u}
						label="Spannung"
						handleChange={(e) => {
							setValues((values) => ({ ...values, u: e.target.value }));
						}}
					/>
					<InputField
						color={colors.i}
						value={values.i}
						label="Stromstärke"
						handleChange={(e) => {
							setValues((values) => ({ ...values, i: e.target.value }));
						}}
					/>
					<InputField
						color={colors.r}
						value={values.r}
						label="Widerstand"
						handleChange={(e) => {
							setValues((values) => ({ ...values, r: e.target.value }));
						}}
					/>
					<InputField
						color={colors.p}
						value={values.p}
						label="Leistung"
						handleChange={(e) => {
							setValues((values) => ({ ...values, p: e.target.value }));
						}}
					/>
					<button type="submit">Calculate</button>
				</form>
			</section>
		</>
	);
}
