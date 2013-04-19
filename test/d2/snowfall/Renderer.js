define(['cogs', 'farticle/d2/renderer/Canvas', 'farticle/util/color/RGBA'], 
function(cogs, Canvas, RGBA){
    var Ctor = cogs.ctor(function(){

    }, Canvas);

    return cogs.mixin(Ctor, {
        _backgroundColor: '#000000',
        _getDisplayObject: function(particle){
            // console.log(particle.energy, particle.energy * 255)
            return {
                color: new RGBA(255, 255, 255, particle.energy * 255),
                // scale: particle.energy * 10,
                scale: 3,
                image: ''
            };
        }
    });
});