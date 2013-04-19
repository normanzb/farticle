
define(['cogs'], function(cogs) {
    
    var Ctor = cogs.ctor(function(){
        var me = this;

        me._priority = 0;
    });

    return cogs.mixin(Ctor, {
        get priority(){
            return this._priority;
        },
        set priority(value){
            this._priority = value;
        },
        attach: function(){

        },
        detach: function(){

        },
        init: function(runner, particle){
            
        }
    });
});