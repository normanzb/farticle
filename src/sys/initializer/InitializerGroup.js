define(['cogs', './Base', 'farticle/util/Collection'], function (cogs, InitializerBase, Collection) {

    function prioritySort( b1, b2 )
    {
        return b1.priority - b2.priority;
    }

    var Ctor = cogs.ctor(function(){
        me = this;
        me._initializers = new Collection(InitializerBase);
        me._runner = null;

        me._initializers.on('add', function(sender, evt){
            evt.item.attach(me._runner);
        });
        me._initializers.on('remove', function(){
            evt.item.detach(me._runner);
        });

        me._initializers.clone(arguments);

    }, InitializerBase);

    return cogs.mixin(Ctor, {
        get initializers(){
            return this._initializers;
        },
        attach: function(runner){
            var me = this;

            if ( me._runner == runner ){
                return;
            }

            if (me._runner){
                me.detach();
            }

            me._runner = runner;

            me._initializers.forEach(function(init, idx){
                init.attach(me._runner);
            });
        },
        detach: function(runner){
            var me = this;

            if (runner == null){
                runner = me._runner;
            }

            if ( me._runner != runner ){
                return;
            }

            me._initializers.forEach(function(init, idx){
                init.detach(me._runner);
            });
        },
        init: function (runner, particle){
            var me = this;

            me._initializers.forEach(function(init, idx){
                init.init(runner, particle);
            });

        }
    });
});