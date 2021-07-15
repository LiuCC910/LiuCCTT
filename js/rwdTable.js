// function rwdTable(){	
// 	$('table.rwdTable').each(function(){
// 		var _row = $(this).find('tr').not('.hiddenRow');
// 		rowCount = _row.length;
// 		for ( var n=1; n<=rowCount ; n++ ) {
// 			$(this).find('th').each(function(index) {
// 				var thText = $(this).text();
// 				_row.eq(n).find('td').eq(index).attr('data-title', thText);
// 			});
// 		}
// 	});
// }

// Jason 修改的
function rwdTable(){	
	$('table.rwdTable').each(function(){
		var _row = $(this).find('tr').not('.hiddenRow');
		rowCount = _row.length;
		for ( var n = 1; n <= rowCount ; n++ ) {
			$(this).find('thead th').each(function(index) {
				var thText = $(this).text();
				if (_row.eq(n).find('td').attr('class') != 'dataTables_empty')
					_row.eq(n).find('td').eq(index).attr('data-title', thText);
			});
		}
	});
}
