
define(['cogs', 'farticle/util/WeightedCollection', './Base'], function(cogs, WeightedCollection, InitializerBase) {

    function fill(initializers, weights){
        me._initializers.clear();

        var priorityWeight = 0;

        if (weights == null || weights.length != initializers.length){
            priorityWeight = 1;
        }

        initializers.forEach(function  (itm, idx) {
            me._initializers.push(itm, priorityWeight || ~~weights[idx]);
        });

    }
    
    var Ctor = cogs.ctor(function(initializers, weights){
        me = this;
        me._initializers = new WeightedCollection();

        if (initializers){
            fill(initializers, weights);
        }

    }, InitializerBase);

    cogs.mixin(Ctor, {
        attach: function (runner) {
            
        },
        detach: function (runner) {
            
        },
        init: function  (runner, particle) {
            var init = me._initializers.rand();

            init.init(runner, particle);
        }
    });

    return Ctor;
});