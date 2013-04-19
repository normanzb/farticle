
define(['cogs', 'farticle/sys/action/Base'], function(cogs, BaseAction) {
    
    var Ctor = cogs.ctor(function(){
        this.priority = -10;
    }, BaseAction);

    return cogs.mixin(Ctor, {
        update: function(runner, particle, time){
            var p = particle;
            p.x += p.velocity.x * time / 1000;
            p.y += p.velocity.y * time / 1000;
        }
    });
});