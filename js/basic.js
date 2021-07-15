$(function(){

  var _body = $('body, html');
  var _window = $(window);
  var _header = $('.topZone');

  var ww = _window.width();
  var wh = _window.height();
  var wwNew = ww;
  var wwMedium = 700; //此值以下是手機
  var wwWide = 1000;  //此值以上是電腦
  var wwMaximum = 1300;
  var wwSlim = 500;

  //from redoToplink
  var _oldSidebarMask = $('.sidebarMask');
  console.debug('remove old sidebarMask');
  _oldSidebarMask.remove();

  // side bar and menu
  var _sideBar = $('.sideBar');
  var _sideBarCtrl = $('.sideBarCtrl');
  var sideBarWidth = 240;
  var sideBarWidthHidden = 48;
  var _menu = _sideBar.find('.menu');
  var _main = $('.main');
  var hh = _header.outerHeight(true);
  var selectedType = [];


  _menu.find('li').has('ul').addClass('hasChild');

  _sideBarCtrl.append('<span></span><span></span><span></span>');

  _body.filter('body').append('<div class="coverAll"></div><div class="sidebarMask"></div>');
  var _coverAll = $('body').children('.coverAll');
  var _sidebarMask = $('.sidebarMask');
  _coverAll.add(_sidebarMask).hide();

  // sideBar show/hide control
  if(ww < wwWide){
    _sideBar.addClass('hidden');
  } else {
    _sideBarCtrl.addClass('closeIt');
  }
  _sideBarCtrl.click(function(){
    if(_sideBar.hasClass('hidden')){
      $(this).addClass('closeIt');
      _sideBar.removeClass('hidden');
      if(ww >= wwMedium){
        _main.animate({'margin-left': sideBarWidth});
        _menu.animate({'width': sideBarWidth},function(){$(this).find('.activated').children('ul').show(400);});
        _sideBar.animate({'width':sideBarWidth});
      } else {
        _sideBar.animate({'margin-left': 0, 'width':sideBarWidth});
        _sidebarMask.show();
      }
    } else {
      $(this).removeClass('closeIt');
      if(ww >= wwMedium){
        _main.animate({'margin-left': sideBarWidthHidden});
        _menu.animate({'width': sideBarWidthHidden}).find('.activated').children('ul').hide(400);
        _menu.find('.activated').removeClass('activated');
        _sideBar.animate({'width':sideBarWidthHidden}, function(){
          _sideBar.addClass('hidden');
        });
      } else {
        _sideBar.animate({'margin-left': -1*sideBarWidth}, function(){
          _sideBar.addClass('hidden');
        });
        if(_topMenuClone.is(':hidden')){
          _sidebarMask.fadeOut();
        }
      }
    }

    setTimeout(function(){
      if ($('.slideinBox.in').find('.smartModule').length > 0) {
        setFrViewHeight();
      }
    }, 700)

  });
  _sidebarMask.click(function(){
    $(this).fadeOut();
    if(ww < wwMedium ){
      _sideBar.animate({'margin-left': -1*sideBarWidth}, function(){
        _sideBar.addClass('hidden');
        _sideBarCtrl.removeClass('closeIt');
      });
    }
    _topMenuClone.stop(true,true).slideUp().addClass('hidden');
    if( _topCart.is(':visible')){
      _topCart.removeAttr('style');
    }
    _topMenuCtrl.removeClass('closeIt');
  });

  // .multi level menu
  var _menuItem = _menu.find('li');
  var _menuItem_A = _menuItem.children('a');

  _menuItem_A.click(function(){
    var _thisLi = $(this).parent('li');
    if( !_sideBar.hasClass('hidden')){
      if(_thisLi.hasClass('activated')){
        _thisLi.removeClass('activated');
        if (_thisLi.hasClass('hasChild')) {
          _thisLi.children('ul').stop(true,true).slideUp();
        }
      } else {
        _thisLi.addClass('activated');
        if (_thisLi.hasClass('hasChild')){
          _thisLi.children('ul').stop(true,true).slideDown();
        }
        _thisLi.siblings().removeClass('activated').children('ul').stop(true,true).slideUp().find('li').removeClass('activated');      
      }
    } else {
      _thisLi.children('ul').show();
      _thisLi.siblings().children('ul').hide();
    }
  });
  
  _menuItem_A.mouseenter(
    function(){
      if (_sideBar.hasClass('hidden')){
        $(this).parent('li').children('ul').stop(true,true).fadeIn(300);
        $(this).parent('li').siblings().children('ul').stop(true,true).fadeOut(300);
      }
    }
  )
  _menu.mouseleave(
    function(){
      if (_sideBar.hasClass('hidden')){$(this).find('li').find('ul').fadeOut(300);}
    }
  )


  // .topMenu
  var _topMenu = $('.topMenu');
  var _hasChildItem = _topMenu.find('li').has('ul').addClass('hasChild');
  var _cartNotEmpty = _topMenu.find('li').has('.top-cart').addClass('hasChild');
  var basicSpeed = .6;
  _hasChildItem.hover(
    function(){$(this).children('ul').stop(true,true).slideDown(
      $(this).children('ul').height()*basicSpeed)},
    function(){$(this).children('ul').fadeOut(400)}
  );
  _cartNotEmpty.hover(
    function(){$(this).children('.top-cart').stop(true,true).slideDown(
      $(this).children('.top-cart').height()*.4)},
    function(){$(this).children('.top-cart').fadeOut(400)}
  );
	
  //from redoToplink
  var _topMenuClone = $('.topMenuClone');
  /*
  var _oldTopMenuClone = $('.topMenuClone');
  console.debug('remove old clone');
  _oldTopMenuClone.remove();
  
  // topMenu clone for mobile *********************************************************
  */
  console.debug('find old _topMenuClone:'+_topMenuClone.length);
  if(_topMenuClone.length<=0){
  	_topMenuClone = _topMenu.clone().addClass('topMenuClone hidden').removeClass('topMenu');
    console.debug('clone new _topMenuClone:'+_topMenuClone.length);
  }else{
	_topMenuClone.addClass('topMenuClone hidden').removeClass('topMenu');
  }
  var _topCart = _topMenuClone.find('.top-cart');

  $('.webHeader').after(_topMenuClone);
  _topMenuClone.find('.hasSignIn').prependTo(_topMenuClone);
  var _topMenuCtrl = $('.topMenuCtrl');
  var _hasChildItemC = _topMenuClone.find('li').has('ul').addClass('hasChild');
  _topMenuClone.find('.msgCount').appendTo('.topZone');

  _topMenuClone.addClass('hidden');
  _topMenuCtrl.click(function(){
	console.debug('on click _topMenuClone:'+_topMenuClone.length
		+',hasClass hidden:'+_topMenuClone.hasClass('hidden')
		+',is hidden:'+_topMenuClone.is(':hidden')
		+',_topCart is visible:'+_topCart.is(':visible')
		+',_sideBar hasClass hidden:'+_sideBar.hasClass('hidden')
		+',_sideBar is hidden:'+_sideBar.is(':hidden')
		+',_sidebarMask is visible:'+_sidebarMask.is(':visible')
	);
    if (_topMenuClone.hasClass('hidden')){
      _topMenuClone.stop(true,true).slideDown().removeClass('hidden');
      _sidebarMask.show();
      _topMenuCtrl.addClass('closeIt');
    } else {
      _topMenuClone.stop(true,true).slideUp().addClass('hidden');
      _topMenuCtrl.removeClass('closeIt');
      if(_sideBar.hasClass('hidden')){
        _sidebarMask.fadeOut();
        if( _topCart.is(':visible')){
          _topCart.removeAttr('style');
       }  
      }
    }
  });

  _hasChildItemC.filter('.hello').addClass('activated');
  _hasChildItemC.click(function(){
	console.debug('on click _hasChildItemC ul is:'+$(this).children('ul').is(':hidden')+",hasClass activated:"+$(this).hasClass('activated'));
    if ($(this).children('ul').is(':hidden')) {
      _hasChildItemC.removeClass('activated').children('ul').slideUp();
      $(this).addClass('activated').children('ul').stop(true,true).slideDown();
    } else {
      $(this).removeClass('activated').children('ul').stop(true,true).slideUp();
    }
  });

  // top 的購物車內容
  var _cartItem = _topMenuClone.find('li.cart>a');
  var _closeCart = _topCart.find('.closeCart');
  _cartItem.click(function(){
    if(_topCart.is(':hidden')){
      _topCart.show();
    } else {
      _topCart.hide();
    }
  })
  _closeCart.click(function(){
    $(this).parent().hide();
  })




  // .hiddenRow show / hide 舊版用的，新版已無此版型 20210505
  // var _hiddenRowCtrl = $('.listTable').find('.hiddenRowCtrl');
  // _hiddenRowCtrl.parent('td').parent('tr').addClass('hasHiddenRow');

  // _hiddenRowCtrl.click(function(){
  //   var _hiddenRow = $(this).parent('td').parent('tr').next('.hiddenRow');
  //   var _hiddenRowContent = _hiddenRow.find('.drawer');
  //   if(_hiddenRow.is(':hidden')){
  //     _hiddenRow.show();
  //     if(ww <= wwMedium){
  //       _hiddenRow.attr('style', 'display:block');
  //     } else {
  //       _hiddenRow.attr('style', 'display:table-row');
  //     }
  //     _hiddenRowContent.stop(true,true).slideDown(600);
  //     $(this).addClass('closeIt');
  //   } else {
  //     _hiddenRowContent.stop(true,true).slideUp(600,
  //       function(){_hiddenRow.hide();}
  //     );
  //     $(this).removeClass('closeIt');
  //   }
  // });


  // drawer (slide up / slide down)
  var _togSlide = $('.toggleDrawer');
  var slideSpeed = 600;

  var textShow = '展開';
  var textHide = '收合';
  if(_togSlide.hasClass('search')){
    textShow = '展開查詢';
    textHide = '收合';
  }
  if(_togSlide.hasClass('searchAndFilter')){
    textShow = '查詢';
    textHide = '查詢';
  }
  if(_togSlide.hasClass('templates')){
    textShow = '插入樣板';
    textHide = '插入樣板';
  }
  if(_togSlide.hasClass('contactInfo')){
    textShow = '檢視並修改';
    textHide = '收合';
  }

  if( !_togSlide.hasClass('always')){
    if(ww < wwMedium){
      _togSlide.addClass('hidden').find('.toggleArea').hide();
      _togSlide.find('.toggleCtrl').removeClass('closeIt').text(textShow);
    } else {
      _togSlide.removeClass('hidden').find('.toggleArea').show();
    }
  } else {
    _togSlide.filter('.hidden').find('.toggleArea').hide();
  }

  _togSlide.each(function(){
    var _toggleDrawer = $(this);
    var _toggleCtrl = _toggleDrawer.find('.toggleCtrl');
    var _toggleArea = _toggleDrawer.find('.toggleArea');

    if(_toggleArea.is(':visible')){
      _toggleCtrl.text(textHide);
    }
    else{
      _toggleCtrl.text(textShow);
    }


 
    _toggleCtrl.click(function(){
      if(_toggleArea.is(':visible')){
        $(this).text(textShow).removeClass('closeIt');
        _toggleArea.slideUp(slideSpeed);
        _toggleDrawer.addClass('hidden');
      } else {
        _toggleArea.slideDown(slideSpeed);
        $(this).text(textHide).addClass('closeIt');
        _toggleDrawer.removeClass('hidden');
      }
    })


    // 20210420 游標離開「選取模版」下拉選單收起
    if (_toggleDrawer.hasClass('savedTemplate') ) {
      _toggleDrawer.mouseleave(function(){
        _toggleArea.slideUp(slideSpeed);
        _toggleDrawer.addClass('hidden');
        _toggleCtrl.removeClass('closeIt');
      })
    }

  });


  // 20210505 有主、副 tr 的收合效果
  var _Drawertable = $('.drawerTable');
  const bg_color_pale= '#f0f4f5';
  _Drawertable.each(function(){
    let _SumRow = $(this).find('.SumRow');

    _SumRow.first().addClass('ctc').nextUntil('.SumRow').show();

    _SumRow.each(function(){
      let _thisSumRow = $(this);
      let _subRow = _thisSumRow.nextUntil('.SumRow');
      _thisSumRow.click(function(){
        _subRow.slideToggle(0);
        $(this).toggleClass('ctc');
      });

      _thisSumRow.hover(
        function(){_subRow.css('background-color', bg_color_pale)},
        function(){_subRow.css('background-color', '')},

      )

    })
  })






  // reply 隱藏部分, layout by tr
  var _expandTable =  $('table').has('.hiddenFieldRow');
  var _rowSwitch = _expandTable.find('.rowSwitch');
  var _hiddenFieldRow = _expandTable.find('.hiddenFieldRow');
  var rowCount = _hiddenFieldRow.length;
  var trHeight = [];

  function getRowHeight(){
    _hiddenFieldRow.each(function () {
      trHeight.push($(this).height());
    })
    _hiddenFieldRow.height(0);
    _rowSwitch.removeClass('closeIt');
  }
  if (ww < wwMedium) {getRowHeight();}

  _rowSwitch.click(function(){
    $(this).toggleClass('closeIt');
    var i = 0;
    for (i=0; i<rowCount; i++){
      if (_hiddenFieldRow.eq(0).height() == 0){
        _hiddenFieldRow.eq(i).animate({'height': trHeight[i]});
      } else {
        _hiddenFieldRow.eq(i).animate({'height': 0});
      }
    }
  });
  

  // checkbox 和 radio 客製樣式
  $('.optionPool').each(function(){
    var _optionPool = $(this),
        _options = _optionPool.find('label').not('.checkAll').find('input[type="radio"], input[type="checkbox"]');
        _checkAll = _optionPool.find('.checkAll').find('input'); // 全選
    
    var placeholderText;

    if (window.location.href.indexOf('myMultimediaBrandPaneleditShow') < 0) {
        _optionPool.find('input[checked]').parent().addClass('isSelected');
    }
    _optionPool.find('input[type="radio"][disabled], input[type="checkbox"][disabled]').parent().addClass('disabled');

    if(_options.attr('type') == 'radio'){
      _optionPool.addClass('singleSelection');
    }


    // 20210111
    _optionPool.find('label').has('input[type="text"], input[type="number"]').each(function(){
      placeholderText = $(this).find('input[type="text"], input[type="number"]').attr('placeholder');
      $(this).find('input[type="text"]:disabled, input[type="number"]:disabled').attr('placeholder', '');
    })

    _options.click(function(){
      var _optionLabel =  $(this).parent();

      if(_optionPool.hasClass('singleSelection')){
        _optionLabel.addClass('isSelected').siblings().removeClass('isSelected');
      } else {
        // 20200701 增加全選功能
        if (_optionLabel.hasClass('isSelected')) {
          _optionLabel.add(_checkAll.parent()).removeClass('isSelected');
        } else {
          _optionLabel.addClass('isSelected');
        }
      }

      // 20210111
      var _withTextInput = _optionLabel.has('input[type="text"], input[type="number"]');
      var _inputText = _withTextInput.find('input[type="text"], input[type="number"]');
      if (_withTextInput.hasClass('isSelected')) {
        _inputText.removeAttr('disabled').attr('placeholder', placeholderText);
      } else {
        _inputText.attr('disabled', 'disabled').attr('placeholder', '');
      }

    });

    _checkAll.click(function(){
      var _checkAllLabel = $(this).parent();
      if (_checkAllLabel.hasClass('isSelected')) {
        _options.parent().add(_checkAllLabel).removeClass('isSelected');
      } else {
        _options.parent().add(_checkAllLabel).addClass('isSelected');
      }
    })
  });


  // checking List1: .checkAll 和其他勾選項目在同一個父物件（例如 table 或 ul, ol）中
  var _checkList = $('.msgTemplate, .listTbNew, .listTable').has('.checkAll');
  _checkList.each(function(){
    var _optionCheck = $(this).find('input[type="checkbox"]');
    var _optionLabel = _optionCheck.parent('label');
    var _checkAll = $(this).find('.checkAll');

    _optionCheck.click(function(){
        if($(this).parent().is(_checkAll)){
          if (_checkAll.hasClass('checked')) {
          _optionLabel.removeClass('checked');
          } else {
            _optionLabel.addClass('checked');
          }
        } else {
          $(this).parent('label').toggleClass('checked');
          _checkAll.removeClass('checked');
        }
    });
  })

  // checking List2: .checkAll 和其他勾選項目（如 .listCheck）不在同一個父物件中
  var _checkList2 = $('.checkingList');
  _checkList2.each(function(){
    var _checkAll = $(this).find('.checkAll').find('input');
    var _checkInput = $(this).find('.listCheck').find('input');

    _checkInput.click(function(){
      $(this).parent().toggleClass('checked');
      _checkAll.parent().removeClass('checked');
    });
    _checkAll.click(function(){
      var _checkAllLabel = $(this).parent();
      if(_checkAllLabel.hasClass('checked')){
        _checkInput.parent().add(_checkAllLabel).removeClass('checked');
      } else {
        _checkInput.parent().add(_checkAllLabel).addClass('checked');
      }
    })
  })


  //單一個 checkbox
  var _aloneCheck = $('.aloneCheck').find('input[type="checkbox"]');
  _aloneCheck.filter(':checked').parent('label').addClass('checked');
  _aloneCheck.filter(':disabled').parent('label').addClass('disabled');
  // _aloneCheck.each(function(){
  //   if($(this).is( ':checked' )){
  //     $(this).parent('label').addClass('checked');
  //   }
  //   if($(this).attr('disabled')){
  //     $(this).parent('label').addClass('disabled');
  //   }
  // })
  _aloneCheck.click(function(){
    $(this).parent('label').toggleClass('checked');
  })

  //單選 radio , 在每個 tr 或 li
  var _inputRadio = $('.listRadio').find('input[type="radio"]');
  _inputRadio.filter(':checked').parent('label').addClass('checked');

  _inputRadio.click(function(){
    _inputRadio.parent('label').removeClass('checked');
    $(this).parent('label').toggleClass('checked');
  })


    // 像表格的 ul li 
  var _applyList = $('.applyList');
  _applyList.each(function () {
    var _headli = $(this).find('.head');
    var _li = $(this).find('li');
    var liCount = _li.length;
    for (var n = 1; n <= liCount; n++) {
      _headli.find('span').each(function(index){
        var headText = $(this).text();
        _li.eq(n).find('span').eq(index).attr('data-title', headText);
      })
    }
  });



  
  



  //go top and bottom------------------------------------------
	var _goTop = $('.goTopBottom').find('.goTop');
  var _goBottom = $('.goTopBottom').find('.goBottom');

  _goTop.click(function(){
    _body.stop(true,false).animate({scrollTop: 0}, 600);
  });
  _goBottom.click(function(){
    _body.stop(true,false).animate({scrollTop: _body[0].scrollHeight}, 1200);
  });



  // 模擬 select 下拉選單 ------------------------------------------
  $('.selectImitating').each(function(){
    var _selectImitating = $(this);
    var _selectBtn = _selectImitating.find('.selectBtn');
    var _optionGroup = _selectImitating.find('.optionGroup');
    // var _option = _optionGroup.find('input[type="checkbox"]');
    var speed = 250;

    // 定位模擬的 select 下拉選單
    _optionGroup.css({
      'left': _selectBtn.position().left,
      'top' : _selectImitating.outerHeight()
    })

    // 模擬 placeholder 文字
    var placeholder = '<span class="placeholder">' + _selectBtn.attr('data-title') + '</span>';
    if (_selectBtn.text() == "") {
      _selectBtn.prepend(placeholder);
    }

    // 下拉選單顯示／隱藏
    _selectBtn.click(function(){
      var optMaxHeight = window.innerHeight - _selectImitating.offset().top + $(window).scrollTop() - 60;// 20210414
      if(_optionGroup.is(':visible')){
        // _optionGroup.slideUp(speed);20210414
        _optionGroup.slideUp(speed, function(){_optionGroup.css('max-height', '')});// 20210414
      } else {
        // _optionGroup.slideDown(speed); 20210414
        _optionGroup.css('max-height', optMaxHeight).slideDown(speed); // 20210414
        $(this).parent().siblings().find('.optionGroup').slideUp(speed);
      }
    })
    _optionGroup.mouseleave(function(){
      // $(this).slideUp(speed); 20210414
      $(this).slideUp(speed, function(){_optionGroup.css('max-height', '')});// 20210414
    })

    // click 一般 select 元件時要關閉其他已開啟的模擬 select
    _selectImitating.siblings().find('select').click(function () {
      _optionGroup.filter(':visible').slideUp(speed);
    })

    _selectBtn.each(function (){// 有 checkbox 的多選下拉選單
      var _checkOption = $(this).next('.optionGroup').find('input[type="checkbox"]');
      var selected = [];

      _checkOption.click(function(){
        var _this = $(this);
        if(_this.parent().hasClass('checked')){
          _this.parent().removeClass('checked');
          var a = selected.indexOf(_this.parent().text());
          selected.splice(a, 1);
          _selectBtn.text(selected.toString());
          if(selected.toString()===""){
            _selectBtn.prepend(placeholder);
          }
        } else {
          _this.parent().addClass('checked');
          selected.push(_this.parent().text());
          _selectBtn.text( selected.toString());
        }
      })

      // 單選的下拉選單
      var _option = $(this).next('.optionGroup').find('.selectOption>li');
      _option.click(function(){
        var _this = $(this);
        _this.addClass('selected').siblings().removeClass('selected');
        _this.parents('.optionGroup').prev('.selectBtn').text(_this.text());
      })
    })
  })

  // 彈出訊息
  var _popMsg = $('.popMsg');
  _popMsg.each(function(){
    var _this = $(this);
    var _closePop = _this.find('.closePop');

    // 關閉彈出訊息
    // 20201127 _closePop.add(_coverAll).click(function(){
    // click _coverAll 不能關閉 _popMsg，_popMsg，只能由 _closePop 關閉
    _closePop.click(function(){
      _this.add(_coverAll).fadeOut(200, function(){
        _this.removeAttr('style');
      });
    })

  })
  // 開啟彈出訊息
  $('.trigPop').click(function(){
    try {
      // var openWhich = $(this).attr('id').slice(4);
      var _openWhich = _popMsg.filter('#'+ $(this).attr('id').slice(4));
      // _popMsg.filter('#'+openWhich).add(_coverAll).fadeIn(200);
      _openWhich.add(_coverAll).fadeIn(200);
      if ($(this).is('input[type="submit"]')){
        $(this).parents('.popMsg').fadeOut(200);
      }
    } catch (e) {
    }
  })

  //燈箱內的彈出訊息
  // LBX => lightbox
  var _LBXtriPop = $('.lightbox').find('.trigPop');
  _LBXtriPop.click(function(){
    _popMsg.filter(':visible').css('z-index', 8920);
  });





  // 顯示回饋訊息
  var _showReact = $('.showReact');
  var _reactMsg = $('.reactMsg');
  var _inThisTr = _reactMsg.parent().parent();
  _showReact.click(function(){
    _reactMsg.css('display','block');
    _inThisTr.addClass('hilight');
    $('.hiddenFieldRow.hilight').removeAttr('style').siblings('.hiddenFieldRow').removeAttr('style');
    $('.rowSwitch').addClass('closeIt');
    _body.stop(true,false).animate({scrollTop:_inThisTr.first().offset().top - hh}, 600);
  })



  // 給供應商評分
  var _rateThis = $('.rateThis');
  var scoredColor = '0 -40px',
      defaultclor = '0 0',
      CLZ_SCORD = 'scored';
  _rateThis.each(function(){
    var _point = $(this).find('.point');

    _point.hover(
      function(){
        $(this).prevAll().css('background-position', scoredColor);
        $(this).nextAll('.scored').css('background-position', defaultclor);
      },
      function(){_point.removeAttr('style');}
    );
    // _point.click(function(){
    //   _point.removeAttr('style').removeClass('scored');
    //   $(this).add($(this).prevAll()).addClass('scored');
    // })
    // roy 修改的，可清除已評分
    _point.click(function () {
      var hasScored = $(this).hasClass(CLZ_SCORD);
      // 1. remove next scored
      $(this).nextAll().removeAttr('style').removeClass(CLZ_SCORD);
      // 2. 是否已評分
      if (hasScored) { // 已評分 > 全部取消
          $(this).add($(this).prevAll()).removeAttr('style').removeClass(CLZ_SCORD);
      } else { // 未評分
          $(this).add($(this).prevAll()).addClass('scored');
      }
    })


  })

  // filterBy 單一過濾條件
  var _filterBy = $('.filterBy');
  _filterBy.each(function(){
    var _filter = $(this);
    var _filterOptions = _filter.find('.filterOptions');
    var _filterByThis = _filter.find('li');
    var _filterCtrl = _filter.find('.simuInput');
    var defaultText = _filterCtrl.text(); 
    _filterByThis.click(function(){
      if($(this).hasClass('isPicked')){
        $(this).removeClass('isPicked');
        _filterCtrl.text(defaultText);
      } else {
        $(this).addClass('isPicked').siblings().removeClass('isPicked');
        _filterCtrl.text(_filterByThis.filter('.isPicked').text());
        if(_filterCtrl.is(':visible')){
          _filterOptions.stop(true,false).delay(300).slideUp();
        }
      }
    })

    _filterCtrl.click(function(){
      if(_filterOptions.is(':visible')){
        _filterOptions.stop(true,false).slideUp();
      } else {
        _filterOptions.stop(true,false).slideDown();
      }
    })

  })


  // 追蹤產品簡介 feature of favorite-pruduct-list
  var _pdList = $('.pdList');
  var _pdItem = _pdList.children('ul').children('li');
  var  _pdFeature = _pdItem.find('.feature');
  var  pdFeatureMinH = '2.9em';
  var  pdFeatureRealH = [];
  var  rmTxt1 = 'more';
  var  rmTxt2 = ' less';

  _pdFeature.prepend('<span class="readMore">'+rmTxt1+'</span>');
  var _readMore = _pdItem.find('.readMore');

  getpdFeatureHeight();
  function getpdFeatureHeight(){//取得產品描述的高度
    _pdFeature.removeClass('min').removeAttr('style');
    pdFeatureRealH.length = 0;
    _pdItem.each(function(){
      pdFeatureRealH.push($(this).find('.feature').innerHeight());
    });
    _pdFeature.addClass('min').css('height', pdFeatureMinH);
  }

  _pdFeature.click(function(){
    if($(this).hasClass('min')){
      $(this).removeClass('min').stop(true,false).animate({
        'height': pdFeatureRealH[$(this).parent('ul').parent('li').index()]
      });
        $(this).find(_readMore).text(rmTxt2);
    } else {
      $(this).addClass('min').stop(true,false).animate({'height':pdFeatureMinH});
      $(this).find(_readMore).text(rmTxt1);
    }
  });


  // ellipsis項目，hover可展開完整內容
  var _extList = $('.briefInfo.extensible');
  var itemMinH = '1.4em';
  briefExpand();
  function briefExpand() {
    _extList.each(function(){
      var _extItem = $(this).find('li');
      var itemxH = [];
      
      _extItem.removeAttr('style').removeClass('ellipsis').each(function(){
        itemxH.push($(this).height());
      });
    
      _extItem.addClass('ellipsis').css('height', itemMinH);
    
      _extItem.hover(function() {
        $(this).stop(true, false).animate({ 'height': itemxH[$(this).index()] }, 300, 'linear');
      }, function() {
          $(this).stop(true, false).animate({ 'height': itemMinH }, 300, 'linear');
      });
    })
  }

  // 可開合的說明文字區 20191231修改
  // 避免網頁初載入時看到此區展開再收合的動作。預設只顯示三行
  // 目前一頁只能有一個 .expansile
  var _expansile = $('.expansile').addClass('partial');
  var textLess = '收合';
  var textAll = '閱讀全文';
  var hFull;
  var hPartial = _expansile.height();
  _expansile.wrapInner('<div class="innerPart"></div>')
  _expansile.append('<span class="fadeout"></span>').append('<span class="readAll"></span>');
  var _readAll = _expansile.find('.readAll').text(textAll);

  _expansile.each(function(){
    var _this = $(this);
    hFull = _this.find('.innerPart').innerHeight();
    _readAll.click(function(){
      if (_this.hasClass('partial')){

        if (typeof $('#theInnerHeight').val() !== "undefined") {
          hFull = $('#theInnerHeight').val();
        }

        _this.animate({height: hFull}, 500, function(){
          _this.removeClass('partial');
          _readAll.text(textLess);
        })
      } else {
        _this.animate({height: hPartial}, 500, function(){
          _this.addClass('partial');
          _readAll.text(textAll);
        })
      }
    })
  });

  function getExpansileNewHeight(){
    hFull = _expansile.find('.innerPart').innerHeight();
    if(_expansile.hasClass('partial')){
      _expansile.removeAttr('style');
    } else {
      _expansile.height(hFull);
    }
  }




	//產品分類選擇左右滑動效果（在 產品型錄設定 step1）
	$('.multiCategory').each(function(){

		var _cateSelect = $(this).find('.cateSelect'),
				_cateList = _cateSelect.find('.cateList'),
				_cateList1 = _cateList.find('ul').first(),
				_cateList2 = _cateList.find('ul').eq(1),
				_cateList3 = _cateList.find('ul').eq(2),
				_cateItem = _cateList.find('li'),
				_pdCateSel = $('#pdCateSel'),
				_pdCateOk = $('#pdCateOk'),
				btnText1 = _pdCateSel.text(),
				btnText2 = _pdCateSel.attr('data-alttext');

		_pdCateOk.hide();
		_cateSelect.innerWidth(_pdCateSel.prev('input[type="text"]').innerWidth());
		// _cateList1.find(_cateItem).first().addClass('selected');

		_pdCateSel.click(function(){
			if (_cateSelect.is(':visible')) {
				_cateSelect.slideUp();
				$(this).removeClass('cancel').text(btnText1);
				_pdCateOk.hide();
			} else {
				_cateSelect.slideDown();
				if( _cateList1.find('selected').lenght > 0 ){
          _cateList2.show();
        }
				$(this).addClass('cancel').text(btnText2);
				_pdCateOk.show();
			}
    });

    $('#pdCategory').click(function(){
      _cateSelect.slideDown();
      _pdCateSel.addClass('cancel').text(btnText2);
      _pdCateOk.show();
    });
    
		_pdCateOk.click(function(){
      $('#pdCategory').val(
        _cateList1.find('.selected').text() + ' ❯ ' +
        _cateList2.find('.selected').text() + ' ❯ ' +
        _cateList3.find('.selected').text()
        );
				_cateSelect.slideUp();
				$(this).hide();
				_pdCateSel.removeClass('cancel').text(btnText1);
		})

		_cateItem.click(function(){
      $(this).addClass('selected').siblings().removeClass('selected');
      $(this).parent().next().show();
		})
		_cateList1.find(_cateItem).click(function(){
			_cateList2.add(_cateList3).find(_cateItem).removeClass('selected');
			_cateList3.hide();
		});
		_cateList2.find(_cateItem).click(function(){
			_cateList2.animate({'left':'20%'},300);
			_cateList3.show().animate({'left':'60%'},300).find(_cateItem).removeClass('selected');
		})
		_cateList1.hover(function(){
			_cateList2.animate({'left':'40%'},300);
			_cateList3.animate({'left':'80%'},300);
		})
		_cateList3.hover(function(){
			_cateList2.animate({'left':'20%'},300);
			_cateList3.animate({'left':'60%'},300);
		})
	});






// Product Requested 下拉選單模擬
  var _pdRequest = $('.pdRequest');
  var _sugList = _pdRequest.next('.sugList');

  _pdRequest.parents('.formRow').css('position', 'relative');
  _pdRequest.click(function () {
    if (_sugList.is(':visible')) {
      _sugList.slideUp(300);
    } else {
      _sugList.slideDown(300, function () {
        $(this).css('overflow-y', 'scroll');
      });
    }
  });
  _sugList.find('li').click(function () {
    _pdRequest.val($(this).text());
    _sugList.slideUp(300);
  });

  $(document).on('touchend click', function (e) {
    var target = e.target;
    if (!$(target).is(_sugList) && !$(target).is(_pdRequest)) {
      _sugList.slideUp(300);
    }
  });








  // --------------------------------------
  // window resize
  var winResizeTimer1;
  _window.resize(function(){
    clearTimeout(winResizeTimer1);
    winResizeTimer1 = setTimeout(function(){
      getpdFeatureHeight(); //重新取得產品描述的高度
      getExpansileNewHeight(); // 重新取得說明文字的高度
      briefExpand ();
    }, 300);
  });




  tabSet();
  function tabSet(){//頁籤
    $('.tabset').each(function(){
  
      var _tabset = $(this),
          _tabItem = _tabset.find('.tabItem'),
          _tabContent = _tabset.find('.tabContent'),
          tabwidth = _tabset.width(),
          tabItemHeight = _tabItem.outerHeight(),
          tabContentHeight = _tabset.find('.active').next().innerHeight();
          tabItemLength = _tabItem.length,
          tabItemWidth = tabwidth / tabItemLength;
  
      _tabset.find('.active').next('.tabContent').show();
      _tabContent.css('top' , tabItemHeight );
      _tabset.height(tabContentHeight + tabItemHeight);

      _tabItem.click(tabs);
    
      function tabs(){
        var	_tabItemNow = $(this);
  
        _tabItem.removeClass('active');
        _tabContent.hide();
        _tabItemNow.addClass('active').next().show();

        _tabset.height(_tabItemNow.next().innerHeight() + tabItemHeight);
  
       }
       
    });
  }

  //另一組頁籤，用於 My Taiwantrade
  var _tabs = $('.tabGroup');
  _tabs.each(function(){
    var _tabItem = $(this).find('.tabs').find('li');
    var _tabContainer = $(this).find('.tabContainer');
    _tabItem.click(function(){
      $(this).addClass('active').siblings().removeClass('active');
      var tabIndex = $(this).index();
      _tabContainer.removeClass('show').eq(tabIndex).addClass('show');
    })

  })


	//產品照片切換
	$('.pdPhotoSwitch').each(function(){
		var _pdPhotoSwitch = $(this),
				_showItem = _pdPhotoSwitch.find('.showbox').find('li'),
				_dots = '',
				phCount = _showItem.length;

		if(phCount>1){
			$('<ul class="indicator"></ul>').appendTo(_pdPhotoSwitch);
			for(i=0; i<phCount; i++){ _dots = _dots + '<li></li>'; }
			_pdPhotoSwitch.find('.indicator').append(_dots).find('li').first().addClass('showing');
			_showItem.hide().first().show();

			var _indicator = _pdPhotoSwitch.find('.indicator').find('li');

			_indicator.click(function(){
				var ix = $(this).index();
				$(this).addClass('showing').siblings().removeClass('showing');
				_showItem.fadeOut(600).eq(ix).fadeIn(600);
			});
		}
	});



  
  // 置底的區塊
  var _fixBottom = $('.fixBottom');
  var scrollDis = _main.height() - wh;

	_window.scroll(function() {

		if ( $(this).scrollTop() > scrollDis ) {
			_fixBottom.removeClass('fixed');
		} else {
      _fixBottom.addClass('fixed');
		}
  });

  // 條列表格 th 排序箭頭圖示
  _thSorting = $('.sortByTh')
  _thSorting.each(function(){
    var _this = $(this);
    _this.click(function(){
      _thSorting.removeClass('activated');
      $(this).addClass('activated');
      $(this).toggleClass('ascend');
    })
  })


  lightbox();
	function lightbox(){ //燈箱

		var _lightbox = $('.lightbox'),
				_showLightbox = $('.showLightbox'),
        _hideLightbox = _lightbox.find('.hideLightbox');
        
    var _lightboxMask = _lightbox.find('.coverAll');

		_showLightbox.click(function(){
      var lbxid = '.' + $(this).attr('id');
			_lightbox.filter(lbxid).show();
      // _coverAll.fadeIn(300); 20201127 修改如下
      // _coverAll 加 class 以區分_coverAll是否因_lightbox開啟
      _coverAll.show().addClass('for_lbx');
		});

	  // 20201127 刪除
  	// _coverAll.click(function(){
		// 	_lightbox.hide();
		// 	$(this).fadeOut(300);
    // });
    // 
    _coverAll.click(function(){
      if($(this).hasClass('for_lbx')){
        _lightbox.hide(); 
        $(this).fadeOut(300);
      }
    });

		_hideLightbox.click(function(){
      if($(this).parents('.lightbox').hasClass('nationsOpt')){
        $('.nationsOpt').scrollTop(0);
      }
			$(this).parents('.lightbox').hide();
			_coverAll.fadeOut(300);
		});

  }

  // 燈箱中的 go top
  var _backToNav = $('.lightbox').find('.backToNav');
  var _scrollLightbox = _backToNav.parents('.lightbox');
  _backToNav.click(function(){
    $(this).parents('.lightbox').stop(true,false).animate({scrollTop: 0}, 600);
  });
  _scrollLightbox.scroll(function(){
    if($(this).scrollTop() > 300 ){
      _backToNav.fadeIn(200);
    } else {
      _backToNav.stop().fadeOut(200);
    }
  });

  //國家選單燈箱，「大洲」錨點的平滑捲動
  var _nationsOpt = $('.nationsOpt, .areaCheck');
  var _areaNavli = _nationsOpt.find('.areaNav>ul>li>a');
  var _areaTarget = _nationsOpt.find('.ms-options>ul>li');
	function getOffsetTop(){
    areaTargetOffsetTop = [];
		_areaTarget.each(function(){
			areaTargetOffsetTop.push($(this).position().top );
    });
	}
  _areaNavli.click(function(e){
    var i = $(this).parent('li').index();
    _nationsOpt.stop(true,false).animate({scrollTop:areaTargetOffsetTop[i]}, 800);
    e.preventDefault();
    console.log(i, areaTargetOffsetTop[i]);
  });
  $('#nationsOpt, #areaCheck').click(getOffsetTop);


  // 20210506 
  // 熱門貿易國 .hotOption選到項目加 class name（底色）與下方 ms-options 效果一致
  var _hotOption = $('.hotOption').find('li').find('input');
  _hotOption.click(function(){
    $(this).parents('li').toggleClass('selected');
  })
 



  //固定「目前聯絡的公司」資訊區
  var _threads = $('.threads');
  var _companyNow = _threads.find('.thisCompanyNow');
  //var compHeight = _companyNow.innerHeight()*.25;
  var compHeight = _companyNow.innerHeight()*.5;
  // 20191220 .thisCompanyNow 也要能 hover 頭像顯示 infoCard
  var _thisCompInfoCard = _threads.find('.infoCard.ofThisComp');
  var _thisCompAvatar = _companyNow.children('.avatar');

  fixThisCompanyNow();

  function fixThisCompanyNow(){
    var xddTop = $('.navBtnsDv').outerHeight(true) + $('.pageHeading').outerHeight(true) + compHeight;

    _window.scroll(function(){
      if($(this).scrollTop() > xddTop ){
        _companyNow.addClass('fixed');
        _threads.css('padding-top', compHeight );
      } else {
        _companyNow.removeClass('fixed');
        _threads.removeAttr('style');
      }  
    });
  }
  // 捲動到未讀訊息 ***** 20200203 修改
  var _unReadMarker = _threads.find('#marker_new');
  if(  _body.find(_threads).length >= 1 && _unReadMarker.length > 0 
  && _threads.children('ul').children('li').not('.marker').length > 1 
  ){
    var unReadMarkerOffsetTop = _unReadMarker.offset().top - hh - _companyNow.innerHeight();
    _body.stop(true,false).animate({scrollTop: unReadMarkerOffsetTop}, 800, function(){
      if( _companyNow.hasClass('fixed')){
        _body.stop(true,false).animate({scrollTop: unReadMarkerOffsetTop - _companyNow.innerHeight()}, 600)
      }
    });
  }


  // alert on/off (啟動／關閉 供應商訊息通知圖示)
  var _alertThis = $('.alertThis').not('.disabled');
  _alertThis.click(function() {
    $(this).toggleClass('off');    
  })


  // 頭像背景色
  var colorAvatar = $('.avatar');
  colorAvatar.each(function(){
    var letter = $(this).text();
    $(this).addClass(letter);
    if(letter !== ''){
      $(this).css('background-image', 'none');
    }
  })


  // hover 頭像開啟 infoCard
  var _eachCompany =  $('.threadList>ul>li').not('.onTop');
  var _infoAvatar = _eachCompany.children('.avatar');
  var _relInfoCard = _eachCompany.find('.infoCard');
  _relInfoCard.add(_thisCompInfoCard).prepend('<button type="button" title="close" class="closeThis"></button>');
  var _closeInfoCard = _relInfoCard.add(_thisCompInfoCard).find('.closeThis');

  function infoCardShowHide() {
    // _relInfoCard.add(_thisCompInfoCard).removeAttr('style');
    if (ww < wwWide) {
      _infoAvatar.click(function () {
        $(this).siblings(_relInfoCard).fadeIn(200).find('.closeThis').show();
        _coverAll.fadeIn(200);
      });
      _thisCompAvatar.click(function () {
        _thisCompInfoCard.fadeIn(200);
        _coverAll.fadeIn(200);
      });
      _closeInfoCard.add(_coverAll).click(function () {
        _relInfoCard.add(_coverAll).hide();
        _thisCompInfoCard.add(_coverAll).hide();
        $('this').hide();
      })
    } else {
      _infoAvatar.mouseenter(function(){
        $(_relInfoCard).hide();
        $(this).siblings(_relInfoCard).fadeIn(200);
      });
      _relInfoCard.mouseleave(function(){$(this).fadeOut(400)});
      _eachCompany.mouseleave(function(){$(this).find(_relInfoCard).fadeOut(400)});
      
      _thisCompAvatar.mouseenter(
        function(){_thisCompInfoCard.fadeIn(200);}
      );
      _thisCompInfoCard.mouseleave(
        function(){_thisCompInfoCard.fadeOut(400);}
      );
    }
  }
  infoCardShowHide();
  
  // 固定於頁面下方的訊息輸入區(My Inquiries)
  var _replyDrawer = $('.replyDrawer');
  var _drawCtrl = _replyDrawer.find('.ctrl');
  var _replyArea = _replyDrawer.find('.replyHere');
  var _reSubject = _replyDrawer.find('.reSubject');
  var _textContainer = _reSubject.find('.textContainer');
  var _replyThis = _threads.find('.replyThis');
  var _clearSubject = _reSubject.find('.clearSubject')

  _replyThis.click(function(){//  按回覆圖示
    _reSubject.show();
    _textContainer.text($(this).prev('.talkingBox').find('p').text());
    _replyArea.slideDown();
    _drawCtrl.addClass('closeIt').parent().addClass('full');
  })
  _clearSubject.click(function(){
    _reSubject.hide();
  })

  _drawCtrl.click(function(){
    if(_replyArea.is(':hidden')){
      _replyArea.slideDown();
      $(this).addClass('closeIt').parent().addClass('full');
    } else {
      _replyArea.slideUp();
      $(this).removeClass('closeIt').parent().removeClass('full');
    }
  })
  // _replyDrawer.find('.btnDv').find('input').click(function(){
  //   _replyArea.slideUp();
  //   _reSubject.hide();
  //   _drawCtrl.removeClass('closeIt').parent().removeClass('full');
  // })



// -------------------------------------------------------------- 2020
// 企業網公司資料設定編輯區收合效果
var _expFolder = $('.expFolder');
var _expCtrl = _expFolder.find('.expCtrl');
var _expAll = $('.expAll');
var expSpeed = 600;

_expCtrl.filter('.reveal').next().show();

_expCtrl.click(function(){
  if($(this).hasClass('reveal')){
    $(this).removeClass('reveal').next().stop(true, false).slideUp(expSpeed);
  } else {
    $(this).addClass('reveal').next().stop(true, false).slideDown(expSpeed);
  }
})

_expAll.click(function(){
  if ($(this).hasClass('allRevealed')){
    $(this).removeClass('allRevealed');
    $(this).nextAll(_expFolder).find(_expCtrl).removeClass('reveal').next().stop(true, false).slideUp(expSpeed);
  } else {
    $(this).addClass('allRevealed');
    $(this).nextAll(_expFolder).find(_expCtrl).addClass('reveal').next().stop(true, false).slideDown(expSpeed);
  }
})

//語言選單 .langTab
var _langTab = $('.langTab');
_langTab.each(function(){
  var _whichLang = $(this).find('li').not('.moreLang');
  var _moreLang = $(this).find('.moreLang');
  var _moreLangList = _moreLang.find('ul');

  _moreLang.children('a').append('<span class="langNow"></span>');
  // 如果選到的語系是在「其他語系」中，要把語系名稱帶上來 
  if(_moreLangList.find('.active').length > 0){
    _moreLang.addClass('active').find('.langNow').text('：'+ _moreLangList.find('.active').text());
  }
  _moreLang.hover(
    function(){_moreLangList.stop(true, false).slideDown(300)},
    function(){_moreLangList.stop(true, false).slideUp()}
  )
  
  _whichLang.click(function(){
    _whichLang.add(_moreLang).removeClass('active');
    $(this).addClass('active');
    _moreLang.find('.langNow').text('');
  });
  _moreLangList.find('li').click(function(){
    _moreLang.find('.langNow').text('：'+ $(this).text());
    _moreLang.addClass('active');
  })
})




//分類、群組，可修改刪除
var _classify = $('.classify');
_classify.each(function(){
  var _classItem =  $(this).find('li').not('.addNew');
  var _className = _classItem.children('a');
  var _moreFuncCtrl = _classItem.find('.moreFunc');
  var _modifyThisClass = _classItem.find('.action')

  // _classItem.has('.moreFunc').addClass('hasMoreFunc'); 20210302 直接在 html 中加 class name
  
  _className.click(function(){
    $(this).parent().addClass('active').siblings().removeClass('active');
    _classItem.find('.action').hide();
  })
  
  _moreFuncCtrl.click(function(){
    if($(this).siblings(_modifyThisClass).is(':hidden')){
      $(this).siblings(_modifyThisClass).show();
    } else {
      _modifyThisClass.hide();
    }
  })
  _modifyThisClass.find('li').click(function(){
    $(this).parent(_modifyThisClass).hide();
  })
})

//改變排列順序，上、下移動
var _orderShift = $('.orderShift');
_orderShift.each(function(){
  var _orderItem = $(this).children('ul, ol').children('li');
  var _orderUp = _orderItem.find('.up');
  var _orderDown = _orderItem.find('.down');

  _orderUp.click(function(){
    var _changeItem =  _orderItem.has($(this));
    _changeItem.prev().insertAfter(_changeItem);
  })
  _orderDown.click(function(){
    var _changeItem =  _orderItem.has($(this));
    _changeItem.insertAfter(_changeItem.next());
  })

})


// 移除圖片
var _changeImage = $('.image').add('.previewImage').has('.removeThis');
// console.log(_changeImage);
_changeImage.each(function(){
  var _this = $(this);
  var _removeBtn = _this.find('.removeThis');
  var _buttons = _this.next('.buttons').add('.fileDragDrop');
  var _restoreBtn = _buttons.find('.restore');
  _removeBtn.click(function(){
    $(this).parent().hide();
    $(this).parent().next(_buttons).show();
  })
  _restoreBtn.click(function() {
    $(this).parent().prev(_changeImage).show();
    $(this).parent().hide();
  })
})

// .fileDragDrop 的「從本機上傳」虛擬元件的 hover 效果 20201222
var _fileDragDrop = $('.fileDragDrop');
_fileDragDrop.each(function(){
  var _this = $(this);
  var _insideBtn = _this.find('button');
  _insideBtn.hover(
    function(){ _this.addClass('mo')},
    function(){ _this.removeClass('mo')}
  )
})

// 表格展開／收合 20200630

  var _expTable = $('.expansible');
  _expTable.each(function(){
    var _expArea = $(this).find('.expArea');
    var tbHeight = _expArea.children('table').outerHeight(); //取得表格總高度
    var _tbodyRows = _expArea.find('tbody>tr');
    var tbHeightIni = 0; //計算表格未展開時高度用，預設狀態為未展開
    var iniRow = 5; //未展開時顯示行數
    var rowCount = _tbodyRows.length; // tbody行數
    var _expTbBtn = $(this).find('.ctrlBtn');
    var btntext = _expTbBtn.text();

    if( rowCount <= iniRow){
      _expTbBtn.hide();
    } else {
      for( i=0; i<iniRow; i++ ) {
      tbHeightIni = tbHeightIni + _tbodyRows.eq(i).outerHeight();
      //加總未展開時的每一行高度。高度需包含框線，所以用 outerHeight()
      }
      tbHeightIni = tbHeightIni + _expArea.find('thead').outerHeight();
      //tbody 高度加上 thead 高度

      _expArea.height(tbHeightIni);//設定 table 未展開時高度
      _tbodyRows.css('visibility', 'visible');

      _expTbBtn.click(function () {
        if ($(this).hasClass('expanded')) {
          $(this).removeClass('expanded').text(btntext);
          _expArea.animate({ height: tbHeightIni });
        } else {
          $(this).addClass('expanded').text($(this).attr('data-alttext'));
          _expArea.animate({ height: tbHeight });
        }
      });
    }
  })


  // -------------------------------------------- 版型設定：選擇模板
  // var _templateSetting = $('.templateSetting');
  var _moduleList = $('.moduleList');
  // var _module = _moduleList.find('.module').not('.disabled');
  var _module = _moduleList.find('.module');
  var _insertModule = _moduleList.find('.insert');
  var _selectModule = _moduleList.find('.selectModule');
  var _moduleSetting = $('.moduleSetting');

  _moduleSetting.eq(0).addClass('show');
  _module.eq(0).addClass('active');

  _module.click(function(){
    var id = $(this).attr('data-id');
    $(this).addClass('active').siblings().removeClass('active');
    _moduleSetting.filter('.show').removeClass('show');
    _moduleSetting.filter( function(index){ return $(this).attr('data-id') === id} ).addClass('show');
    _body.stop(true,false).animate({scrollTop: 0}, 600);

  })

  // 新增區塊
  _insertModule.click(function(){
    var _this = $(this);
    if (_this.hasClass('childShowing')){
      _this.removeClass('childShowing');
      _this.find(_selectModule).stop(true, false).slideUp();
    } else {
      _this.addClass('childShowing');
      _this.find(_selectModule).stop(true, false).slideDown();
    }
  })
  _insertModule.mouseleave(function(){
    $(this).removeClass('childShowing').find(_selectModule).stop(true, false).slideUp();
  })

  _selectModule.each(function(){
    _this = $(this);
    _item = _this.find('li');
    _item.click(function(){
      $(this).toggleClass('active').siblings().removeClass('active');
    })
  })



  // ------------------------------------ 捲動固定區
  fixArea();

  var _fixArea = $('.fixArea');
  var _fixAreaParent = _fixArea.parent();

  function fixArea(){
    var addBack = $('.fixArea').outerHeight() + 36;
    var scrollDist =  $('.pageHeading').outerHeight(true);
    _window.scroll(function(){
      if($(this).scrollTop() > scrollDist ){
        _fixArea.addClass('fixed');
        _fixAreaParent.css('padding-top', addBack );
      } else {
        _fixArea.removeClass('fixed');
        _fixAreaParent.removeAttr('style');
      }  
    });
  }


  //------------------------------------ 建站引導／設定語系
  var _setWebLang = $('.setWebLang');
  var _webLang = $('.webLang');
  _setWebLang.click(function () {
    if(_webLang.is(':visible')){
      _webLang.stop(true, false).slideUp();
    } else {
      _webLang.stop(true, false).slideDown();
    }
  });
  _webLang.find('.showLightbox').click(function(){
    _webLang.hide();
  })
  _webLang.on('mouseleave', function(){
    _webLang.slideUp();
  })


  //------------------------------------ 產品型錄設定／型錄預覽 20210426
  var _trigDrop = $('.trigDrop');
  _trigDrop.each(function(){
    let _this = $(this);
    let _trigDropEle = _this.children('a');
    let _hiddenDrop = _this.nextAll('.hiddenDrop');
    const speed = 250;
  
    _hiddenDrop.css('left', _trigDrop.position().left);
    if ( _this.parents('.btnsBelow').length > 0) {
      _hiddenDrop.css('margin-top', -1*_hiddenDrop.innerHeight())
    }

    _trigDropEle.click(function(){
      if(_hiddenDrop.is(':visible')){
        _hiddenDrop.stop(true, false).slideUp(speed);
      } else {
        _hiddenDrop.stop(true, false).slideDown(speed);
      }
    })
    _hiddenDrop.on('mouseleave', function(){
      $(this).stop(true, false).slideUp(speed);
    })
  })



  //------------------------------------ 從右滑入的 新增／編輯 介面
  var _showSlideinBox =  $('.showSlideinBox');
  var _slideinBox = $('.slideinBox');
  var _closeSlide = _slideinBox.find('.hideBox');
  var _slideinBoxNow;
  
  if(_main.has(_slideinBox)){
    _main.append('<div class="coverMain"></div>')
  }
  var _coverMain = $('.coverMain');

  _showSlideinBox.click(function(){
    var sbid = $(this).attr('data-id');
    _slideinBoxNow = _slideinBox.filter(function(index){ return $(this).attr('data-id') === sbid});
    _coverMain.fadeIn(200);
    _slideinBoxNow.addClass('show');
    if(_slideinBoxNow.is(':visible')){
      _slideinBoxNow.addClass('in');
      if ( _slideinBoxNow.find('.smartModule').length > 0) {
        setFrViewHeight();
      }
    }
  })

  // 20210507 計算圖文模板 froala 編輯區的高度
  function setFrViewHeight() {
    var _smartModuleBox = $('.slideinBox').has('.smartModule');
    var basicFrHeight = _smartModuleBox.find('.modulePreview>ul').innerHeight() + 40;
    _smartModuleBox.find('.fr-element').css('min-height', basicFrHeight - _smartModuleBox.find('.fr-toolbar').height() );
    _smartModuleBox.find('.fr-wrapper').css('height', basicFrHeight );
  }

  _closeSlide.click(function(){
    _coverMain.fadeOut(200);
    _slideinBoxNow.removeClass('in');
    if(! _slideinBoxNow.hasClass('in')){
      _slideinBoxNow.delay(400).fadeOut(100, function(){
        $(this).removeClass('show').removeAttr('style')
      });
    }
  })
  

  // ----------------------------------.displayMode 切換產品列表顯示模式 2020
  var _displayMode = $('.displayMode');
  var _exchangeView = $('.exchangeView');
  _displayMode.each(function(){
    $(this).append('<span class="invisibleCtrl"></span>');
    var _invisibleCtrl = $(this).find('.invisibleCtrl')
    // var _modeIcon = $(this).find('li').not('.invisibleCtrl');
    var _modeIcon = $(this).find('li');
    _invisibleCtrl.click(function(){
      _modeIcon.toggleClass('now');
      _exchangeView.toggleClass('grid');
    })
    _modeIcon.click(function(){
      _modeIcon.removeClass('now');
      $(this).addClass('now');
      if ($(this).hasClass('stack')){
        _exchangeView.removeClass('grid');
      } else {
        _exchangeView.addClass('grid');
      }
    })
  })

  // ----------------------------------.switchOnOff, On / Off 開關 20201204
  var _switchOnOff = $('.switchOnOff');
  _switchOnOff.click(function(){
    $(this).toggleClass('on');
  })

  // ---------------------------- 控制一個文字輸入框可否編輯及相關按鈕組 20210114
  $('.editConfirmSet').each(function(){
    var _this = $(this);
    var _textInput = _this.find('input[type="text"]');
    var _editBtn = _this.find('.ficon');
    var _submitBtns = _this.find('.btnDv');

    _editBtn.click(function(){
      $(this).hide();
      _submitBtns.removeClass('hidden');
      _textInput.removeAttr('readonly');
    });

    _submitBtns.find('input').click(function(){
      _submitBtns.addClass('hidden');
      _editBtn.show();
      _textInput.attr('readonly', 'readonly');
    })
  })


  // ---------------------------- 包裝運送方式 UPS 專有選項（內容管理 產品型錄設定）
  var _upsOnly = $('.packageAndShipping .upsOnly');
  var _upsOption = _upsOnly.nextAll('.shippingDetail');
  if(_upsOnly.hasClass('isSelected')) {
    _upsOption.show();
  } else {
    _upsOption.hide();
  }
  _upsOnly.click(function(){
    if ($(this).hasClass('isSelected')) {
      _upsOption.slideDown();
    } else {
      _upsOption.slideUp();
    }
  })











// ------------------------------------------------

  rwdTable();
  
  // window resize *************
  var winResizeTimer;
  _window.resize(function(){
    clearTimeout(winResizeTimer);
    winResizeTimer = setTimeout(function(){
      wwNew = _window.width();
      // console.log(ww, wwNew);
      if(wwNew>=wwWide){
        _topMenuClone.removeAttr('style').addClass('hidden');
        _topMenuCtrl.removeClass('closeIt');
        _sidebarMask.hide();
      }
      if( ww<wwWide && wwNew>=wwWide ){
        resetSidebar();
        _sideBar.removeClass('hidden');
        _sideBarCtrl.addClass('closeIt');

        // _relInfoCard.removeAttr('style');
      }
      if( ww>=wwWide && wwNew<wwWide ){
        resetSidebar();
        _sideBar.addClass('hidden');
        _sideBarCtrl.removeClass('closeIt');
        // infoCardShowHide();
      }
      if( ww<wwMedium && wwNew>=wwMedium && wwNew<wwWide ){
        resetSidebar();
        _sideBar.addClass('hidden');
        _sideBarCtrl.removeClass('closeIt');
      }
      if( ww>=wwMedium && wwNew<wwMedium ){
        resetSidebar();
        _sideBar.addClass('hidden');
        _sideBarCtrl.removeClass('closeIt');
      }
      if(wwNew>=wwMaximum){
        resetSidebar();
        _sideBar.removeClass('hidden');
        _sideBarCtrl.addClass('closeIt');
      }
      // .toggleDrawer
      if( ww<wwMedium && wwNew>=wwMedium ){
        _togSlide.not('.always').removeClass('hidden').find('.toggleArea').removeAttr('style');
        _togSlide.not('.always').find('.toggleCtrl').removeClass('closeIt');

        _hiddenFieldRow.removeAttr('style');
        _filterBy.find('.filterOptions').removeAttr('style');

        // $('.hiddenRow').filter('[style="display:block"]').attr('style','display:table-row');

        if(_topMenuClone.is(':hidden')){
          _sidebarMask.hide();// 隱藏由側欄選單開啟的遮罩
        }

      }
      if( ww>=wwMedium && wwNew<wwMedium ){
        _togSlide.not('.always').addClass('hidden').find('.toggleArea').removeAttr('style');
        // _togSlide.find('.toggleCtrl').removeClass('closeIt').text(textShow);
        _togSlide.not('.always').find('.toggleCtrl').removeClass('closeIt').text(textShow);// 10/04暫時

        // $('.hiddenRow').filter('[style="display:table-row"]').attr('style','display:block');
        
        getRowHeight();
      }

      ww = wwNew;
      tabSet();
      infoCardShowHide();
      fixThisCompanyNow();

      _nationsOpt.stop().animate({scrollTop: 0}, 300, function(){
         getOffsetTop();
      }); 
     
      // 20210507
      if ( _slideinBox.filter('.in').find('.smartModule').length > 0) {
        setFrViewHeight();
      }

    }, 250);
  });

  function resetSidebar() {
    _sideBar.add(_main).add(_menu).removeAttr('style');
    _menu.find('.hasChild').removeClass('activated').find('ul').removeAttr('style');
  }

  // 加 loading animation 的圓點元件
  $('.loadingAni').append('<span></span><span></span><span></span><span></span>');

	$('.btnDv input[type="reset"]').click(function() {
		selectedType = [];
  });
  
// 避免手機虛擬鍵盤擋住輸入欄位
$('input[type="text"], textarea, input[type="date"], input[type="email"], input[type="file"], input[type="number"], input[type="password"], input[type="tel"], input[type="time"], input[type="url"], input[type="week"]' ).on('click', function () {
	var _target = $(this);
	setTimeout(function() {
		try {
			_target.scrollIntoViewIfNeeded();
			console.log('scrollIntoViewIfNeeded');
		} catch (e) {
		}
	}, 400);
});

});