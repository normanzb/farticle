
define(['cogs', './Zonable'], function(cogs, Zonable) {
    
    /**
     * The constructor creates a Position initializer for use by 
     * an runner. To add a Position to all particles created by an runner, use the
     * runner's addInitializer method.
     * 
     * @param zone The zone to place all particles in.
     */
    var Ctor = cogs.ctor(function(zone){
        
    }, Zonable);

    return cogs.mixin(Ctor, {
        init: function(runner, particle){
            var me = this;

            var p = particle;
            var loc = me.zone.rand();

            if (p.rotation == 0){
                p.velocity.x = loc.x;
                p.velocity.y = loc.y;
            }
            else {
                var sin = Math.sin(p.rotation);
                var cos = Math.cos(p.rotation);

                p.velocity.x = cos * loc.x - sin * loc.y;
                p.velocity.y = cos * loc.y + sin * loc.x;
            }

        }
    });
});