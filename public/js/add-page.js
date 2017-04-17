$(document).ready(function () {
	const baseUrl = '/add';


	$('#add').click(() => {
		let id = $('#id').val()
		let name = $('#name').val()
		let author = $('#author').val()
		let lang = $('#lang').val()
		let number = parseInt($('#number').val())
		if(id && name && author && Number.isInteger(number)) {
			let params = {
				ID: id,
				title: name,
				author: author,
				lang: lang,
				num: number
			}
			$.post(`${baseUrl}/add`, params, (msg, status) => {
				alert(msg);
			});
		}
	});
});