$(document).ready(function(){
	// fade in #back-top
	$(function () {
		$(window).scroll(function () {
			if ($(this).scrollTop() > 160) {
				$('body').addClass('sticky');
			} else {
				$('body').removeClass('sticky');
			}
		});
	});
 
});


function setWave(){
    $('.up-wave, .down-wave').width($('.up-wave').parent().width());
    $('index.html, .right-wave').width($('.up-wave').parent().height());
}
function mainForm(){
    $('.change-form li .next').click(function(){
        ($(this).is('label'))? marginIndex = ($(this).parent().parent().index()+1) : marginIndex = ($(this).parent().parent().parent().index()+1);
        moveForm(marginIndex);
    });
    $('.change-form li .next-form').click(function(){marginIndex = $(this).parent().parent().parent().parent().index()+1;     moveForm(marginIndex);});

    $('.change-form li .back').click(function(){
        marginIndex = $(this).parent().index()-1;
        moveFormBack(marginIndex);
    });

}

function moveForm(mari){
    if(mari<8){$('#change-form').animate({'top': -(437*mari) + 'px'}, 600,'easeInOutBack', function() {});}
}

function moveFormBack(mari){
    console.log(mari);
    console.log(+(437*mari) + 'px');
    if(mari<8){$('#change-form').animate({'top': '+=' + 437}, 600,'easeInOutBack', function() {});}
}

function mainSlider(){
    var el, newPoint, newPlace, offset;
    $("input[type='range']").change(function() {
        el = $(this); width = el.width(); newPoint = (el.val() - el.attr("min")) / (el.attr("max") - el.attr("min"));
        offset = -1.3; if (newPoint < 0) { newPlace = 0;  } else if (newPoint > 1) { newPlace = width; } else { newPlace = width * newPoint + offset; offset -= newPoint;}
        el.next("output").css({ left: newPlace, marginLeft: offset + "%"}).text(el.val());
    }).trigger('change');
}
function getCountLine(){
    $( ".swipper" ).each(function(){
        $(this).parent().find('input').val($(this).parent().find('ul li:first-child div').html());
    });
    var pos1Begin = 1;
    var gridSize = 62;

    $( ".swipper" ).draggable({ containment: "parent", scrollSpeed: 400 , grid: [ gridSize, 50 ]/*,   drag: function( event, ui ) {console.log(1)} */});
    $( ".swipper" ).on( "dragstop", function( event, ui ) {
        var pos1 = ui.position.left/gridSize+pos1Begin;
        /*$(this).parent().find('input').val(pos1);*/
        var count = $(this).parent().find('li').eq(pos1-1).find('div').html();
        $(this).parent().find('input').val(count);
        $(this).html(pos1);
    } );
   $('.swipper-wrap li').click(function(){
        $(this).parent().parent().find(".swipper").animate({
            "left": $(this).index()*gridSize
        });
       $(this).parent().parent().find('input').val($(this).find('div').html());

    });
}
function rightMenu(){
    $('.right-menu div').click(function(){
        if($(this).is('.active')){$(this).parent().find('ul').slideUp(300);$(this).toggleClass('active')}else{$(this).parent().find('ul').slideDown(300);$(this).toggleClass('active')};
    });
}
function getCountLineSmallGrid(){
    $( ".swipper-small-grid" ).each(function(){
        $(this).parent().find('input').val('<20000');
    });
    var pos1Begin = 1;
    var gridSize = 10;

    $( ".swipper-small-grid" ).draggable({ containment: "parent", scrollSpeed: 400 , grid: [ gridSize, 50 ]/*,   drag: function( event, ui ) {console.log(1)} */});
    $( ".swipper-small-grid" ).on( "dragstop", function( event, ui ) {
        var pos1 = ui.position.left/gridSize+pos1Begin;
        (pos1<40)?$(this).parent().find('input').val(pos1*3450):$(this).parent().find('input').val(pos1*3700);
        $(this).html(pos1);
    } );
}
function FormSubmit(){ 

	var m_method=$('#change-form').attr('method'); 
	var m_action=$('#change-form').attr('action');
	var m_data=$('#change-form').serialize(); 
	
	$.ajax({ 
	type: m_method, 
	url: m_action, 
	data: m_data, 
	success: function(result){ 
		$('.slider .flexslider').show();
		$('.change-form').hide();
		$('.get-trip .orange-button').html('Предложение отправлено!'); 
		} 
	}); 

}
function add2basket(){ 

	var m_method=$('#addtobasket').attr('method'); 
	var m_action=$('#addtobasket').attr('action');
	var m_data=$('#addtobasket').serialize(); 
	
	$.ajax({ 
	type: m_method, 
	url: m_action, 
	data: m_data, 
	success: function(result){ 
			$('#mini').html(result); 
			
			
			$.fancybox.open([
				{
					type: 'ajax',
					href : '/our_tours/excursions/ok.php'                
				}
			]);

		} 
	}); 

}

function aboutSlider(){
    $('.fake-arrors .right-arr').click(function(){
        $('.flex-direction-nav .flex-next').click();
        var begin = parseInt($('#begin').html()) + 1;
        var end = parseInt($('#end').html());
        $('#begin').html(begin);
        if (begin == end){$('.fake-arrors .right-arr').hide();}
        $('.fake-arrors .left-arr').show();
    });
    $('.fake-arrors .left-arr').click(function(){
        $('.flex-direction-nav .flex-prev').click();
        var begin = parseInt($('#begin').html()) - 1;
        var end = parseInt($('#end').html());
        $('#begin').html(begin);
        if (begin == 1){$('.fake-arrors .left-arr').hide();}
        $('.fake-arrors .right-arr').show();
    });
}

$(document).ready(function() {
    $(".fancybox").fancybox();
    aboutSlider();
    if ($('.header-down .main-menu>li.active ul').size()>0){
        $('.header-down .main-menu>li.active').css('margin-bottom','101px');
        $('.header-down').addClass('show-line');
    }
    $('.chexbox-img').unbind( "click" );
    $('.chexbox-img').click(function(){
        $(this).toggleClass('active');
        $(this).next().click();
    });

    mainForm();
    rightMenu();
        function setPrefix (list, root){var parent_number = (root)? '' : list.parentNode.number;$(list).children('li').each(function(i){this.number = parent_number + (i + 1) + '.';$(this).prepend (this.number + '&nbsp;&nbsp;&nbsp;');$(this).children('ol').each(function(){setPrefix (this);});});}
    $(function(){$('ol').each(function(){if (!$(this).parent().is('li')){setPrefix (this, true);}});});
    if ($('select').size()){$('select').combosex();}
    if ($('.datepicker').size()>0){$.datepicker.regional['ru']={closeText:'Закрыть',prevText:'&#x3c;Пред',nextText:'След&#x3e;',currentText:'Сегодня',monthNames:['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],monthNamesShort:['Янв','Фев','Мар','Апр','Май','Июн','Июл','Авг','Сен','Окт','Ноя','Дек'],dayNames:['воскресенье','понедельник','вторник','среда','четверг','пятница','суббота'],dayNamesShort:['вск','пнд','втр','срд','чтв','птн','сбт'],dayNamesMin:['Вс','Пн','Вт','Ср','Чт','Пт','Сб'],dateFormat:'dd.mm.yy',firstDay:1,isRTL:false};$.datepicker.setDefaults($.datepicker.regional['ru']);$('input.datepicker').datepicker({showOn:'both',buttonImageOnly:true,buttonImage:'/images/026.png'})}
    $('.own-variant .close').click(function(){$(this).parent().find('input').val('');$(this).parent().hide();});
    $('.own-version').click(function(){ $(this).parent().parent().find('.own-variant').show();});
    $('.get-trip .orange-button').click(function(){
        $('.slider .flexslider').hide(); $('.change-form').show();
        return false;
    });
});

function number_format( number, decimals, dec_point, thousands_sep ) {

	var i, j, kw, kd, km;

	if( isNaN(decimals = Math.abs(decimals)) ){
		decimals = 2;
	}
	if( dec_point == undefined ){
		dec_point = ",";
	}
	if( thousands_sep == undefined ){
		thousands_sep = ".";
	}

	i = parseInt(number = (+number || 0).toFixed(decimals)) + "";

	if( (j = i.length) > 3 ){
		j = j % 3;
	} else{
		j = 0;
	}

	km = (j ? i.substr(0, j) + thousands_sep : "");
	kw = i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands_sep);
	kd = (decimals ? dec_point + Math.abs(number - i).toFixed(decimals).replace(/-/, 0).slice(2) : "");


	return km + kw + kd;
}


$(window).resize(function(){
    setWave();
});


$(window).scroll(function () {

});


function openWindow(windowName) {
    console.log('open');
    $('.popups__window').hide();
    $('.' + windowName + ', .popups-overlay' + ', .popups').fadeIn(150);

    $('html').addClass('no-scroll');
    $('.popups').addClass('no-scroll');

    if (windowName == "callback" || windowName == "status") {
        $('html, body').animate({scrollTop: 0}, 'fast');
    }

}

$(window).scroll(function () {

    if ($(this).scrollTop() > 755) {

        $('.js-insurance-form_fixed').addClass('insurance-form_fixed--fixed');

    } else {

        $('.js-insurance-form_fixed').removeClass('insurance-form_fixed--fixed');

    }

    if ($(this).scrollTop() > 2655) {

        $('.js-insurance-form_fixed').removeClass('insurance-form_fixed--fixed');

    }

});

$(window).scroll(function(){

    if ($(this).scrollTop() > 1400) {



    } else {

        $('.js-scrolling-block-for-inner-pages').css('display','block');

    }

    if ($(this).scrollTop() > 1500) {

        $('.js-scrolling-block-for-inner-pages').css('display','block');
        $('.js-scrolling-block-for-inner-pages').addClass('js-scrolling-block-for-inner-pages--fixed');

    } else {

        $('.js-scrolling-block-for-inner-pages').removeClass('js-scrolling-block-for-inner-pages--fixed');

    }

    var fscrollTop = $('.f-footer').offset().top;

    if ($(this).scrollTop() > fscrollTop - 1780) {
        $('.js-scrolling-block-for-inner-pages').css('opacity', 0);
        //$('.js-scrolling-block-for-inner-pages').addClass('js-scrolling-block-for-inner-pages--pre-footer');
    } else {
        $('.js-scrolling-block-for-inner-pages').css('opacity', 1);
        //$('.js-scrolling-block-for-inner-pages').removeClass('js-scrolling-block-for-inner-pages--pre-footer');
    }

});


// КАЛЕНДАРЬ ТУРОВ
// ===========================



$( function() {
    $('.tour-calendar').datepicker( $.datepicker.regional[ "ru" ] );

          
    

  } );

$(document).ready(function(){
    // свайпер
    var swiper = new Swiper('.swiper-container', {
      slidesPerView: 3,
      spaceBetween: 30,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }
  }); 
});


    /* МОДАЛЬНЫЕ ОКНА */
$(document).ready(function(){        
    $(".callback-link").on('click', function(){
        var btn = $(this);                        
        $("#overlay").fadeIn(100, function(){
            $($(btn).data('window')).show();                        
        }); 
       $('#callback-window').show();
        return false;
    });
    
    $("#overlay, .modal .modal-close").on('click', function(){
        $("#overlay, .modal").fadeOut();
    $('.modal').find('input, textarea').val('');
        return false;
    });  

     
       $(" .modal-close").click(function(e) {
        $('#basket-added-window').hide();
                            $('#overlay').hide();
         $("#overlay, .modal").fadeOut();
          $('.modal').find('input, textarea').val('');
         return false;
       });
    $('.modal').each(function(){
        var f=$(this).find('.modal-content');
        var t=$(this).find('.modal-content-copy');
        t.html(f.html());
        t.hide();

    });

    $("a.ui-state-default.ui-state-highlight.ui-state-active").click(function(e) {
        var data_rel=$(this).attr('rel');
        // console.log(data_rel); 
        $.ajax({
                    type: 'POST',
                    url: '/function/get_list_el.php?data='+data_rel,
                    data: 'id='+data_rel,

                    success: function(data){    
                    console.log(data);                     
                          $('#callback-window').empty();
                         $('#callback-window').append(data);

                          $('#basket-added-window').show();
                            $('#overlay').show();
                         // alert('Добавлен');
                          
                      }
                    });
 // $('#overlay').empty();
        $('#overlay').show(); 
         $('#callback-window').show();
         return false;     
    });
});
/* МОДАЛЬНЫЕ ОКНА END */

// отправка колбека
$(".modal form").on('submit', function(e){
        e.preventDefault();
        var modal = $(this).parents('.modal');
        var form = $(this);         
        $(this).ajaxSubmit({  
            url: "/ajax.php?file="+$(form).data('file'),
            data: $(form).serialize(),
            dataType: "JSON",
            type: "POST",
            success: function(data){
                if(data.done) {
      $(modal).find('.modal-result').html(data.message);
      $(modal).find('.modal-result').show('fast')
      setTimeout("$('.modal-result').hide('fast')",1500);

      setTimeout("$('.modal').hide()",2000);
                  setTimeout("$('#overlay').hide()",2000);
      var f=$(modal).find('.modal-content-copy');
      var t=$(modal).find('.modal-content');
                  setTimeout("$('.modal').find('input, textarea').val('')",3000);
      
                } else {
                    $(modal).find('.modal-errors').html(data.message);
    $(modal).find('.modal-errors').show('fast')
    setTimeout("$('.modal-errors').hide('fast')",1000);
                    $(modal).children(".spinner").hide();
                }
            },
            complete: function(){
                $(modal).children(".spinner").hide();                     
            }
        });
        return false;
    });