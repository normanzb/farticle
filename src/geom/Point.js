define(['cogs', './Base'], function (cogs, Base) {

    var Ctor = cogs.ctor(function(x, y){
        var me = this;

        if (x == null){
            // dont' use ~~ as there could be fraction
            x = 0;
        }

        if (y == null){
            y = 0;
        }

        me._x = x;
        me._y = y;

        me.onSet = cogs.event();

    }, Base);

    return cogs.mixin(Ctor, cogs.emittable, {
        get x(){
            return this._x;
        },
        set x(value){
            var me = this;

            if (me._x == value){
                return;
            }

            me.onSet( me, 'x', value);
            me._x = value;
        },
        get y(){
            return this._y;
        },
        set y(value){
            var me = this;

            if (me._y == value){
                return;
            }

            me.onSet( me, 'y', value);
            this._y = value;
        },
        get area(){
            return 1;
        },
        get magnitude(){
            var me = this;

            return Math.sqrt(me.x * me.x + me.y * me.y);
        },
        get length(){
            return this.magnitude;
        },
        normalize: function(){
            me.x = me.x / me.magnitude;
            me.y = me.y / me.magnitude;
        },
        subtract: function(point){
            var me = this;

            var negative = point.clone();
            negative.x *= -1;
            negative.y *= -1;

            return me.add(negative);
        },
        add: function(point){
            var me = this;
            var ret = new Ctor();

            ret.x = me.x + point.x;
            ret.y = me.y + point.y;

            return ret;
        },
        _contains: function(point){
            return me.x == point.x && me.y == point.y
        },
        rand: function(){
            return this.clone();
        },
        clone: function(){
            var ret = new Ctor(this.x, this.y);
            return ret;
        }
    });
});