define(['cogs', 'farticle/util/color/RGBA', 'farticle/util/debugStat'], function (cogs, RGBA, debugStat) {
    var particleCount = 0;

    var Ctor = cogs.ctor(function(){
        var me = this;

        me._id = ++particleCount;

        me.onKilled = cogs.event();
        me.onDisposed = cogs.event();

        me.reset();
    });

    cogs.mixin(Ctor, cogs.emittable, {
        reset: function(){
            var me = this;
            
            me.color = new RGBA(255, 255, 255, 255);
            me.scale = 1;
            me._mass = 1;
            me._radius = 1;
            me._dict = null;
            me._colorTransform = null;

            me.revive();

        },
        revive: function(){
            var me = this;

            me.lifetime = 0;
            me.age = 0;
            me.energy = 1;
            me.isDead = false;
        },
        /**
         * The mass of the particle ( 1 is the default ).
         */
        get mass(){
            return this._mass;
        },
        set mass(value){
            this._mass = value;
        },
        get radius(){
            return this._radius;
        },
        set radius(value){
            this._radius = value;
        },
        kill: function(){
            var me = this;

            if (me.isDead){
                return;
            }

            me.energy = 0;
            me.isDead = true;

            me.onKilled(me);
            debugStat.particle.killed++;
        },
        dispose: function(){
            var me = this;

            me.kill();

            // clear all events;
            me.off();

            me.onDisposed(me)
        }
    });

    console.log(Ctor.prototype)

    return Ctor;
});