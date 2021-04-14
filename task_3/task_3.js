// Напишите код приложения, интерфейс которого представляет собой input и кнопку. В input можно ввести любое число. При клике на кнопку происходит следующее:

// Если число не попадает в диапазон от 1 до 10 — выводить ниже текст «число вне диапазона от 1 до 10».
// Если число попадает в диапазон от 1 до 10 — сделать запрос c помощью XHR по URL https://picsum.photos/v2/list?limit=10, где get-параметр limit — это введённое число.

function useRequest(url, callback) {
	var xhr = new XMLHttpRequest();
	let limit = document.querySelector('input').value;

	xhr.open('GET', url, true);

	if (limit < 1 || limit > 10) {
		alert('число вне диапазона от 1 до 10');
	}

	xhr.onload = function () {
		if (xhr.status != 200) {
			console.log('Статус ответа: ', xhr.status);
		} else {
			const result = JSON.parse(xhr.response);
			if (callback) {
				callback(result);
			}
		}
	};

	xhr.onerror = function () {
		console.log('Ошибка! Статус ответа: ', xhr.status);
	};

	xhr.send();
};


const resultNode = document.querySelector('.j-result');

const btnNode = document.querySelector('.j-btn-request');

function displayResult(apiData) {
	let cards = '';

	apiData.forEach(item => {
		const cardBlock = `
		<div class="card">
		  <img
			src="${item.download_url}"
			class="card-image"
		  />
		  <p>${item.author}</p>
		</div>
	  `;
		cards = cards + cardBlock;
	});

	resultNode.innerHTML = cards;
}

btnNode.addEventListener('click', () => {
	let limit = document.querySelector('input').value;
	useRequest(`https://picsum.photos/v2/list/?limit=${limit}`, displayResult);
})