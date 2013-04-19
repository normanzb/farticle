
define(['cogs', 'farticle/sys/action/Base'], function(cogs, Base) {
    
    var Ctor = cogs.ctor(function(zone, zoneIsSafe){
        if (zoneIsSafe == null){
            zoneIsSafe = true;
        }
        
        this.priority = -20;

        this.zone = zone;
        this.zoneIsSafe = zoneIsSafe;
    }, Base);

    return cogs.mixin(Ctor, {
        update: function(runner, particle, time){
            var me = this;
            var p = particle;


            var inside = me.zone.contains(p);

            if (
                (me.zoneIsSafe && !inside) ||
                (!me.zoneIsSafe && inside)
                ){
                p.kill();
            }
        }
    });
});