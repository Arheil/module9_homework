// Написать код приложения, интерфейс которого состоит из двух input и кнопки. В input можно ввести любое число.

// Заголовок первого input — «номер страницы».
// Заголовок второго input — «лимит».
// Заголовок кнопки — «запрос».
// При клике на кнопку происходит следующее:

// Если число в первом input не попадает в диапазон от 1 до 10 или не является числом — выводить ниже текст «Номер страницы вне диапазона от 1 до 10»;
// Если число во втором input не попадает в диапазон от 1 до 10 или не является числом — выводить ниже текст «Лимит вне диапазона от 1 до 10»;
// Если и первый, и второй input не в диапазонах или не являются числами — выводить ниже текст «Номер страницы и лимит вне диапазона от 1 до 10»;
// Если числа попадают в диапазон от 1 до 10 — сделать запрос по URL https://picsum.photos/v2/list?page=1&limit=10, где GET-параметр page — это число из первого input, а GET-параметр limit — это введённое число второго input. 
	
	const btn = document.querySelector('.j-btn-request');
	const result = document.querySelector('.j-result');

	btn.addEventListener('click', () => {
		const value_1 = document.querySelector('#input_1').value;
		const value_2 = document.querySelector('#input_2').value;
		let urlFetch = `https://picsum.photos/v2/list?page=${value_1}&limit=${value_2}`;

		if (value_1 < 1 || value_1 > 10 || typeof +value_1 !== 'number') {
			const p = document.createElement('p');
			p.innerText = 'Номер страницы вне диапазона от 1 до 10';
			p.style.color = 'red';
			result.append(p);
		} else if(value_2 < 1 || value_2 > 10 || typeof +value_2 !== 'number') {
			const p = document.createElement('p');
			p.innerText = 'Лимит вне диапазона от 1 до 10';
			p.style.color = 'red';
			result.append(p);
		}else{
			fetch(urlFetch, {mode: "no-cors"}) 
				.then((response) => {
					// console.log(response);
					let img = document.createElement('img');
					result.innerText = "";
					img.setAttribute('src', response.url);
					img.setAttribute('width', 350);
					img.setAttribute('height', 350);
					img.setAttribute('alt', 'image');
					result.appendChild(img);

				})
				.catch((event) => {
					console.log('Ошибка запроса', event);
				})

					localStorage.setItem('img', urlFetch);
					let oldData = localStorage.getItem('img');
					let p = document.createElement('p');
					p.append(oldData);
		}
		
	})// Не могу понять почему не выводится картинка. devTools показывает, что всё загружено.

