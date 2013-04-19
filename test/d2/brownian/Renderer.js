define(['cogs', 'farticle/d2/renderer/Canvas', 'farticle/util/color/RGBA'], 
function(cogs, Canvas, RGBA){
    var Ctor = cogs.ctor(function(){

    }, Canvas);

    return cogs.mixin(Ctor, {
        _getDisplayObject: function(particle){
            // console.log(particle.energy, particle.energy * 255)
            return {
                color: new RGBA(0,0,0, particle.energy * 255),
                scale: 1,
                image: ''
            };
        }
    });
});