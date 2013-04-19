
define(['cogs', 'farticle/sys/action/Base'], function(cogs, ActionBase) {
    
    var Ctor = cogs.ctor(function(driftX, driftY){
        var me = this;

        me._sizeX = 0;
        me._sizeY = 0;
        me.driftX = ~~driftX;
        me.driftY = ~~driftY;

    }, ActionBase);

    cogs.mixin(Ctor, {
        get sizeX(){
            var me = this;
            return me.driftX * 2;
        },
        get sizeY(){
            var me = this;
            return me.driftY * 2;
        },
        update: function(runner, particle, time){
            var me = this;
            var p = particle;
            p.velocity.x += ( Math.random() - 0.5 ) * me.sizeX * time / 1000;
            p.velocity.y += ( Math.random() - 0.5 ) * me.sizeY * time / 1000;
        }
    });

    return Ctor;
});