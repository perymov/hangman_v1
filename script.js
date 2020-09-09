/* var pickWord = function () {
// Возвращает случайно выбранное слово
var words = [
  "программа",
  "макака",
  "прекрасный",
  "оладушек"
];

return words[Math.floor(Math.random() * words.length)];
};

var setupAnswerArray = function (word) {
// Возвращает итоговый массив для заданного слова word
var answerArray = [];
for (var i = 0; i < word.length; i++) {
  answerArray[i] = "_";
}

return answerArray;
};

var showPlayerProgress = function (answerArray) {
// С помощью alert отображает текущее состояние игры
alert(answerArray.join(" "));
};

var getGuess = function () {
// Запрашивает ответ игрока с помощью prompt
return prompt("Угадайте букву, или нажмите Отмена для выхода из игры.");
};

var updateGameState = function (guess, word, answerArray) {
// Обновляет answerArray согласно ответу игрока (guess)
// возвращает число, обозначающее, сколько раз буква guess
// встречается в слове, чтобы можно было обновить значение
// remainingLetters
var appearances = 0;
for (var j = 0; j < word.length; j++) {
  if (word[j] === guess) {
	 answerArray[j] = guess;
	 appearances++;
  }
}

return appearances;
};

var showAnswerAndCongratulatePlayer = function (answerArray) {
// С помощью alert показывает игроку отгаданное слово
// и поздравляет его с победой
showPlayerProgress(answerArray);
alert("Отлично! Было загадано слово " + answerArray.join(""));
};

// word: загаданное слово
var word = pickWord();
// answerArray: итоговый массив
var answerArray = setupAnswerArray(word);
// remainingLetters: сколько букв осталось угадать
var remainingLetters = word.length;

while (remainingLetters > 0) {
showPlayerProgress(answerArray);
// guess: ответ игрока
var guess = getGuess();
if (guess === null) {
  break;
} else if (guess.length !== 1) {
  alert("Пожалуйста, введите одиночную букву.");
} else {
  // correctGuesses: количество открытых букв
  var correctGuesses = updateGameState(guess, word, answerArray);
  remainingLetters -= correctGuesses;
}
}

showAnswerAndCongratulatePlayer(answerArray);
*/



let pickWord = function () {
	let words = [
		"программа", "макака", "прекрасно", "оладушек", "звезда", "облако", "крокодил"
	];
	return words[Math.floor(Math.random() * words.length)];
};

let setupAnswerArray = function (word) {
	let answerArray = [];
	for (let i = 0; i < word.length; i++) {
		answerArray[i] = "_";
	}
	return answerArray;
};


let showPlayerProgress = function (answerArray) {
	alert(answerArray.join(""));
};

let getGuess = function () {
	return prompt("Угадайте букву или нажмите отмена для выхода из игры.");
};

let updateGameState = function (guess, word, answerArray) {
	guessCount--;

	for (let j = 0; j < word.length; j++) {
		if (word[j] === guess && answerArray[j] === "_") {
			alert("Верно. Молодец!");
			answerArray[j] = guess;
			remainingLetters--;
		} else if (answerArray[j] === guess) {
			alert("Вы уже угадали эту букву!");
		}
	}
	alert("Оставшиеся попытки: " + guessCount);
};


let showAnswerAndCongratulatePlayer = function (answerArray) {
	showPlayerProgress(answerArray);
	/*alert(answerArray.join(" "));*/
	if (guessCount > 0) {
		alert("Отлично! Было загадано слово: " + word);
	} else {
		alert("Очень плохо! было загадано слово: " + word);
	}
};

alert("Добро пожаловать в игру 'Виселица'");

let word = pickWord();

let answerArray = setupAnswerArray(word);

let remainingLetters = word.length;

let guessCount = 20;
alert("Количество попыток угадать букву: " + guessCount);

while (remainingLetters > 0 && guessCount > 0) {
	alert(answerArray.join(" "));

	let guess = getGuess();
	if (guess == guess.toUpperCase()) {
		guess = guess.toLowerCase();
	}
	if (guess === null) {
		break;
	} else if (guess.length !== 1) {
		alert("Введи одну букву, осел!!!");
	} else {
		let correctGuesses = updateGameState(guess, word, answerArray);
	}
}

showAnswerAndCongratulatePlayer(answerArray);
