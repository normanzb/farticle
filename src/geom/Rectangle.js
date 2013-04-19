define(['cogs', './Point', './Base'], function(cogs, Point, GeomBase){
    var Ctor = cogs.ctor(function(x, y, width, height){

        this.position = new Point(x, y);
        this._width = width;
        this._height = height;

    }, GeomBase);

    return cogs.mixin(Ctor, {
        get x(){
            return this.position.x;
        },
        set x(value){
            this.position.x = value;
        },
        get y(){
            return this.position.y;
        },
        set y(value){
            this.position.y = value;
        },
        get width(){
            return this._width;
        },
        set width(value){
            this._width = value;
        },
        get height(){
            return this._height;
        },
        set height(value){
            this._height = value;
        },
        get left(){
            return this.x;
        },
        get top(){
            return this.y;
        },
        get right(){
            return this.x + this.width;
        },
        get bottom(){
            return this.y + this.height;
        },
        get area(){
            return this.height * this.width;
        },
        rand: function(){
            var me = this;
            return new Point( me.left + Math.random() * me.width, 
                me.top + Math.random() * me.height );
        },
        /**
         * The contains method determines whether a point is inside the zone.
         * This method is used by the initializers and actions that
         * use the zone. Usually, it need not be called directly by the user.
         * 
         * @param x The x coordinate of the location to test for.
         * @param y The y coordinate of the location to test for.
         * @return true if point is inside the zone, false if it is outside.
         */
        _contains: function(point)
        {
            var me = this;
            return point.x >= me.left && 
                point.x <= me.right && 
                point.y >= me.top && 
                point.y <= me.bottom;
        }
    });
});