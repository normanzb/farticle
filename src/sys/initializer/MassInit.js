define(['cogs','./Base'], function  (cogs, InitializerBase) {

    var Ctor = cogs.ctor(function  (mass) {
        var me = this;

        me._mass = ~~mass;

    }, InitializerBase);

    cogs.mixin(Ctor, {
        get mass(){
            return this._mass;
        },
        set mass(value){
            this._mass = value;
        },
        init: function  (runner, particle) {

            particle.mass = this._mass;
        }
    });

    return Ctor;
});