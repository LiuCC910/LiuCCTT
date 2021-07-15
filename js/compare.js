$(function(){
  var _body = $('body');
  var _window = $(window);

  var ww = _window.width();
  var wwNew = ww;
  var wwMedium = 700; //此值以下是手機
  var wwSlim = 500;


  	//產品、供應商比較表格
    var _cpList = $('.compareList');
    var _scrollX = $('.scrollX');
    var _msgEmpty = _cpList.find('.msgEmpty');
    var _scContent = _scrollX.find('.scrollContent');
    var _scTable = _scContent.find('table');
    var _checkRow = _scTable.find('.checkAll').parent('tr');
    // var _checkAll = _scTable.find('.checkAll').find('input[type="checkbox"]');
    var _checkOne = _scTable.find('.checkAll').siblings().find('input[type="checkbox"]');
    var _removeBtn = _cpList.find('.funcBtnGp').find('.remove');
    var _toL = _scrollX.find('.toLeft').hide();
    var _toR = _scrollX.find('.toRight');
    var _fixTbHeader;
    var colCount = _scTable.find('tr').first().find('td, th').length-1;
    var visibleWidth = _scrollX.width()+2;
    var cf=0;
    var tbWidth ;
    var wCell ;
    var wHead = _scTable.find('tr').eq(0).children().first().innerWidth();
    var speed = 400;

if(ww <= wwSlim ){
  wCell = .96*ww - wHead;
} else {
  wCell = 300;
}

for (var i = 0; i < colCount; i++) {
  _checkRow.eq(0).find('td').eq(i).find('input[type="checkbox"]').attr('name','pdid'+i);
  _checkRow.eq(1).find('td').eq(i).find('input[type="checkbox"]').attr('name','pdid'+i);
}

tbWidth = _scTable.width(wHead + wCell*colCount);
_scContent.width(tbWidth);
_scContent.clone().insertAfter(_scContent).removeClass('scrollContent').addClass('fixTbHeader');
_fixTbHeader = _scrollX.find('.fixTbHeader').width(wHead);
var _checkAll = _scrollX.find('.checkAll').find('input[type="checkbox"]');
// if (cf==1 && colCount > 3) {_fixTbHeader.show()};

// check / uncheck
_checkOne.change(function(){
  var ix = $(this).parents('td').index()-1;

  _scTable.find('tr').each(function(){
      $(this).children('td').eq(ix).toggleClass('inSelect');
  })

  if($(this).parents('tr').index()==0){
    _checkOne.eq(ix + colCount).prop('checked', this.checked);
  } else {
    _checkOne.eq(ix).prop('checked', this.checked);
  }
  if(_checkAll.prop('checked')){
    _checkAll.prop('checked', false);
  }
});

_checkAll.change(function(){
  _checkOne.prop('checked', this.checked);
  this.checked ? _scTable.find('td').addClass('inSelect') : _scTable.find('td').removeClass('inSelect');
  _checkAll.prop('checked', this.checked);
});


_removeBtn.click(function(){
  var delLength = _checkRow.eq(0).find('.inSelect').length;

  _scTable.find('.inSelect').remove();
  _fixTbHeader.remove();
  
  _checkAll = _scTable.find('.checkAll').find('input[type="checkbox"]');
  _checkOne = _scTable.find('.checkAll').siblings().find('input[type="checkbox"]');
  colCount = colCount - delLength;
  tbWidth = _scTable.width(wHead + wCell*colCount);
  _scContent.width(tbWidth);

  _scTable.clone().insertAfter(_scContent).wrap('<div class="fixTbHeader" />');
  _fixTbHeader = _scrollX.find('.fixTbHeader').width(wHead);

 
  if( colCount == 0 ){
    _msgEmpty.show();
    _scrollX.hide();
    _fixTbHeader.remove();
    _removeBtn.add(_removeBtn.siblings()).addClass('disabled');
  }

});



_toR.click(function(){
  cf=1;
  _toL.fadeIn();
  _scContent.animate({scrollLeft:'+=' + wCell },speed,function(){
    if(_scContent.scrollLeft() >= tbWidth-visibleWidth ) {
      _toR.fadeOut();
    }
  });
  _fixTbHeader.show();
});
_toL.click(function(){
  _toR.fadeIn();
  _scContent.animate({scrollLeft:'-=' + wCell}, speed, function(){
    if(_scContent.scrollLeft() == 0 ){
      _toL.fadeOut();
      _fixTbHeader.hide();
      cf=0;
    }
  });
});

_scContent.scroll(function(){
  if(_scContent.scrollLeft()>0){
    _fixTbHeader.show();
  } else {
    _fixTbHeader.hide();
  }
})

// _scrollX.find('.infoLabel').parent('td').css({
//   'text-align':'center',
//   'vertical-align':'middle'
// });

})