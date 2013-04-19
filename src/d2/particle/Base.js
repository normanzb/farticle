define(['cogs' ,'farticle/sys/particle/Base', 'farticle/geom/Point', 'farticle/geom/Angle','../util/Positionable'], 
function (cogs, BaseParticle, Point, Angle, Positionable) {

    function getInsertia(){
        var me = this;

        // TODO: understand it
        me._inertia = me.mass * me.radius * me.radius * 0.5;

        return me._inertia;
    }

    var Ctor = cogs.ctor(function(){
        var me = this;

    }, BaseParticle);

    return cogs.mixin(Ctor, Positionable, {
        /**
         * The moment of inertia of the particle about its center point
         */
        get inertia(){
            return this._inertia;
        },
        // overwrite the setter in prototype to make sure insertia gets updated
        set mass(value){
            this._mass = value;
            getInsertia();
        },
        set radius(value){
            this._radius = value;
            getInsertia();
        },

        set rotation(value){
            var me = this;
            if (value instanceof Angle){
                me._rotation = value;
            }
            else{
                me._rotation.radians = value;
            }
        },
        get rotation(value){
            var me = this;
            return me._rotation;
        },
        reset: function(){
            var me = this;

            me.position = new Point();
            me.previous = new Point();
            me.velocity = new Point();

            me.position.on('set', function(sender, prop, value){
                // backup the values when pos is changed.
                me.previous[prop] = sender[prop];
            });

            /**
             * The rotation of the particle in radians.
             */
            me._rotation = new Angle();

            me._inertia = 0;

            /**
             * The position in the runner's horizontal spacial sorted array
             */
            me.sortID = -1;

            me.angVelocity = 0;

            BaseParticle.prototype.reset.call(me);
        }

    });
});