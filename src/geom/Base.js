
define(['cogs'], function(cogs) {
    
    var Ctor = cogs.ctor(function(){

    });

    cogs.mixin(Ctor, {
        contains: function(x, y){
            var me = this;
            var point;

            if (y){
                point = {
                    x: x,
                    y: y
                };
            }
            else{
                point = x;
            }

            return me._contains(point);
        }
    });

    return cogs.stub(Ctor, ['clone', 'rand', 'area', '_contains']);
});