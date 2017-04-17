$(document).ready(function () {
	const baseUrl = '/search';

	let books = [];
	let vm = new Vue({
		el: '#table',
		data: {
			books: books
		}
	});
	$('#search').click(() => {
		let name = $('#name').val()
		let author = $('#author').val()
		let lang = $('#lang').val()
		if(name) {
			let params = {
				title: name,
				author: author,
				lang: lang
			}
			$.post(`${baseUrl}/search`, params, (msg, status) => {
				vm.books = JSON.parse(msg);
			});
		}
	});
});
