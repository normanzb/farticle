
define(['cogs', 'farticle/sys/particle/Factory', 'farticle/util/debugStat', 'farticle/util/Collection', './Base'], 
function(cogs, FactoryBase, debugStat, Collection, Particle2DBase) {
    
    var Ctor = cogs.ctor(function(){
        var me = this;

        me._particles = [];
    }, FactoryBase);

    cogs.mixin(Ctor, {
        produce: function(){
            var me = this;
            var ret;
            debugStat.particle.counter++;

            if (me._particles.length){
                ret = me._particles.pop();
                ret.reset();
                // console.log('reuse', ret)
            }
            else{
                ret = new Particle2DBase();
                // console.log('new', ret)
            }

            me._onProduce(ret);

            return ret;
        },
        recall: function(particle){
            var me = this;
            debugStat.particle.counter--;

            me._particles.push(particle);

            me._onRecall(particle);

        },
        recycle: function(){
            var me = this;

            me._particles.length = 0;
        }
    })

    return Ctor;
});