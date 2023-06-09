const alphaUpper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const alphaLower = "abcdefghijklmnopqrstuvwxyz";
const numbers = "0123456789"
const symbols = "!@#$%^&*()";

const generateEl = document.getElementById('generate');
const upperEl = document.getElementById('upper');
const lowerEl = document.getElementById('lower');
const numbersEl = document.getElementById('numbers');
const controls = document.querySelectorAll('.controls');
const symbolsEl = document.getElementById('symbols');
const main = document.querySelector('.main-div');
const copy = document.getElementById('copy');
const screen = document.querySelector('.password');
const lengthEl = document.getElementById('length')

let password = "";
let string = "";
let upperFlag = false;
let lowerFlag = false;
let numbersFlag = false;
let symbolsFlag = false;
let numbersOfFlags = 0;
let length = 0;

controls.forEach(control=> control.addEventListener('change', ()=> {
	string = "";
	upperEl.checked ? string += alphaUpper :string = string.replace(alphaUpper, '').trim();
	upperFlag = (upperEl.checked ? true : false);
	lowerEl.checked ? string += alphaLower :string = string.replace(alphaLower, '').trim();
	lowerFlag = (lowerEl.checked ? true : false);
	numbersEl.checked ? string += numbers :string = string.replace(numbers, '').trim();
	numbersFlag = (numbersEl.checked ? true : false);
	symbolsEl.checked ? string += symbols :string = string.replace(symbols, '').trim();
	symbolsFlag = (symbolsEl.checked ? true : false);
	console.log(upperFlag);
	console.log(lowerFlag);
	console.log(numbersFlag);
	console.log(symbolsFlag);
	valid();
}))

lengthEl.addEventListener('input', (e)=> {length = parseInt(e.target.value); valid()});


valid();
generateEl.addEventListener('click', ()=> {
	valid();
	generatePass();
	exactPass();
	screen.innerHTML = password;
})

copy.addEventListener('click', ()=> {
	navigator.clipboard.writeText(password);
})

function exactPass() {
	let counter = 0;
	numbersOfFlags = 0;
	calculateCond();
	while (true) {
		counter = 0;
		if (upperFlag) {
			if (/[A-Z]/.test(password))
				counter++;
		}
		if (lowerFlag) {
			if (/[a-z]/.test(password))
				counter++;
		}
		if (numbersFlag) {
			if (/\d/.test(password))
				counter++;
		}
		if (symbolsFlag) {
			if (/[!@#$%^&*()]/.test(password))
				counter++;
		}
		if (counter == numbersOfFlags)
			break;
		generatePass();
	}
}

function generatePass() {
	password = "";
	for (let index = 0; index < length; index++) {
		let number = Math.floor(Math.random() * string.length);
		password += string[number];
	}
}

function valid() {
	if ((!upperFlag && !lowerFlag && !numbersFlag && !symbolsFlag)) {
		generateEl.classList.add('disabled');
		generateEl.disabled = true;
	}
	else {
		generateEl.classList.remove('disabled');
		generateEl.disabled = false;
	}
}

function calculateCond() {
	if (upperFlag) numbersOfFlags++;
	if (lowerFlag) numbersOfFlags++;
	if (numbersFlag) numbersOfFlags++;
	if (symbolsFlag) numbersOfFlags++;
}