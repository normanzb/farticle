
define(['cogs'], function(cogs) {
    
    /**
     * This is for behaviours whose state changes over time. It enables
     * them to be reset to their original state.
     */
    var Ctor = cogs.ctor(function(){

    });

    return cogs.stub(Ctor, ['reset']);
});