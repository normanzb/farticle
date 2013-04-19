
define(['cogs', 'farticle/sys/runner/Base', '../particle/Factory', '../emitter/Base'],
function(cogs, RunnerBase, Factory, EmitterBase) {
    
    var factory = new Factory();

    var Ctor = cogs.ctor(function(){
        var me = this;

        /**
         * Identifies whether the particles should be arranged
         * into spacially sorted arrays - this speeds up proximity
         * testing for those actions that need it.
         */
        me.spaceSort = false;
        me.emitter = new EmitterBase();
        me._particleFactory = factory;

    }, RunnerBase);

    cogs.mixin(Ctor, {
        _initParticle: function(p){
            var me = this;
            p.x = me.emitter.x;
            p.y = me.emitter.y;
            p.rotation = me.emitter.rotation;
        },
        _sortParticles: function()
        {
            var me = this;
            if( me.spaceSort )
            {
                
                me._particles.sort(function(a, b){
                    a - b;
                });
                me._particles.forEach(function(itm, idx){
                    me._particles.item(idx).sortID = idx;
                });
                
            }
        },
    });

    Object.defineProperty(Ctor, 'factory', {get: function(){
        return factory;
    }});

    return Ctor;
});