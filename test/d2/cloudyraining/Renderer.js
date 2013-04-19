define(['cogs', 'farticle/d2/renderer/Canvas', 'farticle/util/color/RGBA'], 
function(cogs, Canvas, RGBA){
    var Ctor = cogs.ctor(function(){

    }, Canvas);

    return cogs.mixin(Ctor, {
        _getDisplayObject: function(particle){
            
            var ret;
            if (particle.mass >= 10){
                ret = {
                    color: new RGBA(0,0,0, particle.energy * 255),
                    scale: particle.radius,
                    image: ''
                };
            }
            else{
                ret = {
                    color: new RGBA(0, particle.energy * 255, particle.energy * 255, particle.energy * 255),
                    // scale: particle.energy * 10,
                    scale: 2,
                    image: ''
                };
            }

            return ret;
        }
    });
});