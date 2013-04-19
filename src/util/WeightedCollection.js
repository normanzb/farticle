
define(['cogs', './Collection'], function(cogs, Collection) {
    
    var base = Collection.prototype;

    function Pair (v, w) {
        if (!(this instanceof Pair)){
            return new Pair(v, w);
        }

        this.value = v;
        this.weight = w;
    }

    var Ctor = cogs.ctor(function(){
        var me = this;

        me._total = 0;
    }, Collection);

    cogs.mixin(Ctor, {
        get total(){
            return this._total;
        },
        /**
         * Returns a random value from the WeightedArray. The weighting of the values is
         * used when selcting the random value, so items with a higher weighting are
         * more likely to be seleted.
         * 
         * @return A randomly selected item from the array.
         */
        rand: function(){
            var me = this;

            var pos = Math.random() * me._total;
            
            var cur = 0;
            var itm;

            for(var i = 0; i < me.length; i++){
                itm = me.item(i);

                cur += itm.weight;
                
                if (cur >= pos){
                    return itm.value;
                }
            }

            return base.item.call(me, me.length - 1).value;
        },
        push: function(value, weight){
            var me = this;

            me._total += weight;
            return base.push.call(me, Pair(value, weight));
        },
        unshift: function(value, weight){
            var me = this;

            me._total += weight;
            return base.unshift.call(me, Pair(value, weight));
        },
        pop: function(){
            var me = this;
            var ret = base.pop.call(me);

            me._total -= ret.weight;
        },
        shift: function(){
            var me = this;
            var ret = base.shift.call(me);

            me._total -= ret.weight;  
        },
        item: function(index, value, weight){
            var me = this;
            if (arguments.length <= 1){
                return base.item.call(me, index);
            }
            else{
                var removeItem = me.array[index];

                if (value == removeItem){
                    return;
                }

                weight = ~~weight;

                me._total -= removeItem.weight - weight;

                return base.item.call(me, Pair(value, weight));
            }
        },
        has: function  (value) {
            var me = this;

            if (value instanceof Pair){
                return base.has.call(me, value);
            }

            return me.array.filter(function(itm){return itm != 0}).length > 0;
        },
        clear: function  () {
            var me = this;

            me._total = 0;
            base.clear.call(me);
        }
    });

    return Ctor;
});