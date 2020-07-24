$( document ).ready(function() {
	var textPosition = [];
	
        var strUrl=location.search;
        var getPara, ParaVal;
        var aryPara = [];

	$('.dropdown-submenu a.test').on("click", function(e){
    		$(this).next('ul').toggle();
    		e.stopPropagation();
    		e.preventDefault();
  	}); 
        initialize();
        
	//���ʤ�r�϶� - �Ϥ�������r
	$("#two").scroll(function(){
		changeImg();
                console.log('121213');
	});

        
    });


//��l��
function initialize(){
        
        setWrapperHeight();
        setLeftNavHeight();		
        $(".img").hide();
        $(".activeImg").show();
        //getTextPosition();
        setImgNum();
        getTextPosition();
        setActiveImg(0);
        


}

//�]�w���氪��
function setLeftNavHeight(){
        var leftNavHeight;
        var topNavHeight = $(".topNav").height();
        leftNavHeight = "calc( 100% - " + topNavHeight + "px )"; 
        //leftNavHeight = "90vh";
        $(".leftNav").height(leftNavHeight);	
        $(".leftNav").css("overflow","auto");
}

//�]�wwrapper����
function setWrapperHeight(){
        var wrapperHeight = $("body").height() - $(".nav").height();
        $(".wrapper").height(wrapperHeight);
}

//���o��r�϶��U���D��m ����r���D�̧Ǽ�count number
function getTextPosition(){
        var count = 0;
        textPosition = [];
        
        $("div.page").each(function(){
                $(this).attr("count", count);
                $(this).children(".text").attr("count", count);
                count++;			
        });
        console.log($("div.page"));
        count = 0;

        var _scroll_top = $("#two").scrollTop();

        $(".pageNum").each(function(){
            $(this).attr("count", count);
            textPosition[count] = $(this).offset().top;

            count++;
        });
        return textPosition;
}

//���Ϥ��̧Ǽ�count number
function setImgNum(){
        var count = 0;
        $("div.img").each(function(){
                $(this).attr("count", count);
                count++;
        });
}

//�]�w�sactive count
function changeActive(count){
        setActiveText(count);
        setActiveImg(count);
        setActiveTextPosition(count);
}

//�̤�r�϶��s����m���ܹ����Ϥ�
function changeImg(){
        
        var currentPosition = $("#two").scrollTop();
        var currentImg = $("div.activeImg");
        var count = 0;
        var navHeight = $(".topNav").height();
        var textPosition = getTextPosition();
        for(count ; count<textPosition.length-1 ; count++){
                if(currentPosition >= textPosition[count]-navHeight-100 && currentPosition < textPosition[count+1]-navHeight-100){
                        setActiveImg(count);
                        setActiveText(count);
                }
        }

        if( currentPosition >= textPosition[textPosition.length-1]-navHeight-100 ){
                setActiveImg(textPosition.length-1);
                setActiveText(textPosition.length-1);
        }
}

//�]�wactive��r
function setActiveText(count){
//		console.log("setActiveText(count)");
        $(".activeText").removeClass("activeText");
        $(".activeTextAll").removeClass("activeTextAll");
        $(".pageNum[count="+ count +"]").addClass("activeText");
        $(".pageNum[count="+ count +"]").parent().addClass("activeTextAll");
}

//�]�wactive��r��m
function setActiveTextPosition(count){
        var navHeight = $(".topNav").height();
        $("#two").scrollTop(textPosition[count] - navHeight);	
        console.log(["textPosition[count]=",count,textPosition[count],navHeight,textPosition[count] - navHeight]);

}

//�]�wactive�Ϥ�
function setActiveImg(count){
        $("div.activeImg").removeClass("activeImg").hide();
        $(".img[count="+ count +"]").addClass("activeImg").show();	
}

function callcallapi(){
    $("#testapi").on("click",function(event){
        console.log("click");

        $.ajax({
        url: '/api/user?name="阿逼"',
        data: '',
        type: 'GET',

        success: function(response) {
            console.log(response);
        },
        error: function(error) {
        }

        });
    });
}

/**
* 利用api取得item資訊並且顯示
* @param  {int}  id     item的id
*/
function getitemapi(id){
    $.ajax({
        url: '/api/items/'+id,
        type: 'GET',

        success: function(response) {
            console.log(response);
            showContent(response);
            showImg(response);
            setInfo(response);
        },
        error: function(error) {
        }
    });
}

/**
* 打開頁面時初始利用api取得item資訊並且顯示
* @param  {int}  id     item的id
*/
function getInitItemapi(id){
    $.ajax({
        url: '/api/items/'+id,
        type: 'GET',

        success: function(response) {
            showContent(response);
            showImg(response);
            setInfo(response);
        },
        error: function(error) {
        }
    });
}



/**
* 將內文顯示在閱讀器上
* @param  {object}  obj     item的物件
*/
function showContent(obj){
    $('#textDiv').html('');

    let _content = obj['bibo:content'];
    console.log(_content);
    let _title = obj['o:title'];
    let _subtitle = obj['o:title'];
    let _startpage = obj['bibo:pageStart'] != null ? obj['bibo:pageStart'][0]['@value'] : 001;
    let _pagecount = obj['bibo:numPages']!= null ? obj['bibo:numPages'][0]['@value'] : _content.length;


    let _count = 0;
    $('#articletitle').text(_title);

    for(var i in _content){
        let _subtitlediv = $('<div>')
                        .addClass('page activeTextAll');
        let _subtitlep = $('<p>')
                            .addClass('p_viewer pageNum activeText')
                            .text(parseInt(_startpage) +_count);
        _subtitlediv.append(_subtitlep);
        let _contentp = $('<p>')
                            .addClass('p_viewer text content')
                            .text(_content[i]['@value']);

        $('#textDiv')
            .append(_subtitlediv)
            .append(_contentp);

        _count++;
    }
    console.log(obj);
}



/**
* 將資料畫在資訊頁上
* @param  {object}  obj     item的物件
*/
function setInfo(obj){
    $('#leftinfotable .row .col').html('');
    let _title = obj['o:title'] != null ? obj['o:title']:'No Info';
    let _authorList = obj['bibo:authorList'] != null ? obj['bibo:authorList'][0]['@value']:'No Info';
    let _date = obj['dcterms:date'] != null ? obj['dcterms:date']:'No Info';
    let _type = obj['dcterms:type'] != null ? obj['dcterms:type']:'No Info';
    let _numVolumes = obj['bibo:numVolumes'] != null ? obj['bibo:numVolumes'][0]['@value']:'No Info';
    let _startpage = obj['bibo:pageStart'] != null ? obj['bibo:pageStart'][0]['@value']:'No Info';
    let _pages = obj['bibo:numPages'] != null ? obj['bibo:numPages'][0]['@value']:'No Info';
    let _idurl = obj['@id'] != null ? obj['@id']:'No Info';
    if(obj['bibo:pageStart'] == null ||  obj['bibo:numPages'] == null){
        let _pagerange = 'No Info';
    }else{
        let _endPage = parseInt(_startpage) + parseInt(_pages);
        let _pagerange = _startpage + 'p-' + _endPage + 'p';
    }
    
    let _table = $('<table>').addClass('table table-hover table-striped');
    _table.append($('<tbody>'))
            .append($('<tr>')
                .append($('<td>').html('題名'))
                .append($('<td>').html(_title)))
            .append($('<tr>')
                .append($('<td>').html('作者'))
                .append($('<td>').html(_authorList)))
            .append($('<tr>')
                    .append($('<td>').html('日期'))
                    .append($('<td>').html(_date)))
            .append($('<tr>')
                .append($('<td>').html('體裁'))
                .append($('<td>').html(_type)))
            .append($('<tr>')
                    .append($('<td>').html('卷數'))
                    .append($('<td>').html(_numVolumes)))
            .append($('<tr>')
                    .append($('<td>').html('頁數'))
                    .append($('<td>').html()))
            .append($('<tr>')
                    .append($('<td>').html('資源網址'))
                    .append($('<td>').html(_idurl)));
    $('#leftinfotable .row .col').append(_table);
}

/**
* 
* 
*/
function showImg(obj){
    $('div #two').html('');
    let _img = obj['dcterms:medium'];
    if( obj['dcterms:medium'] == null) return;
    let _count = 0;
    for(var i in _img){
        let _rawfilename = _img[i]['thumbnail_url'];

        let splitUrl = _rawfilename.split('/');

        let _filename = splitUrl[5];
        let _fileurl = 'http://omekas.ccstw.nccu.edu.tw/files/original/'+_filename;

        let _imgdiv = $('<div>')
                        .addClass('img activeImg')
                        .attr('count',_count);
        let _imglazydiv = $('<img>')
                .addClass('lazyload')
                .css('width','100%')
                .attr('data-src',_img[i]['thumbnail_url'])
                .attr('src',_fileurl);
        _imgdiv.append(_imglazydiv);

        $('div #two').append(_imgdiv);
        _count++;

    }
    $(".img").hide();
    $(".activeImg").show();

}

/**
* 打開頁面時初始左側顯示文章列表
* @param  {array}  array     此網站所有資源id
*/
function createLeftList(array){
    var _ul = $('<ul>');
    for(var i in articlearray){
        var _li = $('<ul>')
                        .addClass('item')
                        .attr('itemid',i)
                        .text(articlearray[i]);
        _ul.append(_li);
    }
    $('#leftlistmenu ul').after(_ul);
}

/**
* 過濾左側列表詞
* @param  {string}  selector     選擇器
*/
function searchListText(selector){
    $(selector).on('keyup',function(){
        let _searchtext = $(this).val();
	var startTime=new Date();
	GLOBAL_TIME = startTime;
	var func = function(){
		var _ckeck = (new Date() - GLOBAL_TIME);
		console.log('now:' + _ckeck);
		if(_ckeck >= 1000){
			$('ul.item').hide();
                        $('ul.item:contains('+_searchtext+')').show();                        
			clearTimeout();
		}
	};
	var ckeck = (new Date() - GLOBAL_TIME);
	if(ckeck < 2000){
		clearTimeout();
		setTimeout(func,1000);
		//console.log('time:' + GLOBAL_TIME);
	}else{

	}
  });
}

/**
* 點擊左側列表文章標題取得內文
*/
function getLeftItemid(){
    $('ul .item').on('click',function(){
        let _id = $(this).attr('itemid');
        getitemapi(_id);
    });
}

/**
* 設定引用
*/
function setRelText(obj){
    $('#leftinfotable .row .col').html('');
    let _title = obj['o:title'] != null ? obj['o:title']:'No Info';
    let _authorList = obj['bibo:authorList'] != null ? obj['bibo:authorList'][0]['@value']:'No Info';
    let _date = obj['dcterms:date'] != null ? obj['dcterms:date']:'No Info';
    let _type = obj['dcterms:type'] != null ? obj['dcterms:type']:'No Info';
    let _numVolumes = obj['bibo:numVolumes'] != null ? obj['bibo:numVolumes'][0]['@value']:'No Info';
    let _startpage = obj['bibo:pageStart'] != null ? obj['bibo:pageStart'][0]['@value']:'No Info';
    let _pages = obj['bibo:numPages'] != null ? obj['bibo:numPages'][0]['@value']:'No Info';
    let _idurl = obj['@id'] != null ? obj['@id']:'No Info';
    if(obj['bibo:pageStart'] == null ||  obj['bibo:numPages'] == null){
        let _pagerange = 'No Info';
    }else{
        let _endPage = parseInt(_startpage) + parseInt(_pages);
        let _pagerange = _startpage + 'p-' + _endPage + 'p';
    }
    let _text = _authorList + _date + '。' + _title 
}
