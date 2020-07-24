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
                showcontent(response);
                showimg(response);
            },
            error: function(error) {
            }
        });
    }

    /**
    * 打開頁面時初始利用api取得item資訊並且顯示
    * @param  {int}  id     item的id
    */
    function getinititemapi(id){
        $.ajax({
            url: '/api/items/'+id,
            type: 'GET',

            success: function(response) {
                showcontent(response);
                showimg(response);
            },
            error: function(error) {
            }
        });
    }

    /**
    * 將內文顯示在閱讀器上
    * @param  {object}  obj     item的物件
    */
    function showcontent(obj){
        $('#textDiv').html('');
      
        let _content = obj['bibo:content'];
        let _title = obj['o:title'];
        let _subtitle = obj['o:title'];
        let _startpage = obj['bibo:pageStart'].length == 0 ? obj['bibo:pageStart'][0]['@value'] : 001;
        let _pagecount = obj['bibo:numPages'].length == 0 ? obj['bibo:numPages'][0]['@value'] : _content.length;
              

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
        console.log(_content);
        
    }
    
    /**
    * 
    * 
    */
    function showimg(obj){
        $('div #two').html('');
        let _img = obj['dcterms:medium'];
        if( _img.length == 0) return;
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
    function createleftlist(array){
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
    * 點擊左側列表文章標題取得內文
    */
    function getleftitemid(){
        $('ul .item').on('click',function(){
            let _id = $(this).attr('itemid');
            getitemapi(_id);
        });
    }
