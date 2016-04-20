(function($){
    $.fn.placeholder = function() {
        this.each(function() {
            var element = $(this);

            if(element[0].tagName.toLowerCase()=='input' && (element.attr('type')=='checkbox' || element.attr('type')=='radio' || element.attr('type')=='password')) return;

            element.isVisible(function() {
                var placeholder = element.attr('placeholder');
                if(!placeholder) return;
                if(element.data('placeholder')) return;
                element.data('placeholder', true);
                element.attr('placeholder', '');
                var label = $('<span />').html(placeholder).addClass('placeholder').css({'display':'block', 'position':'absolute', 'top':element.position().top, 'left':element.position().left, 'color':element.css('color'), 'paddingLeft':element.css('paddingLeft'), 'lineHeight':(element[0].tagName.toLowerCase() == 'input' ? element.outerHeight()+'px' : ''), 'paddingTop':(element[0].tagName.toLowerCase() == 'textarea' ? element.css('paddingTop') : element.css('marginTop')), 'whiteSpace':'nowrap', 'fontSize':element.css('fontSize')});
                label.click(function() {
                    element.focus();
                    element.trigger('click');
                });

                if(!element.val()) {
                    label.show();
                } else {
                    label.hide();
                }

                element.focusin(function() {
                    label.hide();
                });

                element.focusout(function() {
                    if(!element.val()) {
                        label.show();
                    } else {
                        label.hide();
                    }
                });

                element.change(function() {
                    if(!$(this).val()) {
                        label.show();
                    } else {
                        label.hide();
                    }
                });

                var timer;
                $(window).resize(function() {
                    if(timer) clearTimeout(timer);
                    timer = setTimeout(function() {
                        label.css({maxWidth:element.width(), 'top':element.position().top, 'left':element.position().left, 'color':element.css('color'), 'paddingLeft':element.css('paddingLeft'), 'lineHeight':(element[0].tagName.toLowerCase() == 'input' ? element.outerHeight()+'px' : ''), 'paddingTop':(element[0].tagName.toLowerCase() == 'textarea' ? element.css('paddingTop') : element.css('marginTop')), 'whiteSpace':'nowrap', 'fontSize':element.css('fontSize')});
                    }, 1000);
                });

                element.after(label);
            });
        });
    }
})(jQuery);