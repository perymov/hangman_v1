'use strick';

document.addEventListener('DOMContentLoaded', () => {

	// Задаем переменные и функции:
	const addForm = document.querySelector('form.add'), // получаем форму
		btn = addForm.querySelector('button'), // получаем кнопку формы
		addInput = addForm.querySelector('.guess__input'), // получаем input 
		msg = document.querySelector('.massage__area'), // получаем div для вывода сообщений
		pickWord = function () {  // генерируем слово
			let words = [
				"программа",
				"макака",
				"прелесть",
				"оладушек",
				"звезда",
				"облако",
				"крокодил",
				"балалайка",
				"торнадо",
				"небоскреб"
			];
			return words[Math.floor(Math.random() * words.length)];
		},
		word = pickWord(), // получаем сгенерированное слово
		letterList = document.querySelector('.letter__list'),  // получаем строку для вставки ячеек
		wrongLetters = document.querySelector('.wrong__letters'), // получаем поле ввода неверных ответов
		guessBtn = document.querySelector('.guess'),  // получаем кнопку 'Я знаю ответ'
		newGameBtn = document.querySelector('.new__game'),  // получаем кнопку 'Начать новую игру'
		count = document.querySelector('.guess__count');  // получаем поле счетчика 

	let guessCount = 11;  // задаем количество попыток
	let remainingLetters = word.length;  // получаем количество букв в сгенерированном слове
	let setupAnswerArray = function () {  // создаем переменную
		let answerArray = [];  // в которую будет выводится массив
		for (let i = 0; i < word.length; i++) {  // равный по длине сгенерированному слову
			answerArray[i] = "_";  // состоящий из пустых значений
		}
		return answerArray;  // возвращаем готовый массив
	};
	let answerArray = setupAnswerArray(word); // переменная с готовым массивом пустых значений
	let wrongAnswer = [];  // создаем массив с неправильными вариантами
	let showAnswerAndCongratulatePlayer = function () {
		if (guessCount > 0 && remainingLetters == 0) {   // проверям есть ли еще попытки и разгадано ли слово
			msg.innerText = `Отлично! Было загадано слово: ${word}`; // поздравляем игрока с победой
			guessBtn.disabled = true;  // блокируем кнопку 'Я знаю ответ'
			blockInput();  // блокируем элементы формы
			showBtn();  // показываем кнопку 'Начать новую игру'
		} else if (guessCount < 1) { // проверяем что попыток не осталось
			msg.innerText = `Очень плохо! Было загадано слово: ${word}((`; // сожалеем о проигрыше
			guessBtn.disabled = true;  // блокируем кнопку 'Я знаю ответ'
			blockInput();  // блокируем элементы формы
			showBtn();  // показываем кнопку 'Начать новую игру'
		}
	};

	function showTdContent(i) {
		td[i].classList.add('show'); // показываем значение в ячейке
	}
	function blockInput() { // функция блокировки
		addInput.setAttribute('disabled', true);  // поля ввода
		btn.setAttribute('disabled', true);  // и кнопки 'Ввод'
	}
	function showBtn() {  // функция для кнопки 'Начать новую игру'
		newGameBtn.classList.add('show_btn');  // показываем кнопку
		newGameBtn.addEventListener('click', () => {  // по клику на кнопку
			location.reload(true);  // перезагружаем страницу
		});
	}
	function updateHangmanPicture() {  // функция смены картинки
		document.querySelector('#img').src = 'image/' + guessCount + '.png';
	}

	// отображаем начальное количество попыток
	count.innerHTML = guessCount;

	// Создаем ячейки таблицы на странице:
	for (let i = 0; i < word.length; i++) {  // формируем ячейки с буквами сгенерированного слова
		letterList.innerHTML += `<td class = "letter__sell"><span>${word[i]}</span></td>`;
	}
	let td = document.querySelectorAll('.letter__sell'); // получаем ячейки

	// Обрабатываем значения полученые от пользователя:
	addForm.addEventListener('submit', (event) => {  // работаем с формой
		event.preventDefault();  // отменяем стандартные действия браузера
		let newLetter = addInput.value; // получаем значение поля input 
		if (newLetter == '') {
			msg.innerText = 'Нужно ввести букву!';
		} else if (newLetter.length > 1) { // проверяем длину значения поля input 
			msg.innerText = 'Введи одну букву, пожалуйста!!!'; // если больше 1, получите сообщение
		} else {
			for (let i = 0; i < word.length; i++) { // перебираем сгенерированное слово
				if (newLetter == newLetter.toUpperCase()) { // проверям регистр, если верхний 
					newLetter = newLetter.toLowerCase();     // то переводим в нижний
				}
				if (newLetter === word[i] && answerArray[i] === "_") {  // и сравниваем его с введенным значением
					msg.innerText = '';  // очищаем поле сообщений
					remainingLetters--;  // уменьшаем количество загаданных букв на единицу
					showTdContent(i);                 // если совпадает показываем значение в ячейке
					answerArray[i] = newLetter;  // добавляем в массив угаданную букву
					msg.innerText = `Молодец! Ты угадал букву ${newLetter}!`;
				} else if (answerArray[i] === newLetter) {  // сравниваем буквы в массиве с буквой введенной пользователем
					msg.innerText = 'Ты уже угадал эту букву!';  // если совпадают выводим сообщение
				}
			}
			if (word.indexOf(newLetter) === -1) {  // проверяем, что в слове нет введенной пользователем буквы
				updateHangmanPicture();  // меняем картинку
				wrongAnswer.push(newLetter);  // добавляем букву введенную пользователем в массив неправильных вариантов
				wrongLetters.innerText = `Неверные варианты ответа: ${wrongAnswer}`;  // выводим сообщение с неверными ответами
				msg.innerText = 'К сожалению ты не прав((';  // выводим сообщение с сожалением
				guessCount--; // уменьшаем количество попыток на 1(надо сделать только для неправильных вариантов!!!)
			}
			event.target.reset(); // очищаем значение поля ввода
			showAnswerAndCongratulatePlayer(answerArray);
			if (guessCount <= 0) {  // создаем условие о том что если счетчик меньше нуля
				guessCount = 0;      // выставляем его значение на ноль
			}
			count.innerText = guessCount; // выводим актуальное количество оставшихся попыток
		}
	});

	// Работаем с кнопкой 'Я знаю ответ'
	guessBtn.addEventListener('click', () => {  // работа с кнопкой "Я знаю слово"
		let guessWord = prompt(`Введите слово:`);  // игрок вводит свой вариант
		if (guessWord === word) {  // проверяем совпадает ли с загаданым словом
			for (let i = 0; i < word.length; i++) {  // если да 
				showTdContent(i);  // открываем слово
			}
			msg.innerText = 'Поздравляем!!! Ты угадал слово!';  // и поздравляем с победой
			guessBtn.disabled = true;  // блокируем кнопку 'Я знаю ответ'
			blockInput();  // блокируем элементы формы
			showBtn();  // показываем кнопку 'Начать новую игру'
		} else {
			msg.innerText = 'К сожалению, Ты не угадал((('; // или если нет сожалеем о неудачной попытке
		}
	});
});

