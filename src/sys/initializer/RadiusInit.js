
define(['cogs', './Base'], function(cogs, InitializerBase) {
    
    var Ctor = cogs.ctor(function(radius){
        var me = this;

        me._radius = ~~radius;
    }, InitializerBase);

    return cogs.mixin(Ctor, {
        get radius(){
            return this._radius;
        },
        set radius(value){
            this._radius = value;
        },
        init: function(runner, particle){
            var me = this;
            particle.radius = me._radius;
            
        }
    });
});