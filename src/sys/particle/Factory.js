define(['cogs'], function (cogs) {
    var Ctor = cogs.ctor(function(){
        var me = this;

        me._handleParticleDisposed = function(sender){
            me.recall(sender);
        };
    });

    cogs.stub(Ctor, [
        /**
         * To obtain a new Particle object. If using a pool of particles the particle factory will usually return 
         * a particle from the pool and only creates a new particle if the pool is empty.
         * 
         * @return a Particle object.
         */
        'produce', 
        /**
         * Indicates a particle is no longer required. If using a pool of particles the particle factory will 
         * return the particle to the pool for reuse later.
         */
        'recall', 
        /**
         * Clear all cached particles from the factory
         */
        'recycle'
    ]);

    return cogs.mixin(Ctor, {
        /**
         * helper function which used by inheritances to automatically recall particle
         * @protected
         */
        _onProduce: function(particle){
            var me = this;

            particle.on('killed', me._handleParticleDisposed);
        },
        _onRecall: function(particle){
            var me = this;

            particle.off('killed', me._handleParticleDisposed);
        }
    });
});