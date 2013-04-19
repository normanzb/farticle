define(['cogs', './Base', './Point'], function (cogs, Base, Point) {

    var Ctor = cogs.ctor(function(start, end){
        var me = this;

        if (start == null){
            start = new Point(0, 0);
        }

        if (end == null){
            end = new Point(0, 0);
        }

        me._start = start;
        me._end = end;

    }, Base);

    return cogs.mixin(Ctor, cogs.emittable, {
        get start(){
            return this._start;
        },
        get end(){
            return this._end;
        },
        get vector(){
            return this.end.subtract(this.start);
        },
        _contains: function(point){
            var me = this;
            var start = me.start;
            var end = me.end;
            var vector = me.vector;

            // not on line if dot product with perpendicular is not zero
            if ( ( point.x - start.x ) * vector.y - ( point.y - start.y ) * vector.x != 0 ){
                return false;
            }

            // is it between the points, dot product of the vectors towards each point is negative
            return ( point.x - start.x ) * ( point.x - end.x ) + ( point.y - start.y ) * ( point.y - end.y ) <= 0
        },
        rand: function(){
            var me = this;
            var ret = me.start.clone();
            var scale = Math.random();
            var vector = me.vector;

            ret.x += vector.x * scale;
            ret.y += vector.y * scale;

            return ret;
        },
        get area(){
            var me = this;
            return me.vector.magnitude;
        }
    });
});