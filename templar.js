;(function ($) {
    "use strict";
    
    $.templar = function(element, options){
        var base = this;
        base.$elem = $(element);
        base.elem = element;
        base.options = options;
        
        base.init = function(){
            var templateString = $.trim(base.options.templateString);
            this.options.bindings = templateString.match(/{{.*}}/g);
            
            base.$elem.on('templar:remote', function(){
                if (!(typeof base.options.remoteUrl === "string" && base.options.remoteUrl.length > 0)){
                    $.error("Invalid or missing remoteUrl parameter");
                    return;
                }
                
                $.ajax({
                    url: base.options.remoteUrl,
                    dataType: "json",
                    type: "GET",
                    success: function(data){
                        $.each(data, function(obj, value){
                            $.each(base.options.bindings, function(indx, binding){
                                if (binding.indexOf(obj) !== -1){
                                    base.options.templateString = base.options.templateString.replace(binding, value);
                                }
                            })
                        });
                        base.$elem.html(base.options.templateString);
                    },
                    error: function(){
                        $.error("Could not retrieve data from remote URL: " + base.options.remoteUrl)
                    }
                });
            });
        }
        
        base.init();
    }
    
    $.fn.templar = function(options){
        return this.each(function(){
            $.templar(this, options);
        })
    }
    
})(jQuery);