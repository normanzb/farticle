define(['cogs', 'farticle/d2/renderer/Canvas', 'farticle/util/color/RGBA'], 
function(cogs, Canvas, RGBA){
    var Ctor = cogs.ctor(function(){

    }, Canvas);

    return cogs.mixin(Ctor, {
        _getDisplayObject: function(particle){
            // console.log(particle.energy, particle.energy * 255)
            var color = particle.__color || new RGBA(255 * Math.random(), 255 * Math.random(), 255 * Math.random(), particle.energy * 255);
            color.alpha = particle.energy * 255;

            particle.__color = color;
            return {
                color: color,
                // scale: particle.energy * 10,
                scale: particle.energy * 20,
                image: ''
            };
        }
    });
});