$(document).ready(function () {
	const baseUrl = '/search';

	let books = [];
	let user = {};
	let vm = new Vue({
		el: '#table',
		data: {
			books: books,
			user: user
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
	
	$.get(`/show/user`, (msg) => {
		vm.user = msg;
	});
});

function clickbutton(id, name) {
	let params = {
		ID: id,
		borrower: name
	}
	console.log(name);
	$.post(`/deal/borrow`, params, (msg, status) => {
		alert(msg);
	});

}
