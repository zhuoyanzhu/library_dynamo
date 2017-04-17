$(document).ready(function () {

	let books = [];
	let user = {};
	let vm = new Vue({
		el: '#table',
		data: {
			books: books,
			user: user
		}
	});


	// const ws = new WebSocket("ws://localhost:8181");
	// ws.onopen = () => {
	// 	console.log('connected to server');
	// };
	// ws.onmessage = (ev) => {
	// 	let newData = JSON.parse(ev.data);
	// 	for (let i = 0; i < vm.books.length; i++) {
	// 		if (vm.books[i].ID === newData.ID) {
	// 			vm.books[i].num = newData.num;
	// 			vm.books[i].borrower = newData.borrower;
	// 			break;
	// 		}
	// 	}

	// }

	const baseUrl = '/show';
	$.get(`${baseUrl}/list`, (msg) => {
		vm.books = JSON.parse(msg);
	});

	// $('.borrow').click(() => {
	// 	let bookID = $(this).closest('tr').find('td:first');
	// 	alert(1);
	// 	if(sName && bName && bId) {
	// 		let params = {
	// 			borrower: sName,
	// 			title: bName,
	// 			ID: bId
	// 		}
	// 		$.post(`${baseUrl}/borrow`, params, (msg, status) => {
	// 			alert(msg);
	// 		});
	// 	}
	// });
	$.get(`${baseUrl}/`, () => {
		vm.user = "{{ user }}";
	});
	

})

function clickbutton(id, name) {
	let params = {
		ID: id,
		borrower: name
	}
	$.post(`/show/borrow`, params, (msg, status) => {
		alert(msg);
	});

}