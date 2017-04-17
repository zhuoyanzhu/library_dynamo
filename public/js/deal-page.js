$(document).ready(function () {
	const baseUrl = '/deal';


	$('#return').click(() => {
		let sName = $('#sn').val();
		let bName = $('#bn').val();
		let bId = $('#bi').val();
		if(sName && bName && bId) {
			let params = {
				borrower: sName,
				title: bName,
				ID: bId
			}
			$.post(`${baseUrl}/return`, params, (msg, status) => {
				alert(msg);
			});
		}
	});

	$('#borrow').click(() => {
		let sName = $('#sn').val(),
			bName = $('#bn').val(),
			bId = $('#bi').val();
		if(sName && bName && bId) {
			let params = {
				borrower: sName,
				title: bName,
				ID: bId
			}
			$.post(`${baseUrl}/borrow`, params, (msg, status) => {
				alert(msg);
			});
		}
	});



});