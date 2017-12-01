


var keys = function(obj) {
    var keys = [];
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) keys.push(key)
    }
    return keys;
}

/**
 *determine if it is a value
 * @param  {[type]}  val value
 * @return {Boolean}     [description]
 */

var isNumber = function(val) {
    return !isNaN(val) ? true : false; 
}


var bindEvent = function(obj, ev, fn) {
    obj.addEventListener ? obj.addEventListener(ev, fn, false) : obj.attachEvent('on' + ev, fn);
}

/**
data
 */

HEAT_CONSUMPTION_DATA = {
    
    // daily life
    'Rest' : 1.1 ,
    'Gardening' : 4.02 ,
    'Walking' : 3.35 ,
    'Shopping' : 1.34 ,
    'Cycling' : 9.38 ,

    // Sports activities
    'Dancing' : 4.69 ,
    'Swimming' : 8.04 ,
    'Climbing' : 8.04 ,
    'Playing volleyball' : 4.02 ,
    'Playing baseball' : 5.36 ,
    'playing basketball' : 9.38 ,
    'Playing tennis' : 9.38 ,
    'Playing football' : 9.38 ,
    'playing badminton' : 8.04 ,
    'playing table tennis' : 4.02 ,
    'playing bowling' : 2.68 ,
    'Skiing' : 8.04 ,
    'Boating' : 4.02 ,
    'Horse riding' : 4.02 ,
    'Playing billiards' : 2.01
}


var cache = [] ,
    tempCache = [];


var k = kontext( document.querySelector( '.kontext' ) );



var setup = (function() {
    var $oSelect = $('#J_selectOptions') ,
        aKeys = keys(HEAT_CONSUMPTION_DATA),
        pushHtml = '';

    for( var i=0,len=aKeys.length; i<len; i++) {
        pushHtml += '\
            <li>\
                <span class="o_tit">'+ aKeys[i] +'</span>\
                <span class="o_time"><input type="number" placeholder="0" class="o_minute">minute</span>\
            </li>';
    }

    $oSelect.html(pushHtml);
    resizeSection();

})();


var bindEvents = (function() {
    var $weight = $('#J_weight') ,
        $oAddBtn = $('#J_addItem') ,
        $back = $('#J_back') ,
        $sure = $('#J_sure') ,
        $index = $('#J_index') ,
        $options = $('#J_options') ;

  
    FastClick.attach(document.body);
    
  
    $weight.on('focus',function() {

        $weight.on('blur',function() {
            if( isNumber($weight.val()) ) {

                if($weight.val() > 300) {
                    alert('please input your right weight!');
                    return ;
                }
                calculate();

            }else {
                alert('please input your right weight!');
            }

            $weight.off('blur');

        })
    })

  
    $oAddBtn.on('click',function() {
        var $okay = $('.o_okay') ;

        k.show( 1 );
        
        new IScroll('#J_iwrapper', { scrollX: false, freeScroll: true });

    })

    // come back
    $back.on('click',function() {
        tempCache = [];
        $('.o_minute').val('');
        $('.o_okay').removeClass('on');
        k.show( 0 );
    })

    // button ok function
    $sure.on('click',function() {
        sureItemList();
        calculate();

        var $removeItem = $('.remove_item');
        $removeItem.on('click',function() {
            var me = $(this);
            removeItem(me);
        })

    })

    $(window).on('resize',function() {
        resizeSection();
    })

})();

/**
calsulate calories
 */

function calculate() {
    var weight = $('#J_weight').val() ,
        $oResult = $('#J_outResult') , 
        $nums = $('#J_itemNums') ,
        result = 0;

    if(cache.length > 0) {
        for(var i=0,len=cache.length; i<len; i++) {
            result += Math.floor(weight*HEAT_CONSUMPTION_DATA[cache[i][0]]*cache[i][1]/60);
        }
        $nums.addClass('on');
    }else {
        result = 0;
        $nums.removeClass('on');
    }
    $nums.html(cache.length);

    $oResult.html(result);

}



function sureItemList() {
    var $index = $('#J_index') ,
        $options = $('#J_options') ;

    var $minute = $('.o_minute') ,
        itemName = '' ,
        itemTime = 0 ,
        tip = '' ,
        tempArr = [];

    $minute.each(function() {

        if( isNumber($(this).val()) && $(this).val() > 0 ) {
            tempArr = [];
            itemName = $(this).parent().siblings('.o_tit').text();
            itemTime = $(this).val() ;

            tempArr.push(itemName);
            tempArr.push(itemTime);
            tempCache.push(tempArr);
        }

        if( $(this).val() ) {
            tip = 'please input right time！';
        }

    })

    if(tip === '') {
        tip = 'please choose an activity！';
    }

    if(tempCache.length == 0) {
        alert(tip);
        return ;
    }

    for(var i=0,len=tempCache.length; i<len; i++) {
        cache.push(tempCache[i]);
    }
    tempCache = [];

    $('.o_minute').val('');
    $('.o_okay').removeClass('on');
    k.show( 0 );

    var pushHtml = '' ,
        $items = $('#J_items');
    for(var i=0,len=cache.length; i<len; i++) {

        pushHtml += '\
                    <li>\
                        <span class="i_tit">'+ cache[i][0] +'</span>\
                        <a href="javascript:;" class="remove_item">\
                            <i class="fa fa-minus"></i>\
                        </a>\
                        <span class="i_time"><span>'+ cache[i][1] +'</span>分钟</span>\
                    </li> ' 
    }

    $items.html(pushHtml);
}


/**
 * removeItem
 */
function removeItem(me) {
    var position = me.index()-1;
    me.parent().remove();
    cache.splice(position,1);
    calculate();
}



function resizeSection() {

    var oWidth = $(window).width() ,
        oHeight = $(window).height();

    $('.layer').css({
        width : oWidth ,
        height : oHeight
    })

}