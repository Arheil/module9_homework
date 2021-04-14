// Напишите код приложения, интерфейс которого представляет собой input и кнопку. В input можно ввести любое число. При клике на кнопку происходит следующее:

// Если оба числа не попадают в диапазон от 100 до 300 или введено не число — выводить ниже текст «одно из чисел вне диапазона от 100 до 300»;
// Если числа попадают в диапазон от 100 до 300 — сделать запрос c помощью fetch по URL https://picsum.photos/200/300, где первое число — ширина картинки, второе — высота.
	
	const btn = document.querySelector('.j-btn-request');
	const result = document.querySelector('.j-result');

	btn.addEventListener('click', () => {
		const value_1 = document.querySelector('#input_1').value;
		const value_2 = document.querySelector('#input_2').value;

		if (value_1 >= 100 && value_1 <= 300 && value_2 >= 100 && value_2 <= 300) {

			fetch(`https://picsum.photos/${value_1}/${value_2}`)
				.then((response) => {
					let img = document.createElement("img");
					result.innerText = "";
					img.setAttribute("src", response.url);
					img.setAttribute("height", value_1);
					img.setAttribute("width", value_2);
					result.appendChild(img);
				})
				.catch((event) => {
					console.log("Ошибка запроса", event);
				});
		} else {
			const message = "одно из чисел вне диапазона от 100 до 300";
			const p = document.createElement('p');
			p.innerText = message;
			p.style.color = 'red';
			document.body.append(p);
		}
	})