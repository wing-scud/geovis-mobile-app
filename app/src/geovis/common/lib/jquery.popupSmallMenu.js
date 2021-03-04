
/**
 * @description 
 * 		small popup menu.
 * @deprecated 
 * 		JQuery.js
 * @author Malt
 * @version 1.0
 * Date: 2013-05-22
 */
(function($){
    $.fn.popupSmallMenu = function(options) {
        var $currMenu = $(this),
        defaultOptions = {
            event : null,
            onClickItem : null
        };
        options = $.extend(defaultOptions,options);

        var _smallMenu = {
            popupSmallMenu : function() {
                this._bindItemClick();
                this._bindMenuEvent();
                this._showMenu();
                return $currMenu;
            },
            _bindMenuEvent : function() {
                var thiz = this;
                $currMenu.hover(function(){ 	
               },function(){
                   thiz._unBindItemClick();
                   $currMenu.hide();
               });

               $currMenu.click(function(){
                   thiz._unBindItemClick();
                   $currMenu.hide();
               });
            },
            _showMenu : function() {
                if(!options.event) {
                    alert('请传入鼠标事件');
                }
                $currMenu.css({
                   top:options.event.clientY+"px",
                   left:options.event.clientX+"px",
                   display:"block"
               });
            },
            _bindItemClick : function() {
                $currMenu.find('li').each(function(index,obj){
                    var $li = $(obj);
                    var itemIden = $li.attr('class');
                    $li.bind('click',function(event){
                        event.stopPropagation();
                        if(options.onClickItem 
                                && typeof options.onClickItem === 'function') {
                            options.onClickItem(itemIden);
                        }
                    });
                });
            }
            ,
            _unBindItemClick : function(){
                $currMenu.find('li').each(function(index,obj){
                    $(obj).unbind();
                });
            }
        };

        return _smallMenu.popupSmallMenu();
   }
})(window.jQuery);


