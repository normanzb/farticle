define(['cogs'], 
function (cogs) {
    var Ctor = cogs.ctor(function(){
        this._radians = 0;
    });

    cogs.mixin(Ctor, {
        valueOf: function(){
            return this._radians;
        },
        get degrees(){
            return Ctor.asDegrees(this._radians);
        },
        get radians(){
            return this._radians;
        },
        set radians(value){
            this._radians = value;
        }
    });

    Ctor.asDegrees = function(radians){
        return radians / Math.PI * 360;
    };

    Ctor.asRadians = function(degrees){
        return degrees / 360 * 2 * Math.PI;
    };

    return Ctor;
});