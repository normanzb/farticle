
define(['cogs', 'farticle/geom/Point', 'farticle/geom/Angle', '../util/Positionable'],
function(cogs, Point, Angle, Positionable) {
    

    var Ctor = cogs.ctor(function(){
        var me = this;

        me.position = new Point();
        me._rotation = new Angle();
        
    });

    cogs.mixin(Ctor, Positionable, {
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
        }
    });


    return Ctor;
});