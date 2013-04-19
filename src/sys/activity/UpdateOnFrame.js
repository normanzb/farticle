
define(['cogs'], function(cogs) {
    
    var Ctor = cogs.ctor(function(frameUpdatable){
        var me = this;

        me._action = frameUpdatable;
    });

    cogs.mixin(Ctor, {
        update: function(runner, time){
            this._action.frameUpdate(runner, time);
        }
    });

    return Ctor;
});