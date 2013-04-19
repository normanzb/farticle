define(['cogs','./Base', '../easing/linear'], function (cogs, ActionBase, easeingLinear) {

    /**
     * The Age action operates in conjunction with the Lifetime 
     * initializer. The Lifetime initializer sets the lifetime for
     * the particle. The Age action then ages the particle over time,
     * altering its energy to reflect its age. This energy can then
     * be used by actions like Fade and ColorChange to alter the
     * appearence of the particle as it ages.
     * 
     * <p>The aging process need not be linear. This action can use
     * a function that modifies the aging process, to ease in or out or 
     * to alter the aging in other ways.</p>
     * 
     * <p>When the particle's lifetime is over, this action marks it 
     * as dead.</p>
     * 
     * <p>When adjusting the energy this action can use any of the
     * easing functions in the org.flintparticles.common.energy package
     * along with any custom easing functions that have the same interface.</p>
     * 
     */
    var Ctor = cogs.ctor(function(easing){
        var me = this;

        me._easing = easing || easeingLinear.easeNone;
    }, ActionBase);

    return cogs.mixin(Ctor, {
        get easing(){
            return this._easing;
        },
        set easing(value){
            this._easing = value;
        },
        update: function(emitter, particle, time){
            particle.age += time / 1000;

            if ( particle.age >= particle.lifetime ){
                particle.energy = 0;

                setTimeout(function(){
                    particle.kill();    
                })
                
            }
            else{
                // TODO
                particle.energy = this.easing(particle.age, 1, -1, particle.lifetime);
            }

            // console.log('farticle.sys.Age:', particle.age, particle.lifetime, particle.energy);
        }
    });
    
});