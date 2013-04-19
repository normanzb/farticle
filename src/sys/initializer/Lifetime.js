
define(['cogs', './Base'], function(cogs, InitializerBase) {
    
    var Ctor = cogs.ctor(function(min, max){
        var me = this;

        me._max = max != null ? max : NaN;
        me._min = min != null ? min : Number.MAX_VALUE;


    }, InitializerBase);

    cogs.mixin(Ctor, {
        get max(){
            return this._max;
        },
        set max(value){
            this._max = value;
        },
        get min(){
            return this._min;
        },
        set min(value){
            this._min = value;
        },
        get lifetime(){
            var me = this;
            return me.min == me.max ? me.min : ( me.max + me.min ) * 0.5;
        },

        init: function(emitter, particle){
            var me = this;

            if ( isNaN(me.max) ){
                particle.lifetime = me.min;
            }
            else {
                particle.lifetime = me.min + Math.random() * ( me.max - me.min );
            }
        }
    });

    return Ctor;
});