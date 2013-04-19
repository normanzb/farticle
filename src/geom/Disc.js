
define(['cogs' , './Base', './Point'], function(cogs, GeomBase, Point) {
    
    var Ctor = cogs.ctor(function(center, outerRadius, innerRadius){
        if (outerRadius < innerRadius){
            throw new Error("The outRadius (" + outRadius +") can't be smaller than the innerRadius");
        }

        if (me._center == null){
            me._center = new Point(0,0);
        }
        else{
            me._center = center;
        }

        me._innerRadius = innerRadius;
        me._outerRadius = outerRadius;
        me._innerSq = me._innerRadius * me._innerRadius;
        me._outerSq = me._outerRadius * me._outerRadius;

    }, GeomBase);

    cogs.mixin(Ctor, {
        get center(){
            return this._center;
        },
        set center(value){
            this._center = value;
        },
        /**
         * The radius of the inner edge of the disc.
         */
        get innerRadius()
        {
            return me._innerRadius;
        },

        set innerRadius( value )
        {
            me._innerRadius = value;
            me._innerSq = me._innerRadius * me._innerRadius;
        },
        /**
         * The radius of the outer edge of the disc.
         */
        get outerRadius()
        {
            return me._outerRadius;
        },

        set outerRadius( value )
        {
            me._outerRadius = value;
            me._outerSq = me._outerRadius * me._outerRadius;
        },

        _contains: function( point ){
            point.x -= me._center.x;
            point.y -= me._center.y;

            var distSq = x * x + y * y;
            return distSq <= me._outerSq && distSq >= me._innerSq;
        },

        rand: function (){
            var rand = Math.random();
            var point = Point.pol
        },

        get area(){
            return Math.PI * (me._outerSq - me._innerSq);
        }
    });

    return Ctor;
});